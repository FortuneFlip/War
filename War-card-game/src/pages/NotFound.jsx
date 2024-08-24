import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Maybe you are looking for the <Link to="/">War game</Link>?</p>
    </div>
  );
}

export default NotFound;