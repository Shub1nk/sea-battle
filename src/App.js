import React, { Fragment, Component } from "react";
import Field from './components/Field';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayGame: false,
      whoseMove: 'user' //TODO: рандомно определять 1 и 0

    }
  }

  handleGame = (state) => {
    this.setState({isPlayGame: state});
  }

  render() {

    const { isPlayGame } = this.state;

    return (
      <section className="b-game">
        <h3 className="b-game__title">Морской бой</h3>
        <div className="b-game__fields">
          <div className="b-game__field__user">
            <Field/>
          </div>
          <div className="b-game__field__comp">
            <Field/>
          </div>
        </div>
        {!isPlayGame 
          ? (<button className="b-game__button_play" onClick={this.handleGame.bind(this, true)}>Играть</button>)
          : (
          <Fragment>
            <button className="b-game__button_reset" onClick={this.handleGame.bind(this, false)}>Сбросить</button>
            <div className="b-game__log">{`Ходит игрок: ${this.state.whoseMove}`}</div>
          </Fragment>)
        }
      </section>)
  }
}

export default App;
