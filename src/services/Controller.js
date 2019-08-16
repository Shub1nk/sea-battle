import * as constants from './constants';
import * as helpers from './helpers';

class Controller {
  constructor(user, enemy, render) {
    this.user = user;
    this.comp = enemy;
    this.initRender = render;
    this.move = null;
  }

  init = () => {
    const random = Math.floor(Math.random()*2);
    this.move = random ? this.user.name : this.comp.name;
    // Если при инициализации первым ходит компьютер, он должен сделать выстрел
    if (this.move === this.comp.name) {
      this.shoot(this.user, {x: helpers.getRandom(9), y: helpers.getRandom(9)}, this.initRender)
    }
    return random ? this.user.name : this.comp.name;
  }
  
  shoot = (enemy, coords, render) => {
    console.group("SHOOT")

    console.log("Ходит игрок - ", this.move);

    // Проверяем ходит ли игрок
    if (this.move === this.user.name) {
      console.log("user shoot coords", coords);
      // Получаем значение поля по координатам выстрела
      const coordsValue = this.comp.matrix[coords.x][coords.y];

      // Если поле пустое - записываем промах, если палуба - попадение
      switch(coordsValue) {
        case constants.stateCell.empty: {
          console.log("Игрок промахнулся")
          this.comp.matrix[coords.x][coords.y] = constants.stateCell.miss; 
          this.move = this.comp.name;
          return this.shoot(this.user, {x: helpers.getRandom(9), y: helpers.getRandom(9)}, this.initRender)
        };
        case constants.stateCell.deck: {
          console.log("Игрок попал в корабль")
          this.comp.matrix[coords.x][coords.y] = constants.stateCell.hit; 
          // если попали, то проверяем в какой коорабль попали
          this.comp.squadron.forEach((ship, shipInd) => {
            ship.matrix.forEach(shipCoords => {
              // Если попали
              if (shipCoords[0] === coords.x && shipCoords[1] === coords.y) {
                ship.hits++;
                // если количество попадений равно количеству палуб - корабль потоплен. Удаляем его из эскадрона
                if (ship.hits === ship.decks) {
                  // Вот здесь нужно еще вокруг корабля выставить точки  
                  // нет смысла стрелять по координатам вокруг потопленного корабля
                  console.log('ship', ship);
                  helpers.setMissesAroundShip(ship, this.comp);
                  this.comp.squadron.splice(shipInd, 1);
                  // console.log('Кораблей осталось', this.comp.squadron.length);
                }
              } 
            })
          })
          break;
        }
      }

      console.log('Флоты еще целы. Продолжаем бой')

      render();

    } else {
      console.log("comp shoot coords", coords);

      const coordsValue = this.user.matrix[coords.x][coords.y];

      // Если поле имеет значение 0 или 1, значит можно делать выстрел
      if (coordsValue === 0 || coordsValue === 1) {
        // Если поле пустое - записываем промах, если палуба - попадение
      switch(coordsValue) {
        case constants.stateCell.empty: {
          console.log("Компьютер промахнулся")
          this.user.matrix[coords.x][coords.y] = constants.stateCell.miss; 
          this.move = this.user.name;
          break;
        }
        case constants.stateCell.deck: {
          console.log("Компьютер попал")
          this.user.matrix[coords.x][coords.y] = constants.stateCell.hit; 
          // проверяем попали ли в какой-нибудь корабль
          this.user.squadron.forEach((ship, shipInd) => {
            ship.matrix.forEach(shipCoords => {
              if (shipCoords[0] === coords.x && shipCoords[1] === coords.y) {
                ship.hits++;
                // если количество попадений равно количеству палуб - корабль потоплен. Удаляем его из эскадрона
                if (ship.hits === ship.decks) {
                  // Вот здесь нужно еще вокруг корабля выставить точки  
                  // нет смысла стрелять по координатам вокруг потопленного корабля
                  console.log('ship', ship);
                  helpers.setMissesAroundShip(ship, this.user);
                  this.user.squadron.splice(shipInd, 1);
                  // console.log('Кораблей осталось', this.user.squadron.length);
                }
              } 
            })
          })
          this.move = this.comp.name;
          // console.log("Ход изменился. Теперь ходит: ", this.move);
          console.log("Компьютер стреляет снова")
          return this.shoot(this.user, {x: helpers.getRandom(9), y: helpers.getRandom(9)}, this.initRender);
        }
      }

      

      } else {
        return this.shoot(this.user, {x: helpers.getRandom(9), y: helpers.getRandom(9)}, this.initRender);
      }
    } 

    console.log("Проверяем целый ли флот у противников");
    if (!this.user.squadron.length) {
      console.log('Компьютер выиграл')
    }
    if (!this.comp.squadron.length) {
      alert('Игрок выиграл');
    }

    render();
    
    console.groupEnd();
  }
}

export default Controller;
