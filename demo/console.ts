import { KinopoiskRating } from '../src/KinopoiskRating';
import { KinopoiskError } from '../src/types';

async function main() {
    try {
        // ID фильма "Побег из Шоушенка"
        const movieId = 678552;
        
        console.log(`Получаем рейтинг для фильма с ID ${movieId}...`);
        const rating = await KinopoiskRating.getRating(movieId);
        
        console.log('\nСырые данные:');
        console.log(JSON.stringify(rating, null, 2));

        console.log('\nОтформатированный результат:');
        console.log('Кинопоиск:');
        console.log(`  Рейтинг: ${rating.kp.rating.toFixed(1)}`);
        console.log(`  Голосов: ${rating.kp.votes.toLocaleString()}`);
        
        console.log('\nIMDb:');
        console.log(`  Рейтинг: ${rating.imdb.rating.toFixed(1)}`);
        console.log(`  Голосов: ${rating.imdb.votes.toLocaleString()}`);
    } catch (error) {
        if (error instanceof KinopoiskError) {
            console.error('Ошибка:', error.message);
        } else if (error instanceof Error) {
            console.error('Неизвестная ошибка:', error.message);
        } else {
            console.error('Произошла ошибка:', error);
        }
    }
}

main(); 