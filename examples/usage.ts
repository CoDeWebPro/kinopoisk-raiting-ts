import { KinopoiskRating } from '../src';

async function example() {
    try {
        // ID фильма "Матрица" на Кинопоиске
        const movieId = 301;
        const rating = await KinopoiskRating.getRating(movieId);
        console.log('Рейтинг фильма:', rating);
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

example(); 
