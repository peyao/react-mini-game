import React from 'react';

import './GridCell.css';

const gridCell = (props) => {

  // props: value, clicked, isHidden, isGameOver

  const classes = ['GridCell'];

  // assign classes
  if (props.isHidden) {
    classes.push('hidden'); // initial state
  }
  else {
    if (props.isGameOver && props.value === 'bomb') {
      classes.push('bomb'); // red bomb is revealed state
    }
    else if (props.rewarded) {
      classes.push('rewarded'); // gold reward state
    }
    else if (props.isGameOver) {
      classes.push('disabled'); // grey disabled state when game is over
    }
  }

  return (
    <div className={classes.join(' ')} onClick={props.clicked}>
      <div className="contents">{props.value}</div>
    </div>
  );
}

export default gridCell;