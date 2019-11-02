import { createPool } from "../utils/pool";

export function generateGrid(words) {
  const gridSize = Math.floor(Math.sqrt(words.length));
  const pickRandomWord = createPool(words);

  const grid = [];
  for (let i = 0; i < gridSize; i++) {
    const row = [];
    for (let j = 0; j < gridSize; j++) {
      row.push({ word: pickRandomWord(), selected: false });
    }
    grid.push(row);
  }
  return grid;
}

export function checkGridForBingo(grid) {
  return (
    checkRowsForBingo(grid) ||
    checkColumnsForBingo(grid) ||
    checkCrossForBingo(grid)
  );
}

function checkRowsForBingo(grid) {
  return grid.some(row => {
    return row.every(cell => cell.selected);
  });
}

function checkColumnsForBingo(grid) {
  for (let columnIndex = 0; columnIndex < grid.length; columnIndex++) {
    const allColumnCellsMatch = grid.every(row => {
      const cell = row[columnIndex];
      return cell.selected;
    });
    if (allColumnCellsMatch) {
      return true;
    }
  }
  return false;
}

function checkCrossForBingo(grid) {
  return checkLeftRightCrossForBing(grid) || checkRightLeftCrossForBing(grid);
}

function checkLeftRightCrossForBing(grid) {
  // Check from left top corner to bottom right corner
  return grid.every((row, columnIndex) => {
    return row[columnIndex].selected;
  });
}

function checkRightLeftCrossForBing(grid) {
  // Check from right top corner to bottom left corner
  return grid.every((row, columnIndex) => {
    return row[grid.length - 1 - columnIndex].selected;
  });
}
