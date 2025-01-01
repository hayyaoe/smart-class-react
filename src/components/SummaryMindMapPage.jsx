import React, { useEffect, useState, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import mermaid from "mermaid";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { UserContext } from "../contexts/UserContext";

const SummaryMindMapPage = () => {
  const { user, setUser } = useContext(UserContext); // Ensure `setUser` is provided by the context
  const [localUser, setLocalUser] = useState({ username: user.username || "", email: user.email || "" });

  const [showModal, setShowModal] = useState(false);
  const [isPaymentCheckout, setIsPaymentCheckout] = useState(false);
  const [isUserDetailsForm, setIsUserDetailsForm] = useState(false);
  const [subPlan, setSubPlan] = useState("");
  const [subPrice, setSubPrice] = useState("");
  const [subTime, setSubTime] = useState(0);
  const [subPrompt, setSubPrompt] = useState(0);

  const location = useLocation();
  const transcription =
    location.state?.transcription || "No transcription available";
  const navigate = useNavigate();
  const [summary, setSummary] = useState("");
  const [mindMapData, setMindMapData] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingMindMap, setLoadingMindMap] = useState(true);
  const [error, setError] = useState("");

  const mindMapRef = useRef(null);
  const rendered = useRef(false);

  const blueBgStyle = "bg-[#1152FD] text-white";

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

  const checkPrompts = () => {
    if (user.prompts <= 0) {
      openModal(); // Call the openModal function to show the modal
    }
  };

  const handleGoToQuiz = () => {
    if (user.prompts > 0) {
      setUser((prevUser) => ({ ...prevUser, prompts: prevUser.prompts - 1 }));
      navigate("/quiz", { state: { summary } });
    } else {
      openModal(); // Open the modal if prompts are 0
    }
  };

  useEffect(() => {
    const fetchSummary = async () => {
      if (!transcription) return;

      setLoadingSummary(true);
      setError(null);

      try {
        const genAI = new GoogleGenerativeAI(
          "YOUR GEMINI API KEY HERE",
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const summaryPrompt = `Please provide a summary with introduction, learning concepts, and conclusion of the following text:\n${transcription}\n also use the language from the trascription, if it uses bahasa Indonesia then output using bahasa, if it uses English then output using English`;
        const response = await model.generateContent(summaryPrompt);
        const summaryResult = response.response?.text();

        setSummary(summaryResult?.trim() || "No summary available");
      } catch (err) {
        console.error("Error fetching summary:", err);
        setError("Failed to fetch the summary.");
      } finally {
        setLoadingSummary(false);
      }
    };

    const fetchMindMap = async () => {
      if (!transcription) return;

      setLoadingMindMap(true);
      setError(null);

      try {
        const genAI = new GoogleGenerativeAI(
          "YOUR GEMINI API KEY HERE",
        );
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const mindMapPrompt = `Please convert the following text into a Mermaid.js mindmap format, only return the mermaid js syntax in normal string form and nothing else:\n\nText for mindmap: "${transcription}"\n also use the language of the transcription`;
        const response = await model.generateContent(mindMapPrompt);
        const mindMapResult = response.response?.text();

        const removeMermaidKeyword = (data) => {
          // Remove code block backticks if present
          const cleanedData = data.replace(/```/g, "").trim();

          // Remove the 'mermaid' keyword from the start
          return cleanedData.replace(/^mermaid\s*/, "");
        };

        const mindMapResultCleaned = removeMermaidKeyword(mindMapResult);

        console.log(mindMapResultCleaned);
        if (mindMapResultCleaned) {
          setMindMapData(mindMapResultCleaned);
        } else {
          throw new Error("Invalid mind map data");
        }
      } catch (err) {
        console.error("Error fetching mind map:", err);
        setError("Failed to fetch the mind map.");
      } finally {
        setLoadingMindMap(false);
      }
    };

    fetchSummary();
    fetchMindMap();

    // Cleanup rendered ref when unmounting
    return () => {
      rendered.current = false;
    };
  }, [transcription]);

  useEffect(() => {
    if (!loadingMindMap && mindMapData && !rendered.current) {
      rendered.current = true;
      mindMapRef.current.innerHTML = mindMapData;
      mermaid.initialize({ startOnLoad: false });
      mermaid.init(undefined, mindMapRef.current);
    }
  }, [loadingMindMap, mindMapData]);

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen justify-between">
      <header className="text-white text-center relative">
        <div
          className={`${blueBgStyle} pt-12 pb-12 shadow-md rounded-b-3xl fixed top-0 left-0 w-full z-10`}
        >
          <h1 className="text-4xl font-extrabold tracking-wide">smartclass</h1>
        </div>
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-80 z-50">
          <div className="bg-white text-blue font-semibold text-lg px-6 py-3 rounded-full shadow-lg w-full">
            <h2 className="text-xl font-semibold">Summarizer & Mind Map</h2>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center mt-44 mb-32 px-6 md:px-20">
        {error && <p className="text-red-500">{error}</p>}
        <div className="bg-white max-w-5xl md:max-w-full w-full flex flex-col md:flex-row gap-6 rounded-2xl shadow-lg p-6">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Summary</h3>
            {loadingSummary ? (
              <p>Loading summary...</p>
            ) : (
              <ReactMarkdown className="prose text-black">
                {summary}
              </ReactMarkdown>
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Mind Map</h3>
            {loadingMindMap ? (
              <p>Loading mind map...</p>
            ) : (
              <div ref={mindMapRef} className="mermaid"></div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-row fixed bottom-20 left-1/2 transform -translate-x-1/2 px-4 gap-1 md:gap-3 items-center justify-center">
          <button
            onClick={() => window.print()}
            className="bg-white text-blue text-center text-lg font-semibold py-3 px-6 rounded-full mt-4 w-full max-w-xs hover:bg-blue transition duration-200 shadow-md"
          >
            Save as PDF
          </button>
          <button
            onClick={handleGoToQuiz}
            className="bg-blue text-white text-center text-lg font-semibold py-3 px-6 rounded-full mt-4 w-full max-w-xs hover:bg-blue transition duration-200 shadow-md"
          >
            Create Quiz
          </button>
        </div>
      </main>

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
                <h2 className="text-xl font-bold text-blue text-center pb-4 px-8">Subscribe to Summarize</h2>
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

export default SummaryMindMapPage;
