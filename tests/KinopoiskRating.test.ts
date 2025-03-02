import { KinopoiskRating } from "../src/KinopoiskRating";
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('KinopoiskRating', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        KinopoiskRating['cache'].clear();
    });

    test("Получение рейтинга фильма", async () => {
        const mockResponse = {
            data: `<?xml version="1.0"?>
                <rating>
                    <kp_rating num_vote="1234">7.5</kp_rating>
                    <imdb_rating num_vote="5678">8.0</imdb_rating>
                </rating>`
        };

        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const rating = await KinopoiskRating.getRating(12345);
        
        expect(rating).toEqual({
            kp: {
                rating: 7.5,
                votes: 1234
            },
            imdb: {
                rating: 8.0,
                votes: 5678
            }
        });

        expect(mockedAxios.get).toHaveBeenCalledWith(
            'https://rating.kinopoisk.ru/12345.xml',
            expect.any(Object)
        );
    });

    test("Обработка ошибки при получении рейтинга", async () => {
        const error = new Error('Network error');
        mockedAxios.get.mockRejectedValue(error);

        await expect(KinopoiskRating.getRating(12345)).rejects.toThrow(
            'Ошибка UNKNOWN: Network error'
        );
    });
});