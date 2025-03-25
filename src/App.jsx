import React, { useState, useEffect } from 'react';
import { useInput, useApp } from 'ink';
import GameBoard from './GameBoard';
import {
  DIRECTIONS,
  createSnake,
  createFood,
  moveSnake,
  checkCollision,
  GAME_WIDTH,
  GAME_HEIGHT,
} from './utils';

// Скорость игры (мс)
const INITIAL_SPEED = 200;
const SPEED_INCREASE_RATE = 0.95; // Коэффициент увеличения скорости

const App = () => {
  // Состояние игры
  const [snake, setSnake] = useState(createSnake());
  const [food, setFood] = useState(createFood(createSnake()));
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [lastDirection, setLastDirection] = useState(DIRECTIONS.RIGHT);

  const { exit } = useApp();

  // Обработка ввода с клавиатуры
  useInput((input, key) => {
    if (gameOver) {
      if (input === 'r' || input === 'R') {
        // Перезапуск игры
        const newSnake = createSnake();
        setSnake(newSnake);
        setFood(createFood(newSnake));
        setDirection(DIRECTIONS.RIGHT);
        setLastDirection(DIRECTIONS.RIGHT);
        setScore(0);
        setGameOver(false);
        setSpeed(INITIAL_SPEED);
      } else if (input === 'q' || input === 'Q') {
        // Выход из игры
        exit();
      }
    } else {
      // Изменение направления движения
      if (key.upArrow && lastDirection !== DIRECTIONS.DOWN) {
        setDirection(DIRECTIONS.UP);
      } else if (key.downArrow && lastDirection !== DIRECTIONS.UP) {
        setDirection(DIRECTIONS.DOWN);
      } else if (key.leftArrow && lastDirection !== DIRECTIONS.RIGHT) {
        setDirection(DIRECTIONS.LEFT);
      } else if (key.rightArrow && lastDirection !== DIRECTIONS.LEFT) {
        setDirection(DIRECTIONS.RIGHT);
      }
    }
  });

  // Игровой цикл
  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setTimeout(() => {
      // Сохраняем текущее направление для предотвращения двойного нажатия
      setLastDirection(direction);

      const head = { ...snake[0] };
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
      };

      // Проверка на столкновение
      if (checkCollision(newHead, snake, GAME_WIDTH, GAME_HEIGHT)) {
        setGameOver(true);
        return;
      }

      // Обновление позиции змейки
      const { newSnake, ateFood } = moveSnake(snake, direction, food);
      setSnake(newSnake);

      // Если змейка съела еду
      if (ateFood) {
        const newFood = createFood(newSnake);
        setFood(newFood);
        setScore(prevScore => prevScore + 1);

        // Увеличиваем скорость игры
        setSpeed(prevSpeed => prevSpeed * SPEED_INCREASE_RATE);
      }
    }, speed);

    return () => clearTimeout(gameLoop);
  }, [snake, food, direction, gameOver, speed]);

  return (
    <GameBoard snake={snake} food={food} score={score} gameOver={gameOver} />
  );
};

export default App;
