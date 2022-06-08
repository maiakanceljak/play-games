import _ from 'lodash'

const BASE_GAME = [
	[null, null, null,
    null, null, null,
    null, null, null],

  [null, null, null,
    null, null, null,
    null, null, null],
    
  [null, null, null,
    null, null, null,
    null, null, null],

  [null, null, null,
    null, null, null,
    null, null, null],

  [null, null, null,
    null, null, null,
    null, null, null],
    
  [null, null, null,
    null, null, null,
    null, null, null],

  [null, null, null,
    null, null, null,
    null, null, null],

  [null, null, null,
    null, null, null,
    null, null, null],
    
  [null, null, null,
    null, null, null,
    null, null, null]
]

const GRID = [
	[{row: 0, col: 0},{row: 0, col: 1},{row: 0, col: 2},
		{row: 1, col: 0},{row: 1, col: 1},{row: 1, col: 2},
		{row: 2, col: 0},{row: 2, col: 1},{row: 2, col: 2}],
	[{row: 0, col: 3},{row: 0, col: 4},{row: 0, col: 5},
		{row: 1, col: 3},{row: 1, col: 4},{row: 1, col: 5},
		{row: 2, col: 3},{row: 2, col: 4},{row: 2, col: 5}],
	[{row: 0, col: 6},{row: 0, col: 7},{row: 0, col: 8},
		{row: 1, col: 6},{row: 1, col: 7},{row: 1, col: 8},
		{row: 2, col: 6},{row: 2, col: 7},{row: 2, col: 8}],
	
	[{row: 3, col: 0},{row: 3, col: 1},{row: 3, col: 2},
		{row: 4, col: 0},{row: 4, col: 1},{row: 4, col: 2},
		{row: 5, col: 0},{row: 5, col: 1},{row: 5, col: 2}],
	[{row: 3, col: 3},{row: 3, col: 4},{row: 3, col: 5},
		{row: 4, col: 3},{row: 4, col: 4},{row: 4, col: 5},
		{row: 5, col: 3},{row: 5, col: 4},{row: 5, col: 5}],
	[{row: 3, col: 6},{row: 3, col: 7},{row: 3, col: 8},
		{row: 4, col: 6},{row: 4, col: 7},{row: 4, col: 8},
		{row: 5, col: 6},{row: 5, col: 7},{row: 5, col: 8}],

	[{row: 6, col: 0},{row: 6, col: 1},{row: 6, col: 2},
		{row: 7, col: 0},{row: 7, col: 1},{row: 7, col: 2},
		{row: 8, col: 0},{row: 8, col: 1},{row: 8, col: 2}],
	[{row: 6, col: 3},{row: 6, col: 4},{row: 6, col: 5},
		{row: 7, col: 3},{row: 7, col: 4},{row: 7, col: 5},
		{row: 8, col: 3},{row: 8, col: 4},{row: 8, col: 5}],
	[{row: 6, col: 6},{row: 6, col: 7},{row: 6, col: 8},
		{row: 7, col: 6},{row: 7, col: 7},{row: 7, col: 8},
		{row: 8, col: 6},{row: 8, col: 7},{row: 8, col: 8}]
]

export const basicGrid = [[0,1,2],[3,4,5],[6,7,8]]


function puzzleComplete(cells, solution) {
	for (let i = 0; i < solution.length; i++) {
		for (let j = 0; j < solution[i].length; j++) {
			if (cells[i][j] !== solution[i][j]) {
				return false
			}
		}
	}
	return true
}

export function numAllUsed(num, cells) {
	let numUsed = 0
	for (let i=0; i<9; i++) {
		for (let j=0; j<9; j++) {
			if (cells[i][j] === num) {
				numUsed++
			}
			if (numUsed >= 9) {
				return true
			}
		}
	}
	return false
}

export function highlightColour(selectedCell, selectedBox, cell, box, cells, mistakes, solution) {
	if (selectedCell === null || selectedBox === null) {
		return "white"
	}

	if (mistakes >= 3) {
		return "rgb(220, 220, 220)"
	} 

	if (puzzleComplete(cells, solution)) {
		return "cornsilk"
	}
	
	if (cell === selectedCell && box === selectedBox) {
		return "lightskyblue"
	}

	const highlight = (cell === selectedCell || GRID[cell][box].row === GRID[selectedCell][selectedBox].row || GRID[cell][box].col === GRID[selectedCell][selectedBox].col)
	if (cells[selectedCell][selectedBox] === cells[cell][box]  && cells[cell][box] !== null) {
		return highlight ? "pink" : "rgb(197, 197, 197)"
	}

	return highlight ? "rgb(220, 220, 220)" : "white"
}

export function gameStatus(mistakes, solution, cells) {
	if (mistakes >= 3) {
		return {message: "Game Over", colour: "red"}
	}
	
	if (puzzleComplete(cells, solution)) {
		return {message: "Complete!", colour: "mediumseagreen"}
	}

	return {message: "In Progress...", colour: "black"}
}

export function handleBoxClick(game, cell, box, solution, history, cells) {
	if (puzzleComplete(cells, solution) || game.mistakes >= 3) {
		return game
	}
	if (history.length > 1 && game.lastClickBox) {
		history[history].pop()
	}
	return {
		history: history.concat({
			cells: cells,
			selected: {cell: cell, box: box}
		}),
		mistakes: game.mistakes,
		lastClickBox: true
	}
}

export function handleClearClick(game, cell, box, initial, solution, history, cells) {
	if (puzzleComplete(cells, solution) || game.mistakes >= 3) {
		return game
	}
	if (cell !== null && box !== null) {
		if (initial[cell][box] === null) {
			cells[cell][box] = null
		}
		if (history.length > 1 && game.lastClickBox) {
			history.pop()
		}
		return {
			history: history.concat({
				cells: cells,
				selected: {cell: cell, box: box}
			}),
			mistakes: game.mistakes,
			lastClickBox: false
		}
	}
	return game
}

export function handleUndoClick(game, history) {
	if (history.length <= 1) {
		return game
	}
	if (game.lastClickBox) {
		history.pop()
	}
	const current = history[history.length - 1]
	if (current.cells[current.selected.cell][current.selected.box]) {
		const cells = _.cloneDeep([...current.cells])
		const cell = current.selected.cell
		const box = current.selected.box
		cells[cell][box] = null
		history.pop()
		return {
			history: history.concat({
				cells: cells,
				selected: {cell: cell, box: box}
			}),
			mistakes: game.mistakes,
			lastClickBox: true
		}
	}
	history.pop()
		return {
			history: history,
			mistakes: game.mistakes,
			lastClickBox: false
		}
}

export function handleNumberClick(value, game, cell, box, initial, solution, history, cells) {
	if (puzzleComplete(cells, solution) || game.mistakes >= 3) {
		return game
	}
	let mistakes = game.mistakes
	if (cell !== null && box !== null) {
		if (initial[cell][box] === null) {
			if (cells[cell][box] === value) {
				cells[cell][box] = null
			} else {
				cells[cell][box] = value
				if (value !== solution[cell][box]) {
					mistakes++
				}
			}
		}
	}
	if (history.length > 1 && game.lastClickBox) {
		history.pop()
	}
	return {
		history: history.concat({
			cells: cells,
			selected: {cell: cell, box: box}
		}),
		mistakes: mistakes,
		lastClickBox: false
	}
}
