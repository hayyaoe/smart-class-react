// src/components/HomePage.js
import React from "react";
import '../App.css';

const HomePage = () => {
  return (
    <div className="bg-gray-100 flex flex-col h-full justify-between">
      {/* Header */}
      <header className="text-white text-center">
        <div className="bg-blue pt-16 pb-16 px-5 shadow-md rounded-b-[40px] fixed top-0 left-0 w-full z-10">
          <h1 className="text-4xl font-extrabold tracking-wide">Welcome to SmartClass</h1>
        </div>
        <div className="fixed top-40 md:top-24 left-1/2 transform -translate-x-1/2 translate-y-1/2 md:translate-y-2/3 w-80 z-50">
          <div className="bg-white text-blue font-semibold text-lg px-6 py-3 rounded-full shadow-lg w-full">
            <h2 className="text-xl font-semibold">Home</h2>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="min-h-screen flex flex-col items-center justify-start pt-64 md:pt-52 pb-0 md:pb-20 px-5 md:px-24">
        <div className="bg-1 w-full md:w-4/12 h-full flex flex-row justify-start px-5 py-6 rounded-2xl"> 
          <div className="flex flex-col">
            <div className = "flex flex-row justify-start items-center text-white text-xl font-medium">
              <span className = "text-4xl font-bold pe-2"> 8 </span> Prompts
            </div>
            <div className = "flex flex-row justify-start items-center text-white text-md font-medium">
              <p> left to use today. </p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center ms-auto">
            <button className="bg-white text-blue rounded-2xl px-2 py-1 font-semibold text-md"> Subscribe Now </button>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-6 w-full max-w-5xl text-center">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="w-full flex flex-row bg-white px-5 py-5 rounded-3xl shadow-2xl hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col me-3 items-center justify-center">
                <i className="fas fa-microphone-alt text-3xl text-blue"></i>
              </div>
              <div className="flex flex-col items-start justify-start">
                <h3 className="font-semibold text-lg text-start">Record</h3>
                <p className="font-medium text-sm text-start">
                  Lectures
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row bg-white px-5 py-5 rounded-3xl shadow-2xl hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col me-3 items-center justify-center">
                <i className="fas fa-file-alt text-3xl text-blue"></i>
              </div>
              <div className="flex flex-col items-start justify-start">
                <h3 className="font-semibold text-lg text-start">Transcribe</h3>
                <p className="font-medium text-sm text-start">
                  Into Text
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row bg-white px-5 py-5 rounded-3xl shadow-2xl hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col me-3 items-center justify-center">
                <i className="fas fa-book text-3xl text-blue"></i>
              </div>
              <div className="flex flex-col items-start justify-start">
                <h3 className="font-semibold text-lg text-start">Summary</h3>
                <p className="font-medium text-sm text-start">
                  Generation
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row bg-white px-5 py-5 rounded-3xl shadow-2xl hover:shadow-lg transition-shadow duration-200">
              <div className="flex flex-col me-3 items-center justify-center">
                <i className="fas fa-book text-3xl text-blue"></i>
              </div>
              <div className="flex flex-col items-start justify-start">
                <h3 className="font-semibold text-lg text-start">Generate</h3>
                <p className="font-medium text-sm text-start">
                  MindMaps
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="w-full my-6 flex flex-col items-center justify-center px-auto">
          <a className="w-full bg-blue text-white text-center py-4 font-bold text-md rounded-2xl px-auto" href="/transcription" > Summarize Now </a>
        </div>
      </main>

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
        <a href="/setting" className="flex flex-col items-center hover:text-blue transition duration-200">
          <i className="fas fa-cog text-2xl"></i>
          <span className="text-xs font-medium">Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default HomePage;

