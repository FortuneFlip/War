import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../components/GameContext';

function Result() {
  const { playerWins, computerWins } = useContext(GameContext);
  const navigate = useNavigate();

  const restartGame = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Game Over</h1>
      <p>Player Wins: {playerWins}</p>
      <p>Computer Wins: {computerWins}</p>
      <h2>{playerWins > computerWins ? "Player is the overall winner!" : "Computer is the overall winner!"}</h2>
      <button onClick={restartGame}>Try Again</button>
    </div>
  );
}

export default Result;
