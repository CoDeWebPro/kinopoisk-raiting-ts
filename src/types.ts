export type RatingResponse = {
    kp_rating: {
        _: string;
        $: { num_vote: string };
    };
    imdb_rating: {
        _: string;
        $: { num_vote: string };
    };
};

export interface RatingData {
    rating: number;
    votes: number;
}

export interface Rating {
    kp: RatingData;
    imdb: RatingData;
}

export class KinopoiskError extends Error {
    constructor(message: string, public statusCode?: number) {
        super(message);
        this.name = 'KinopoiskError';
    }
}