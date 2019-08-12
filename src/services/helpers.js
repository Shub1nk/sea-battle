import * as constats from './constants'

// Создаем матрицу размером constats.WIDTH_CELL * constats.HEIGHT_CELL и заполняем ее 0
export const createMatrix = () => {
  const x = constats.WIDTH_CELL;
  const y = constats.HEIGHT_CELL;
  const arr = [];
  for (let i = 0; i < x; i++) {
    arr[i] = [];
    for (let j = 0; j < y; j++) {
      arr[i][j] = 0;
    }
  }
  return arr;
}