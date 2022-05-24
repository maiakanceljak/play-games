import React from "react"
import { Link, useLocation, Outlet } from "react-router-dom"
import "./style.css"
import {TicTacToeGame} from "./TicTacToe"
import {SudokuGameEasy} from "./SudokuWIP"

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
	const levels = [
		{id: 1, name: "Easy", url: "sudoku-easy"},
		{id: 2, name: "Medium", url: "sudoku-medium"},
		{id: 3, name: "Hard", url: "sudoku-hard"},
		{id: 4, name: "Expert", url: "sudoku-expert"}
	]

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

export function EasySudoku() {
	const levels = [
		{id: 2, name: "Medium", url: "sudoku-medium"},
		{id: 3, name: "Hard", url: "sudoku-hard"},
		{id: 4, name: "Expert", url: "sudoku-expert"}
	]

	return (
		<div>
			<h1 style={{display: "flex", justifyContent: "center", paddingTop: "25px"}}>Sudoku</h1>
			<h2 style={{display: "flex", justifyContent: "center", paddingTop: "35px"}}>Level: Easy</h2>
			<SudokuGameEasy />
			<a href="sudoku-easy" style={{display: "flex", alignItems: "left",justifyContent: "center", paddingTop: "20px"}}>Reset Game</a>
			<h3 style={{display: "flex", justifyContent: "center", paddingTop: "35px"}}>Try another level:</h3>
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

export function MediumSudoku() {
	return (
		<div>
			<h1 style={{display: "flex", justifyContent: "center", paddingTop: "25px"}}>Sudoku</h1>
			<h2 style={{display: "flex", justifyContent: "center", paddingTop: "35px"}}>Level: Medium</h2>
		</div>
	);
}

export function HardSudoku() {
	return (
		<div>
			<h1 style={{display: "flex", justifyContent: "center", paddingTop: "25px"}}>Sudoku</h1>
			<h2 style={{display: "flex", justifyContent: "center", paddingTop: "35px"}}>Level: Hard</h2>
		</div>
	);
}

export function ExpertSudoku() {
	return (
		<div>
			<h1 style={{display: "flex", justifyContent: "center", paddingTop: "25px"}}>Sudoku</h1>
			<h2 style={{display: "flex", justifyContent: "center", paddingTop: "35px"}}>Level: Expert</h2>
		</div>
	);
}

export function Crossword() {
	return (
		<div>
			<h1>[Crossword]</h1>
		</div>
	);    
}

export function CompanyHistory() {
	return (
		<div>
			<h2>Our Company History</h2>
		</div>
	);
}

export function Location() {
	return (
		<div>
			<h2>Our Location</h2>
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