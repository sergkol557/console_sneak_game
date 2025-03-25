# Скрипты для package.json

Поскольку мы не можем напрямую редактировать файл package.json, ниже представлены команды, которые рекомендуется добавить в раздел "scripts" вашего файла package.json:

```json
"scripts": {
  "build": "webpack --mode production",
  "start": "node dist/index.js",
  "dev": "webpack --mode development --watch",
  "clean": "rm -rf dist",
  "build:clean": "npm run clean && npm run build",
  "format": "prettier --write \"src/**/*.{js,jsx}\"",
  "format:check": "prettier --check \"src/**/*.{js,jsx}\"",
  "lint": "eslint src --ext .js,.jsx",
  "lint:fix": "eslint src --ext .js,.jsx --fix",
  "test": "echo \"No tests yet\" && exit 0"
}
```

## Использование скриптов

Эти скрипты можно выполнять с помощью npm:

1. `npm run build` - компиляция проекта для продакшена
2. `npm run start` - запуск скомпилированной игры
3. `npm run dev` - компиляция проекта в режиме разработки с отслеживанием изменений
4. `npm run clean` - очистка директории сборки
5. `npm run build:clean` - очистка и повторная сборка проекта
6. `npm run format` - форматирование кода с использованием Prettier
7. `npm run format:check` - проверка форматирования кода без внесения изменений
8. `npm run lint` - проверка кода на соответствие стилю (требует установки ESLint)
9. `npm run lint:fix` - проверка кода и автоматическое исправление ошибок
10. `npm run test` - запуск тестов (пока не реализовано)

## Альтернативный способ запуска скриптов

Вы также можете использовать команды напрямую:

* Для сборки проекта: `npx webpack --mode production`
* Для запуска игры: `node dist/index.js`
* Для разработки: `npx webpack --mode development --watch`
* Для форматирования кода: `npx prettier --write "src/**/*.{js,jsx}"`
* Для проверки форматирования: `npx prettier --check "src/**/*.{js,jsx}"`