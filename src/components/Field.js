import React, { Component } from "react";

import * as constants from "../services/constants";
import * as helpers from "../services/helpers";

class Field extends Component {
  handleClick = (i, j) => {
    const {field, player} = this.props;
    if (field === 'user') return false;
    console.log(`Выстрел ${i}-${j}`);
    console.log(`Что тут было`, player.matrix[i][j])
    const coordShoot = player.matrix[i][j];

    switch(coordShoot) {
      case constants.stateCell.empty: player.matrix[i][j] = constants.stateCell.miss; break;
      case constants.stateCell.deck: player.matrix[i][j] = constants.stateCell.hit; break;
    }

    console.log(player.matrix)
    this.forceUpdate();
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
                  )}`}
                  title={`${row + cell}`}
                  onClick={this.handleClick.bind(this, i, j)}
                >
                  {/* {
                    () => {
                      if (matrix.length && matrix[i][j]) {
                        switch(matrix[i][j]) {
                          case 2: return "&#10006;"
                          case 3: return "&bull;"
                        }
                      }
                    }
                  } */}
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
