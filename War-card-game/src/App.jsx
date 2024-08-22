import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Game from "./pages/Game"
import Result from "./pages/Result"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Dashboard />}></Route> */}
        <Route path="/home" element={<Home />}></Route>
        <Route path="/game" element={<Game />}></Route>
        <Route path="/result" element={<Result />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
