import React from "react"
import "./style.css"
import _ from 'lodash'
import { puzzleComplete, GRID } from "./utils"
import { EASY_GAME_FIXED, EASY_SOL } from "./EasyGame"

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

export class Board extends React.Component {
	constructor(props) {
		super(props)
		this.solution = props.solution
		this.initial = props.initial
		this.state = {
			highlights: props.highlights,
			selected: props.selected,
		}
		this.cells = props.cells
		this.mistakes = props.mistakes
	}

	handleClick(i, j) {
		const highlights = _.cloneDeep(this.state.highlights.slice())
		const row = GRID[i][j].row
		const col = GRID[i][j].col

		if (puzzleComplete(this.cells, EASY_SOL) || this.state.mistakes >= 3) {
			return
		}
		for (let cell=0; cell<9; cell++) {
			for (let box=0; box<9; box++) {
				if (row === GRID[cell][box].row || col === GRID[cell][box].col || cell === i) {
					highlights[cell][box] = true
				} else {
					highlights[cell][box] = false
				}
			}
		}
		this.setState({
			highlights: highlights,
			selected: {cell: i,	box: j},
		})
	}

	renderSquare(i, j) {
		const cell = this.state.selected.cell
		const box = this.state.selected.box

		let bgColourBox= "white"
		if (puzzleComplete(this.cells, this.solution)) {
			bgColourBox = "cornsilk"
		} else if (this.mistakes >= 3) {
			bgColourBox = "rgb(220, 220, 220)"
		} else if (cell !== null && box !== null && !puzzleComplete(this.cells, this.solution) && this.mistakes < 3) {
			if (i === cell && j === box) {
				bgColourBox = "lightskyblue"
			} else if (this.cells[i][j] === this.cells[cell][box] && this.cells[i][j] !== null) {
				bgColourBox = this.state.highlights[i][j] ? "pink" : "rgb(197, 197, 197)"
			} else if (this.state.highlights[i][j]) {
				bgColourBox = "rgb(220, 220, 220)"
			} else {
				bgColourBox = "white"
			}
		}
		
		if (this.initial[i][j] !== null) {
			return <FixedSquare 
				value={EASY_GAME_FIXED[i][j]} 
				bgColour={bgColourBox}
				onClick={() => this.handleClick(i, j)}
      />
		} else {
			return <MutableSquare 
				value={this.mistakes < 3 ? this.cells[i][j] : null} 
				bgColour={bgColourBox}
				onClick={() => this.handleClick(i, j)}
				solution={this.solution[i][j]} 
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
		return (
		<>
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
		</>
		);
	}
}