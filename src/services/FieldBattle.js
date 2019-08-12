import * as constants from './constants';
import * as helpers from './helpers';

class FieldBattle {
  constructor(name) {
    this.name = name;                     
    this.shipsCollections = constants.shipsCollections;
    this.fleet = [];                               // данные о флоте
    this.matrix = helpers.createMatrix();
  }

  getRandomLocationShips = () => {
    // Запускаем цикл создания кораблей
    for (let i = 1; i < this.shipsCollections.length; i++) {
      // количество палуб у корабля
      const decks = this.shipsCollections[i][0];
      // запускаем цикл на создание кораблей разных типов
      for (let j = 0; j < i; j++) {
        const fc = {
          decks,
          shipName: `${this.shipsCollections[i][1]}${j+1}`
        }
      }
    }
  }

}

export default FieldBattle;