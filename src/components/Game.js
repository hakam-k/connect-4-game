import React, { Component } from 'react';
import Board from './Board';
import withStyles from 'react-jss';
import cn from 'classnames';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import { get } from 'lodash';
import { getMatrixColumns, check4ConnectedInArray, getDiagonalArrays, getReversedMatrix } from './utils';

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
      activeColumn: 1,
      modal: false,
      winner: 0,
      player1: 'player 1',
      player2: 'player 2'
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
  componentDidUnmount() {
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
    this.setState({ currentPlayer: (currentPlayer % 2) + 1, boardMatrix: matrix }, this.runWinnerCheck);
  }
  runWinnerCheck = () => {
    const { boardMatrix } = this.state;
    const reversedMatrix = getMatrixColumns(boardMatrix);
    const diagonals = getDiagonalArrays(boardMatrix);
    const reversedDiagonals = getDiagonalArrays(getReversedMatrix(boardMatrix));

    this.loopOverCheck4Connected(boardMatrix);
    this.loopOverCheck4Connected(reversedMatrix);
    this.loopOverCheck4Connected(diagonals);
    this.loopOverCheck4Connected(reversedDiagonals);
  }
  loopOverCheck4Connected = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
      const winner = check4ConnectedInArray(matrix[i]);
      if (winner === 1) { console.log('The winner is: 1'); this.toggleModal(1); };
      if (winner === 2) { console.log('The winner is: 2'); this.toggleModal(2); };
    }
  }
  toggleModal = (winner = 0) => {
    this.setState(prevState => ({
      modal: !prevState.modal,
      winner
    }));
  }
  setStateForField = (field, value) => {
    this.setState(() => ({
      [field]: value,
    }));
  }
  updatePlayer1Field = (e)=>{
    this.setStateForField('player1', get(e, 'target.value'));
  }
  updatePlayer2Field = (e)=>{
    this.setStateForField('player2', get(e, 'target.value'));
  }
  render() {
    const { currentPlayer, boardMatrix, activeColumn, modal, winner, player1, player2 } = this.state;
    const { classes } = this.props;
    const playerName =  winner === 1 ? player1: player2;
    return (
      <div className={cn("game d-flex flex-column flex-center", classes.game)}>
        <header className="App-header w-100 mb-5">
          <div className="d-flex flex-row">
            <div className="d-flex flex-column mr-5">
              <Label for="player1" sm={2}>Player 1</Label>
              <Input type="text" name="player1" id="player1" placeholder="Select name" defaultValue="player 1" onChange={this.updatePlayer1Field} />
            </div>
            <div className="d-flex flex-column">
              <Label for="player2" sm={2}>Player 2</Label>
              <Input type="text" name="player2" id="player2" placeholder="Select name" defaultValue="player 2" onChange={this.updatePlayer2Field}/>
            </div>
          </div>
          Current player: <span className={cn({ "text-danger": currentPlayer === 1 }, { "text-warning": currentPlayer === 2 })}>{playerName}</span>
          <Button color="info" onClick={this.resetGame}>Play Again</Button>
          <Modal isOpen={modal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Game over</ModalHeader>
            <ModalBody>
              The winner is: {playerName}
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.resetGame}>Play again</Button>
              <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
            </ModalFooter>
          </Modal>
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
