// src/components/HomePage.js
import React, { useState, useContext } from "react";
import '../App.css';
import { UserContext } from "../contexts/UserContext";

const HomePage = () => {
  const { user, setUser } = useContext(UserContext); // Ensure `setUser` is provided by the context
  const [localUser, setLocalUser] = useState({ username: user.username || "", email: user.email || "" });

  const [showModal, setShowModal] = useState(false);
  const [isPaymentCheckout, setIsPaymentCheckout] = useState(false);
  const [isUserDetailsForm, setIsUserDetailsForm] = useState(false);
  const [subPlan, setSubPlan] = useState("");
  const [subPrice, setSubPrice] = useState("");
  const [subTime, setSubTime] = useState(0);
  const [subPrompt, setSubPrompt] = useState(0);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openCheckout = ({plan, price, prompts, time}) => {
    setIsPaymentCheckout(true);
    setSubPlan(plan);
    setSubPrice(price);
    setSubPrompt(prompts);
    setSubTime(time)
  };

  const closeCheckout = () => {
    setIsPaymentCheckout(false);
  };

  const openUserDetailForm = () => {
    setIsUserDetailsForm(true);
  }

  const closeUserDetailForm = () => {
    setIsUserDetailsForm(false);
  }

  const handleUserDetailsSubmit = () => {
    // Update the user in the context if required
    setUser({ ...user, ...localUser, subscriptionType: subPlan, prompts: subPrompt, time: subTime }); // Assuming `setUser` updates the context globally
    setShowModal(false); // Close the modal
  };

  return (
    <div className="bg-gray-100 flex flex-col h-full justify-between">
      {/* Header */}
      <header className="text-white text-center">
        <div className="bg-blue pt-16 pb-16 px-5 shadow-md rounded-b-[40px] fixed top-0 left-0 w-full z-10">
          <h1 className="text-4xl font-extrabold tracking-wide">Welcome to StudyBuddy</h1>
        </div>
        <div className="fixed top-40 md:top-24 left-1/2 transform -translate-x-1/2 translate-y-1/2 md:translate-y-2/3 w-80 z-50">
          <div className="bg-white text-blue font-semibold text-lg px-6 py-3 rounded-full shadow-lg w-full">
            <h2 className="text-xl font-semibold">Home</h2>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="min-h-screen flex flex-col items-center justify-start pt-64 md:pt-52 pb-0 md:pb-20 px-5 md:px-24">
        <div className={`${
              user.subscriptionType === "Free" || user.subscriptionType === "Daily"
              ? "bg-1"
              : user.subscriptionType === "Weekly"
              ? "bg-2"
              : user.subscriptionType === "Monthly"
              ? "bg-3"
              : ""
          } w-full md:w-5/12 h-full flex flex-row justify-start px-5 py-6 rounded-2xl`}
        > 
          <div className="flex flex-col">
            <div className = "flex flex-row justify-start items-center text-white text-xl font-medium">
              <span className = "text-4xl font-bold pe-2"> {user.prompts} </span> Prompts
            </div>
            <div className = "flex flex-row justify-start items-center text-white text-md font-medium">
              <p> left to use. </p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-center ms-auto">
              <button 
                className="bg-white text-blue rounded-2xl px-3 py-1 font-semibold text-md"
                onClick={openModal}
              > Subscribe 
              </button>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-6 w-full text-center">
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

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-80 max-w-lg pt-3 pb-8">
            {/* "X" Button to close the modal */}
            <button
              className="relative top-[-4px] left-[20px] text-black hover:text-gray-900"
              onClick={closeModal}
            >
              <span className="text-4xl font-bold"> × </span>
            </button>

            {isPaymentCheckout ? (
              // Payment Checkout View
              <div className="payment-checkout">
                <h2 className="text-xl font-bold text-blue text-center pb-4 px-8">Payment Checkout</h2>
                <div className="w-full bg-blue text-white flex justify-between items-center">
                  <p className="px-8 py-2">{subPlan}</p>
                  <p className="px-8 py-2">{subPrice}</p>
                </div>

                <h3 className="font-semibold text-lg pt-4 px-8">Payment Method</h3>
                <div className="payment-options space-y-3 mt-3 px-8">
                  <label className="flex items-center p-2 border rounded-lg cursor-pointer" htmlFor="m-bca">
                    <img src="src/assets/BCA.png" alt="BCA" className="w-10 h-10 mr-2" />
                    <span className="flex-1">m-BCA</span>
                    <input type="radio" id="m-bca" name="payment" value="m-bca" className="ml-2" />
                  </label>

                  <label className="flex items-center p-2 border rounded-lg cursor-pointer" htmlFor="ovo">
                    <img src="src/assets/OVO.png" alt="OVO" className="w-10 h-10 mr-2" />
                    <span className="flex-1">OVO</span>
                    <input type="radio" id="ovo" name="payment" value="ovo" className="ml-2" />
                  </label>

                  <label className="flex items-center p-2 border rounded-lg cursor-pointer" htmlFor="gopay">
                    <img src="src/assets/Gopay.png" alt="GoPay" className="w-10 h-10 mr-2" />
                    <span className="flex-1">GoPay</span>
                    <input type="radio" id="gopay" name="payment" value="gopay" className="ml-2" />
                  </label>
                </div>

                <div className="px-8">
                  <button
                    className="w-full bg-blue text-white font-bold py-3 mt-6 rounded-lg"
                    onClick={() => {
                      closeCheckout()
                      openUserDetailForm()
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ) : isUserDetailsForm ? (
              // User Details Form View
              <div className="user-details-form px-8">
                <h2 className="text-xl font-bold text-blue text-center pb-4">
                  Enter Your Details
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUserDetailsSubmit();
                  }}
                >
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Enter your username"
                      required
                      value={localUser.username}
                      onChange={(e) => setLocalUser({ ...localUser, username: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border rounded-lg"
                      placeholder="Enter your email"
                      required
                      value={localUser.email}
                      onChange={(e) => setLocalUser({ ...localUser, email: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue text-white font-bold py-3 mt-6 rounded-lg"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              // Subscription Options View
              <>
                <h2 className="text-xl font-bold text-blue text-center pb-4 px-8">Subscription</h2>
                <div className="px-6">
                  <button className="w-full bg-1 flex flex-row justify-start items-center p-5 rounded-2xl"
                  onClick={() => openCheckout({plan: 'Daily', price: 'Rp 5.000', prompts: 2, time: 1})}>
                    <div className="flex flex-col justify-start items-start text-white text-xl font-medium">
                      <p className="text-2xl font-bold text-start">Daily</p>
                      <p className="text-sm">2 prompts/day</p>
                    </div>

                    <div className="flex flex-col items-end justify-center ms-auto">
                      <button
                        className="bg-white text-blue rounded-2xl px-3 py-1 font-semibold text-sm"
                      >
                        Rp 5.000
                      </button>
                    </div>
                  </button>

                  <button className="w-full bg-2 flex flex-row justify-start items-center mt-2 p-5 rounded-2xl"
                  onClick={() => openCheckout({plan: 'Weekly', price: 'Rp 19.900', prompts: 15, time: 7})}>
                    <div className="flex flex-col justify-start items-start text-white text-xl font-medium">
                      <p className="text-2xl font-bold text-start">Weekly</p>
                      <p className="text-sm">15 prompts/week</p>
                    </div>

                    <div className="flex flex-col items-end justify-center ms-auto">
                      <button
                        className="bg-white text-blue rounded-2xl px-3 py-1 font-semibold text-sm"
                         // Trigger payment view
                      >
                        Rp 19.900
                      </button>
                    </div>
                  </button>

                  <button className="bg-3 w-full flex flex-row justify-start items-center mt-2 p-5 rounded-2xl"
                    onClick={() => openCheckout({plan: 'Monthly', price: 'Rp 49.900', prompts: 100, time: 30})}>
                    <div className="flex flex-col justify-start items-start text-white text-xl font-medium">
                      <p className="text-2xl font-bold text-start">Monthly</p>
                      <p className="text-sm">Unlimited</p>
                    </div>

                    <div className="flex flex-col items-end justify-center ms-auto">
                      <button
                        className="bg-white text-blue rounded-2xl px-3 py-1 font-semibold text-sm"
                         // Trigger payment view
                      >
                        Rp 49.900
                      </button>
                    </div>
                  </button>
                </div>
              </>
            )}
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

export default HomePage;

