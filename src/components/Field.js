import React, { Component } from "react";

import * as constants from "../services/constants";
import * as helpers from "../services/helpers";

class Field extends Component {
  handleClick = (i, j) => {
    const { field, matrix, isPlayGame, controller } = this.props;
    // Для удобства чтения сделал несколько простых условий вместо одного сложного
    // Отключаем клики по ячейкам:
    // игра еще не началась
    if (!isPlayGame) return false;
    // нет победителя
    if (controller && controller.winner) return false;
    // в текущий момент не игрока ход
    if (controller.move !== controller.user.name) return false;
    // если это поле игрока
    if (field === "user") return false;
    // в поле уже делали выстрел
    if (matrix[i][j] > 1) return false;
    // осуществляем выстрел игрока
    controller.shoot({ x: i, y: j });
  };

  render() {
    const { matrix, controller } = this.props;

    return (
      <ul className="b-game__field-row">
        <div className="b-game__coordinate__horizontal">
          {constants.COORD_HORIZONTAL.map((coord, i) => (
            <span key={i} className="b-game__coordinate__horizontal__item">
              {coord}
            </span>
          ))}
        </div>
        <div className="b-game__coordinate__vertical">
          {constants.COORD_VERTICAL.map((coord, i) => (
            <span key={i} className="b-game__coordinate__vertical__item">
              {coord}
            </span>
          ))}
        </div>
        {constants.COORD_VERTICAL.map((row, i) => {
          return (
            <li key={i} className="b-game__field-row__item">
              <ul className="b-game__field-cell">
                {constants.COORD_HORIZONTAL.map((cell, j) => (
                  <li
                    key={j}
                    className={`
                    b-game__field-cell__item 
                    ${helpers.getExtendClass(matrix.length ? matrix[i][j] : 0)} 
                    ${controller &&
                      (controller.move === controller.user.name ||
                        controller.winner) &&
                      helpers.getAnimationClass(
                        matrix.length ? matrix[i][j] : 0
                      )}`}
                    title={`${row + cell}`}
                    onClick={this.handleClick.bind(this, i, j)}
                  />
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default Field;
