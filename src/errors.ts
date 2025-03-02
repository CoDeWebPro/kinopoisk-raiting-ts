export class KinopoiskError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = "KinopoiskError";
    }
}