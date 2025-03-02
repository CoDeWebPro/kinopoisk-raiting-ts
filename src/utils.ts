import { parseString } from 'xml2js';
import { RatingResponse } from "./types";
import { KinopoiskError } from "./errors";

export function parseXML(xml: string): Promise<RatingResponse> {
    return new Promise((resolve, reject) => {
        parseString(xml, { 
            explicitArray: false,
            trim: true,
            mergeAttrs: false,
            normalizeTags: true,
            normalize: true
        }, (err, result) => {
            if (err) {
                reject(err);
            } else if (!result?.rating?.kp_rating || !result?.rating?.imdb_rating) {
                reject(new KinopoiskError('Неверный формат XML'));
            } else {
                resolve(result.rating);
            }
        });
    });
}

export async function parseXMLPromise(xml: string): Promise<RatingResponse> {
    try {
        return await parseXML(xml);
    } catch (error) {
        console.error("Ошибка при парсинге XML:", error);
        throw new KinopoiskError("Ошибка парсинга XML");
    }
}