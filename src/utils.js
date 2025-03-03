"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseXML = parseXML;
exports.parseXMLPromise = parseXMLPromise;
const xml2js_1 = require("xml2js");
const errors_1 = require("./errors");
function parseXML(xml) {
    return new Promise((resolve, reject) => {
        (0, xml2js_1.parseString)(xml, {
            explicitArray: false,
            trim: true,
            mergeAttrs: false,
            normalizeTags: true,
            normalize: true
        }, (err, result) => {
            var _a, _b;
            if (err) {
                reject(err);
            }
            else if (!((_a = result === null || result === void 0 ? void 0 : result.rating) === null || _a === void 0 ? void 0 : _a.kp_rating) || !((_b = result === null || result === void 0 ? void 0 : result.rating) === null || _b === void 0 ? void 0 : _b.imdb_rating)) {
                reject(new errors_1.KinopoiskError('Неверный формат XML'));
            }
            else {
                resolve(result.rating);
            }
        });
    });
}
async function parseXMLPromise(xml) {
    try {
        return await parseXML(xml);
    }
    catch (error) {
        console.error("Ошибка при парсинге XML:", error);
        throw new errors_1.KinopoiskError("Ошибка парсинга XML");
    }
}
