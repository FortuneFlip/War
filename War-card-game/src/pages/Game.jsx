import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../components/GameContext';

function Game() {
  const {
    deckId, setDeckId,
    playerCard, setPlayerCard,
    computerCard, setComputerCard,
    result, setResult,
    remaining, setRemaining,
    playerWins, setPlayerWins,
    computerWins, setComputerWins,
  } = useContext(GameContext);

  const [round, setRound] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        const data = await response.json();
        setDeckId(data.deck_id);
        setRemaining(data.remaining);
      } catch (error) {
        console.error('Error fetching deck:', error);
      }
    };

    fetchDeck();
  }, [setDeckId, setRemaining]);

  const drawCards = async () => {
    if (!deckId) return;

    try {
      const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
      const data = await response.json();
      setPlayerCard(data.cards[0]);
      setComputerCard(data.cards[1]);
      setRemaining(data.remaining);
      determineWinner(data.cards[0], data.cards[1]);

      // Check if the deck is empty
      if (data.remaining === 0) {
        navigate('/result'); // Navigate to the result page
      }
    } catch (error) {
      console.error('Error drawing cards:', error);
    }
  };

  const determineWinner = (playerCard, computerCard) => {
    const values = {
      "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
      "JACK": 11, "QUEEN": 12, "KING": 13, "ACE": 14
    };

    const playerValue = values[playerCard.value];
    const computerValue = values[computerCard.value];

    if (playerValue > computerValue) {
      setResult("Player Wins!");
      setPlayerWins(prevWins => prevWins + 1);
    } else if (computerValue > playerValue) {
      setResult("Computer Wins!");
      setComputerWins(prevWins => prevWins + 1);
    } else {
      setResult("It's a Tie!");
    }

    setRound(prevRound => prevRound + 1);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>War Card Game</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Round: {round}</h2>
        <p>Player Wins: {playerWins} | Computer Wins: {computerWins}</p>
      </div>
      {remaining > 0 ? (
        <>
          <button onClick={drawCards} disabled={!deckId}>Draw Cards</button>
          <div style={{ marginTop: "20px" }}>
            {playerCard && (
              <img src={playerCard.image} alt={playerCard.value} />
            )}
            <span style={{ margin: "0 20px" }}>vs</span>
            {computerCard && (
              <img src={computerCard.image} alt={computerCard.value} />
            )}
          </div>
          <h2>{result}</h2>
          <p>Cards remaining: {remaining}</p>
        </>
      ) : (
        <div>
          <h2>No more cards! Navigating to results...</h2>
        </div>
      )}
    </div>
  );
}

export default Game;


