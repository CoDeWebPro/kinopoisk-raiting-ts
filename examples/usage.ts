import { KinopoiskRating, KinopoiskError } from '../src';

async function example() {
    try {
        const movieId = 326; // ID фильма "Побег из Шоушенка"
        const rating = await KinopoiskRating.getRating(movieId);
        
        console.log('Кинопоиск:');
        console.log(`  Рейтинг: ${rating.kp.rating.toFixed(1)}`);  // 9.1
        console.log(`  Голосов: ${rating.kp.votes.toLocaleString()}`);  // 1 069 898
        
        console.log('\nIMDb:');
        console.log(`  Рейтинг: ${rating.imdb.rating.toFixed(1)}`);  // 9.3
        console.log(`  Голосов: ${rating.imdb.votes.toLocaleString()}`);  // 3 011 510
    } catch (error) {
        if (error instanceof KinopoiskError) {
            console.error('Ошибка:', error.message);
        } else {
            console.error('Произошла ошибка:', error);
        }
    }
}

example(); 
