// src/App.jsx

import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Game from './components/Game.jsx'; // Import the Game component
import './styles/App.css'; // Import global styles (if any)

function App() {
  return (
    <div className="App">
      <Header />
      <Game />
      <Footer />
    </div>
  );
}

export default App;
