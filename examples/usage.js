"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
async function example() {
    try {
        // ID фильма "Побег из Шоушенка"
        const movieId = 326;
        const rating = await src_1.KinopoiskRating.getRating(movieId);
        console.log('Рейтинг фильма:', rating);
    }
    catch (error) {
        console.error('Ошибка:', error);
    }
}
example();
