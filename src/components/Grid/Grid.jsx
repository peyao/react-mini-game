import React, { Component } from 'react';
import util from '../../util';

import GridCell from './GridCell/GridCell';

class Grid extends Component {

  // props: numRows, numColumns, numBombs, gridCellClicked, isGameOver

  state = {
    grid: []
  }

  constructor(props) {
    super(props);
    this.state.grid = this.generateGrid();
  }

  gridCellClickHandler = (gridIndex) => (e) => {
    const gridCell = {
      ...this.state.grid[gridIndex]
    };

    // run parent's click handler
    this.props.gridCellClicked(gridCell);

    gridCell.rewarded = true;
    gridCell.isHidden = false;

    let grid;
    if (gridCell.value === 'bomb') {
      grid = this.state.grid.map(gridCell => {
        gridCell.isHidden = false;
        gridCell.isGameOver = true;
        return gridCell;
      });
      gridCell.isGameOver = true;
    } else {
      grid = [...this.state.grid];
    }

    grid[gridIndex] = gridCell;

    this.setState({
      grid: grid
    });

  }

  // returns a randomized 1D grid array
  generateGrid() {
    const grid = [];
    const numTotalGridCells = this.props.numRows * this.props.numColumns;
    const numBombs = this.props.numBombs;
    
    // add regular cells
    for (let i = 0; i < numTotalGridCells - numBombs; i++) {
      grid.push({ value: i + 1, isHidden: true, rewarded: false, isGameOver: false });
    }

    // add bomb cells
    for (let i = 0; i < numBombs; i++) {
      grid.push({ value: 'bomb', isHidden: true, rewarded: false, isGameOver: false });
    }

    // shuffle
    return util.shuffleArray(grid);
  }

  render() {
    // NOTE: Can we optimize this? This is called everytime we click a GridCell.

    // generate rows of GridCells (i.e. rows: [<div>{multiple GridCells}</div>, ...])
    // iterate through each GridCell, when index hits numColumns, start new row
    let rowCells = [];
    const rows = [];
    for (let i = 0; i < this.state.grid.length; i++) {
      const gridCell = this.state.grid[i];
      rowCells.push(
        <GridCell
          key={i}
          value={gridCell.value}
          clicked={this.gridCellClickHandler(i)}
          isHidden={gridCell.isHidden}
          isGameOver={gridCell.isGameOver}
          rewarded={gridCell.rewarded}
        >
        </GridCell>
      );

      // create new row when we filled up all the columns
      if ((i + 1) % this.props.numColumns === 0) {
        rows.push(<div className="row" key={i}>{rowCells}</div>);
        rowCells = [];
      }
    }

    return <div>{rows}</div>;
  }

}

export default Grid;