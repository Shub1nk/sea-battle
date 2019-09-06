/**
 * Создает экземпляр корабля
 * @param {FieldBattle} player  - игрок с и его поле
 * @param {string} shipName     - название корабля
 * @param {number} decks        - количество палуб
 * @param {number} x0           - x-координата первой палубы
 * @param {number} y0           - y-координата первой палубы
 * @param {number} kx           - x-коэффициент расположения корабля
 * @param {number} ky           - y-коэффициент расположения корабля
 * @param {number} hits         - количество попаданий
 * @param {object} matrix       - координаты и состояние корабля
 * @param {Function} createShip - создание корабля
 *
 * this.matrix - избыточная структура.
 * Поле "this.matrix.destroy" - используется для отображения состояния боеспособный корабль или нет.
 * То же самое можно было определять, используя количество палуб и попадений.
 *
 */

class Ships {
  constructor(player, fc) {
    this.player = player;
    this.shipName = fc.shipName;
    this.decks = fc.decks;
    this.x0 = fc.x;
    this.y0 = fc.y;
    this.kx = fc.kx;
    this.ky = fc.ky;
    this.hits = 0;
    this.matrix = {
      destroy: false,
      decks: []
    };
  }

  createShip = () => {
    let k = 0;
    const { x0, y0, kx, ky, matrix, player } = this;

    while (k < this.decks) {
      // Записываем координаты корабля в матрицу игрового поля
      this.player.matrix[x0 + k * kx][y0 + k * ky] = 1;
      // Записываем координаты корабля в матрицу экземпляра корабля
      matrix.decks.push([x0 + k * kx, y0 + k * ky]);
      k++;
    }

    // Заносим экземпляр корабля в эскадру
    player.squadron.push(this);
  };
}

export default Ships;
