import React from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import "./style.css"
import {TicTacToeGame} from "./TicTacToe"
import { EasyGame, MediumGame, HardGame, ExpertGame } from "./components/Sudoku/SudokuGames"

const levels = [
	{id: 1, name: "Easy", url: "sudoku-easy"},
	{id: 2, name: "Medium", url: "sudoku-medium"},
	{id: 3, name: "Hard", url: "sudoku-hard"},
	{id: 4, name: "Expert", url: "sudoku-expert"}
]

export function Home() {
	const games = [
		{id: 1, name: "Tic Tac Toe", url: "tictactoe"},
		{id: 2, name: "Sudoku", url: "sudoku"},
		{id: 3, name: "Crossword", url: "crossword"}
	]

	return (
		<div>
			<h1 style={{display: "flex", justifyContent: "center", paddingTop: "25px"}}>Welcome to PlayGames!</h1>
			<h2 style={{display: "flex", justifyContent: "center", paddingTop: "35px"}}>Choose which game you'd like to play:</h2>
			<ul>
				{games.map((game) => {
					return (
						<a key={game.id} href={game.url} style={{display: "flex", alignItems: "left",justifyContent: "center", paddingTop: "20px"}}>{game.name}</a>
					)})
				}
			</ul>
		</div>
	);    
}

export function TicTacToe() {
	return (
		<div >
			<h1 style={{display: "flex", justifyContent: "center", paddingTop: "25px"}}>Tic Tac Toe</h1>
			<TicTacToeGame style={{display: "flex", justifyContent: "center", paddingTop: "25px"}}/>
			<a href="tictactoe" style={{display: "flex", alignItems: "left",justifyContent: "center", paddingTop: "20px"}}>New Game</a>
		</div> 
	);    
}

export function Sudoku() {
	return (
		<div>
			<h1 style={{display: "flex", justifyContent: "center", paddingTop: "25px"}}>Sudoku</h1>
			<h2 style={{display: "flex", justifyContent: "center", paddingTop: "35px"}}>Choose a level of difficulty:</h2>
			<ul>
				{levels.map((level) => {
					return (
						<a key={level.id} href={level.url} style={{display: "flex", alignItems: "left",justifyContent: "center", paddingTop: "20px"}}>{level.name}</a>
					)})
				}
			</ul>
		</div>
	);    
}

function SudokuPage({levelTitle, link, SudokuGame}) {
	return (
		<div>
			<h1 style={{display: "flex", justifyContent: "center", paddingTop: "25px"}}>Sudoku</h1>
			<h2 style={{display: "flex", justifyContent: "center", paddingTop: "35px"}}>Level: {levelTitle}</h2>
			<a href={link} style={{display: "flex", alignItems: "center",justifyContent: "center", paddingTop: "20px"}}>Reset Game</a>
			<SudokuGame />			
			<h3 style={{display: "flex", justifyContent: "center", paddingTop: "35px"}}>Try another level:</h3>
			<ul>
				{	levels.map((level) => {
					if (level.name !== levelTitle) {
						return (
							<a key={level.id} href={level.url} style={{display: "flex", alignItems: "left",justifyContent: "center", paddingTop: "20px"}}>{level.name}</a>
						)
					}
					return <></>
				})}
			</ul>
		</div>
	)
}

export function EasySudoku() {
	return<SudokuPage levelTitle={"Easy"} link={"sudoku-easy"} SudokuGame={EasyGame} />
}

export function MediumSudoku() {
	return <SudokuPage levelTitle={"Medium"} link={"sudoku-medium"} SudokuGame={MediumGame} />
}

export function HardSudoku() {
	return <SudokuPage levelTitle={"Hard"} link={"sudoku-hard"} SudokuGame={HardGame} />
}

export function ExpertSudoku() {
	return <SudokuPage levelTitle={"Expert"} link={"sudoku-expert"} SudokuGame={ExpertGame} />
}

export function Crossword() {
	return (
		<div>
			<h1>[Crossword]</h1>
		</div>
	);    
}

export function Whoops404() {
	let location = useLocation();
	console.log(location);
	return (
		<div>
			<h1>Resource not found at {location.pathname}!</h1>
		</div>
	);
}