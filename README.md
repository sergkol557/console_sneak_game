# Консольная игра "Змейка"

Консольная реализация классической игры "Змейка" с использованием React, Ink и Node.js.

## Технологии

Проект использует следующие технологии:

- **React** - для управления состоянием и компонентной структурой
- **Ink** - для рендеринга React компонентов в терминале
- **Webpack** - для сборки и бандлинга JavaScript кода
- **Babel** - для транспиляции современного JavaScript в совместимый формат

## Установка

Для установки и запуска проекта выполните следующие команды:

```bash
# Клонирование репозитория
git clone https://github.com/your-username/console-snake-game.git
cd console-snake-game

# Установка зависимостей
npm install

# Сборка проекта
npm run build

# Запуск игры
npm run start
```

Если вам нужно запустить проект в режиме разработки с автоматической пересборкой при изменении файлов:

```bash
npm run dev
```

## Управление в игре

- **↑** - движение вверх
- **↓** - движение вниз
- **←** - движение влево
- **→** - движение вправо
- **r** - перезапуск игры после проигрыша
- **q** - выход из игры

## Структура проекта

- `src/` - исходный код проекта
  - `index.js` - точка входа приложения
  - `App.js` - основной компонент, управляющий игровой логикой
  - `GameBoard.js` - компонент для отображения игрового поля
  - `utils.js` - вспомогательные функции и константы
- `dist/` - скомпилированные файлы
- `babel.config.js` - конфигурация Babel
- `webpack.config.js` - конфигурация Webpack

## Работа в Replit

Для запуска проекта в Replit:

1. Нажмите на кнопку "Run" для запуска проекта
2. Проект автоматически соберется и запустится
3. Управляйте змейкой с помощью стрелок на клавиатуре

## Лицензия

ISC