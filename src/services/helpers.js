import * as constats from "./constants";

// Создаем матрицу размером constats.WIDTH_CELL * constats.HEIGHT_CELL и заполняем ее 0
export const createMatrix = () => {
  const x = constats.WIDTH_CELL;
  const y = constats.HEIGHT_CELL;
  const arr = [];
  for (let i = 0; i < x; i++) {
    arr[i] = [];
    for (let j = 0; j < y; j++) {
      arr[i][j] = 0;
      // arr[i][j] = Math.floor(Math.random() * 5);
    }
  }
  return arr;
};

// Получение рандомного числа
export const getRandom = n => Math.floor(Math.random() * (n + 1));

// Добавление класса к ячейке
export const getExtendClass = n => {
  switch (n) {
    case 1:
      return "b-game__field-cell__item_deck";
    default:
      return "";
  }
};
