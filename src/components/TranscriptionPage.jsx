// src/components/TranscriptionPage.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

const TranscriptionPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();
  const fileInputRef = useRef(null); // Correct ref declaration

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

    await transcribeAudio(formData);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('audio', file);

    setAudioUrl(URL.createObjectURL(file)); // Optional: Preview uploaded file
    await transcribeAudio(formData);
  };

  const transcribeAudio = async (formData) => {
    setIsTranscribing(true);
    try {
      const response = await axios.post('/transcribe', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setIsTranscribing(false);
      navigate('/transcript', { state: { transcription: response.data.transcription } });
    } catch (error) {
      console.error('Transcription error:', error);
      setError('Failed to transcribe audio. Please try again.');
      setIsTranscribing(false);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen justify-between">
      <header className="text-white text-center">
        <div className="bg-blue pt-12 pb-12 shadow-md rounded-b-3xl fixed top-0 left-0 w-full z-10">
          <h1 className="text-4xl font-extrabold tracking-wide">smartclass</h1>
        </div>
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 w-80 z-50">
          <div className="bg-white text-blue font-semibold text-lg px-6 py-3 rounded-full shadow-lg w-full">
            <h2 className="text-xl font-semibold">Voice Recording</h2>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center mt-28 px-4">
        {!isTranscribing ? (
          <>
            <div className="flex flex-col items-center mb-6">
              <div className="bg-blue text-white rounded-full p-6 shadow-md">
                <i className="fas fa-microphone text-4xl"></i>
              </div>
            </div>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              className={`${
                isRecording ? 'bg-red-500' : 'bg-blue'
              } text-white text-lg font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition duration-200 shadow-md mb-3`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            {isRecording && (
              <div className="wave-container flex justify-center items-center my-3">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="wave-bar"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                    }}
                  ></div>
                ))}
              </div>
            )}
            {audioUrl && (
              <div className="w-full mt-4">
                <audio controls className="w-full">
                  <source src={audioUrl} type="audio/webm" />
                </audio>
              </div>
            )}
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden" // Hide the file input element
              ref={fileInputRef} // Correct ref
            />
            <button
              onClick={() => fileInputRef.current.click()} // Correctly use fileInputRef
              className="bg-gray-200 text-blue text-lg font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition duration-200 shadow-md"
            >
              Upload Audio File
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue mt-4">Transcribing...</p>
          </div>
        )}
      </main>
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

export default TranscriptionPage;