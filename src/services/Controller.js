import * as constants from './constants';
import * as helpers from './helpers';

class Controller {
  constructor(user, enemy, render) {
    this.user = user;
    this.comp = enemy;
    this.initRender = render;
    this.move = null;
    this.logger = ''
  }

  init = () => {
    const random = Math.floor(Math.random()*2);
    this.move = random ? this.user.name : this.comp.name;
    this.logger = this.move === this.user.name ? `Первых ход делаете Вы` : `Первым делает ход противник`
    // Если при инициализации первым ходит компьютер, он должен сделать выстрел
    if (this.move === this.comp.name) {
      this.shoot({x: helpers.getRandom(9), y: helpers.getRandom(9)});
    }
    return random ? this.user.name : this.comp.name; // TODO: Вырезать эту штуку
  }
  
  shoot = (coords) => {
    // Проверяем ходит ли игрок
    if (this.move === this.user.name) {
      this.logger = `Выстрел делает: ${this.user.name}`
      // Получаем значение поля по координатам выстрела
      const coordsValue = this.comp.matrix[coords.x][coords.y];

      // Если поле пустое - записываем промах, если палуба - попадение
      switch(coordsValue) {
        case constants.stateCell.empty: {
          this.logger = `Вы промахнулись! Ход делает противник!`
          this.comp.matrix[coords.x][coords.y] = constants.stateCell.miss; 
          // Следующий ход делает компьютер
          this.move = this.comp.name;
          this.initRender();
          return this.shoot({x: helpers.getRandom(9), y: helpers.getRandom(9)});
        };
        case constants.stateCell.deck: {
          this.logger = `Вы поразили корабль противника`;
          this.comp.matrix[coords.x][coords.y] = constants.stateCell.hit; 
          // если попали, то проверяем в какой коорабль попали
          this.comp.squadron.forEach((ship, shipInd) => {
            ship.matrix.forEach(shipCoords => {
              // Если попали
              if (shipCoords[0] === coords.x && shipCoords[1] === coords.y) {
                ship.hits++;
                // если количество попадений равно количеству палуб - корабль потоплен. Удаляем его из эскадрона
                if (ship.hits === ship.decks) {
                  this.logger = `Вы уничтожили корабль противника: ${ship.shipName}`;
                  // раставляем вокруг потепленного корабля точки, чтобы не стрелять рядом с потомпленным кораблем
                  helpers.setMissesAroundShip(ship, this.comp);
                  this.comp.squadron.splice(shipInd, 1);
                }
              } 
            })
          })
          this.initRender();
          break;
        }
      }
    } else {
      setTimeout(() => {
        // Если поле имеет значение 0 или 1, значит можно делать выстрел
        const coordsValue = this.user.matrix[coords.x][coords.y];
        if (coordsValue === 0 || coordsValue === 1) {
          // Если поле пустое - записываем промах, если палуба - попадение
        switch(coordsValue) {
          case constants.stateCell.empty: {
            this.logger = `Игрок ${this.comp.name} промахнулся! Ваш ход!`
            this.user.matrix[coords.x][coords.y] = constants.stateCell.miss; 
            this.move = this.user.name;
            this.initRender();
            break;
          }
          case constants.stateCell.deck: {
            this.logger = `Игрок ${this.comp.name} поразил ваш корабль`;
            this.user.matrix[coords.x][coords.y] = constants.stateCell.hit; 
            // проверяем попали ли в какой-нибудь корабль
            this.user.squadron.forEach((ship, shipInd) => {
              ship.matrix.forEach(shipCoords => {
                if (shipCoords[0] === coords.x && shipCoords[1] === coords.y) {
                  ship.hits++;
                  // если количество попадений равно количеству палуб - корабль потоплен. Удаляем его из эскадрона
                  if (ship.hits === ship.decks) {
                    this.logger = `Игрок ${this.comp.name} уничтожил ваш корабль: ${ship.shipName}`;
                    // раставляем вокруг потепленного корабля точки, чтобы не стрелять рядом с потопленным кораблем
                    helpers.setMissesAroundShip(ship, this.user);
                    this.user.squadron.splice(shipInd, 1);
                  }
                } 
              })
            })
            this.move = this.comp.name;
            this.initRender();
            return this.shoot({x: helpers.getRandom(9), y: helpers.getRandom(9)});
          }
        }
        } else {
          return this.shoot({x: helpers.getRandom(9), y: helpers.getRandom(9)});
        }
        this.initRender();
      }, 2*1000)


      
    } 
    console.log("Проверяем целый ли флот у противников");
    if (!this.user.squadron.length) {
      alert('Компьютер выиграл')
    }
    if (!this.comp.squadron.length) {
      alert('Игрок выиграл');
    }

  }
}

export default Controller;
