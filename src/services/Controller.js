import * as constants from "./constants";
import * as helpers from "./helpers";

// TODO: Проверить таймер. Если компьютер стреляет в уже пробитую координату, таймер меньше делать
// TODO: Когда игра закончена, отключить клики по полю и выдавать сообщение о том, кто же выиграл
// TODO: Анимация размышления хода компьютера
// TODO: Массив координат, по которым можно стрелять
// TODO: При сбросе игры, очищать виннера - чтобы opacity спадала

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
    const random = Math.floor(Math.random() * 2);
    this.move = random ? this.user.name : this.comp.name;
    this.logger =
      this.move === this.user.name
        ? `Первый ход делаете Вы!`
        : `Первым делает ход противник!`;
    // Если при инициализации первым ходит компьютер, он должен сделать выстрел
    if (this.move === this.comp.name) {
      this.shoot({ x: helpers.getRandom(9), y: helpers.getRandom(9) });
    }
  };

  shoot = coords => {
    // Проверяем ходит ли игрок
    if (this.move === this.user.name) {
      this.couterMove++;
      // Получаем значение поля по координатам выстрела
      const coordsValue = this.comp.matrix[coords.x][coords.y];

      // Если поле пустое - записываем промах, если палуба - попадение
      switch (coordsValue) {
        case constants.stateCell.empty: {
          this.logger = `Вы промахнулись! Ход делает противник!`;
          this.comp.matrix[coords.x][coords.y] = constants.stateCell.miss;
          // Следующий ход делает компьютер
          this.move = this.comp.name;
          this.initRender();
          return this.shoot({
            x: helpers.getRandom(9),
            y: helpers.getRandom(9)
          });
        }
        case constants.stateCell.deck: {
          this.logger = `Вы поразили корабль противника`;
          this.comp.matrix[coords.x][coords.y] = constants.stateCell.hit;
          // если попали, то проверяем в какой коорабль попали
          this.comp.squadron.forEach((ship, shipInd) => {
            ship.matrix.decks.forEach(shipCoords => {
              // Если попали
              if (shipCoords[0] === coords.x && shipCoords[1] === coords.y) {
                ship.hits++;
                // если количество попадений равно количеству палуб - корабль потоплен
                if (ship.hits === ship.decks) {
                  this.comp.squadron[shipInd].matrix.destroy = true;
                  this.logger = `Вы уничтожили корабль противника: ${
                    ship.shipName
                  }`;
                  // раставляем вокруг потепленного корабля точки, чтобы не стрелять рядом с потомпленным кораблем
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
      setTimeout(() => {
        const coordsValue = this.user.matrix[coords.x][coords.y];

        switch (coordsValue) {
          // Если поле пустое - промах. Ходит игрок.
          case constants.stateCell.empty: {
            this.couterMove++;
            this.logger = `Игрок ${this.comp.name} промахнулся! Ваш ход!`;
            this.user.matrix[coords.x][coords.y] = constants.stateCell.miss;
            this.move = this.user.name;
            this.initRender();
            break;
          }
          // Если палуба - попадение. Делаем еще выстрел.
          case constants.stateCell.deck: {
            this.couterMove++;
            this.logger = `Игрок ${this.comp.name} поразил ваш корабль`;
            this.user.matrix[coords.x][coords.y] = constants.stateCell.hit;
            // проверяем попали ли в какой-нибудь корабль
            this.user.squadron.forEach((ship, shipInd) => {
              ship.matrix.decks.forEach(shipCoords => {
                if (shipCoords[0] === coords.x && shipCoords[1] === coords.y) {
                  ship.hits++;
                  // если количество попадений равно количеству палуб - корабль потоплен
                  if (ship.hits === ship.decks) {
                    this.user.squadron[shipInd].matrix.destroy = true;
                    this.logger = `Игрок ${
                      this.comp.name
                    } уничтожил ваш корабль: ${ship.shipName}`;
                    // раставляем вокруг потепленного корабля точки, чтобы не стрелять рядом с потопленным кораблем
                    helpers.setMissesAroundShip(ship, this.user);
                  }
                }
              });
            });
            this.move = this.comp.name;
            this.initRender();
            this.shoot({ x: helpers.getRandom(9), y: helpers.getRandom(9) });
            break;
          }
          // Если поле имело значение 2 или 3, значит в это поле уже стреляли, инициируем новый выстрел
          default: {
            this.shoot({ x: helpers.getRandom(9), y: helpers.getRandom(9) });
            break;
          }
        }
      }, 500);
    }

    // проверяем сколько кораблей у игроков осталось
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
