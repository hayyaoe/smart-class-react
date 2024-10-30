// src/components/SummaryMindMapPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import mermaid from "mermaid";

const SummaryMindMapPage = () => {
  const location = useLocation();
  const transcription = location.state?.transcription || "No transcription available";
  const [summary, setSummary] = useState("");
  const [mindMapData, setMindMapData] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [loadingMindMap, setLoadingMindMap] = useState(true);
  const [showSummary, setShowSummary] = useState(true);
  const [error, setError] = useState("");

  // Styles for blue background color
  const blueBgStyle = "bg-[#1152FD] text-white";

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoadingSummary(true);
        const summaryPrompt = `Please provide a summary that consist of introduction, learning concepts, and conclusion if possible of the following text in Markdown format:\n"${transcription}"`;

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: summaryPrompt }],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
          }
        );

        const summaryResult = response.data.choices?.[0]?.message?.content;
        setSummary(summaryResult?.trim() || "No summary available");
      } catch (error) {
        console.error("Error fetching summary:", error);
        setError("Failed to fetch the summary. Please try again.");
      } finally {
        setLoadingSummary(false);
      }
    };

    const fetchMindMap = async () => {
      try {
        setLoadingMindMap(true);
        const mindMapPrompt = `Please convert the following text into a Mermaid.js mindmap format. Follow this exact structure:\nmindmap\n  root: [Main Topic]\n    First sub-topic\n      Sub-topic detail\n    Second sub-topic\n      Another sub-topic detail\n        Nested detail\n\nText for mindmap: "${transcription}"`;

        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: mindMapPrompt }],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            },
          }
        );

        const mindMapResult = response.data.choices?.[0]?.message?.content;
        setMindMapData(mindMapResult?.trim() || "mindmap\nroot: No mind map data available");
      } catch (error) {
        console.error("Error fetching mind map:", error);
        setError("Failed to fetch the mind map. Please try again.");
      } finally {
        setLoadingMindMap(false);
      }
    };

    fetchSummary();
    fetchMindMap();
  }, [transcription]);

  useEffect(() => {
    if (mindMapData) {
      mermaid.initialize({ startOnLoad: true });
      mermaid.contentLoaded();
    }
  }, [mindMapData]);

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen justify-between">
      {/* Header */}
      <header className="text-white text-center relative">
        <div className={`${blueBgStyle} pt-12 pb-12 shadow-md rounded-b-3xl fixed top-0 left-0 w-full z-10`}>
          <h1 className="text-4xl font-extrabold tracking-wide">smartclass</h1>
        </div>

        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-80 z-50">
          <div className="bg-white text-blue-600 font-semibold text-lg px-6 py-3 rounded-full shadow-lg w-full">
            <h2 className="text-xl font-semibold">AI Summarizer</h2>
          </div>
        </div>
      </header>

      {/* Summary and Mind Map Section */}
      <main className="flex-grow flex flex-col px-6 mt-44 mb-32 justify-start items-center">
        {/* Toggle Button Row */}
        <div className="flex flex-row justify-center w-full mb-6 space-x-2">
          <button
            onClick={() => setShowSummary(true)}
            className={`${
              showSummary ? blueBgStyle : "bg-white text-blue-600"
            } text-center text-md py-3 px-6 rounded-full w-full max-w-xs transition duration-200 shadow-md`}
          >
            Summary
          </button>
          <button
            onClick={() => setShowSummary(false)}
            className={`${
              !showSummary ? blueBgStyle : "bg-white text-blue-600"
            } text-center text-md py-3 px-6 rounded-full w-full max-w-xs transition duration-200 shadow-md`}
          >
            Mind Map
          </button>
        </div>

        <div className="bg-white max-w-md w-full flex flex-col items-center rounded-2xl shadow-lg p-6">
          {/* Content Display */}
          {error && <p className="text-red-500">{error}</p>}
          {showSummary ? (
            loadingSummary ? (
              <p>Loading summary...</p>
            ) : (
              <ReactMarkdown className="prose">{summary}</ReactMarkdown>
            )
          ) : loadingMindMap ? (
            <p>Loading mind map...</p>
          ) : (
            <div className="mermaid">{mindMapData}</div>
          )}
        </div>

        {/* Save as PDF or Image Button */}
        <button
          onClick={() => window.print()}
          className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 ${blueBgStyle} text-center text-lg font-semibold py-3 px-6 rounded-full mt-4 w-full max-w-xs hover:bg-blue-700 transition duration-200 shadow-md`}
        >
          {showSummary ? "Save as PDF" : "Save as Image"}
        </button>
      </main>

      {/* Bottom Navigation Bar */}
      <nav className="bg-white text-gray-600 shadow-t-lg py-3 flex justify-around items-center fixed bottom-0 inset-x-0 z-40">
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

export default SummaryMindMapPage;

