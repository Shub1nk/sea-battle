import React from 'react';

const Tooltype = (props) => {
  const { isPlayGame, player } = props;
  return (
    <div className="b-game__tooltype__item">
      {isPlayGame && player.squadron.map((ship, shipInd) => {
          return (
              <div key={shipInd} className="b-game__tooltype__item__ship_wrapper">
                <ul key={ship.shipName} className="b-game__tooltype__item__ship">
                  {ship.matrix.decks.map((deck, deckInd) => (
                    <li key={deckInd} className="b-game__tooltype__item__ship__deck" 
                      style={{background: `${deckInd+1 <= ship.hits ? "red" : "green"}`}}></li>)
                  )}  
                </ul>
                <span className="b-game__tooltype__item__ship_name">{ship.shipName}</span>
                <span 
                  className="b-game__tooltype__item__ship_state"
                  style={{color: `${!ship.matrix.destroy ? "green" : "red"}`}}>
                  {!ship.matrix.destroy ? "Корабль боеспособен" : "Корабль потоплен"}
                </span>
              </div>
          )
        })
      }
    </div>
  )
};

export default Tooltype;
