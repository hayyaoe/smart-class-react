// src/components/HomePage.js
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen justify-between">
      {/* Header */}
      <header className="text-white text-center">
        <div className="bg-blue-600 pt-8 pb-6 shadow-md rounded-b-3xl fixed top-0 left-0 w-full z-10">
          <h1 className="text-3xl font-extrabold tracking-wide">Welcome to SmartClass</h1>
          <p className="mt-1 text-base">Your smart learning companion</p>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex-grow flex flex-col items-center justify-start mt-36 px-4">
        {/* Intro Section */}
        <section className="w-full max-w-2xl text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Enhance Your Learning Experience</h2>
          <p className="text-gray-700 mb-6">
            SmartClass helps you record, transcribe, and summarize your lectures effortlessly. Focus on learning while we handle the notes!
          </p>
          <button className="bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-200 shadow-md">
            Get Started
          </button>
        </section>

        {/* Features Section */}
        <section className="mt-10 w-full max-w-5xl text-center">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <i className="fas fa-microphone-alt text-4xl text-blue-500 mb-3"></i>
              <h3 className="font-semibold text-xl mb-2">Record Lectures</h3>
              <p className="text-gray-600">
                Capture every word spoken in your lectures with high-quality audio recordings.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <i className="fas fa-file-alt text-4xl text-blue-500 mb-3"></i>
              <h3 className="font-semibold text-xl mb-2">Transcription</h3>
              <p className="text-gray-600">
                Automatically transcribe audio recordings into text for easy review and study.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <i className="fas fa-lightbulb text-4xl text-blue-500 mb-3"></i>
              <h3 className="font-semibold text-xl mb-2">Summarization</h3>
              <p className="text-gray-600">
                Get concise summaries of your lectures to reinforce learning and retention.
              </p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mt-10 w-full max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-6">What Our Users Say</h2>
          <blockquote className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-600 italic">
              "SmartClass has transformed the way I study! I can focus on learning without worrying about taking notes."
            </p>
            <footer className="mt-4 font-semibold">— Evan Tanuwijaya</footer>
          </blockquote>
        </section>

        {/* Call to Action */}
        <section className="mt-10 w-full max-w-2xl text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to Get Started?</h2>
          <button className="bg-blue-600 text-white text-lg font-semibold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-200 shadow-md">
            Join SmartClass Today!
          </button>
        </section>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white text-gray-600 shadow-t-lg py-3 flex justify-around items-center fixed bottom-0 inset-x-0">
        <a href="/" className="flex flex-col items-center hover:text-blue-500 transition duration-200">
          <i className="fas fa-home text-2xl"></i>
          <span className="text-xs font-medium">Home</span>
        </a>
        <a href="/transcript" className="flex flex-col items-center hover:text-blue-500 transition duration-200">
          <i className="fas fa-book text-2xl"></i>
          <span className="text-xs font-medium">Notes</span>
        </a>
        <a href="/transcription" className="flex flex-col items-center hover:text-blue-500 transition duration-200">
          <i className="fas fa-microphone-alt text-2xl"></i>
          <span className="text-xs font-medium">Record</span>
        </a>
        <a href="/setting" className="flex flex-col items-center hover:text-blue-500 transition duration-200">
          <i className="fas fa-cog text-2xl"></i>
          <span className="text-xs font-medium">Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default HomePage;

