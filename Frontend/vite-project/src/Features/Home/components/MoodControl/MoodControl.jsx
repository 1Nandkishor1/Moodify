import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Smile, Activity } from 'lucide-react';
import './MoodControl.scss';

const MoodControl = ({ emotion, isRunning, children }) => {
  return (
    <div className="mood-control-card glass-morphism">
      <div className="card-header">
        <div className="title-area">
          <h2 className="text-gradient">Mood Detection</h2>
          <p className="subtitle">AI-powered music curation</p>
        </div>
        <div className={`status-badge ${isRunning ? 'active' : ''}`}>
          <Activity size={14} className={isRunning ? 'pulse' : ''} />
          <span>{isRunning ? 'Live' : 'Standby'}</span>
        </div>
      </div>

      <div className="camera-viewport">
        {children}
        
        {!isRunning && (
          <div className="camera-placeholder">
            <Camera size={48} className="text-muted" />
            <p>Camera is off</p>
          </div>
        )}

        {isRunning && emotion && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="emotion-overlay"
          >
            <div className="emotion-tag accent-gradient">
              <Smile size={16} />
              <span>{emotion}</span>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mood-instructions">
        <p>Gesture Controls:</p>
        <div className="gestures">
          <span title="Palm to stop">✋ Stop</span>
          <span title="Fist to play">✊ Play</span>
          <span title="V-sign for next">✌️ Next</span>
        </div>
      </div>
    </div>
  );
};

export default MoodControl;
