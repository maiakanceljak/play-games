import "./style.css"
import { cloneDeep } from 'lodash'
import { Board } from "./Board"
import { numAllUsed, gameStatus, GameType, handleClearClick, handleUndoClick, handleNumberClick } from "./utils"

type NumberButtonProps = {
	value: number;
	cells: (number | null)[][];
	mistakes: number;
	onClick: () => void;
}

type ClearButtonProps = {
	status: string;
	onClick: () => void;
	message: string;
}

type GameProps = {
	initial: (number | null)[][];
	solution: number[][];
	game: GameType;
	setGame: (game: GameType) => void;
}

function NumberButton({value, cells, mistakes, onClick}: NumberButtonProps) {
	if (numAllUsed(value, cells) || mistakes >= 3) {
		return <button className="btn-blank" /> 
	}
	return <button className="btn" onClick={onClick} >{value}</button>
}

function ClearButton({status, onClick, message}: ClearButtonProps) {
	return <button className={status === "In Progress..." ? "btn-modes" : "btn-modes-blank"} onClick={onClick}>{status === "In Progress..." ? message : ""}</button>
}

export function Game({initial, solution, game, setGame}: GameProps) {
	const history = [...game.history]
	const current = history[history.length - 1]
	const cells = cloneDeep([...current.cells])
	const status = gameStatus(game.mistakes, solution, cells)

	return (
		<div className="game">
			<div className="game-board">
				<div style={{color: status.colour, fontWeight: "bold"}}>{status.message}</div>
				<div>{`Number of mistakes: ${game.mistakes}/3`}</div>
				<br />
				<Board game={game} initial={initial} solution={solution} setGame={setGame}/>
				<div>
					<ClearButton 
						status={status.message} 
						message={"Erase"}
						onClick={() => setGame(handleClearClick(game, current.selected.cell, current.selected.box, initial, solution, history, cells))}
					/>
					<ClearButton 
						status={status.message} 
						message={"Undo"} 
						onClick={() => setGame(handleUndoClick(game, history))}
					/>
				</div>
				<div>
					{[1,2,3,4,5,6,7,8,9].map(val => 
						<NumberButton 
							key={val} 
							value={val} 
							cells={cells} 
							mistakes={game.mistakes} 
							onClick={() => setGame(handleNumberClick(val, game, current.selected.cell, current.selected.box, initial, solution, history, cells))}
						/>
					)}
				</div>
			</div>
		</div>
	)
}