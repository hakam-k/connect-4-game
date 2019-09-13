import React, { Component } from 'react';
import Board from './Board';
import withStyles from 'react-jss';
import cn from 'classnames';

const styles = {
  game: {
    height: '96vh'
  }
};
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlayer: 1, boardMatrix: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 2, 2, 0, 0]
      ],
      activeColumn: 1
    };
  }
  render() {
    const { currentPlayer, boardMatrix, activeColumn } = this.state;
    const { classes } = this.props;
    return (
      <div className={cn("game d-flex flex-column flex-center", classes.game)}>
        <header className="App-header w-100">
          Current player: {currentPlayer}
        </header>
        <Board boardMatrix={boardMatrix} activeColumn={activeColumn} />
      </div>
    );
  }
}

export default withStyles(styles)(Game);
