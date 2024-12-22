import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReviewQuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions } = location.state; // Access questions passed from the result page
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleReturnToHome = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <header className="text-white text-center bg-blue-600 py-8 shadow-md">
        <h1 className="text-4xl font-extrabold">SmartClass</h1>
        <h2 className="text-lg mt-2">Review Quiz</h2>
      </header>

      <main className="flex-grow flex flex-col items-center mt-12 px-6">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
          <h3 className="text-xl font-bold mb-4">
            Question {currentQuestion + 1}/{questions.length}
          </h3>
          <p className="text-gray-700 mb-6">{questions[currentQuestion]?.question}</p>
          <div className="mb-4">
            {questions[currentQuestion]?.options.map((option, index) => (
              <div
                key={index}
                className={`block p-3 rounded-lg border ${
                  option.charAt(0) === questions[currentQuestion]?.correctAnswer?.charAt(0)
                    ? "bg-green-500 text-white"
                    : option.charAt(0) === questions[currentQuestion]?.userAnswer?.charAt(0)
                    ? "bg-red-500 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {option}
              </div>
            ))}
          </div>

          {/* Display User Answer vs. Correct Answer */}
          <div className="mt-4">
            <p>
              <strong>Your Answer: </strong>
              <span
                className={`${
                  questions[currentQuestion]?.userAnswer?.charAt(0) ===
                  questions[currentQuestion]?.correctAnswer?.charAt(0)
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }`}
              >
                {questions[currentQuestion]?.userAnswer || "No answer selected"}
              </span>
            </p>
            <p>
              <strong>Correct Answer: </strong>
              <span className="text-green-600 font-bold">
                {questions[currentQuestion]?.correctAnswer}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-between w-full max-w-2xl mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={handleBack}
            disabled={currentQuestion === 0}
          >
            Back
          </button>
          <button
            className="px-4 py-2 bg-gray-300 rounded-lg"
            onClick={handleReturnToHome}
          >
            Return to Home
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleNext}
            disabled={currentQuestion === questions.length - 1}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default ReviewQuizPage;

