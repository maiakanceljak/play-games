import React from "react"
import "./style.css"
import _ from 'lodash'
import { puzzleComplete, numAllUsed } from "./utils"
import { EASY_GAME, EASY_GAME_FIXED, EASY_SOL } from "./EasyGame"
import { Board } from "./Board"

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

function SudokuBoard(props) {
	return (
		<>
			<div className="row-cells">
			{props.board.renderCell(0)}
			{props.board.renderCell(1)}
			{props.board.renderCell(2)}
			</div>
			<div className="row-cells">
			{props.board.renderCell(3)}
			{props.board.renderCell(4)}
			{props.board.renderCell(5)}
			</div>
			<div className="row-cells">
			{props.board.renderCell(6)}
			{props.board.renderCell(7)}
			{props.board.renderCell(8)}
			</div>
		</>
	)
}

export class Game extends React.Component {
	constructor(props) {
		super(props)
		this.solution = EASY_SOL
		this.initial = EASY_GAME_FIXED
		this.state = {
			history: [
				new Board({
					solution: EASY_SOL,
					initial: EASY_GAME_FIXED,
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
					selected: {cell: null, box: null},
					cells: EASY_GAME,
					mistakes: 0
        })
			],
			mistakes: 0
		}
	}

	handleNumberButtonClick(value) {
		const history = this.state.history.slice(0, this.state.history.length)
		const current = history[history.length - 1]
		const cells = _.cloneDeep(current.cells.slice())
		const highlights = _.cloneDeep(current.state.highlights.slice())
		const i =  _.cloneDeep(current.state.selected.cell)
		const j =  _.cloneDeep(current.state.selected.box)

		console.log(current)

		let numMistakes = this.state.mistakes
		if (puzzleComplete(cells, this.solution) || numMistakes >= 3) {
			return
		}
		if (i !== null && j !== null) {
			if (this.initial[i][j] === null) {
				if (cells[i][j] === value) {
					cells[i][j] = null
				} else {
					cells[i][j] = value
					if (value !== this.solution[i][j]) {
						numMistakes++
					}
				}
			}
			this.setState({
				history: history.concat([
					new Board({
						solution: _.deepClone(EASY_SOL.slice()),
						initial: _.deepClone(EASY_GAME_FIXED.slice()),
						highlights: highlights,
						selected: {cell: i,	box: j},
						cells: cells,
						mistakes: numMistakes
					})
				]),
				mistakes: numMistakes
			})
		}
	}

	handleClearClick() {
		const history = this.state.history.slice(0, this.state.history.length)
		const current = history[history.length - 1]
		const cells = _.cloneDeep(current.cells.slice())
		const highlights = _.cloneDeep(current.state.highlights.slice())
		const i =  _.cloneDeep(current.state.selected.cell)
		const j =  _.cloneDeep(current.state.selected.box)

		if (puzzleComplete(cells, this.solution) || this.state.mistakes >= 3) {
			return
		}
		if (i !== null && j !== null) {
			if (this.initial[i][j] === null) {
				cells[i][j] = null
			}
			this.setState({
				history: history.concat([
					new Board({
						solution: _.deepClone(EASY_SOL.slice()),
						initial: _.deepClone(EASY_GAME_FIXED.slice()),
						highlights: highlights,
						selected: {cell: i,	box: j},
						cells: cells,
						mistakes: this.state.mistakes
					})
				]),
				mistakes: this.state.mistakes
			})
		}
	}

	handleUndoClick() {
		const history = this.state.history.slice(0, this.state.history.length === 1 ? 
			1 : this.state.history.length - 1)
		const current = history[history.length - 1]
		const cells = _.cloneDeep(current.cells.slice())
		const highlights = _.cloneDeep(current.state.highlights.slice())
		const selected = _.cloneDeep(current.state.selected)

		if (puzzleComplete(cells, this.solution) || this.state.mistakes >= 3 || history.length === 1) {
			return
		}

		const newHistory = history.slice(0, history.length - 1)
		this.setState({
			history: newHistory.concat([
				new Board({
					solution: _.deepClone(EASY_SOL.slice()),
						initial: _.deepClone(EASY_GAME_FIXED.slice()),
						highlights: highlights,
						selected: selected,
						cells: cells,
						mistakes: this.state.mistakes
				})
			]),
			mistakes: this.state.mistakes
		})
	}

	renderNumberButtons(cells, mistakes) {
		const values = [1,2,3,4,5,6,7,8,9]
		return (
			<>
				{values.map((val) => {
					return (
						<NumberButton key={val} value={val} onClick={() => this.handleNumberButtonClick(val)} cells={cells} mistakes={mistakes} />
					)})
				}
			</>
		)
	}

	render() {
		const history = this.state.history.slice(0, this.state.history.length)
		const current = history[history.length - 1]
		const cells = _.cloneDeep(current.cells.slice())

		let status
		let statusColour
		if (this.state.mistakes >= 3) {
			status = "Game Over"
			statusColour = "red"
		} else if (puzzleComplete(cells, this.solution)) {
			status = "Complete!"
			statusColour = "mediumseagreen"
		} else {
			status = "In Progress..."
			statusColour = "black"
		}
		const mistakesMessage = `Number of mistakes: ${this.state.mistakes}/3`
		console.log(history)

		return (
		<div className="game">
			<div className="game-board">
				<div style={{color: statusColour, fontWeight: "bold"}}>{status}</div>
				<div>{mistakesMessage}</div>
				<br />
				<SudokuBoard board={current}/>
				<div>
					<button className={status === "In Progress..." ? "btn-modes" : "btn-modes-blank"} onClick={() => this.handleClearClick()}>{status === "In Progress..." ? "Erase" : ""}</button>
					<button className={status === "In Progress..." ? "btn-modes" : "btn-modes-blank"} onClick={() => this.handleUndoClick()}>{status === "In Progress..." ? "Undo" : ""}</button>
					{/* <button className="btn-modes">Notes</button> */}
				</div>
				<div>
					{this.renderNumberButtons(cells, this.state.mistakes)}
				</div>
			</div>
		</div>
		);
	}
}