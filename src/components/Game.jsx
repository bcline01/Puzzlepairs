import Card from "./Card.jsx";
import "../styles/Game.css";
import bullImage from '../assets/Bull.png';
import cowImage from '../assets/Cow.png';
import horseImage from '../assets/Horse.png';
import pigImage from '../assets/Pig.png';
import rabbitImage from '../assets/Rabbit.png';
import sheepImage from '../assets/Sheep.png';
import React from 'react';
import { useState, useEffect } from "react";

const cardImages = [
    { id: 1, src: bullImage, matched: false },
    { id: 2, src: cowImage, matched: false },
    { id: 3, src: horseImage, matched: false },
    { id: 4, src: pigImage, matched: false },
    { id: 5, src: rabbitImage, matched: false },
    { id: 6, src: sheepImage, matched: false },
  ];

//   useStates

  function Game() {
    const [cards, setCards] = useState([]);
    const [firstChoice, setFirstChoice] = useState(null);
    const [secondChoice, setSecondChoice] = useState(null);
    const [turns, setTurns] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false); // New state for game over


    // shuffle the cards and "set them"
  
    const shuffleCards = () => {
      const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));
  
      setCards(shuffledCards);
      setTurns(0);
      setFirstChoice(null);
      setSecondChoice(null);
      setIsGameOver(false); // Reset game over state
      setTimer(0); 
      setIsTimerActive(true); 
      setIsGameOver(false);
    };
  
    // The handleChoice function is called whenever a player clicks on a card. 

    const handleChoice = (card) => {
      if (firstChoice && firstChoice.id === card.id) {
        return; // Ignore the second click if it's the same card
      }
      if (!isTimerActive) {
        setIsTimerActive(true); // Start the timer on first card click
      }
      firstChoice ? setSecondChoice(card) : setFirstChoice(card);
    };
  
    // check to see if 2 cards have been selected
    // check to see if those 2 cards match or not
    // if so (true) they stay and the turn is reset
    // if not (else) show both cards and reset the turn and update the turn count
    useEffect(() => {
      if (firstChoice && secondChoice) {
        if (firstChoice.src === secondChoice.src) {
          setCards((prevCards) => {
            return prevCards.map((card) => {
              if (card.src === firstChoice.src) {
                return { ...card, matched: true };
              } else {
                return card;
              }
            });
          });
          resetTurn();
        } else {
          setTimeout(() => resetTurn(), 1000);
        }
      }
    }, [firstChoice, secondChoice]);

      // Check if the game is over
  useEffect(() => {
    if (cards.length && cards.every(card => card.matched)) {
      setIsTimerActive(false);
     setTimeout(() => {
      setIsGameOver(true);
     }, 2000);
    }
  }, [cards]);
  
    const resetTurn = () => {
      setFirstChoice(null);
      setSecondChoice(null);
      setTurns((prevTurns) => prevTurns + 1);
    };
  
    // shuffle the cards when the game first begins- empty dependecny array so it is only called once
    useEffect(() => {
      shuffleCards();
    }, []);

      // Restart the game
  const restartGame = () => {
    shuffleCards();
    setIsTimerActive(false);
  };
  
    // sets timer to count up by 1 sec (1000)
    useEffect(() => {
      if (isTimerActive) {
        const interval = setInterval(() => {
          setTimer((prevTime) => prevTime + 1);
        }, 1000);
  
        return () => clearInterval(interval);
      }
    }, [isTimerActive]);
  
    useEffect(() => {
      if (cards.every((card) => card.matched)) {
        setIsTimerActive(false); 
      }
    }, [cards]);
  
    return (
      <div className="game">
        <div className="game-info">
          <h2 style={{ fontFamily: 'monospace' }}>Turns: {turns}</h2>
          <h2 style={{ fontFamily: 'monospace' }}>Time: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</h2>
        </div>
        <div className="grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              src={card.src}
              flipped={card === firstChoice || card === secondChoice || card.matched}
              handleChoice={() => handleChoice(card)}
            />
          ))}
        </div>
        {isGameOver && (
          <div className="modal-overlay">
          <div className="modal-content">
            <h2>Congratulations!</h2>
            <p>You've matched all the cards!</p>
            <button onClick={restartGame}>Restart Game</button>
          </div>
        </div>
      )}
    </div>
  );
}

  
    
  
  
  export default Game;