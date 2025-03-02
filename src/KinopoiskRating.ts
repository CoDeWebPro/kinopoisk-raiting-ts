import axios from 'axios';
import { Rating, KinopoiskError } from './types';
import { parseXML } from './utils';

export class KinopoiskRating {
    private static readonly TIMEOUT = 5000;
    private static cache = new Map<number, Rating>();

    static async getRating(movieId: number): Promise<Rating> {
        if (this.cache.has(movieId)) {
            return this.cache.get(movieId)!;
        }

        try {
            const response = await axios.get(`https://rating.kinopoisk.ru/${movieId}.xml`, {
                responseType: "text",
                timeout: this.TIMEOUT,
                signal: new AbortController().signal,
            });
            
            const parsed = await parseXML(response.data);

            const rating: Rating = {
                kp: {
                    rating: Number(parsed.kp_rating._),
                    votes: Number(parsed.kp_rating.$.num_vote),
                },
                imdb: {
                    rating: Number(parsed.imdb_rating._),
                    votes: Number(parsed.imdb_rating.$.num_vote),
                },
            };

            if (isNaN(rating.kp.rating) || isNaN(rating.imdb.rating)) {
                throw new KinopoiskError('Неверный формат рейтингов');
            }

            this.cache.set(movieId, rating);
            return rating;
        } catch (error: any) {
            if (typeof jest === 'undefined') {
                console.error("Ошибка при получении рейтинга:", error);
            }
            throw new KinopoiskError(
        `Ошибка ${error.response?.status || "UNKNOWN"}: ${error.message}`,
                error.response?.status
            );
        }
    }
}
