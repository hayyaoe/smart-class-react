// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TranscriptionPage from "./components/TranscriptionPage";
import TranscriptPage from "./components/TranscriptPage";
import SummaryMindMapPage from "./components/SummaryMindMapPage";
import HomePage from "./components/HomePage";
import SettingsPage from "./components/SettingsPage";
import QuizPage from "./components/QuizPage";
import QuizResult from "./components/QuizResult";
import ReviewQuizPage from "./components/ReviewQuizPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/transcription" element={<TranscriptionPage />} />
        <Route path="/transcript" element={<TranscriptPage />} />
        <Route path="/summary" element={<SummaryMindMapPage />} />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<QuizResult />} />
        <Route path="/review" element={<ReviewQuizPage />} />
      </Routes>
    </Router>
  );
};

export default App;
