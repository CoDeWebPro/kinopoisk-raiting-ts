"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KinopoiskError = void 0;
class KinopoiskError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = "KinopoiskError";
    }
}
exports.KinopoiskError = KinopoiskError;
