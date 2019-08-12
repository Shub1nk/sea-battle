import React, { Component } from 'react';

import * as constants from '../services/constants'

class Field extends Component {
  render() {
    return (
      <ul className="b-game__field-row">
        <div className="b-game__coordinate__horizontal">
          {constants.COORD_HORIZONTAL.map((coord, i) => (
            <span key={i} className="b-game__coordinate__horizontal__item">{coord}</span>
          ))}
          </div>
        <div className="b-game__coordinate__vertical">
          {constants.COORD_VERTICAL.map((coord, i) => (
            <span key={i} className="b-game__coordinate__vertical__item">{coord}</span>
          ))}
        </div>  
        {constants.COORD_VERTICAL.map((row, i) => (
          <li key={i} className="b-game__field-row__item">
            <ul className="b-game__field-cell">
            {
              constants.COORD_HORIZONTAL.map((cell, j) => (
                <li key={j} className="b-game__field-cell__item" title={`${cell + row}`}></li>
              ))
            }
            </ul>
          </li>
        ))}
      </ul>
    );
  }
}

export default Field;