"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KinopoiskError = void 0;
class KinopoiskError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'KinopoiskError';
    }
}
exports.KinopoiskError = KinopoiskError;
