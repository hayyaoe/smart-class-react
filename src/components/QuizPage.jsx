import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const summary = location.state?.summary || "summary cannot be fetched"; // Passed from previous page

  const handleFinishQuiz = () => {
    const score = questions.reduce((acc, question) => {
      // Extract only the letter (a, b, c, d) from the user's answer and correct answer
      const userAnswerLetter = question.userAnswer?.charAt(0); // Get the first character
      const correctAnswerLetter = question.correctAnswer?.charAt(0); // Get the first character

      if (userAnswerLetter === correctAnswerLetter) {
        acc += 1;
      }
      return acc;
    }, 0);

    const correctAnswers = questions.map((question) => ({
      question: question.question,
      correctAnswer: question.correctAnswer.charAt(0), // Include only the letter
      userAnswer: question.userAnswer?.charAt(0), // Include only the letter
    }));

    const totalQuestions = questions.length;
    navigate("/result", {
      state: {
        score,
        totalQuestions,
        questions
      },
    });
  };

  const handleOptionChange = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      setShowModal(true); // Show modal if no option is selected
      return;
    }

    // Update the selected answer for the current question
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].userAnswer = selectedAnswer;
    setQuestions(updatedQuestions);

    // Move to the next question or finish the quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset the selected answer for the next question
    } else {
      handleFinishQuiz(); // Finish the quiz when all questions are answered
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(questions[currentQuestion - 1]?.userAnswer || null);
    }
  };

  const generateQuiz = async () => {
    setIsLoading(true);
    setError("");

    try {
      const genAI = new GoogleGenerativeAI(
        "API KEY HERE", // Replace with a secure config
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const quizPrompt = `
        Please generate a set of 5 or more up to 20 multiple-choice questions (with 4 options and 1 correct answer) based on the following summary:
        
        ${summary}

        Format your response as follows:
        1. Question
           a) Option 1
           b) Option 2
           c) Option 3
           d) Option 4
        Answer: Correct Option

        also please use the language of the summary
      `;

      const response = await model.generateContent(quizPrompt);
      const rawQuiz = response.response.text();
      const parsedQuiz = rawQuiz.split("\n\n").map((block) => {
        const lines = block.split("\n");
        const question = lines[0];
        const options = lines.slice(1, 5).map((opt) => opt.trim());
        const answerLine = lines[5] || "";
        const correctAnswer = answerLine.split(":")[1]?.trim() || "";
        return { question, options, correctAnswer, userAnswer: null }; // Ensure userAnswer is initialized
      });

      setQuestions(parsedQuiz || []);
    } catch (err) {
      console.error("Error generating quiz:", err);
      setError("Failed to generate quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (summary) {
      generateQuiz();
    }
  }, [summary]);

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      {/* Title */}
      <header className="text-white text-center">
        <div className="bg-blue pt-12 pb-12 shadow-md rounded-b-3xl fixed top-0 left-0 w-full z-10">
          <h1 className="text-4xl font-extrabold tracking-wide">StudyBuddy</h1>
        </div>

        {/* Title */}
        <div className="fixed top-28 left-1/2 transform -translate-x-1/2 w-80 z-50">
          <div className="bg-white text-blue font-semibold text-lg px-6 py-3 rounded-full shadow-lg w-full">
            <h2 className="text-xl font-semibold"> Quiz </h2>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center mt-44 px-6">
        {isLoading ? (
          <p className="text-blue-500">Loading quiz...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
              <h3 className="text-xl font-bold mb-4">
                Question {currentQuestion + 1}/{questions.length}
              </h3>
              <p className="text-gray-700 mb-6">
                {questions[currentQuestion]?.question}
              </p>
              {questions[currentQuestion]?.options.map((option, index) => (
                <label
                  key={index}
                  className={`block p-3 rounded-lg border ${
                    selectedAnswer === option
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="quiz-option"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={() => handleOptionChange(option)}
                    className="hidden"
                  />
                  {option}
                </label>
              ))}
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
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                onClick={handleNext}
              >
                {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <p>Please select an answer before proceeding.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Bottom Navigation Bar */}
      <nav className="bg-white text-blue shadow-t-lg py-3 flex justify-around items-center fixed bottom-0 inset-x-0">
        <a href="/" className="flex flex-col items-center hover:text-blue transition duration-200">
          <i className="fas fa-home text-2xl"></i>
          <span className="text-xs font-medium">Home</span>
        </a>
        <a href="/transcription" className="flex flex-col items-center hover:text-blue transition duration-200">
          <i className="fas fa-microphone-alt text-2xl"></i>
          <span className="text-xs font-medium">Record</span>
        </a>
        <a href="/setting" className="flex flex-col items-center hover:text-blue transition duration-200">
          <i className="fas fa-cog text-2xl"></i>
          <span className="text-xs font-medium">Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default QuizPage;
