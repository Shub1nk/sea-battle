import React, { Component } from "react";

import * as constants from "../services/constants";
import * as helpers from "../services/helpers";

class Field extends Component {

  handleClick = (i, j) => {
    const {field, player, matrix} = this.props;
    // Отключаем клики по ячейкам, если это поле игрока или в поле уже делали выстрел
    if (field === 'user' && matrix[i][j] > 1) return false;
    this.props.controller.shoot(player, {x: i, y: j}, () => this.forceUpdate());
  };

  render() {
    const { matrix } = this.props;

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
                  className={`b-game__field-cell__item ${helpers.getExtendClass(
                    matrix.length ? matrix[i][j] : 0
                  )} ${helpers.getAnimationClass(matrix.length ? matrix[i][j] : 0)}`}
                  title={`${row + cell}`}
                  onClick={this.handleClick.bind(this, i, j)}
                >
                </li>
              ))}
            </ul>
          </li>
        )})}
      </ul>
    );
  }
}

export default Field;
