// src/components/Chat/TextToSpeechButton.js
import React, { useState, useEffect } from "react";

function TextToSpeechButton({ text }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [availableVoices, setAvailableVoices] = useState([]);

  // Load available voices when component mounts
  useEffect(() => {
    // Function to load and set available voices
    function loadVoices() {
      const voicesList = window.speechSynthesis.getVoices();
      if (voicesList.length > 0) {
        setAvailableVoices(voicesList);
      }
    }

    // Load voices right away
    loadVoices();

    // Some browsers (like Chrome) load voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    // Cleanup on unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  // Clean text for better speech
  const cleanTextForSpeech = (text) => {
    // Remove markdown symbols that might affect pronunciation
    return text
      .replace(/<userStyle>.*?<\/userStyle>/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/###/g, "")
      .replace(/\n- /g, ". ");
  };

  const handlePlay = () => {
    // If already playing, stop it
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    // Create speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(cleanTextForSpeech(text));

    // Set speech properties
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Try to find a good voice
    const preferredVoice =
      availableVoices.find(
        (voice) =>
          (voice.name.includes("Google") ||
            voice.name.includes("Premium") ||
            voice.name.includes("Natural")) &&
          voice.lang.includes("en")
      ) || availableVoices.find((voice) => voice.lang.includes("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Set event handlers
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    // Start speaking
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  return (
    <button
      onClick={handlePlay}
      className="text-gray-400 hover:text-primary transition-colors ml-2"
      title={isPlaying ? "Stop speaking" : "Read aloud"}
    >
      {isPlaying ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M6 4.75A.75.75 0 016.75 4h10.5a.75.75 0 01.75.75v14.5a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V4.75Z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001 13.5c0 1.61.305 3.164.848 4.595.342 1.24 1.519 1.905 2.66 1.905h1.932l4.5 4.5c.944.945 2.56.276 2.56-1.06V4.06Z" />
          <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06Z" />
        </svg>
      )}
    </button>
  );
}

export default TextToSpeechButton;
