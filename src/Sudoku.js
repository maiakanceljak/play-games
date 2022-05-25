import React from "react"
import "./style.css"
import _ from 'lodash'

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

const EASY_GAME = [
	[null, 9, null, 
		null, 1, null,
		null, 5, null],

	[null, null, 7, 
		null, 9, 6,
		null, null, null],

	[null, 3, null, 
		7, 4, null,
		null, null, 6],

	[null, null, null, 
		1, 8, 5,
		null, 7, 4],

	[null, 1, null, 
		7, 6, 3,
		9, null, 8],

	[null, null, 8, 
		4, 2, null,
		5, null, null],

	[8, 2, 7, 
		null, 4, null,
		null, 3, null],

	[null, null, null, 
		8, 3, null,
		6, null, 2],

	[null, 1, 3, 
		null, null, 7,
		null, 8, null]
]

const EASY_GAME_FIXED = [
	[null, 9, null, 
		null, 1, null,
		null, 5, null],

	[null, null, 7, 
		null, 9, 6,
		null, null, null],

	[null, 3, null, 
		7, 4, null,
		null, null, 6],

	[null, null, null, 
		1, 8, 5,
		null, 7, 4],

	[null, 1, null, 
		7, 6, 3,
		9, null, 8],

	[null, null, 8, 
		4, 2, null,
		5, null, null],

	[8, 2, 7, 
		null, 4, null,
		null, 3, null],

	[null, null, null, 
		8, 3, null,
		6, null, 2],

	[null, 1, 3, 
		null, null, 7,
		null, 8, null]
]

const EASY_SOL = [
	[4, 9, 6, 
		2, 1, 8,
		7, 5, 3],

	[1, 5, 7, 
		3, 9, 6,
		2, 8, 4],

	[8, 3, 2, 
		7, 4, 5,
		1, 9, 6],

	[9, 6, 2, 
		1, 8, 5,
		3, 7, 4],

	[4, 1, 5, 
		7, 6, 3,
		9, 2, 8],

	[3, 7, 8, 
		4, 2, 9,
		5, 6, 1],

	[8, 2, 7, 
		6, 4, 9,
		5, 3, 1],

	[5, 4, 9, 
		8, 3, 1,
		6, 7, 2],

	[6, 1, 3, 
		2, 5, 7,
		9, 8, 4]
]

function MutableSquare(props) {
	const fontColour = props.value === props.solution ? "#2c3be0" : "red"
	return (
		<p 
			className="sudoku-square" 
			value={props.value}
			onClick={props.onClick} 
			style={{
				color: fontColour, 
				fontWeight: "900", 
				background: props.bgColour
			}} 
		>
			{props.value}
		</p>
	);
}

function FixedSquare(props) {
	return (
		<p 
			className="sudoku-square" 
			onClick={props.onClick} 
			style={{
				fontWeight: "900", 
				background: props.bgColour
			}}
		>
			{props.value}
		</p>
	);
}

function NumberButton(props) {
	if (numAllUsed(props.value, props.cells) || props.mistakes >= 3) {
		return (
			<button className="btn-blank" /> 
		)
	} else {
		return (
			<button 
				className="btn" 
				onClick={props.onClick} 
			>
				{props.value}
			</button>
		)
	}
}

