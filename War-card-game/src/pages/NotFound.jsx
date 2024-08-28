import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>Maybe you are looking for the <Link to="/">War game</Link>?</p>
    </div>
  );
}

export default NotFound;
