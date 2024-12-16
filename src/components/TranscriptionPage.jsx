// src/components/TranscriptionPage.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TranscriptionPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();

  const startRecording = async () => {
    setError('');
    setIsRecording(true);
    audioChunksRef.current = [];

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = handleRecordingStop;
      mediaRecorderRef.current.start();
    } catch (err) {
      console.error('Microphone access error:', err);
      setError('Could not access microphone. Check permissions.');
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleRecordingStop = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioUrl(audioUrl);

    const formData = new FormData();
    formData.append('audio', audioBlob, 'audio.webm');

    try {
      const response = await axios.post('/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/transcript', { state: { transcription: response.data.transcription } });
    } catch (error) {
      console.error('Transcription error:', error);
      setError('Failed to transcribe audio. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen justify-between">
      {/* Header */}
      <header className="text-white text-center">
        <div className="bg-blue pt-12 pb-12 shadow-md rounded-b-3xl fixed top-0 left-0 w-full z-10">
          <h1 className="text-4xl font-extrabold tracking-wide">smartclass</h1>
        </div>

        {/* Title */}
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-80 z-50">
          <div className="bg-white text-blue font-semibold text-lg px-6 py-3 rounded-full shadow-lg w-full">
            <h2 className="text-xl font-semibold">Voice Recording</h2>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center mt-44 px-4">
        {/* Microphone Icon */}
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue text-white rounded-full p-6 shadow-md">
            <i className="fas fa-microphone text-4xl"></i>
          </div>
        </div>

        {/* Start/Stop Recording Button */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`${
            isRecording ? 'bg-red-500' : 'bg-blue'
          } text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition duration-200 shadow-md mb-6`}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>

        {/* Sound Wave Simulation */}
        {isRecording && (
          <div className="wave-container flex justify-center items-center mb-8">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="wave-bar bg-blue"
                style={{
                  width: '4px',
                  height: '40px',
                  margin: '0 2px',
                  animation: `wave 1s ease-in-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }}
              ></div>
            ))}
          </div>
        )}

        {/* Audio Playback */}
        {audioUrl && (
          <div className="w-full mt-4">
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/webm" />
            </audio>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 mt-4">{error}</p>}
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

export default TranscriptionPage;

