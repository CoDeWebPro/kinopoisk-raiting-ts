"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../src/utils");
describe('utils', () => {
    test("Парсинг XML", async () => {
        const xml = `<?xml version="1.0"?>
            <rating>
                <kp_rating>7.5</kp_rating>
                <imdb_rating>8.0</imdb_rating>
            </rating>`;
        const parsed = await (0, utils_1.parseXML)(xml);
        expect(parsed).toEqual({
            kp_rating: "7.5",
            imdb_rating: "8.0"
        });
    });
    test("Парсинг некорректного XML", async () => {
        const xml = `<?xml version="1.0"?><invalid>data</invalid>`;
        await expect((0, utils_1.parseXML)(xml)).rejects.toThrow('Неверный формат XML');
    });
});
