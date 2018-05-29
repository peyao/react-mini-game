import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Score from './components/Score/Score';
import Grid from './components/Grid/Grid';


class App extends Component {

  state = {
    score: 0,
    settings: {
      numRows: 3,
      numColumns: 5,
      numBombs: 2, // should not exceed numRows * numColumns
    },
    isGameOver: false,
  }

  gridCellClickHandler = (gridCell) => {
    let currentScore = this.state.score;

    if (gridCell.value !== 'bomb') {
      // add to score
      this.setState({
        score: currentScore + gridCell.value
      });
    } else {
      // game over
      this.setState({
        isGameOver: true
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Mini Game</h1>
          <Score value={this.state.score}></Score>
        </header>

        <br />

        <Grid
          numRows={this.state.settings.numRows}
          numColumns={this.state.settings.numColumns}
          numBombs={this.state.settings.numBombs}
          gridCellClicked={this.gridCellClickHandler}
          isGameOver={this.state.isGameOver}
        >
        </Grid>

      </div>
    );
  }
}

export default App;
