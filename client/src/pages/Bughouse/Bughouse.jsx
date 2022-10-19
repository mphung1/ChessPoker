import React from 'react';
import Board from 'components/Board';
import King from 'components/pieces/King';
import TakenPieces from 'components/TakenPieces';
import initializeBoard from 'utils/initializeBoard';
import './Bughouse.scss'

export default class Multiplayer extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: initializeBoard(),
      whiteTakenPieces: [],
      blackTakenPieces: [],
      whiteInCheck: false,
      blackInCheck: false,
      player: 1,
      sourceSelection: -1,
      status: '',
      turn: 'white',
    }
  }

  componentDidMount() {
    console.log('You are playing as ' + this.state.player)
  }

  squareSelected() {
    return this.state.sourceSelection === -1;
  }

  handleClick(i) {
    const squares = [...this.state.squares];
    if (this.squareSelected()) {
      if (!squares[i] || squares[i].player !== this.state.player) {
        this.setState({ status: "Choose player " + this.state.player + " pieces." });
        if (squares[i]) {
          squares[i].style = { ...squares[i].style, backgroundColor: "" };
        }
      }
      else {
        squares[i].style = { ...squares[i].style, backgroundColor: "HSL(195, 100%, 30%)" };
        this.setState({
          status: "Piece selected.",
          sourceSelection: i
        })
      }
      return
    }

    squares[this.state.sourceSelection].style = { ...squares[this.state.sourceSelection].style, backgroundColor: "" };

    if (squares[i] && squares[i].player === this.state.player) {
      this.setState({
        status: "Dest is occupied.",
        sourceSelection: -1,
      });
    }
    else {
      const whiteTakenPieces = [];
      const blackTakenPieces = [];
      const isDestEnemyOccupied = Boolean(squares[i]);
      const isMovePossible = squares[this.state.sourceSelection].isMovePossible(this.state.sourceSelection, i, isDestEnemyOccupied);

      if (isMovePossible) {
        if (squares[i] !== null) {
          if (squares[i].player === 1) {
            whiteTakenPieces.push(squares[i]);
          }
          else {
            blackTakenPieces.push(squares[i]);
          }
        }

        squares[i] = squares[this.state.sourceSelection];
        squares[this.state.sourceSelection] = null;

          let player = this.state.player === 1 ? 2 : 1;
          let turn = this.state.turn === 'white' ? 'black' : 'white';

          this.setState(oldState => ({
            sourceSelection: -1,
            squares,
            whiteTakenPieces: [...oldState.whiteTakenPieces, ...whiteTakenPieces],
            blackTakenPieces: [...oldState.blackTakenPieces, ...blackTakenPieces],
            player,
            status: '',
            turn
          }));
      }
      else {
        this.setState({
          status: "The path is invalid.",
          sourceSelection: -1,
        });
      }
    }
  }

  render() {
    return (
      <div>
        <div className="game">
          <div className="game-board">
            <button>
              Leave room
            </button>
            <Board
              squares={this.state.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <h3>Turn</h3>
            <div id="player-turn-box" style={{ backgroundColor: this.state.turn }}>

            </div>

            <div className="taken-pieces">
              {<TakenPieces
                whiteTakenPieces={this.state.whiteTakenPieces}
                blackTakenPieces={this.state.blackTakenPieces}
              />
              }
            </div>
          </div>
        </div>
          <div className="game-status">{this.state.status}</div>
      </div>
    );
  }
}
