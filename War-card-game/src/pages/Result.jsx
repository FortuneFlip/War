import React, { useEffect, useState, useContext, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../components/GameContext';
// import Spline from '@splinetool/react-spline';
import './Result.css'; // Import the CSS file

// Lazy load Spline component
const Spline = React.lazy(() => import('@splinetool/react-spline'));

function Result() {
  const { playerWins, computerWins, difficulty, finalRes, decision } = useContext(GameContext);
  const navigate = useNavigate();
  const [likes, setLikes] = useState(0);
  const [error, setError] = useState(null);

  const resultMessageMap = {
    Hard: `You chose the Hard mode! You're ${decision}`,
    Medium: `You played on Medium difficulty! You're ${decision}`,
    Easy: `Easy mode, but was it that easy? You're ${decision}`,
    Luck: `Luck mode was all about fate! ${finalRes}`,
  };

  const headingMessage = resultMessageMap[difficulty];

  // Fetch the current number of likes from the mock API
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch('http://localhost:4000/likes');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setLikes(data[0]?.count || 0); // Adjust if the structure of your data is different
      } catch (error) {
        setError(`Error fetching likes: ${error.message}`);
        console.error(error);
      }
    };

    fetchLikes();
  }, []);

  // Handle liking the result
  const handleLike = async () => {
    try {
      const response = await fetch('http://localhost:4000/likes/1', { // Assuming like item ID is 1
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: likes + 1 })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setLikes(data.count);
    } catch (error) {
      setError(`Error liking: ${error.message}`);
      console.error(error);
    }
  };

  const restartGame = () => {
    navigate('/');
  };

  return (
    <div className="result-container">
      <div className="spline-container">
        <Suspense fallback={<div>Loading...</div>}>
          <Spline scene="https://prod.spline.design/eKJR5rYNhgNkNalC/scene.splinecode" />
        </Suspense>
      </div>
      <div className="content">
        <div className="small-star-container">
          <button onClick={restartGame} className="try-again-button">Try Again</button>
        </div>
        <div className="animated-container">
          <div className="scroll-content">
            <div className="scroll-item">
              <div className="stats-container">
                <h2>Final Scores</h2>
                <p>Player Wins: {playerWins}</p>
                <p>Computer Wins: {computerWins}</p>
              </div>
              <div className="star-container">
                <h1>{headingMessage}</h1>
              </div>
            </div>
            <div className="scroll-item">
              <div className="stats-container">
                <h2>Final Scores</h2>
                <p>Player Wins: {playerWins}</p>
                <p>Computer Wins: {computerWins}</p>
              </div>
              <div className="star-container">
                <h1>{headingMessage}</h1>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleLike} className="like-button">Like</button>
        <h3>Leave a Like: {likes}</h3>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default Result;








