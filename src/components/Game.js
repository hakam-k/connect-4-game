import React, { Component } from 'react';
import Board from './Board';
import withStyles from 'react-jss';
import cn from 'classnames';
import { Button } from 'reactstrap';

const styles = {
  game: {
    height: '96vh'
  }
};
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ENTER = 13;
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState();
  }
  initialState = () => {
    return {
      currentPlayer: 1, boardMatrix: [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ],
      activeColumn: 1
    }
  }
  resetGame = () => {
    this.setState(this.initialState());
  }
  handleKeyDown = (event) => {
    switch (event.keyCode) {
      case ARROW_LEFT:
        this.moveSelectedColumnLeft();
        break;
      case ARROW_RIGHT:
        this.moveSelectedColumnRight();
        break;
      case ENTER:
        this.pushCoinToColumn();
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
  pushCoinToColumn = (col) => {
    const { activeColumn, currentPlayer, boardMatrix } = this.state;
    const column = col || activeColumn;
    const matrix = [...boardMatrix];
    let newCurrentColumn = matrix[column - 1];
    if (newCurrentColumn[0] !== 0) {
      return;
    }
    newCurrentColumn = newCurrentColumn.reduce((result, value, i) => {
      debugger;
      let val = value;
      if (value !== 0 && result[i - 1] === 0) {
        result[i - 1] = currentPlayer;
      }
      if ((i === (newCurrentColumn.length - 1) && value === 0)) {
        val = currentPlayer;
      }
      result.push(val);
      return result;
    }, []);
    matrix[column - 1] = newCurrentColumn;
    this.setState({ currentPlayer: (currentPlayer % 2) + 1, boardMatrix: matrix });
  }
  runWinnerCheck = () => {
    const { boardMatrix, currentPlayer } = this.state;
    if(currentPlayer === 1){
      console.log('Player 1 win ?' + this.checkIfFirstPlayerWin());
    }
    if(currentPlayer === 2){
      console.log('Player 2 win ?' + this.checkIfSecondPlayerWin());
    }
  }
  checkIfFirstPlayerWin = (col = 0, y = 0, counter = 0)=>{
    const { boardMatrix } = this.state;
    if(boardMatrix){}
  }
  render() {
    const { currentPlayer, boardMatrix, activeColumn } = this.state;
    const { classes } = this.props;
    return (
      <div className={cn("game d-flex flex-column flex-center", classes.game)}>
        <header className="App-header w-100 mb-5">
          Current player: <span className={cn({ "text-danger": currentPlayer === 1 }, { "text-warning": currentPlayer === 2 })}>{currentPlayer}</span>
          <Button color="info" onClick={this.resetGame}>Play Again</Button>
          <h6 className="mt-3">You can use keyboard arrows in order select column and hit enter to drop coin on it</h6>
          <h6 className="">or use mouse to click on any column and coin will be dropped into this column</h6>
        </header>
        <Board boardMatrix={boardMatrix} activeColumn={activeColumn}
          onColumnClick={this.selectColumn} pushCoinToColumn={this.pushCoinToColumn} />
      </div >
    );
  }
}

export default withStyles(styles)(Game);
