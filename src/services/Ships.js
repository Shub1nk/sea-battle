class Ships {
  constructor(player, fc) {
    this.player = player; // на чьем поле создается корабль
    this.shipName = fc.shipName; // имя корабля
    this.decks = fc.decks; // количество палуб
    this.x0 = fc.x; // координата x первой палубы
    this.y0 = fc.y; // координата y первой палубы
    this.kx = fc.kx;
    this.ky = fc.ky;
    this.hits = 0; // количество попадания
    this.matrix = []; // координаты полуб корабля
  }

  createShip = () => {
    let k = 0;
    const { x0, y0, kx, ky, matrix, player } = this;

    while (k < this.decks) {
      // записываем координаты корабля в матрицу игрового поля
      this.player.matrix[x0 + k * kx][y0 + k * ky] = 1;
      // записываем координаты корабля в матрицу экземпляра корабля
      matrix.push([x0 + k * kx, y0 + k * ky]);
      k++;
      // заносим экземпляр корабля в массив флота
      player.squadron.push(this);
      // если корабль создан для игрока, отображаем его на экран
      // if (player === "Хуяк") this.showShip();
      // когда количество кораблей в эскадре достигнет 10, т.е. все корабли
      // сгенерированны, то можно показать кнопку запуска игры
      // if (user.squadron.length == 10) {
      //   getElement("play").setAttribute("data-hidden", "false");
      // }
    }
  };
}

export default Ships;
