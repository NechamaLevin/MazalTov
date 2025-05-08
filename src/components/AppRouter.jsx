import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LetterGenerator from "./card";
import Email from "./Email";



function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/main" element={<LetterGenerator/>} />
        <Route path="/Email" element={<Email/>} />

      </Routes>
    </Router>
  );
}

export default AppRouter;
