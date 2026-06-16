import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Music2 } from 'lucide-react';
import './MusicPlayer.scss';

const MusicPlayer = ({ 
  currentTrack, 
  isPlaying, 
  togglePlay, 
  handlePrev, 
  handleNext, 
  progress, 
  duration, 
  handleSeek, 
  formatTime,
  volume,
  setVolume,
  shuffle,
  setShuffle,
  repeat,
  setRepeat
}) => {
  return (
    <div className="music-player glass-morphism">
      <div className="player-inner">
        {/* Track Info */}
        <div className="track-info-container">
          <motion.div 
            key={currentTrack.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="track-art-wrapper"
          >
            <img src={currentTrack.cover} alt={currentTrack.title} className={isPlaying ? 'rotating' : ''} />
            <div className={`playing-pulse ${isPlaying ? 'active' : ''}`}></div>
          </motion.div>
          <div className="track-details">
            <h3 className="track-title">{currentTrack.title}</h3>
            <p className="track-artist">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Main Controls */}
        <div className="player-controls">
          <div className="control-buttons">
            <button 
              className={`icon-btn ${shuffle ? 'active' : ''}`} 
              onClick={() => setShuffle(!shuffle)}
              title="Shuffle"
            >
              <Shuffle size={18} />
            </button>
            <button className="icon-btn" onClick={handlePrev} title="Previous">
              <SkipBack size={22} fill="currentColor" />
            </button>
            <button className="play-btn accent-gradient" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" />}
            </button>
            <button className="icon-btn" onClick={handleNext} title="Next">
              <SkipForward size={22} fill="currentColor" />
            </button>
            <button 
              className={`icon-btn ${repeat ? 'active' : ''}`} 
              onClick={() => setRepeat(!repeat)}
              title="Repeat"
            >
              <Repeat size={18} />
            </button>
          </div>

          <div className="progress-container">
            <span className="time">{formatTime(progress)}</span>
            <div className="slider-wrapper">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={(progress / duration) * 100 || 0} 
                onChange={handleSeek}
                className="progress-slider"
              />
              <div 
                className="slider-progress" 
                style={{ width: `${(progress / duration) * 100 || 0}%` }}
              ></div>
            </div>
            <span className="time">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Extra */}
        <div className="extra-controls">
          <div className="volume-control">
            <Volume2 size={18} className="text-muted" />
            <div className="slider-wrapper volume-slider-wrapper">
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume} 
                onChange={(e) => setVolume(Number(e.target.value))}
                className="volume-slider"
              />
              <div 
                className="slider-progress" 
                style={{ width: `${volume * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