function numAllUsed(num, cells) {
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

class SudokuBoardEasy extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			history: [
				{
					cells: EASY_GAME,
					highlights: [
						[false, false, false, false, false, false, false, false, false],
						[false, false, false, false, false, false, false, false, false],
						[false, false, false, false, false, false, false, false, false],
						[false, false, false, false, false, false, false, false, false],
						[false, false, false, false, false, false, false, false, false],
						[false, false, false, false, false, false, false, false, false],
						[false, false, false, false, false, false, false, false, false],
						[false, false, false, false, false, false, false, false, false],
						[false, false, false, false, false, false, false, false, false]
					],
					selectedBox: {
						cell: null,
						box: null
					}
				}
			],
			highlights: [
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false],
				[false, false, false, false, false, false, false, false, false]
			],
			selectedBox: {
				cell: null,
				box: null
			},
			mistakes: 0
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleClearClick = this.handleClearClick.bind(this);
		this.handleUndoClick = this.handleUndoClick.bind(this);
	}

	handleClick(i, j) {
		const history = this.state.history.slice(0, this.state.history.length)
		const current = history[history.length - 1]
		const cells = _.cloneDeep(current.cells.slice())
		const highlights = _.cloneDeep(this.state.highlights.slice())
		const hightlightRow = GRID[i][j].row
		const hightlightCol = GRID[i][j].col
		if (puzzleComplete(cells, EASY_SOL) || this.state.mistakes >= 3) {
			return
		}
		const selectedBox = {
			cell: i,
			box: j
		}
		for (let cell=0; cell<9; cell++) {
			for (let box=0; box<9; box++) {
				if (hightlightRow === GRID[cell][box].row || hightlightCol === GRID[cell][box].col || cell === i) {
					highlights[cell][box] = true
				} else {
					highlights[cell][box] = false
				}
			}
		}
		this.setState({
			history: history,
			highlights: highlights,
			selectedBox: selectedBox,
			mistakes: this.state.mistakes
		})
	}

	handleButtonClick(value) {
		const history = this.state.history.slice(0, this.state.history.length)
		const current = history[history.length - 1]
		const cells = _.cloneDeep(current.cells.slice())
		const highlights = _.cloneDeep(this.state.highlights.slice())
		const i =  this.state.selectedBox.cell
		const j =  this.state.selectedBox.box

		let numMistakes = this.state.mistakes
		if (puzzleComplete(cells, EASY_SOL) || numMistakes >= 3) {
			return
		}
		if (i !== null && j !== null) {
			if (EASY_GAME_FIXED[i][j] === null) {
				if (cells[i][j] === value) {
					cells[i][j] = null
				} else {
					cells[i][j] = value
					if (value !== EASY_SOL[i][j]) {
						numMistakes++
					}
				}
			}
			this.setState({
				history: history.concat([
					{
						cells: cells,
						highlights: highlights,
						selectedBox: this.state.selectedBox,
					}
				]),
				highlights: highlights,
				selectedBox: this.state.selectedBox,
				mistakes: numMistakes
			})
		}
	}

	handleClearClick() {
		const history = this.state.history.slice(0, this.state.history.length)
		const current = history[history.length - 1]
		const cells = _.cloneDeep(current.cells.slice())
		const highlights = _.cloneDeep(this.state.highlights.slice())
		const i = this.state.selectedBox.cell
		const j = this.state.selectedBox.box
		if (puzzleComplete(cells, EASY_SOL) || this.state.mistakes >= 3) {
			return
		}
		if (i !== null && j !== null) {
			if (EASY_GAME_FIXED[i][j] === null) {
				cells[i][j] = null
			}
			this.setState({
				history: history.concat([
					{
						cells: cells,
						highlights: highlights,
						selectedBox: this.state.selectedBox,
					}
				]),
				highlights: highlights,
				selectedBox: this.state.selectedBox,
				mistakes: this.state.mistakes
			})
		}
	}

	handleUndoClick() {
		const history = this.state.history.slice(0, this.state.history.length === 1 ? 1 : this.state.history.length - 1)
		const current = history[history.length - 1]
		const highlights = current.highlights.slice()
		const selectedBox = current.selectedBox
		
		this.setState({
			history: history,
			highlights: highlights,
			selectedBox: selectedBox,
			mistakes: this.state.mistakes
		})
	}

	renderSquare(i, j) {
		const history = this.state.history.slice(0, this.state.history.length)
		const current = history[history.length - 1]
		const cells = _.cloneDeep(current.cells.slice())
		const highlights = this.state.highlights.slice()
		const cell = this.state.selectedBox.cell
		const box = this.state.selectedBox.box

		let bgColourBox= "white"
		if (puzzleComplete(cells, EASY_SOL)) {
			bgColourBox = "cornsilk"
		} else if (this.state.mistakes >= 3) {
			bgColourBox = "rgb(220, 220, 220)"
		} else if (cell !== null && box !== null && !puzzleComplete(cells, EASY_SOL) && this.state.mistakes < 3) {
			if (i === cell && j === box) {
				bgColourBox = "lightskyblue"
			} else if (cells[i][j] === cells[cell][box] && cells[i][j] !== null) {
				bgColourBox = highlights[i][j] ? "pink" : "rgb(197, 197, 197)"
			} else if (highlights[i][j]) {
				bgColourBox = "rgb(220, 220, 220)"
			} else {
				bgColourBox = "white"
			}
		}
		
		if (EASY_GAME_FIXED[i][j] !== null) {
			return <FixedSquare 
				value={EASY_GAME_FIXED[i][j]} 
				bgColour={bgColourBox}
				onClick={() => this.handleClick(i, j)} />
		} else {
			return <MutableSquare 
				value={this.state.mistakes < 3 ? cells[i][j] : null} 
				bgColour={bgColourBox}
				onClick={() => this.handleClick(i, j)} 
				solution={EASY_SOL[i][j]} 
			/>
		}
	}

	renderCell(i) {
		return (
			<div className="cell">
				<div className="cell-row">
				{this.renderSquare(i, 0)}
				{this.renderSquare(i, 1)}
				{this.renderSquare(i, 2)}
				</div>
				<div className="cell-row">
				{this.renderSquare(i, 3)}
				{this.renderSquare(i, 4)}
				{this.renderSquare(i, 5)}
				</div>
				<div className="cell-row">
				{this.renderSquare(i, 6)}
				{this.renderSquare(i, 7)}
				{this.renderSquare(i, 8)}
				</div>
			</div>
		)
	}

	render() {
		const history = this.state.history.slice(0, this.state.history.length + 1)
		const current = history[history.length - 1]
		const cells = current.cells.slice()

		let status
		let statusColour
		if (this.state.mistakes >= 3) {
			status = "Game Over"
			statusColour = "red"
		} else if (puzzleComplete(cells, EASY_SOL)) {
			status = "Complete!"
			statusColour = "mediumseagreen"
		} else {
			status = "In Progress..."
			statusColour = "black"
		}
		const mistakesMessage = `Number of mistakes: ${this.state.mistakes}/3`
		console.log(history)

		return (
		<div>
			<div style={{color: statusColour, fontWeight: "bold", }}>{status}</div>
			<div>{mistakesMessage}</div>
			<br />
			<div className="row-cells">
			{this.renderCell(0)}
			{this.renderCell(1)}
			{this.renderCell(2)}
			</div>
			<div className="row-cells">
			{this.renderCell(3)}
			{this.renderCell(4)}
			{this.renderCell(5)}
			</div>
			<div className="row-cells">
			{this.renderCell(6)}
			{this.renderCell(7)}
			{this.renderCell(8)}
			</div>
			<div>
				<button className={status === "In Progress..." ? "btn-modes" : "btn-modes-blank"} onClick={() => this.handleClearClick()}>{status === "In Progress..." ? "Erase" : ""}</button>
				<button className={status === "In Progress..." ? "btn-modes" : "btn-modes-blank"} onClick={() => this.handleUndoClick()}>{status === "In Progress..." ? "Undo" : ""}</button>
				{/* <button className="btn-modes">Undo</button>
				<button className="btn-modes">Notes</button> */}
			</div>
			<div>
				<NumberButton value={1} onClick={() => this.handleButtonClick(1)} cells={cells} mistakes={this.state.mistakes} />
				<NumberButton value={2} onClick={() => this.handleButtonClick(2)} cells={cells} mistakes={this.state.mistakes} />
				<NumberButton value={3} onClick={() => this.handleButtonClick(3)} cells={cells} mistakes={this.state.mistakes} />
				<NumberButton value={4} onClick={() => this.handleButtonClick(4)} cells={cells} mistakes={this.state.mistakes} />
				<NumberButton value={5} onClick={() => this.handleButtonClick(5)} cells={cells} mistakes={this.state.mistakes} />
				<NumberButton value={6} onClick={() => this.handleButtonClick(6)} cells={cells} mistakes={this.state.mistakes} />
				<NumberButton value={7} onClick={() => this.handleButtonClick(7)} cells={cells} mistakes={this.state.mistakes} />
				<NumberButton value={8} onClick={() => this.handleButtonClick(8)} cells={cells} mistakes={this.state.mistakes} />
				<NumberButton value={9} onClick={() => this.handleButtonClick(9)} cells={cells} mistakes={this.state.mistakes} />
			</div>
		</div>
		);
	}
}
  
export class SudokuGameEasy extends React.Component {
	render() {
		return (
		<div className="game">
			<div className="game-board">
			<SudokuBoardEasy />
			</div>
		</div>
		);
	}
}

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