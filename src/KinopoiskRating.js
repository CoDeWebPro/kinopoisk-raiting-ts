"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KinopoiskRating = void 0;
const axios_1 = __importDefault(require("axios"));
const types_1 = require("./types");
const utils_1 = require("./utils");
class KinopoiskRating {
    static async getRating(movieId) {
        var _a, _b;
        if (this.cache.has(movieId)) {
            return this.cache.get(movieId);
        }
        try {
            const response = await axios_1.default.get(`https://rating.kinopoisk.ru/${movieId}.xml`, {
                responseType: "text",
                timeout: this.TIMEOUT,
                signal: new AbortController().signal,
            });
            const parsed = await (0, utils_1.parseXML)(response.data);
            const rating = {
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
                throw new types_1.KinopoiskError('Неверный формат рейтингов');
            }
            this.cache.set(movieId, rating);
            return rating;
        }
        catch (error) {
            if (typeof jest === 'undefined') {
                console.error("Ошибка при получении рейтинга:", error);
            }
            throw new types_1.KinopoiskError(`Ошибка ${((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) || "UNKNOWN"}: ${error.message}`, (_b = error.response) === null || _b === void 0 ? void 0 : _b.status);
        }
    }
}
exports.KinopoiskRating = KinopoiskRating;
KinopoiskRating.TIMEOUT = 5000;
KinopoiskRating.cache = new Map();
