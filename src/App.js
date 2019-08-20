import React, { Component } from "react";

import Field from "./components/Field";
import Tooltype from "./components/Tooltype";

import FieldBattle from "./models/FieldBattle";
import Controller from "./models/Controller";

import * as helpers from "./services/helpers";
import * as constants from "./services/constants";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayGame: false,
      userName: "",
      compName: "",
      isOpenReference: false
    };
    this.userPlayer = null;
    this.compPlayer = null;
  }

  handleGame = state => {
    if (!state) {
      this.setState({
        isPlayGame: state,
        userName: "",
        compName: "",
        isOpenReference: false
      });
      this.controller.winner = null;
    } else {
      // Начинаем игру
      // Инициализируем 2 поля боя: игрока и компьютера
      this.userPlayer = new FieldBattle(this.state.userName);
      this.userPlayer.getRandomLocationShips();
      this.compPlayer = new FieldBattle(this.state.compName);
      this.compPlayer.getRandomLocationShips();
      // Инициализируем контроллер игры
      this.controller = new Controller(this.userPlayer, this.compPlayer, () =>
        this.forceUpdate()
      );
      this.controller.init();
    }
    this.setState({ isPlayGame: state });
  };

  setNamePlayer = (key, ev) => this.setState({ [key]: ev.target.value });

  render() {
    const { isPlayGame, userName, compName, isOpenReference } = this.state;
    return (
      <section className="b-game">
        <h3 className="b-game__title">Морской бой</h3>
        <div
          className={`b-game__fields ${
            this.controller && this.controller.winner
              ? "b-game__fields_opacity"
              : ""
          }`}
        >
          <div className="b-game__field__user">
            {!isPlayGame ? (
              <input
                value={userName}
                onChange={this.setNamePlayer.bind(this, "userName")}
              />
            ) : (
              <span className="b-game__field__user__name">{userName}</span>
            )}
            <Field
              matrix={!isPlayGame ? [] : this.userPlayer.matrix}
              player={this.userPlayer}
              field={"user"}
              controller={this.controller}
              render={this.forceUpdate}
            />
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
            <Field
              matrix={!isPlayGame ? [] : this.compPlayer.matrix}
              player={this.compPlayer}
              field={"comp"}
              controller={this.controller}
              isPlayGame={this.state.isPlayGame}
            />
          </div>
        </div>
        {!isPlayGame ? (
          <button
            className={`${helpers.getClassButton(
              userName,
              compName,
              isPlayGame
            )}`}
            onClick={this.handleGame.bind(this, true)}
            disabled={
              helpers.getValueButton(userName, compName) !==
              constants.stateButton.game
            }
          >
            {helpers.getValueButton(userName, compName)}
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
          {this.controller && this.controller.move === this.compPlayer.name && (
            <div className="lds-facebook">
              <div />
              <div />
              <div />
            </div>
          )}

          {isPlayGame ? this.controller.logger : ""}
        </div>

        {isPlayGame && (
          <section className="b-game__tooltype-wrapper">
            {!this.controller.winner ? (
              <p className="b-game__tooltype__counter-move">
                Количество ходов: <b>{this.controller.couterMove}</b>
              </p>
            ) : (
              <p className="b-game__tooltype__counter-move">
                <b>
                  Победитель:&nbsp;
                  <span
                    style={{
                      color: `${
                        this.controller.winner === this.userPlayer.name
                          ? "green"
                          : "red"
                      }`
                    }}
                  >
                    {this.controller.winner}
                  </span>
                </b>
              </p>
            )}
            <button
              onClick={() =>
                this.setState({ isOpenReference: !this.state.isOpenReference })
              }
            >
              {!isOpenReference
                ? "Открыть сводку по эскадрам"
                : "Закрыть сводку по эскадрам"}
            </button>
            <div
              className={`b-game__tooltype ${
                isOpenReference ? "b-game__tooltype_open" : ""
              }`}
            >
              <Tooltype
                isPlayGame={this.state.isPlayGame}
                player={this.userPlayer}
              />
              <Tooltype
                isPlayGame={this.state.isPlayGame}
                player={this.compPlayer}
              />
            </div>
          </section>
        )}
      </section>
    );
  }
}

export default App;
