# Kinopoisk Rating

Node.js библиотека для получения рейтингов фильмов с Кинопоиска и IMDb по id.

## Установка

```bash
npm install kinopoisk-rating
```

## Использование

### В коде

```typescript
import { KinopoiskRating } from 'kinopoisk-rating';
import { KinopoiskError } from 'kinopoisk-rating';

async function main() {
    try {
        const movieId = 678552; // ID фильма "Побег из Шоушенка"
        const rating = await KinopoiskRating.getRating(movieId);
        
        console.log('Кинопоиск:');
        console.log(`  Рейтинг: ${rating.kp.rating.toFixed(1)}`);  // 6.6
        console.log(`  Голосов: ${rating.kp.votes.toLocaleString()}`);  // 131 760
        
        console.log('\nIMDb:');
        console.log(`  Рейтинг: ${rating.imdb.rating.toFixed(1)}`);  // 6.8
        console.log(`  Голосов: ${rating.imdb.votes.toLocaleString()}`);  // 478 145
    } catch (error) {
        if (error instanceof KinopoiskError) {
            console.error('Ошибка:', error.message);
        } else {
            console.error('Произошла ошибка:', error);
        }
    }
}
```

### Через консоль

Вы можете использовать консольное приложение для быстрой проверки рейтингов:

```bash
# Получить рейтинг фильма "Побег из Шоушенка" (используется по умолчанию)
npm run console

# Получить рейтинг для конкретного фильма по его ID
npm run console -- 123456
```

## Форматы данных

### Rating

```typescript
interface Rating {
    kp: {
        rating: number;    // Рейтинг на Кинопоиске
        votes: number;     // Количество голосов на Кинопоиске
    };
    imdb: {
        rating: number;    // Рейтинг на IMDb
        votes: number;     // Количество голосов на IMDb
    };
}
```

### KinopoiskError

```typescript
class KinopoiskError extends Error {
    constructor(message: string, public statusCode?: number) {
        super(message);
        this.name = 'KinopoiskError';
    }
}
```

## Разработка

```bash
# Установка зависимостей
npm install --legacy-peer-deps

# Сборка проекта
npm run build

# Запуск тестов
npm test

# Запуск консольного примера
npm run console
```

## Лицензии
Этот проект лицензирован под лицензией MIT.

