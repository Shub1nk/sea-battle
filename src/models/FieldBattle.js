import * as constants from "../services/constants";
import * as helpers from "../services/helpers";

import Ships from "./Ships";

class FieldBattle {
  constructor(name) {
    this.name = name;
    this.shipsCollections = constants.shipsCollections;
    this.squadron = []; // данные о флоте
    this.matrix = helpers.createMatrix();
  }

  getRandomLocationShips = () => {
    // Запускаем цикл создания кораблей
    for (let i = 1; i < this.shipsCollections.length; i++) {
      // количество палуб у корабля
      const decks = this.shipsCollections[i][0];
      // запускаем цикл на создание кораблей разных типов
      for (let j = 0; j < i; j++) {
        const fc = this.getCoordinatesDecks(decks);
        fc.decks = decks;
        fc.shipName = `${this.shipsCollections[i][1]}-${j + 1}`;

        // создаем экземпляр корабля
        const ship = new Ships(this, fc);
        // создаем корабль
        ship.createShip();
      }
    }
  };

  getCoordinatesDecks = decks => {
    // получим направление корабля (kx = 1 ky = 0) - вертикальное расположение
    const kx = helpers.getRandom(1);
    const ky = kx ? 0 : 1;

    // координаты 1 палубы
    let x, y;

    // если направление вертикальное 1 <= x <= 10, 1 <= y <= 10-decks, если горизонтальное - наоборот
    if (!kx) {
      x = helpers.getRandom(9);
      y = helpers.getRandom(10 - decks);
    } else {
      x = helpers.getRandom(10 - decks);
      y = helpers.getRandom(9);
    }

    // проверяем валидность координат корабля: нет ли в полученных координатах или рядом уже других кораблей
    const isCheck = this.checkLocationShip(x, y, kx, ky, decks);
    if (!isCheck) return this.getCoordinatesDecks(decks);

    // возвращаем объект с начальными координатами и направлением палуб
    return { x, y, kx, ky };
  };

  // можно ли разместить корабль в данных координатах
  checkLocationShip = (x, y, kx, ky, decks) => {
    // формируем область ячеек для проверки
    const { fromX, toX, fromY, toY } = helpers.getAreaCoords(x, y, kx, ky, decks);

    // запускаем циклы и проверяем выбранный диапазон ячеек
    // если значение текущей ячейки равно 1 (там есть палуба корабля)
    // возвращаем false
    for (var i = fromX; i < toX; i++) {
      for (var j = fromY; j < toY; j++) {
        if (this.matrix[i][j] === 1) return false;
      }
    }
    return true;
  };
}

export default FieldBattle;
