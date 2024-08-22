import React from 'react';
// import { Routes, Route } from 'react-router-dom';
import Game from './pages/Game'; // Assuming Game component is here
// import Home from './components/Home.jsx'; // Assuming Home component is here
// import Result from './components/Result.jsx'; // Assuming Result component is here
// import NotFound from './components/NotFound.jsx'; // Assuming NotFound component is here

function App() {
  return (
    <>
    <Game />
      {/* <Routes> */}
        {/* <Route path="/" element={<Dashboard />}></Route> */}
        {/* <Route path="/home" element={<Home />}></Route> */}
        {/* <Route path="/game" element={<Game />}></Route> */}
        {/* <Route path="/result" element={<Result />}></Route> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      {/* </Routes> */}
    </>
  );
}

export default App;
