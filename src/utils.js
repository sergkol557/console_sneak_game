// Размер игрового поля
export const GAME_WIDTH = 20;
export const GAME_HEIGHT = 10;

// Направления движения
export const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

// Создание начальной змейки
export const createSnake = () => {
  const middleX = Math.floor(GAME_WIDTH / 2);
  const middleY = Math.floor(GAME_HEIGHT / 2);
  
  return [
    { x: middleX, y: middleY },     // Голова
    { x: middleX - 1, y: middleY }, // Тело
    { x: middleX - 2, y: middleY }  // Хвост
  ];
};

// Создание еды в случайном месте
export const createFood = (snake) => {
  let position;
  let isOnSnake;
  
  do {
    position = {
      x: Math.floor(Math.random() * GAME_WIDTH),
      y: Math.floor(Math.random() * GAME_HEIGHT)
    };
    
    isOnSnake = snake.some(segment => 
      segment.x === position.x && segment.y === position.y
    );
  } while (isOnSnake);
  
  return position;
};

// Проверка столкновений
export const checkCollision = (head, snake, width, height) => {
  // Столкновение со стенами
  if (
    head.x < 0 || 
    head.x >= width || 
    head.y < 0 || 
    head.y >= height
  ) {
    return true;
  }
  
  // Столкновение с собственным телом (кроме головы)
  return snake.slice(1).some(segment => 
    segment.x === head.x && segment.y === head.y
  );
};

// Обновление позиции змейки
export const moveSnake = (snake, direction, food) => {
  const newSnake = [...snake];
  const head = { ...newSnake[0] };
  
  // Вычисляем новую позицию головы
  head.x += direction.x;
  head.y += direction.y;
  
  // Добавляем новую голову в начало змейки
  newSnake.unshift(head);
  
  // Проверяем, съела ли змейка еду
  const ateFood = head.x === food.x && head.y === food.y;
  
  // Если змейка не съела еду, удаляем хвост, иначе оставляем как есть
  if (!ateFood) {
    newSnake.pop();
  }
  
  return { newSnake, ateFood };
};