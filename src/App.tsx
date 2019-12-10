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

  public sliceWinCheck = (slice: Player[]) => {
    if (
      slice[0] === slice[1] &&
      slice[1] === slice[2] &&
      slice[2] !== Player.None
    ) {
      return slice[0];
    }
    return -1;
  };

  public checkIfGameIsOver = (board: Player[]) => {
    const winCheckSlices = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]]
    ];

    for (let i = 0; i < winCheckSlices.length; i++) {
      const winResult = this.sliceWinCheck(winCheckSlices[i]);
      if (winResult !== -1) {
        return winResult;
      }
    }

    if (board.some(cell => cell === Player.None)) {
      return ONGOING_GAME;
    }

    return -1;
  };

  public createOnClickHandler = (index: number) => () => {
    const { board, nextPlayerTurn, gameIsWon } = this.state;

    if (gameIsWon !== ONGOING_GAME || board[index] !== Player.None) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = nextPlayerTurn;
    const newGameIsWon = this.checkIfGameIsOver(newBoard);

    this.setState({
      board: newBoard,
      nextPlayerTurn: 3 - nextPlayerTurn,
      gameIsWon: newGameIsWon
    });
  };

  public renderCell = (index: number) => {
    const { board } = this.state;

    return (
      <div
        className="cell"
        onClick={this.createOnClickHandler(index)}
        data-player={board[index]}
      />
    );
  };

  public renderBoard = () => {
    const { board } = this.state;

    return (
      <div className="board-container">
        {board.map((value, key) => this.renderCell(key))}
      </div>
    );
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
