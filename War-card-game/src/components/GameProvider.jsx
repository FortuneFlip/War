import React, { useState } from 'react';
import GameContext from './GameContext';

function GameProvider({ children }) {
  const [deckId, setDeckId] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [result, setResult] = useState('');
  const [remaining, setRemaining] = useState(52);
  const [playerWins, setPlayerWins] = useState(0); // New state for player wins
  const [computerWins, setComputerWins] = useState(0); // New state for computer wins

  return (
    <GameContext.Provider value={{
      deckId, setDeckId,
      playerCard, setPlayerCard,
      computerCard, setComputerCard,
      result, setResult,
      remaining, setRemaining,
      playerWins, setPlayerWins,
      computerWins, setComputerWins,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameProvider;
