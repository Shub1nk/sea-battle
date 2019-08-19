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
    this.matrix = {
      destroy: false,
      decks: []
    }; // координаты полуб корабля
  }

  createShip = () => {
    let k = 0;
    const { x0, y0, kx, ky, matrix, player } = this;

    while (k < this.decks) {
      // записываем координаты корабля в матрицу игрового поля
      this.player.matrix[x0 + k * kx][y0 + k * ky] = 1;
      // записываем координаты корабля в матрицу экземпляра корабля
      matrix.decks.push([x0 + k * kx, y0 + k * ky]);
      k++;
    }
    // заносим экземпляр корабля в массив флота
    player.squadron.push(this);
  };
}

export default Ships;