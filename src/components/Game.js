import React, { Component } from 'react';
import Board from './Board';
import withStyles from 'react-jss';
import cn from 'classnames';

const styles = {
  game: {
    height: '96vh'
  }
};
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
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
  handleKeyDown = (event) => {
    switch (event.keyCode) {
      case ARROW_LEFT:
        this.moveSelectedColumnLeft();
        break;
      case ARROW_RIGHT:
        this.moveSelectedColumnRight();
        break;
      default:
        break;
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }
  moveSelectedColumnLeft() {
    const { activeColumn } = this.state;
    if (activeColumn > 1) {
      this.setState({ activeColumn: activeColumn - 1 })
    }
  }
  moveSelectedColumnRight() {
    const { activeColumn } = this.state;
    if (activeColumn < 7) {
      this.setState({ activeColumn: activeColumn + 1 })
    }
  }
  selectColumn = (num) => {
    this.setState({ activeColumn: num });
  }
  render() {
    const { currentPlayer, boardMatrix, activeColumn } = this.state;
    const { classes } = this.props;
    return (
      <div className={cn("game d-flex flex-column flex-center", classes.game)}>
        <header className="App-header w-100">
          Current player: {currentPlayer}
        </header>
        <Board boardMatrix={boardMatrix} activeColumn={activeColumn} onColumnClick={this.selectColumn} />
      </div>
    );
  }
}

export default withStyles(styles)(Game);
