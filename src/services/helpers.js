import * as constats from "./constants";

// Создаем матрицу размером constats.WIDTH_CELL * constats.HEIGHT_CELL и заполняем ее 0
export const createMatrix = () => {
  const x = constats.WIDTH_CELL;
  const y = constats.HEIGHT_CELL;
  const arr = [];
  for (let i = 0; i < y; i++) {
    arr[i] = [];
    for (let j = 0; j < x; j++) {
      arr[i][j] = 0;
      // arr[i][j] = Math.floor(Math.random() * 4);
    }
  }
  return arr;
};

// Получение рандомного числа
export const getRandom = n => Math.floor(Math.random() * (n + 1));

// Добавление класса к ячейке
export const getExtendClass = n => {
  switch (n) {
    case constats.stateCell.deck:
      return "b-game__field-cell__item_deck";
    case constats.stateCell.miss:
      return "b-game__field-cell__item_miss";
    case constats.stateCell.hit:
      return "b-game__field-cell__item_hit";  
    default:
      return "";
  }
};

// Класс кнопки
export const getClassButton = (userName, compName, isGame) => {
  if (isGame) return "b-game__button_reset";
  if (!userName || !compName || (userName === compName)) return "b-game__button_error";
  return "b-game__button_play";
}

// Текст кнопки
export const getValueButton = (userName, compName) => {
  if (!userName) return constats.stateButton.userName;
  if (!compName) return constats.stateButton.compName;
  if (userName === compName) return constats.stateButton.isEqualNames;
  return constats.stateButton.game;
}

// Добавление класса для анимации выстрела игрока
export const getAnimationClass = n => (n === 0 || n === 1) ? 'blinking' : '';

// Установка точек вокруг потопленного корабля
export const setMissesAroundShip = (ship, field) => {
  const {x0, y0, kx, ky, decks} = ship
  // console.log(x0, y0, kx, ky, decks)

  // формируем область индексы ячеек для области проверки
  let fromX, toX, fromY, toY;

  // формируем индексы начала и конца цикла для строк
  // если координата 'x' равна нулю, то это значит, что палуба расположена в самой верхней строке,
  // т. е. примыкает к верхней границе и началом цикла будет строка с индексом 0
  // в противном случае, нужно начать проверку со строки с индексом на единицу меньшим, чем у
  // исходной, т.е. находящейся выше исходной строки
  fromX = !x0 ? x0 : x0 - 1;

  // если условие истинно - это значит, что корабль расположен вертикально и его последняя палуба примыкает
  // к нижней границе игрового поля
  // поэтому координата 'x' последней палубы будет индексом конца цикла
  if (x0 + kx * decks === 10 && kx === 1) toX = x0 + kx * decks;
  // корабль расположен вертикально и между ним и нижней границей игрового поля есть, как минимум, ещё
  // одна строка, координата этой строки и будет индексом конца цикла
  else if (x0 + kx * decks < 10 && kx === 1) toX = x0 + kx * decks + 1;
  // корабль расположен горизонтально вдоль нижней границы игрового поля
  else if (x0 === 9 && kx === 0) toX = x0 + 1;
  // корабль расположен горизонтально где-то по середине игрового поля
  else if (x0 < 9 && kx === 0) toX = x0 + 2;

  fromY = y0 === 0 ? y0 : y0 - 1;

  if (y0 + ky * decks === 10 && ky === 1) toY = y0 + ky * decks;
  else if (y0 + ky * decks < 10 && ky === 1) toY = y0 + ky * decks + 1;
  else if (y0 === 9 && ky === 0) toY = y0 + 1;
  else if (y0 < 9 && ky === 0) toY = y0 + 2;

  // запускаем циклы и проверяем выбранный диапазон ячеек
  // если значение текущей ячейки равно 0 - пустота меняем на 2 - промах


  for (var i = fromX; i < toX; i++) {
    for (var j = fromY; j < toY; j++) {
      if (field.matrix[i][j] === 0) field.matrix[i][j] = 2
    }
  }
}

