// src/components/SettingsPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css'

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const options = [
    { id: 'A', label: 'y = mx + c' },
    { id: 'B', label: 'a + b = c' },
    { id: 'C', label: 'e = mc²' },
    { id: 'D', label: 'y = mx + c' },
  ];

  const handleFinishQuiz = () => {
    navigate('/');
  };

  const handleBackClick = () => {
    setShowModal(true); // Show modal when back is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };


  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      {/* Header */}
      <header className="text-white text-center">
        <div className="bg-blue pt-12 pb-12 shadow-md rounded-b-3xl fixed top-0 left-0 w-full z-10">
          <h1 className="text-4xl font-extrabold tracking-wide">smartclass</h1>
        </div>

        {/* Title */}
        <div className="fixed top-28 left-1/2 transform -translate-x-1/2 w-80 z-50">
          <div className="bg-white text-blue font-semibold text-lg px-6 py-3 rounded-full shadow-lg w-full">
            <h2 className="text-xl font-semibold"> Quiz </h2>
          </div>
        </div>
      </header>

      {/* Quiz Section */}
      <main className="flex-grow flex flex-col items-center mt-40 md:pb-20 py-8 px-6">
        <div className="bg-white w-full md:max-w-full rounded-2xl shadow-md px-6 py-4 space-y-6">
          {/* Question */}
          <div className="items-center justify-center">
            <h1 className="text-3xl font-semibold text-blue text-center py-2"> Question </h1>
            <h2 className="text-lg font-medium mb-4 text-center leading-tight"> Apakah rumus dari 
            Pythagorean Theroem?</h2>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 pt-3">
            {options.map((option) => (
                <label
                key={option.id}
                className={`w-full radio-button flex items-center gap-2 shadow-md ${
                    selected === option.id ? 'bg-blue text-white' : 'bg-white text-gray-700'
                }`}
                >
                <input
                    type="radio"
                    name="equation"
                    value={option.id}
                    checked={selected === option.id}
                    onChange={() => setSelected(option.id)}
                    className="hidden"
                />
                <span
                    className={`circle ${
                    selected === option.id ? 'bg-white text-blue-500' : 'bg-blue-500 text-white'
                    }`}
                >
                    {option.id}
                </span>
                <span className="label">{option.label}</span>
                </label>
            ))}
            </div>

        <div className = "w-full flex flex-row fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 gap-1 justify-center">
          <button
            className={`bg-white text-blue text-center text-lg font-semibold py-3 px-6 rounded-full mt-4 w-full max-w-xs hover:bg-blue transition duration-200 shadow-md`}
            onClick={handleBackClick}
          >
           Back
          </button>
          <button
            className={`bg-blue text-white text-center text-lg font-semibold py-3 px-6 rounded-full mt-4 w-full max-w-xs hover:bg-blue transition duration-200 shadow-md`}
            onClick={handleFinishQuiz}
          >
            Next
          </button>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-80 max-w-lg p-8">
            {/* "X" Button to close the modal */}
            <button
                className="absolute top-[220px] left-12 text-black hover:text-gray-900"
                onClick={closeModal} // This will trigger the modal close
            >
                <span className="text-4xl font-bold"> × </span>
            </button>
            <h2 className="text-xl font-bold text-blue text-center"> Subscription </h2>
            <div className="bg-1 flex flex-row justify-start items-center p-5 rounded-2xl">
                <div className="flex flex-col justify-start items-start text-white text-xl font-medium">
                    <p className = "text-2xl font-bold text-start"> Daily </p>
                    <p className= "text-sm"> 3 prompts </p>
                </div>
                
                <div className="flex flex-col items-end justify-center ms-auto">
                    <button className="bg-white text-blue rounded-2xl px-3 py-1 font-semibold text-sm"> Subscribe </button>
                </div>
            </div>

            <div className="bg-2 flex flex-row justify-start items-center mt-2 p-5 rounded-2xl">
                <div className="flex flex-col justify-start items-start text-white text-xl font-medium">
                    <p className = "text-2xl font-bold text-start"> Weekly </p>
                    <p className= "text-sm"> 15 prompts </p>
                </div>
                
                <div className="flex flex-col items-end justify-center ms-auto">
                    <button className="bg-white text-blue rounded-2xl px-3 py-1 font-semibold text-sm"> Subscribe </button>
                </div>
            </div>

            <div className="bg-3 flex flex-row justify-start items-center mt-2 p-5 rounded-2xl">
                <div className="flex flex-col justify-start items-start text-white text-xl font-medium">
                    <p className = "text-2xl font-bold text-start"> Monthly </p>
                    <p className= "text-sm"> 50 prompts </p>
                </div>
                
                <div className="flex flex-col items-end justify-center ms-auto">
                    <button className="bg-white text-blue rounded-2xl px-3 py-1 font-semibold text-sm"> Subscribe </button>
                </div>
            </div>

          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="bg-white text-gray-600 shadow-t-lg py-3 flex justify-around items-center fixed bottom-0 inset-x-0">
        <a href="/" className="flex flex-col items-center hover:text-blue transition duration-200">
          <i className="fas fa-home text-2xl"></i>
          <span className="text-xs font-medium">Home</span>
        </a>
        <a href="/transcript" className="flex flex-col items-center hover:text-blue transition duration-200">
          <i className="fas fa-book text-2xl"></i>
          <span className="text-xs font-medium">Notes</span>
        </a>
        <a href="/transcription" className="flex flex-col items-center hover:text-blue transition duration-200">
          <i className="fas fa-microphone-alt text-2xl"></i>
          <span className="text-xs font-medium">Record</span>
        </a>
        <a href="/settings" className="flex flex-col items-center hover:text-blue transition duration-200">
          <i className="fas fa-cog text-2xl"></i>
          <span className="text-xs font-medium">Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default QuizPage;