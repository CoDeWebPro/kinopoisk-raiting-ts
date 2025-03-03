"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const KinopoiskRating_1 = require("../src/KinopoiskRating");
const axios_1 = __importDefault(require("axios"));
jest.mock('axios');
const mockedAxios = axios_1.default;
describe('KinopoiskRating', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        KinopoiskRating_1.KinopoiskRating['cache'].clear();
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
        const rating = await KinopoiskRating_1.KinopoiskRating.getRating(12345);
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
        expect(mockedAxios.get).toHaveBeenCalledWith('https://rating.kinopoisk.ru/12345.xml', expect.any(Object));
    });
    test("Обработка ошибки при получении рейтинга", async () => {
        const error = new Error('Network error');
        mockedAxios.get.mockRejectedValue(error);
        await expect(KinopoiskRating_1.KinopoiskRating.getRating(12345)).rejects.toThrow('Ошибка UNKNOWN: Network error');
    });
});
