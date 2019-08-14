import React, { Fragment, Component } from "react";
import Field from "./components/Field";
import FieldBattle from "./services/FieldBattle";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayGame: false,
      whoseMove: "user", //TODO: рандомно определять 1 и 0
      userName: "",
      compName: ""
    };
    this.userPlayer = null;
    this.compPlayer = null;
  }

  handleGame = state => {
    if (!state) {
      // Сбрасываем игру и все состояния
    } else {
      // Начинаем игру
      // Инициализируем 2 поля боя: игрока и компьютера
      this.userPlayer = new FieldBattle(this.state.userName);
      this.userPlayer.getRandomLocationShips();
      this.compPlayer = new FieldBattle(this.state.compName);
      this.compPlayer.getRandomLocationShips();
    }
    this.setState({ isPlayGame: state });
  };

  setNamePlayer = (key, ev) => {
    console.log(key);
    this.setState({ [key]: ev.target.value });
  };

  render() {
    const { isPlayGame, userName, compName } = this.state;

    return (
      <section className="b-game">
        <h3 className="b-game__title">Морской бой</h3>
        <div className="b-game__fields">
          <div className="b-game__field__user">
            {!isPlayGame ? (
              <input
                value={userName}
                onChange={this.setNamePlayer.bind(this, "userName")}
              />
            ) : (
              <span className="b-game__field__user__name">{userName}</span>
            )}
            <Field matrix={!isPlayGame ? [] : this.userPlayer.matrix} />
          </div>
          <div className="b-game__field__comp">
            {!isPlayGame ? (
              <input
                value={compName}
                onChange={this.setNamePlayer.bind(this, "compName")}
              />
            ) : (
              <span className="b-game__field__comp__name">{compName}</span>
            )}
            <Field matrix={!isPlayGame ? [] : this.compPlayer.matrix} />
          </div>
        </div>
        {!isPlayGame ? (
          <button
            className="b-game__button_play"
            onClick={this.handleGame.bind(this, true)}
            disabled={!userName && !compName}
          >
            Играть
          </button>
        ) : (
          <button
            className="b-game__button_reset"
            onClick={this.handleGame.bind(this, false)}
          >
            Сбросить
          </button>
        )}
        <div className="b-game__log">
          {!isPlayGame
            ? "Для начала игры, введите имена игроков!"
            : `Ходит игрок: ${this.state.whoseMove}`}
        </div>
      </section>
    );
  }
}

export default App;
