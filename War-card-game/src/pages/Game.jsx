import React, { useContext, useEffect } from 'react';
import { GameContext } from '../components/GameContext';

function Game() {
  const {
    deckId, setDeckId,
    playerCard, setPlayerCard,
    computerCard, setComputerCard,
    result, setResult,
    remaining, setRemaining,
  } = useContext(GameContext);

  useEffect(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(response => response.json())
      .then(data => {
        setDeckId(data.deck_id);
        setRemaining(data.remaining);
      });
  }, [setDeckId, setRemaining]);

  const drawCards = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
      .then(response => response.json())
      .then(data => {
        setPlayerCard(data.cards[0]);
        setComputerCard(data.cards[1]);
        setRemaining(data.remaining);
        determineWinner(data.cards[0], data.cards[1]);
      });
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
    } else if (computerValue > playerValue) {
      setResult("Computer Wins!");
    } else {
      setResult("It's a Tie!");
    }
  };

  const reshuffleDeck = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/shuffle/`)
      .then(response => response.json())
      .then(data => {
        setRemaining(data.remaining);
        setPlayerCard(null);
        setComputerCard(null);
        setResult("");
      });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>War Card Game</h1>
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
          <h2>No more cards! Reshuffle the deck?</h2>
          <button onClick={reshuffleDeck}>Reshuffle Deck</button>
        </div>
      )}
    </div>
  );
}

export default Game;