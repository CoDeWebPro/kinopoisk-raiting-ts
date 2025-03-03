"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
async function example() {
    try {
        // ID фильма "Матрица" на Кинопоиске
        const movieId = 301;
        const rating = await src_1.KinopoiskRating.getRating(movieId);
        console.log('Рейтинг фильма:', rating);
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
}
example();
