export const COORD_HORIZONTAL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const COORD_VERTICAL = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"];

export const WIDTH_CELL = 10;
export const HEIGHT_CELL = 10;


// Коллекция кораблей.
// index - количество кораблей данного типа. shipsCollections[1] - 1 четырехпалубник
// [number - количество палуб, string - тип корабля]

export const shipsCollections = [
  "",
  [4, 'fourdeck'],
	[3, 'tripledeck'],
	[2, 'doubledeck'],
	[1, 'singledeck']
]

export const stateCell = {
  empty: 0,
  deck: 1,
  miss: 2,
  hit: 3
}
