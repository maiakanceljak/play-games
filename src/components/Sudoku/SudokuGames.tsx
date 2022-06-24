import { useState } from "react"
import "./style.css"
import { Game } from "./Game"
import { getFirstEmptyCell } from "./utils"
import { EASY_GAME, EASY_SOL } from './Games/EasyGame'
import { MED_GAME, MED_SOL } from "./Games/MediumGame"
import { HARD_GAME, HARD_SOL } from "./Games/HardGame"
import { EXP_GAME, EXP_SOL } from "./Games/ExpertGame"

type SudoduGameProps = {
	initial: (number | null)[][];
	solution: number[][];
}

function SudokuGame({initial, solution}: SudoduGameProps) {
	const { i, j } = getFirstEmptyCell(initial)
  const [game, setGame] = useState({
			history: [{
				cells: initial,
				selected: {
					cell: i,
					box: j
			}}],
		mistakes: 0,
		lastClickBox: false
	})

	return <Game initial={initial} solution={solution} game={game} setGame={setGame} />
}

export function EasyGame() {
	return <SudokuGame initial={EASY_GAME} solution={EASY_SOL} />
}

export function MediumGame() {
	return <SudokuGame initial={MED_GAME} solution={MED_SOL} />
}

export function HardGame() {
	return <SudokuGame initial={HARD_GAME} solution={HARD_SOL} />
}

export function ExpertGame() {
	return <SudokuGame initial={EXP_GAME} solution={EXP_SOL} />
}