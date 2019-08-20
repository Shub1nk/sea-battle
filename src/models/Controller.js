import * as constants from "../services/constants";
import * as helpers from "../services/helpers";

/**
 * Создает экземпляр контроллера игры
 * @param {FieldBattle} user   - модель поля игрока
 * @param {FieldBattle} comp   - модель поля компьютера
 * @param {Function} render    - инициализатор рендера
 * @param {string} move        - ход игрока или компьютера
 * @param {string} logger      - вывод информации в процессе игры
 * @param {number} counterMove - количество ходов
 * @param {string} winner      - имя победителя
 * @param {Function} init      - инициализация игры
 * @param {Function} shoot     - алгоритм для выстрелов
 *
 * Возможен был другой вариант Controller наследовать от React и занести все параметры в state.
 * При любом изменении state render происходил бы автоматически, но могли возникнуть ситуации,
 * что React не всегда правильно рендерит, если props имеют сложную многоуровневую структуру.
 * На практике встречался с таким, поэтому отказался от такого решения.
 */

class Controller {
  constructor(user, enemy, render) {
    this.user = user;
    this.comp = enemy;
    this.initRender = render;
    this.move = null;
    this.logger = "";
    this.couterMove = 0;
    this.winner = "";
  }

  init = () => {
    // Определяем кто ходит первым: 1 - user, 0 - comp
    const random = Math.floor(Math.random() * 2);
    this.move = random ? this.user.name : this.comp.name;
    this.logger =
      this.move === this.user.name
        ? `Первый ход делаете Вы!`
        : `Первым делает ход противник!`;
    // Создаем для компьютера массив координат по которым он должен будет стрелять (чтобы не стрелять по одним и тем же координатам)
    this.comp.targetCoords = helpers.allCoordsField();
    // Если при инициализации первым ходит компьютер, он должен сделать выстрел
    if (this.move === this.comp.name) {
      // Берем координаты по рандомной позиции из массива targetCoords
      const positionCoords = helpers.getRandom(
        this.comp.targetCoords.length - 1
      );
      const valueCoords = this.comp.targetCoords[positionCoords];
      this.shoot(valueCoords, positionCoords);
    }
  };

  /**
   * @param coords {object}        - координаты выстрела {x: number, y: number}
   * @param coordPosition {number} - индекс, по которому нужно взять координаты для выстрела компьютера
   */
  shoot = (coords, coordPosition) => {
    // Ход игрока
    if (this.move === this.user.name) {
      this.couterMove++;
      // Получаем значение поля по координатам выстрела
      const coordsValue = this.comp.matrix[coords.x][coords.y];

      switch (coordsValue) {
        // Промах
        case constants.stateCell.empty: {
          this.logger = `Вы промахнулись! Ход делает противник!`;
          this.comp.matrix[coords.x][coords.y] = constants.stateCell.miss;
          // Следующий ход делает компьютер
          this.move = this.comp.name;
          this.initRender();

          // Определяем позицию и координаты для выстрела
          const positionCoords = helpers.getRandom(
            this.comp.targetCoords.length - 1
          );
          const valueCoords = this.comp.targetCoords[positionCoords];
          this.shoot(valueCoords, positionCoords);
          break;
        }
        // Попадение
        case constants.stateCell.deck: {
          this.logger = `Вы поразили корабль противника`;
          this.comp.matrix[coords.x][coords.y] = constants.stateCell.hit;
          // Проверяем в какой корабль попали
          this.comp.squadron.forEach((ship, shipInd) => {
            ship.matrix.decks.forEach(shipCoords => {
              if (shipCoords[0] === coords.x && shipCoords[1] === coords.y) {
                ship.hits++;
                // если количество попадений равно количеству палуб - корабль потоплен
                if (ship.hits === ship.decks) {
                  this.comp.squadron[shipInd].matrix.destroy = true;
                  this.logger = `Вы уничтожили корабль противника: ${
                    ship.shipName
                  }`;
                  // раставляем вокруг потепленного корабля точки
                  helpers.setMissesAroundShip(ship, this.comp);
                }
              }
            });
          });
          this.initRender();
          break;
        }
      }
    } else {
      // Ход компьютера
      // Для имитации "размышлений" и возможности увидеть сообщения о результатах выстрела компьютера используется таймаут на 1,5 секунд
      setTimeout(() => {
        // Получаем значение поля по координатам
        const coordsValue = this.user.matrix[coords.x][coords.y];

        switch (coordsValue) {
          // Промах
          case constants.stateCell.empty: {
            this.couterMove++;
            this.logger = `Игрок ${this.comp.name} промахнулся! Ваш ход!`;
            this.user.matrix[coords.x][coords.y] = constants.stateCell.miss;
            // Удаляем координаты из массива, чтобы не стрелять больше по ним
            this.comp.targetCoords.splice(coordPosition, 1);
            this.move = this.user.name;
            this.initRender();
            break;
          }
          // Попадение
          case constants.stateCell.deck: {
            this.couterMove++;
            this.logger = `Игрок ${this.comp.name} поразил ваш корабль`;
            this.user.matrix[coords.x][coords.y] = constants.stateCell.hit;

            // Удаляем координату из массива целевых координат
            this.comp.targetCoords.splice(coordPosition, 1);

            // Проверяем в какой корабль попали
            this.user.squadron.forEach((ship, shipInd) => {
              ship.matrix.decks.forEach(shipCoords => {
                if (shipCoords[0] === coords.x && shipCoords[1] === coords.y) {
                  ship.hits++;
                  // Если количество попадений равно количеству палуб - корабль потоплен
                  if (ship.hits === ship.decks) {
                    this.user.squadron[shipInd].matrix.destroy = true;
                    this.logger = `Игрок ${
                      this.comp.name
                    } уничтожил ваш корабль: ${ship.shipName}`;
                    // Раставляем вокруг потепленного корабля точки, и удаляем их из массива targetCoords
                    helpers.setMissesAroundShip(
                      ship,
                      this.user,
                      this.comp.targetCoords
                    );
                  }
                }
              });
            });
            this.move = this.comp.name;
            this.initRender();
            // Определяем координаты следующего выстрела
            const positionCoords = helpers.getRandom(
              this.comp.targetCoords.length - 1
            );
            const valueCoords = this.comp.targetCoords[positionCoords];
            this.shoot(valueCoords, positionCoords);
            break;
          }
        }
      }, 1500);
    }

    // Проверяем сколько кораблей у игроков осталось
    const balanceUserShips = this.user.squadron.filter(
      ship => !ship.matrix.destroy
    );
    const balanceCompShips = this.comp.squadron.filter(
      ship => !ship.matrix.destroy
    );

    if (!balanceUserShips.length) {
      this.winner = this.comp.name;
    }
    if (!balanceCompShips.length) {
      this.winner = this.user.name;
    }
  };
}

export default Controller;
