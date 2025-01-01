import React, { useContext, useState } from "react";
import '../App.css';
import { UserContext } from "../contexts/UserContext";

const SettingsPage = () => {
  const { user, setUser } = useContext(UserContext);

  // Local state for temporary changes
  const [tempUsername, setTempUsername] = useState(user.username || "");
  const [tempEmail, setTempEmail] = useState(user.email || "");

  // Handle Save Changes
  const handleSaveChanges = () => {
    setUser({ ...user, username: tempUsername, email: tempEmail });
    console.log("Changes saved:", { username: tempUsername, email: tempEmail });
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
            <h2 className="text-xl font-semibold">Settings</h2>
          </div>
        </div>
      </header>

      {/* Settings Section */}
      <main className="flex-grow flex flex-col items-center mt-40 md:pb-20 py-8 px-4">
        <div className="bg-white w-11/12 max-w-lg md:max-w-full rounded-2xl shadow-md p-6 space-y-6">
          {/* Profile Section */}
          <div>
            <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={tempUsername}
                placeholder="Your username"
                onChange={(e) => setTempUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={tempEmail}
                placeholder="Your email"
                onChange={(e) => setTempEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <a className="text-blue" href="/">Change Password</a>
            </div>
          </div>
          <div className={`${
              user.subscriptionType === "Free" || user.subscriptionType === "Daily"
              ? "bg-1"
              : user.subscriptionType === "Weekly"
              ? "bg-2"
              : user.subscriptionType === "Monthly"
              ? "bg-3"
              : ""
          } w-full md:w-4/12 h-full flex flex-row place-self-center justify-self-center px-5 py-6 rounded-2xl`}>
            <div className="flex flex-col">
              <div className="flex flex-row justify-start items-center text-white text-xl font-medium">
                <p className="text-3xl font-bold">{user.subscriptionType}</p>
              </div>
              <div className="flex flex-row justify-start items-center text-white text-md font-medium">
                <p> {user.prompts} prompts left</p>
              </div>
            </div>
            <div className="flex flex-col items-end justify-center ms-auto">
              <div className="flex flex-row justify-start items-center text-white text-xl font-medium">
                <p className="text-3xl font-bold"> {user.time} </p>
              </div>
              <div className="flex flex-row justify-start items-center text-white text-md font-medium">
                <p className="font-bold">DAYS</p>
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <button
            className="bg-blue text-white text-lg font-semibold py-2 px-4 rounded-full w-full hover:bg-blue-700 transition duration-200 shadow-sm"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>

          {/* Log Out Button */}
          <button className="w-full text-center text-red-600 font-semibold hover:underline mt-4">
            <i className="fas fa-sign-out-alt mr-2"></i> Log Out
          </button>
        </div>
      </main>

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
        <a href="/settings" className="flex flex-col items-center hover:text-blue transition duration-200">
          <i className="fas fa-cog text-2xl"></i>
          <span className="text-xs font-medium">Settings</span>
        </a>
      </nav>
    </div>
  );
};

export default SettingsPage;