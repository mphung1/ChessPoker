import React from 'react';
import 'App.scss';
import Square from './Square';

export default class TakenPieces extends React.Component {
  renderSquare(square, i, squareShade) {
    return (
      <Square
        piece={square}
        style={square.style}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.props.whiteTakenPieces.map((ws, index) =>
            this.renderSquare(ws, index)
          )}
        </div>
        <div className="board-row">
          {this.props.blackTakenPieces.map((bs, index) =>
            this.renderSquare(bs, index)
          )}
        </div>
      </div>
    );
  }
}
