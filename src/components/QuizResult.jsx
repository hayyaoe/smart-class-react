import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const QuizResult = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve the quiz result data from location.state
  const { score, totalQuestions, questions  } = location.state || {};

  // Calculate the correct answers based on the score and totalQuestions
  const correctAnswersPercentage = Math.round((score / totalQuestions) * 100);

  const handleFinishQuiz = () => {
    navigate("/");
  };

  const handleReviewQuiz = () => {
    navigate("/review", {state: {questions}});
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      {/* Header */}
      <header className="text-white text-center">
        <div className="bg-blue pt-12 pb-12 shadow-md rounded-b-3xl fixed top-0 left-0 w-full z-10">
          <h1 className="text-4xl font-extrabold tracking-wide">smartclass</h1>
        </div>

        {/* Title */}
        <div className="fixed top-28 left-1/2 transform -translate-x-1/2 w-80 z-20">
          <div className="bg-white text-blue font-semibold text-lg px-6 py-3 rounded-full shadow-lg w-full">
            <h2 className="text-xl font-semibold"> Result </h2>
          </div>
        </div>
      </header>

      {/* Result Section */}
      <main className="flex-grow flex flex-col items-center mt-40 md:pb-20 py-8 px-4 z-30 relative">
        <div className="bg-white w-11/12 max-w-lg md:max-w-full rounded-2xl shadow-md p-6 space-y-6">
          <div>
            <p className="text-md text-center"> Your Quiz Result: </p>
            <h1 className="text-4xl font-bold mb-2 text-center">
              {" "}
              {correctAnswersPercentage}%{" "}
            </h1>
            <p className="text-md text-center">
              You got{" "}
              <span className="text-blue font-bold">
                {" "}
                {score}/{totalQuestions}{" "}
              </span>{" "}
              questions right! Click below to review your answers.
            </p>
          </div>

          {/* Review and Finish Buttons */}
          <div className="flex flex-col gap-4">
            <button
              className="bg-slate-100 text-blue text-lg font-semibold py-2 px-4 rounded-full w-full hover:bg-blue-700 transition duration-200 shadow-xl mb-0 z-30"
              onClick={handleReviewQuiz}
            >
              Review
            </button>
            <button
              className="bg-blue text-white text-lg font-semibold py-2 px-4 rounded-full w-full hover:bg-blue-700 transition duration-200 shadow-xl mt-0 z-30"
              onClick={handleFinishQuiz}
            >
              Finish
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white text-blue shadow-t-lg py-3 flex justify-around items-center fixed bottom-0 inset-x-0 z-30">
        <a
          href="/"
          className="flex flex-col items-center hover:text-blue transition duration-200"
        >
          <i className="fas fa-home text-2xl"></i>
          <span className="text-xs font-medium">Home</span>
        </a>
        <a
          href="/transcription"
          className="flex flex-col items-center hover:text-blue transition duration-200"
        >
          <i className="fas fa-microphone-alt text-2xl"></i>
          <span className="text-xs font-medium">Record</span>
        </a>
        <a
          href="/settings"
          className="flex flex-col items-center hover:text-blue transition duration-200"
        >
          <i className="fas fa-cog text-2xl"></i>
          <span className="text-xs font-medium">Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default QuizResult;
