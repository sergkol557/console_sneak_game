import React from 'react';
import { Box, Text } from 'ink';
import { GAME_WIDTH, GAME_HEIGHT } from './utils';

// Символы для отображения
const SYMBOLS = {
  EMPTY: ' ',
  SNAKE_HEAD: '█',
  SNAKE_BODY: '▓',
  FOOD: '●',
  BORDER_H: '═',
  BORDER_V: '║',
  CORNER_TL: '╔',
  CORNER_TR: '╗',
  CORNER_BL: '╚',
  CORNER_BR: '╝'
};

// Проверка, является ли позиция головой змейки
const isSnakeHead = (x, y, snake) => {
  const head = snake[0];
  return head.x === x && head.y === y;
};

// Проверка, является ли позиция телом змейки
const isSnakeBody = (x, y, snake) => {
  return snake.slice(1).some(segment => segment.x === x && segment.y === y);
};

// Проверка, является ли позиция едой
const isFood = (x, y, food) => {
  return food.x === x && food.y === y;
};

// Отрисовка границы сверху
const renderTopBorder = () => {
  return (
    <Box>
      <Text>{SYMBOLS.CORNER_TL}</Text>
      <Text>{SYMBOLS.BORDER_H.repeat(GAME_WIDTH)}</Text>
      <Text>{SYMBOLS.CORNER_TR}</Text>
    </Box>
  );
};

// Отрисовка границы снизу
const renderBottomBorder = () => {
  return (
    <Box>
      <Text>{SYMBOLS.CORNER_BL}</Text>
      <Text>{SYMBOLS.BORDER_H.repeat(GAME_WIDTH)}</Text>
      <Text>{SYMBOLS.CORNER_BR}</Text>
    </Box>
  );
};

// Компонент игрового поля
const GameBoard = ({ snake, food, score, gameOver }) => {
  // Создаём массив строк игрового поля
  const rows = [];
  
  // Добавляем верхнюю границу
  rows.push(renderTopBorder());
  
  // Генерируем строки игрового поля
  for (let y = 0; y < GAME_HEIGHT; y++) {
    const cellsInRow = [];
    
    // Добавляем левую границу
    cellsInRow.push(SYMBOLS.BORDER_V);
    
    // Заполняем клетки в строке
    for (let x = 0; x < GAME_WIDTH; x++) {
      if (isSnakeHead(x, y, snake)) {
        cellsInRow.push(SYMBOLS.SNAKE_HEAD);
      } else if (isSnakeBody(x, y, snake)) {
        cellsInRow.push(SYMBOLS.SNAKE_BODY);
      } else if (isFood(x, y, food)) {
        cellsInRow.push(SYMBOLS.FOOD);
      } else {
        cellsInRow.push(SYMBOLS.EMPTY);
      }
    }
    
    // Добавляем правую границу
    cellsInRow.push(SYMBOLS.BORDER_V);
    
    // Добавляем строку в массив
    rows.push(
      <Box key={y}>
        <Text>{cellsInRow.join('')}</Text>
      </Box>
    );
  }
  
  // Добавляем нижнюю границу
  rows.push(renderBottomBorder());
  
  // Отображение счета и статуса игры
  const statusMessage = gameOver
    ? <Text color="red">ИГРА ОКОНЧЕНА! Ваш счет: {score}</Text>
    : <Text>Счет: {score}</Text>;
  
  return (
    <Box flexDirection="column">
      {rows}
      <Box marginTop={1}>
        {statusMessage}
      </Box>
      {gameOver && (
        <Box marginTop={1}>
          <Text>Нажмите 'r' для перезапуска или 'q' для выхода</Text>
        </Box>
      )}
    </Box>
  );
};

export default GameBoard;