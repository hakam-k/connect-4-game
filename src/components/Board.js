import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import cn from 'classnames';
import Coin from './Coin';
import DownArrow from '../svgs/down-arrow.svg';

const style = {
  board: {
    height: '400px',
    width: '400px',
  }
}
class Board extends Component {
  render() {
    const { classes, boardMatrix } = this.props;
    return (
      <div className={cn('board d-flex flex-row flex-justify-space-evenly', classes.board)}>
        {boardMatrix.map((arr) => {
          return <div className="d-flex flex-column flex-justify-space-evenly"><DownArrow fill="yellow" width={50} height={50} />{arr.map((v) => {
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
  activeColumn: PropTypes.number
};
export default withStyles(style)(Board);
