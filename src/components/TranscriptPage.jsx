// src/components/TranscriptPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TranscriptPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const transcription = location.state?.transcription || 'No transcription available';

  const handleGoToSummary = () => {
    navigate('/summary', { state: { transcription } });
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen justify-between">
      {/* Header */}
      <header className="text-white text-center">
        <div className="bg-blue pt-12 pb-12 shadow-md rounded-b-3xl fixed top-0 left-0 w-full z-10">
          <h1 className="text-4xl font-extrabold tracking-wide">smartclass</h1>
        </div>

        {/* Transcript Label */}
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-80 z-50">
          <div className="bg-white text-blue font-semibold text-lg px-6 py-3 rounded-full shadow-lg w-full">
            <h2 className="text-xl font-semibold">Transcript</h2>
          </div>
        </div>
      </header>

      {/* Transcript Section */}
      <main className="flex-grow flex px-6 mt-40 mb-32 justify-center items-start">
        {/* Transcript Box */}
        <div className="max-w-md px-3 py-6 flex flex-col items-center w-full">
          <div className="overflow-y-auto h-full w-full">
            {/* Display transcription content */}
            {transcription.split('\n').map((line, index) => (
              <p key={index} className="text-gray-700 text-justify mb-4 font-medium text-lg">
                {line}
              </p>
            ))}
          </div>

          {/* Summarize Button */}
          <button
            onClick={handleGoToSummary}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-blue text-white text-lg font-semibold py-3 px-6 rounded-full mt-4 w-full max-w-xs hover:bg-blue-700 transition duration-200 shadow-md"
          >
            Summarize
          </button>
        </div>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white text-gray-600 shadow-t-lg py-3 flex justify-around items-center fixed bottom-0 inset-x-0 z-40">
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
        <a href="/setting" className="flex flex-col items-center hover:text-blue transition duration-200">
          <i className="fas fa-cog text-2xl"></i>
          <span className="text-xs font-medium">Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default TranscriptPage;

