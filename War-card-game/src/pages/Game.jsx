import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../components/GameContext';
import Modal from 'react-modal'; // Ensure Modal is imported correctly

// Ensure that you set the app element for accessibility
Modal.setAppElement('#root');

function Game() {
  const {
    deckId, setDeckId,
    playerCard, setPlayerCard,
    computerCard, setComputerCard,
    result, setResult,
    finalRes, setFinalRes,
    remaining, setRemaining,
    playerWins, setPlayerWins,
    computerWins, setComputerWins,
    difficulty, // Retrieve the difficulty from the context
    setDecision
  } = useContext(GameContext);

  const [round, setRound] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hideStats, setHideStats] = useState(false); // State to manage hiding stats in "Memory" mode
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

  useEffect(() => {
    // Logic to hide stats based on difficulty in "Memory" mode
    if (difficulty === 'Hard') {
      setHideStats(true);
    } else if (difficulty === 'Medium' && round > 13) {
      setHideStats(true);
    } else if (difficulty === 'Easy' && round > 18) {
      setHideStats(true);
    }
  }, [round, difficulty]);

  useEffect(() => {
    // Determine the final result based on player and computer wins
    if (playerWins > computerWins) {
      setFinalRes("Player Wins!");
    } else if (computerWins > playerWins) {
      setFinalRes("Computer Wins!");
    } else {
      setFinalRes("It's a Tie!");
    }
  }, [playerWins, computerWins]);

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
        if (difficulty !== 'Luck') {
          setModalIsOpen(true);
        } else {
          navigate('/result'); // Navigate to the result page
        }
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

  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/result');
  };

  const handlePlayerChoice = (choice) => {
    // Compare the player's choice with the actual result
    if (choice === 'player' && finalRes === 'Player Wins!') {
      setDecision("right, player won!");
    } else if (choice === 'computer' && finalRes === 'Computer Wins!') {
      setDecision("right, computer won!");
    } else if (choice === 'tie' && finalRes === "It's a Tie!") {
      setDecision("right, both player and computer tied!");
    } else {
      setDecision(`wrong. ${finalRes}`)
    }
    closeModal();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>War Card Game</h1>
      <div style={{ marginBottom: "20px" }}>
        <h2>Round: {round}</h2>
        {!hideStats && (
          <p>Player Wins: {playerWins} | Computer Wins: {computerWins}</p>
        )}
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

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Who Won?"
      >
        <h2>Who won the game?</h2>
        <button onClick={() => handlePlayerChoice('player')}>Player</button>
        <button onClick={() => handlePlayerChoice('computer')}>Computer</button>
        <button onClick={() => handlePlayerChoice('tie')}>Tie</button>
      </Modal>
    </div>
  );
}

export default Game;



