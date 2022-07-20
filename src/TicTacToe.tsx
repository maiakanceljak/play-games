import { useState } from "react"
import "./style.css"

const basicGrid = [
	{
		id: 0,
		inner: [0,1,2]
	},
	{
		id: 1,
		inner: [3,4,5]
	},
	{
		id: 2,
		inner: [6,7,8]
	}
]

type SquareProps = {
	value: string | null;
	onClick: () => void;
}

type GameType = {
	squares: (string | null)[];
	xIsNext: boolean;
}

type BoardProps = {
	game: GameType;
	setGame: (game: any) => void;
}

function calculateWinner(squares: (string | null)[]) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}

function handleClick(i: number, squares: (string | null)[], xIsNext: boolean): GameType {
		if (calculateWinner(squares) || squares[i]) {
			return {
				squares: squares,
				xIsNext: xIsNext
			};
		}
		squares[i] = xIsNext ? 'X' : 'O';
		return {
			squares: squares,
			xIsNext: !xIsNext
		};
}

function Square({value, onClick}: SquareProps) {
	return (
		<button className="square" onClick={onClick}>
			{value}
		</button>
	);
}

function Board({game, setGame}: BoardProps) {
	const squares = [...game.squares]
	const xIsNext = game.xIsNext
	const winner = calculateWinner(squares)
		let status;
		if (winner) {
			status = 'Winner: ' + winner
		} else {
			status = 'Next player: ' + (game.xIsNext ? 'X' : 'O');
		}

		return (
			<div>
				<div className="status">{status}</div>
				{basicGrid.map(i =>
					<div key={i.id} className="board-row">{
						i.inner.map(value =>
							<Square key={value} value={squares[value]} onClick={() => setGame(handleClick(value, squares, xIsNext))}/>)}
					</div>
				)}
			</div>
		);
}

export function TicTacToeGame() {
	const [game, setGame] = useState({
		squares: [null, null, null, null, null, null, null, null, null],
		xIsNext: true
	})
	return (
		<div className="game" style={{display: "flex", justifyContent: "center", paddingTop: "25px"}}>
			<div className="game-board">
			<Board game={game} setGame={setGame}/>
			</div>
		</div>
	);
}
