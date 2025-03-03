import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
    {
        ignores: ['dist/**/*', 'examples/*.js']
    },
    {
        files: ['**/*.js'],
        ...js.configs.recommended,
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                console: true,
                module: true,
                require: true,
                exports: true,
                jest: true,
                describe: true,
                test: true,
                expect: true,
                beforeEach: true,
                AbortController: true,
                process: true
            }
        }
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module'
            },
            globals: {
                console: true,
                jest: true,
                describe: true,
                test: true,
                expect: true,
                beforeEach: true,
                AbortController: true,
                process: true
            }
        },
        plugins: {
            '@typescript-eslint': typescript
        },
        rules: {
            ...typescript.configs.recommended.rules,
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-undef': 'error'
        }
    }
]; 
