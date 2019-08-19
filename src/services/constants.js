export const COORD_HORIZONTAL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const COORD_VERTICAL = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ж",
  "З",
  "И",
  "К"
];

export const WIDTH_CELL = 10;
export const HEIGHT_CELL = 10;

// Коллекция кораблей.
// index - количество кораблей данного типа. shipsCollections[1] - 1 четырехпалубник
// [number - количество палуб, string - тип корабля]

export const shipsCollections = [
  "",
  [4, "Линкор"],
  [3, "Крейсер"],
  [2, "Эсминец"],
  [1, "Катер"]
];

export const stateCell = {
  empty: 0,
  deck: 1,
  miss: 2,
  hit: 3
};

export const stateButton = {
  userName: "Введите ваше имя",
  compName: "Введите имя соперника",
  isEqualNames: "Имена совпадают",
  game: "Играть"
};
