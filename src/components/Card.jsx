import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Card.css'; 
import puzzleImage from '../assets/PP.png';

function Card({ src, flipped, handleChoice }) {
  return (
    <motion.div
      className="card"
      onClick={handleChoice}
      whileHover={{ scale: 1.05 }} // Slightly scale up on hover
      whileTap={{ scale: 0.95 }} // Slightly scale down on click
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`card-inner ${flipped ? "flipped" : ""}`}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <img
          className="card-front"
          src={puzzleImage}
          alt="card front"
        />
        <img
          className="card-back"
          src={src} // Update with your card back image path
          alt="card back"
        />
      </motion.div>
    </motion.div>
  );
}

export default Card;


