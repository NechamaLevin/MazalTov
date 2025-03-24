import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LetterGenerator from "./card";



function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<LetterGenerator/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
