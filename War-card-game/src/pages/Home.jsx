import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app element for accessibility

function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div>
      <h1>Welcome to the War Card Game</h1>
      <h3>Wanna try your luck?</h3>
      <button onClick={startGame}>Start the Game</button>
      <button onClick={openModal}>Rules</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Game Rules"
      >
        <h2>Rules of War Card Game</h2>
        <p>The "War" card game is played as follows:</p>
        <ul>
         <li>Two players each draw a card from the deck.</li>
         <li>The player with the higher card wins the round.</li>
         <li>Card values: 2 = 2, 3 = 3, 4 = 4, 5 = 5, 6 = 6, 7 = 7, 8 = 8, 9 = 9, 10 = 10, J = 11, Q = 12, K = 13, A = 14</li>
         <li>If the cards are equal, it's a tie.</li>
         <li>The game continues until the deck is exhausted after 26 rounds.</li>
        </ul>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default Home;

