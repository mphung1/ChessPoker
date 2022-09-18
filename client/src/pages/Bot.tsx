import { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

export default function Bot() {
  const [game, setGame] = useState(new Chess());

  function safeGameMutate(modify: any) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }
  function makeRandomMove() {
    const possibleMove = game.moves();

    if (game.game_over() || game.in_draw() || possibleMove.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMove.length);
    safeGameMutate((game: any) => {
      game.move(possibleMove[randomIndex]);
    });
  }

  //Perform an action when a piece is droped by a user
  function onDrop(source: any, target: any) {
    let move = null;
    safeGameMutate((game: any) => {
      move = game.move({
        from: source,
        to: target,
        promotion: 'q',
      });
    });
    //illegal move
    if (move == null) return false;
    //valid move
    setTimeout(makeRandomMove, 200);
    return true;
  }
  return (
    <div className="app">
      <Chessboard
        position={game.fen()}
        onPieceDrop={onDrop}
        boardWidth={400}
      />
      <div>Dummy sample with react-chessboard</div>
    </div>
  );
}
