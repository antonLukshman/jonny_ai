// src/components/SpeechInitializer.js
import { useEffect } from "react";

function SpeechInitializer() {
  useEffect(() => {
    // Initialize the speech synthesis system
    if (typeof window !== "undefined" && window.speechSynthesis) {
      // Force load voices
      speechSynthesis.getVoices();
    }

    // Cleanup
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}

export default SpeechInitializer;
