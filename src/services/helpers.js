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
    }
  }
  return arr;
};

// Получаем массив со всеми координатами поля
export const allCoordsField = () => {
  const x = constats.WIDTH_CELL;
  const y = constats.HEIGHT_CELL;
  const arr = [];
  for (let i = 0; i < y; i++) {
    for (let j = 0; j < x; j++) {
      arr.push({ x: i, y: j });
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

// Определение класса кнопки
export const getClassButton = (userName, compName, isGame) => {
  if (isGame) return "b-game__button_reset";
  if (!userName || !compName || userName === compName)
    return "b-game__button_error";
  return "b-game__button_play";
};

// Определение текста кнопки
export const getValueButton = (userName, compName) => {
  if (!userName) return constats.stateButton.userName;
  if (!compName) return constats.stateButton.compName;
  if (userName === compName) return constats.stateButton.isEqualNames;
  return constats.stateButton.game;
};

// Добавление класса для анимации выстрела игрока
export const getAnimationClass = n => (n === 0 || n === 1 ? "blinking" : "");

/**
 * Формирует область координат вокруг корабля.
 * Используется:
 * 1. Для проверок при расстановке кораблей перед началом игры
 * 2. Для выделения области вокруг потопленного корабля
 * @param {number} x - координата первой палубы
 * @param {number} y - координата первоый палубы
 * @param {number} kx - коэффициент расположения
 * @param {number} ky - коэффициент расположения
 * @param {number} decks - количество палуб
 *
 * fromY  -    -    -    -    -
 * fromX d-1  d-2  d-3  d-4  toX
 *  toY   -    -    -    -    -
 */

export const getAreaCoords = (x, y, kx, ky, decks) => {
  // Формируем область ячеек
  let fromX, toX, fromY, toY;

  // формируем индексы начала и конца цикла для строк
  // если координата 'x' равна нулю - палуба примыкает к границе,
  // в противном случае x-1

  fromX = !x ? x : x - 1;

  // если условие истинно - это значит, что корабль расположен вертикально и его последняя палуба примыкает
  // к нижней границе игрового поля
  // поэтому координата 'x' последней палубы будет индексом конца цикла
  if (x + kx * decks === 10 && kx === 1) toX = x + kx * decks;
  // корабль расположен вертикально и между ним и нижней границей игрового поля есть, как минимум, ещё
  // одна строка, координата этой строки и будет индексом конца цикла
  else if (x + kx * decks < 10 && kx === 1) toX = x + kx * decks + 1;
  // корабль расположен горизонтально вдоль нижней границы игрового поля
  else if (x === 9 && kx === 0) toX = x + 1;
  // корабль расположен горизонтально где-то по середине игрового поля
  else if (x < 9 && kx === 0) toX = x + 2;

  fromY = y === 0 ? y : y - 1;

  if (y + ky * decks === 10 && ky === 1) toY = y + ky * decks;
  else if (y + ky * decks < 10 && ky === 1) toY = y + ky * decks + 1;
  else if (y === 9 && ky === 0) toY = y + 1;
  else if (y < 9 && ky === 0) toY = y + 2;

  return { fromX, toX, fromY, toY };
};

/**
 * Расставляет точки вокруг потопленного корабля
 * @param {Ship} ship             - модель корабля
 * @param {FieldBattle} field     - модель игрового поля
 * @param {object[]} targetCoords - массив целевых координат для компьютера
 */
export const setMissesAroundShip = (ship, field, targetCoords) => {
  const { x0, y0, kx, ky, decks } = ship;
  const { fromX, toX, fromY, toY } = getAreaCoords(x0, y0, kx, ky, decks);

  // запускаем циклы и проверяем выбранный диапазон ячеек
  // если значение текущей ячейки равно 0 - меняем на 2 (промах)

  for (var i = fromX; i < toX; i++) {
    for (var j = fromY; j < toY; j++) {
      if (field.matrix[i][j] === 0) field.matrix[i][j] = 2;
      if (targetCoords) {
        const index = targetCoords.findIndex(coords => {
          if (coords.x === i && coords.y === j) return true;
        });
        if (index !== -1) targetCoords.splice(index, 1);
      }
    }
  }
};
