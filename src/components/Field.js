import React, { Component } from 'react';

import * as constants from '../services/constants'

class Field extends Component {
  render() {
    return (
      <ul className="b-game__field-row">
        <div className="b-game__coordinate__horizontal">
          {constants.WIDTH_FIELD.map((coord, i) => (
            <span key={i} className="b-game__coordinate__horizontal__item">{coord}</span>
          ))}
          </div>
        <div className="b-game__coordinate__vertical">
          {constants.HEIGHT_FIELD.map((coord, i) => (
            <span key={i} className="b-game__coordinate__vertical__item">{coord}</span>
          ))}
        </div>  
        {constants.WIDTH_FIELD.map((row, i) => (
          <li key={i} className="b-game__field-row__item">
            <ul className="b-game__field-cell">
            {
              constants.HEIGHT_FIELD.map((cell, j) => (
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