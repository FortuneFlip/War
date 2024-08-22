import { useState } from 'react';

// Create the provider component
const GameProvider = ({ children }) => {
  const [deckId, setDeckId] = useState(null);
  const [playerCard, setPlayerCard] = useState(null);
  const [computerCard, setComputerCard] = useState(null);
  const [result, setResult] = useState("");
  const [remaining, setRemaining] = useState(0);

  let contextValues = {
    deckId, setDeckId,
    playerCard, setPlayerCard,
    computerCard, setComputerCard,
    result, setResult,
    remaining, setRemaining,
  }

  return (
    <GameContext.Provider value={contextValues}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider