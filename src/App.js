import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar/navbar';
// import restaurant from "./restaurant.jpg"
import {
  Home,
  TicTacToe,
  Sudoku,
  Crossword,
  EasySudoku,
  MediumSudoku,
  HardSudoku,
  ExpertSudoku,
  Whoops404
} from "./pages"

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
        <Route path="/sudoku" element={<Sudoku />} />
          <Route path="/sudoku-easy" element={<EasySudoku />} />
          <Route path="/sudoku-medium" element={<MediumSudoku />} />
          <Route path="/sudoku-hard" element={<HardSudoku />} />
          <Route path="/sudoku-expert" element={<ExpertSudoku />} />
        <Route path="/crossword" element={<Crossword />} />
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </div>
  );
}

export default App;
