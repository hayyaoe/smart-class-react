// src/components/SettingsPage.js
import React from "react";

const SettingsPage = () => {
  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      {/* Header */}
      <header className="text-white text-center fixed top-0 left-0 w-full z-10 bg-blue-600 pt-10 pb-8 shadow-md rounded-b-2xl">
        <h1 className="text-3xl font-extrabold">smartclass</h1>
        <p className="text-lg font-semibold">Settings</p>
      </header>

      {/* Settings Section */}
      <main className="flex-grow flex flex-col items-center mt-28 p-6">
        <div className="bg-white w-11/12 max-w-lg rounded-2xl shadow-md p-6 space-y-6">
          {/* Profile Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your email"
              />
            </div>
          </div>

          {/* Notification Preferences */}
          <div>
            <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
            <div className="mb-3 flex items-center">
              <input type="checkbox" id="email-notifications" className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="email-notifications" className="ml-2 text-sm text-gray-700">Email Notifications</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="sms-notifications" className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
              <label htmlFor="sms-notifications" className="ml-2 text-sm text-gray-700">SMS Notifications</label>
            </div>
          </div>

          {/* Theme Selection */}
          <div>
            <h2 className="text-xl font-bold mb-4">Appearance</h2>
            <div className="mb-4">
              <label htmlFor="theme" className="block text-sm font-medium text-gray-700">Select Theme</label>
              <select
                id="theme"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          {/* Save Changes Button */}
          <button className="bg-blue-600 text-white text-lg font-semibold py-2 px-4 rounded-full w-full hover:bg-blue-700 transition duration-200 shadow-sm">
            Save Changes
          </button>

          {/* Log Out Button */}
          <button className="w-full text-center text-red-600 font-semibold hover:underline mt-4">
            <i className="fas fa-sign-out-alt mr-2"></i> Log Out
          </button>
        </div>
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
        <a href="/settings" className="flex flex-col items-center hover:text-blue-500 transition duration-200">
          <i className="fas fa-cog text-2xl"></i>
          <span className="text-xs font-medium">Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default SettingsPage;

