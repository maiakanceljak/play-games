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
  Whoops404, 
  Location
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

// function App() {
//   return (
//     <div>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />}>
//           <Route path="services" element={<Services />} />
//           <Route path="history" element={<CompanyHistory />} />
//           <Route path="location" element={<Location />} />
//         </Route>
//         <Route path="/events" element={<Events />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="*" element={<Whoops404 />} />
//       </Routes>
//     </div>
//   );
// }

// function Header(props) {
//   return (
//     <header>
//       <h1>{props.name}'s Kitchen</h1>
//     </header>
//   );
// }

// function Main(props) {
//   return (
//     <section>
//       <p>We serve the most {props.adjective} food around.</p>
//       <img src={restaurant} height={200} alt="plate of food at a dinner table" />
//       <ul style={{textAlign: "left"}}>
//         {props.dishes.map((dish) => <li key={dish.id}>{dish.title}</li>)}
//       </ul>
//     </section>
//   );
// }

// function Footer(props) {
//   return (
//     <footer>
//       <p>Copyright {props.year}</p>
//     </footer>
//   );
// }

// const dishes = [
//   "Macaroni and Cheese",
//   "Salmon",
//   "Tofu with Vegetables",
//   "Minestrone"
// ];

// const dishObjects = dishes.map((dish, i) => ({id: i, title: dish}))

// function App() {
//   return (
//     <div className="App">
//       <Header name="Horacio" />
//       <Main adjective="amazing" dishes={dishObjects} />
//       <Footer year={new Date().getFullYear()} />
//     </div>
//   );
// }

export default App;
