import * as constants from "../services/constants";
import * as helpers from "../services/helpers";

import Ship from "./Ship";

/**
 * Создает экземпляр игрового поля игрока или компьютера
 * @param {string} name                     - имя игрока
 * @param {Array[]} shipsCollections        - колекция кораблей
 * @param {Ship[]} squadron                 - массив экземпляров кораблей
 * @param {Array[]} matrix                  - координатая сетка
 * @param {Function} getRandomLocationShips - определение начальных координат корабля
 * @param {Function} getCoordinatesDecks    - определение координат всех палуб
 * @param {Function} checkLocationShip      - определение возможности разместить корабль по полученным координатам
 */

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
      // Количество палуб у корабля
      const decks = this.shipsCollections[i][0];
      // Запускаем цикл для формирования корабля
      for (let j = 0; j < i; j++) {
        const fc = this.getCoordinatesDecks(decks);
        fc.decks = decks;
        fc.shipName = `${this.shipsCollections[i][1]}-${j + 1}`;

        // Создаем экземпляр корабля
        const ship = new Ship(this, fc);
        ship.createShip();
      }
    }
  };

  getCoordinatesDecks = decks => {
    // Получим направление корабля (kx = 1 ky = 0) - вертикальное расположение
    const kx = helpers.getRandom(1);
    const ky = kx ? 0 : 1;

    // Координаты 1 палубы
    let x, y;

    // Если направление вертикальное 1 <= x <= 10, 1 <= y <= 10-decks, если горизонтальное - наоборот
    if (!kx) {
      x = helpers.getRandom(9);
      y = helpers.getRandom(10 - decks);
    } else {
      x = helpers.getRandom(10 - decks);
      y = helpers.getRandom(9);
    }

    // Проверяем валидность координат корабля: нет ли в полученных координатах или рядом уже других кораблей
    const isCheck = this.checkLocationShip(x, y, kx, ky, decks);
    if (!isCheck) return this.getCoordinatesDecks(decks);

    // Возвращаем объект с начальными координатами и направлением палуб
    return { x, y, kx, ky };
  };

  checkLocationShip = (x, y, kx, ky, decks) => {
    // Формируем область ячеек для проверки
    const { fromX, toX, fromY, toY } = helpers.getAreaCoords(
      x,
      y,
      kx,
      ky,
      decks
    );

    // Запускаем цикл и проверяем выбранный диапазон ячеек
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
