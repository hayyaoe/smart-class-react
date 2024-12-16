// src/components/SummaryMindMapPage.jsx
import React, { useEffect, useState, useRef } from "react";
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
  const [error, setError] = useState("");
  const rendered = useRef(false); // Track if Mermaid has been rendered

  const mindMapRef = useRef(null);
  const blueBgStyle = "bg-[#1152FD] text-white";

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoadingSummary(true);
        const summaryPrompt = `Please provide a summary with introduction, learning concepts, and conclusion of the following text in Markdown format, also use the transcript language and dont add a #Summary heading:\n"${transcription}"`;

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
        const mindMapPrompt = `Please convert the following text into a Mermaid.js mindmap format. Follow this exact structure:

mindmap
  root: [Main Topic]
    First sub-topic
      Sub-topic detail
    Second sub-topic
      Another sub-topic detail
        Nested detail

Text for mindmap: "${transcription}"`;

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
    if (!loadingMindMap && mindMapData && !rendered.current) {
      rendered.current = true; // Mark as rendered to prevent re-renders
      mindMapRef.current.innerHTML = mindMapData;
      mermaid.initialize({ startOnLoad: false });
      mermaid.init(undefined, mindMapRef.current);
    }
  }, [loadingMindMap, mindMapData]);

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen justify-between">
      {/* Header */}
      <header className="text-white text-center relative">
        <div className={`${blueBgStyle} pt-12 pb-12 shadow-md rounded-b-3xl fixed top-0 left-0 w-full z-10`}>
          <h1 className="text-4xl font-extrabold tracking-wide">smartclass</h1>
        </div>

        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-80 z-50">
          <div className="bg-white text-blue font-semibold text-lg px-6 py-3 rounded-full shadow-lg w-full">
            <h2 className="text-xl font-semibold">Summarizer & Mind Map</h2>
          </div>
        </div>
      </header>

      {/* Summary and Mind Map Section */}
      <main className="flex-grow flex flex-col items-center mt-44 mb-32 px-4 md:px-20">
        {error && <p className="text-red-500">{error}</p>}
        
        <div className="bg-white max-w-5xl md:max-w-full w-full flex flex-col md:flex-row gap-6 rounded-2xl shadow-lg p-6">
          {/* Summary Display */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Summary</h3>
            {loadingSummary ? (
              <p>Loading summary...</p>
            ) : (
              <ReactMarkdown className="prose text-black">{summary}</ReactMarkdown>
            )}
          </div>

          {/* Mind Map Display */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Mind Map</h3>
            {loadingMindMap ? (
              <p>Loading mind map...</p>
            ) : (
              <div ref={mindMapRef} className="mermaid"></div>
            )}
          </div>
        </div>

        {/* Save as PDF or Image Button */}
        <button
          onClick={() => window.print()}
          className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 ${blueBgStyle} text-center text-lg font-semibold py-3 px-6 rounded-full mt-4 w-full max-w-xs hover:bg-blue transition duration-200 shadow-md`}
        >
          Save as PDF or Image
        </button>
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

export default SummaryMindMapPage;

