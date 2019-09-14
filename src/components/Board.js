import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import cn from 'classnames';
import Coin from './Coin';
// import DownArrow from './DownArrow';

const styles = {
  board: {
    height: '400px',
    width: '400px',
  },
  column: {
    position: 'relative',
    '&.selected:before': {
      top: '-35px',
      width: '25px',
      left: '10px',
      height: '25px',
      borderColor: 'orange',
      borderBottomWidth: '5px',
      borderRightWidth: '5px',
      borderBottomStyle: 'solid',
      borderRightStyle: 'solid',
      content: '""',
      display: 'block',
      position: 'absolute',
      transform: 'rotate(45deg)'
    }
  }
};
class Board extends Component {
  render() {
    const { classes, boardMatrix, activeColumn, onColumnClick } = this.props;
    // const classes = style(this.props);
    return (
      <div className={cn('board d-flex flex-row flex-justify-space-evenly', classes.board)}>
        {boardMatrix.map((arr, i) => {
          return <div onClick={() => { onColumnClick(i + 1) }} className={cn('d-flex flex-column flex-justify-space-evenly', classes.column, { selected: i === activeColumn - 1 })}>{arr.map((v) => {
            return <Coin colorIndex={v} />
          })}
          </div>
        })}
      </div>
    );
  }
}
Board.propTypes = {
  boardMatrix: PropTypes.array,
  activeColumn: PropTypes.number,
  currentPlayer: PropTypes.number,
  onColumnClick: PropTypes.func
};
export default injectSheet(styles)(Board);
