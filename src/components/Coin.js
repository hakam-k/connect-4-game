import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-jss';
import cn from 'classnames';
const style = {
  coin: {
    border: '1px solid',
    borderRadius: '50%',
    height: '50px',
    width: '50px',
    '&.color-0': {
      backgroundColor: 'white',
    },
    '&.color-1': {
      backgroundColor: 'red',
    },
    '&.color-2': {
      backgroundColor: 'yellow',
    }
  },
}
class Coin extends Component {
  render() {
    const { classes, colorIndex } = this.props;
    return (
      <div className={cn('coin', classes.coin, `color-${colorIndex}`)}>
      </div>
    );
  }
}
Coin.propTypes = {
  colorIndex: PropTypes.number,
};
export default withStyles(style)(Coin);
