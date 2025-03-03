import { KinopoiskRating } from '../src/KinopoiskRating';

async function main() {
    try {
        // ID фильма "Матрица" на Кинопоиске
        const movieId = 301;
        const rating = await KinopoiskRating.getRating(movieId);
        console.log('Рейтинг фильма:', rating);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

main(); 
