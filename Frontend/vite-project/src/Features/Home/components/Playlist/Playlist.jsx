import React from 'react';
import { motion } from 'framer-motion';
import { Music, Play } from 'lucide-react';
import './Playlist.scss';

const Playlist = ({ tracks, currentIndex, selectTrack, isPlaying }) => {
  return (
    <div className="playlist-card glass-morphism">
      <div className="card-header">
        <h2 className="text-gradient">Up Next</h2>
        <span className="track-count">{tracks.length} tracks</span>
      </div>
      
      <div className="tracks-list">
        {tracks.map((track, index) => {
          const isActive = index === currentIndex;
          return (
            <motion.div 
              key={track.id}
              whileHover={{ x: 8 }}
              className={`track-item ${isActive ? 'active' : ''}`}
              onClick={() => selectTrack(index)}
            >
              <div className="track-index">
                {isActive && isPlaying ? (
                  <div className="playing-bars">
                    <span></span><span></span><span></span>
                  </div>
                ) : (
                  <span>{String(index + 1).padStart(2, '0')}</span>
                )}
              </div>
              
              <div className="track-thumb">
                <img src={track.cover} alt={track.title} />
                {isActive && <div className="active-overlay"><Play size={16} fill="white" /></div>}
              </div>
              
              <div className="track-meta">
                <p className="title">{track.title}</p>
                <p className="artist">{track.artist}</p>
              </div>
              
              <div className="track-duration">
                <Music size={14} className="text-muted" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Playlist;
