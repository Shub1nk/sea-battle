class Controller {
  constructor(user, enemy) {
    this.user = user;
    this.comp = enemy;
  }

  init = () => {
    const random = Math.floor(Math.random()*2);
    return random ? this.user.name : this.comp.name
  }

  shoot = (player, coordinates) => {
    if (player === 'user') {
      console.group("SHOOT")
      console.log("player", player, coordinates);
      console.log("coordinates", coordinates);
      console.log("compMatrix", this.comp.matrix);
      console.groupEnd();
    }
  }
}

export default Controller;
