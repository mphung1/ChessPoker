import React, { useState, useEffect } from 'react';
import Board from 'components/Board';
import King from 'components/pieces/King';
import TakenPieces from 'components/TakenPieces';
import initializeBoard from 'utils/initializeBoard';
import './Bughouse.scss'
import socket from 'connection/socket'

export default function BughouseChess() {
  const [board, setBoard] = useState({
    squares: initializeBoard(),
    whiteTakenPieces: [],
    blackTakenPieces: [],
    whiteInCheck: false,
    blackInCheck: false,
    player: 1,
    sourceSelection: -1,
    status: '',
    turn: 'white',
  })
  const [clock, startClock] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState({
    white: 300,
    black: 300
  })
  const [options, renderOptions] = useState(false)
  const [move, setMove] = useState([])

  useEffect(() => {
    socket.emit('message', 'I am client');
    socket.on('message', (msg: string) => {
      console.log('Message from server: ' + msg);
    });
  }, [])

  useEffect(() => {
    if (clock === true) {
      if (board.player===1) {
        const id = setInterval(() => setTimeRemaining( timeRemaining => ({
          ...timeRemaining, white: timeRemaining.white-1
        })), 1000);
      } else {
        const id = setInterval(() => setTimeRemaining( timeRemaining => ({
          ...timeRemaining, black: timeRemaining.black-1
        })), 1000);
      }
    }

    return () => {
      // clearInterval(id);
    };
  }, [clock])

  function handleReady() {
    startClock(true)
    renderOptions(true)
  }

  function squareSelected() {
    return board.sourceSelection === -1;
  }

  function handleClick(i: any) {
    const squares = [...board.squares];

    if (squareSelected()) {
      if (!squares[i] || squares[i].player !== board.player) {
        setBoard({ ...board, status: "Choose player " + board.player + " pieces." });
        if (squares[i]) {
          squares[i].style = { ...squares[i].style, backgroundColor: "" };
        }
      } else {
        squares[i].style = { ...squares[i].style, backgroundColor: "HSL(195, 100%, 30%)" };
        setBoard({
          ...board,
          status: "Piece selected.",
          sourceSelection: i,
        });
      }
      return
    }

    squares[board.sourceSelection].style = { ...squares[board.sourceSelection].style, backgroundColor: "" };

    if (squares[i] && squares[i].player === board.player) {
      setBoard({
        ...board,
        status: "Dest is occupied.",
        sourceSelection: -1,
      });
    } else {
      const whiteTakenPieces: any[] = [];
      const blackTakenPieces: any[] = [];
      const isDestEnemyOccupied = Boolean(squares[i]);
      const isMovePossible = squares[board.sourceSelection].isMovePossible(board.sourceSelection, i, isDestEnemyOccupied);

      if (isMovePossible) {
        if (squares[i] !== null) {
          if (squares[i].player === 1) {
            whiteTakenPieces.push(squares[i]);
          } else {
            blackTakenPieces.push(squares[i]);
          }
        }

          squares[i] = squares[board.sourceSelection];
          squares[board.sourceSelection] = null;

          let player = board.player === 1 ? 2 : 1;
          let turn = board.turn === 'white' ? 'black' : 'white';

          socket.emit('move', [board.sourceSelection, i])
          socket.on('lastMove', (lastMove: any[]) => {
              setMove(lastMove)
          });

          // squares[(this.state.move)[1]] = squares[(this.state.move)[0]];
          // squares[(this.state.move)[0]] = null;

          setBoard(oldState => ({
            ...board,
            sourceSelection: -1,
            squares,
            whiteTakenPieces: [...oldState.whiteTakenPieces, ...whiteTakenPieces],
            blackTakenPieces: [...oldState.blackTakenPieces, ...blackTakenPieces],
            player,
            status: '',
            turn,
          }));
      }
      else {
        setBoard({
          ...board,
          status: "The path is invalid.",
          sourceSelection: -1,
        });
      }
    }
  }


  return (
        <div className='game'>

        <div className="bodybox">
          <div className="chatborder">
            <input
              type="text"
              name="chat"
              className="chatbox"
              placeholder="Click to chat."
            />
          </div>
        </div>

          <div className="game-buttons">
          {options ? (
            <div>
              <button> Offer a draw </button>
              <button> Resign </button>
            </div>
          ) : (
            <button onClick={handleReady}> Ready </button>
          )}
          </div>

          <div className="game-board">
            <Board
            squares={board.squares}
            onClick={(i: React.MouseEvent<HTMLElement>) => handleClick(i)}
            />
          </div>

          <div className='game-clock'>
            <div> {timeRemaining.white} </div>
            <div> {timeRemaining.black} </div>
          </div>

          <div className="game-info">
            <h3>Turn</h3>
            <div id="player-turn-box" style={{ backgroundColor: board.turn }}>
            </div>

            <div className="taken-pieces">
              {<TakenPieces
                whiteTakenPieces={board.whiteTakenPieces}
                blackTakenPieces={board.blackTakenPieces}
              />
              }
            </div>
          </div>
    </div>
  );
}
