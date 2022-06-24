import "./style.css"
import { cloneDeep } from 'lodash'
import { basicGrid, highlightColour, handleBoxClick, GameType } from "./utils"

type SquareProps = {
	fixed: number | null;
	colour: string;
	value: number | null;
	solution: number;
	onClick: () => void;
}

type CellProps = {
	game: GameType
	cell: number;
	initial: (number | null)[][];
	solution: number[][];
	setGame: Function;
}

type BoardProps = {
	game: GameType
	initial: (number | null)[][];
	solution: number[][];
	setGame: Function;
}

function Square({fixed, colour, value, solution, onClick}: SquareProps) {
	return (
		<p 
			className="sudoku-square" 
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

function Cell({game, cell, initial, solution, setGame}: CellProps) {
	const history = [...game.history]
	const current = history[game.history.length - 1]
	const cells = cloneDeep([...current.cells])

	return (
		<div className="cell">
			{basicGrid.map(i =>
				<div key={i.id} className="cell-row">{
					i.inner.map(box =>
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

export function Board({game, initial, solution, setGame}: BoardProps) {
	return (
		<>
			{basicGrid.map(i =>
				<div key={i.id} className="row-cells">{
					i.inner.map(j =>
						<Cell key={j} game={game} cell={j} initial={initial} solution={solution} setGame={setGame} />)}
				</div>
			)}
		</>
	)
}
