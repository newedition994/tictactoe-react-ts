import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

type ONGOING_GAME = -1;
const ONGOING_GAME = -1;

const enum Player {
  None = 0,
  One = 1,
  Two = 2
}

interface IState {
  board: Player[];
  gameIsWon: number;
  nextPlayerTurn: Player;
}

class App extends React.Component<{}, IState> {
  public state = {
    board: [
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None,
      Player.None
    ],
    gameIsWon: ONGOING_GAME,
    nextPlayerTurn: Player.One
  };

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Tic Tac Toe with React and Typescript</h1>
        </header>
      </div>
    );
  }
}

export default App;
