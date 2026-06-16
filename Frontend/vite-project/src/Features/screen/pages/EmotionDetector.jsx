import React from "react";
import { useEmotionDetector } from "../hooks/useEmotionDetector";
import { useEmotionContext } from "../EmotionContext";
import { Play, Square } from "lucide-react";

const EmotionDetector = ({ controls }) => {
  const { videoRef, start, stop, isRunning } = useEmotionDetector(controls);
  const { emotion } = useEmotionContext();

  const handleToggle = () => {
    isRunning ? stop() : start();
  };

  return (
    <div className="emotion-detector-inner">
      <video ref={videoRef} autoPlay playsInline />
      
      <button 
        onClick={handleToggle} 
        className={`detection-toggle-btn ${isRunning ? 'stop' : 'start'}`}
      >
        {isRunning ? (
          <>
            <Square size={16} fill="white" />
            <span>Stop Detection</span>
          </>
        ) : (
          <>
            <Play size={16} fill="white" />
            <span>Start AI Detection</span>
          </>
        )}
      </button>
    </div>
  );
};

export default EmotionDetector;