import React from 'react';
import { render } from 'ink';
import App from './App';

// Отрисовываем приложение
const app = render(<App />);

// Очищаем экран при выходе
process.on('exit', () => {
  app.unmount();
});

// Обработка нажатия Ctrl+C для корректного выхода
process.on('SIGINT', () => {
  app.unmount();
  process.exit();
});
