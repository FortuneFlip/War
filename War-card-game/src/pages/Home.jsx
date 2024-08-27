import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import GameContext from '../components/GameContext';

Modal.setAppElement('#root'); // Set the app element for accessibility

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { setDifficulty, setPlayerWins, setComputerWins} = useContext(GameContext); // Correct usage of useContext
  const [difficulty, setDifficultyState] = useState('Luck'); // Set 'Luck' as default
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const startGame = () => {
    // Set the difficulty in the GameContext
    setDifficulty(difficulty);
    setPlayerWins(0); // Reset player wins to 0
    setComputerWins(0); // Reset computer wins to 0
    console.log({difficulty})
    navigate('/game');
  };

  const handleDifficultyChange = (event) => {
    setDifficultyState(event.target.value); // Update local state
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the War Card Game</h1>
      <h2>Wanna try your luck?</h2>
      <h3>Or would you like to test your memory?</h3>
      <button onClick={startGame}>Start the Game</button>
      <button onClick={openModal}>Rules</button>
      <div style={{ marginTop: '20px' }}>
        <label htmlFor="difficulty">Select Difficulty: </label>
        <select id="difficulty" value={difficulty} onChange={handleDifficultyChange}>
          <option value="Luck">Luck</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Game Rules"
      >
        <h2>Rules of War Card Game</h2>
        <p>In "Luck" gameplay mode:</p>
        <ul>
          <li>Two players each draw a card from the deck.</li>
          <li>The player with the higher card wins the round.</li>
          <li>Card values: 2 = 2, 3 = 3, 4 = 4, 5 = 5, 6 = 6, 7 = 7, 8 = 8, 9 = 9, 10 = 10, J = 11, Q = 12, K = 13, A = 14</li>
          <li>If the cards are equal, it's a tie.</li>
          <li>The game continues until the deck is exhausted after 26 rounds.</li>
        </ul>
        <p>In "Memory" gameplay mode:</p>
        <ul>
          <li>Win stats are hidden based on the difficulty level:</li>
          <li>Easy: Stats are hidden after the 18th round.</li>
          <li>Medium: Stats are hidden after the 13th round.</li>
          <li>Hard: Stats are hidden from the start.</li>
          <li>You have to choose whether the player won or the computer won.</li>
        </ul>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Home;


