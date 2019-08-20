import React from "react";

// Сводка по игре. Сделал простой интерфейс, который отображает состояние кораблей:
// сколько кораблей еще в строю и сколько палуб еще не подбито (показывает урон, а не какая именно палуба подбита)
const Tooltype = props => {
  const { isPlayGame, player } = props;
  return (
    <div className="b-game__tooltype__item">
      {isPlayGame &&
        player.squadron.map((ship, shipInd) => {
          return (
            <div key={shipInd} className="b-game__tooltype__item__ship_wrapper">
              <ul key={ship.shipName} className="b-game__tooltype__item__ship">
                {ship.matrix.decks.map((deck, deckInd) => (
                  <li
                    key={deckInd}
                    className="b-game__tooltype__item__ship__deck"
                    style={{
                      background: `${
                        deckInd + 1 <= ship.hits ? "red" : "green"
                      }`
                    }}
                  />
                ))}
              </ul>
              <span className="b-game__tooltype__item__ship_name">
                {ship.shipName}
              </span>
              <span
                className="b-game__tooltype__item__ship_state"
                style={{ color: `${!ship.matrix.destroy ? "green" : "red"}` }}
              >
                {!ship.matrix.destroy ? "Корабль в строю" : "Корабль потоплен"}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default Tooltype;
