import React, { Fragment, Component } from "react";
import Field from './components/Field';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayGame: false,
      whoseMove: 'user', //TODO: рандомно определять 1 и 0
      userName: '',
      compName: ''

    }
  }

  handleGame = (state) => this.setState({isPlayGame: state});

  setNamePlayer = (key, ev) => {
    console.log(key)
    this.setState({[key]: ev.target.value})
  }

  render() {

    const { isPlayGame, userName, compName } = this.state;

    console.log("this.state", this.state)

    return (
      <section className="b-game">
        <h3 className="b-game__title">Морской бой</h3>
        <div className="b-game__fields">
          <div className="b-game__field__user">
            {
              !isPlayGame 
              ? (<input value={userName} onChange={this.setNamePlayer.bind(this, "userName")}></input>)
              : (<span className="b-game__field__user__name">{userName}</span>)
            }
            <Field/>
          </div>
          <div className="b-game__field__comp">
            {
              !isPlayGame 
              ? (<input value={compName} onChange={this.setNamePlayer.bind(this, "compName")}></input>)
              : (<span  className="b-game__field__comp__name">{compName}</span>)
            }
            <Field/>
          </div>
        </div>
        {!isPlayGame 
          ? (<button 
              className="b-game__button_play" 
              onClick={this.handleGame.bind(this, true)}
              disabled={!userName && !compName}
            >
              Играть
            </button>)
          : (<button 
              className="b-game__button_reset" 
              onClick={this.handleGame.bind(this, false)}
            >
              Сбросить
            </button>)
        }
        <div className="b-game__log">
          {!isPlayGame 
            ? 'Для начала игры, введите имена игроков!'
            : `Ходит игрок: ${this.state.whoseMove}`}
        </div>
      </section>)
  }
}

export default App;
