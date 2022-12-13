import React from 'react';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Homepage from './Pages/Homepage';
import About from './Pages/About';
import { Routes, Route } from 'react-router-dom';
import './styles/style.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
