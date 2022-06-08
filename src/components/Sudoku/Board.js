import React from "react"
import "./style.css"
import _ from 'lodash'
import { basicGrid, highlightColour, handleBoxClick } from "./utils"

function Square({fixed, colour, value, solution, onClick}) {
	return (
		<p 
			className="sudoku-square" 
			value={value}
			onClick={onClick} 
			style={{
				color: fixed ? "black" : value === solution ? "#2c3be0" : "red", 
				fontWeight: "900", 
				background: colour
			}} 
		>
			{value}
		</p>
	)
}

function Cell({game, cell, initial, solution, setGame}) {
	const history = [...game.history]
	const current = history[game.history.length - 1]
	const cells = _.cloneDeep([...current.cells])

	return (
		<div className="cell">
			{basicGrid.map(i =>
				<div key={i} className="cell-row">{
					i.map(box =>
						<Square 
							key={box}
							fixed={initial[cell][box]}
							colour={highlightColour(current.selected.cell, current.selected.box, cell, box, cells, game.mistakes, solution)}
							value={cells[cell][box]}
							solution={solution[cell][box]}
							onClick={() => setGame(handleBoxClick(game, cell, box, solution, history, cells))}
						/>)}
				</div>
			)}
		</div>
	)
}

export function Board({game, initial, solution, setGame}) {
	return (
		<>
			{basicGrid.map(i =>
				<div key={i} className="row-cells">{
					i.map(j =>
						<Cell key={j} game={game} cell={j} initial={initial} solution={solution} setGame={setGame} />)}
				</div>
			)}
		</>
	)
}
