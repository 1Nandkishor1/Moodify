import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSong } from '../hooks/useSong';
import { useEmotionContext } from '../../screen/EmotionContext';
import { useAuth } from '../../auth/hooks/hooks.api';

// Components
import MusicPlayer from '../components/MusicPlayer/MusicPlayer';
import Playlist from '../components/Playlist/Playlist';
import MoodControl from '../components/MoodControl/MoodControl';
import EmotionDetector from '../../screen/pages/EmotionDetector';

// Icons
import { LogOut, Music2, Search, Bell, Settings, User } from 'lucide-react';

import '../style/home.scss';

const Home = () => {
  const { song, loading } = useSong();
  const { emotion, isRunning } = useEmotionContext();
  const { logout, user } = useAuth();
  
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Track processing logic (preserved)
  const tracks = useMemo(() => {
    let baseTracks = [
      { id: 1, title: 'Midnight City', artist: 'M83', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&h=300&fit=crop' },
      { id: 2, title: 'Starboy', artist: 'The Weeknd', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop' },
      { id: 3, title: 'Nightcall', artist: 'Kavinsky', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop' }
    ];

    const fetched = song?.song;
    if (Array.isArray(fetched) && fetched.length > 0) {
      const apiTracks = fetched.map(f => ({
        id: f._id || `api-${Math.random()}`,
        title: f.songname || 'Unknown Title',
        artist: f.singers || 'Unknown Artist',
        src: f.songurl || '',
        cover: f.posterurl || 'https://via.placeholder.com/300'
      }));
      return [...apiTracks, ...baseTracks];
    }
    return baseTracks;
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onEnded = () => repeat ? (audio.currentTime = 0, audio.play()) : handleNext();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', onEnded);
    };
  }, [currentIndex, repeat, tracks]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const handleNext = () => {
    setCurrentIndex(prev => shuffle ? Math.floor(Math.random() * tracks.length) : (prev + 1) % tracks.length);
    setIsPlaying(true);
  };
  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };
  const handleSeek = (e) => {
    const time = (Number(e.target.value) / 100) * duration;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (t) => {
    if (isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const gestureControls = {
    play: () => setIsPlaying(true),
    stop: () => setIsPlaying(false),
    next: handleNext,
    prev: handlePrev
  };

  return (
    <div className="dashboard-container">
      <audio ref={audioRef} src={tracks[currentIndex].src} />
      
      {/* Sidebar */}
      <aside className="sidebar glass-morphism">
        <div className="sidebar-logo">
          <div className="logo-icon accent-gradient">
            <Music2 color="white" size={24} />
          </div>
          <h1 className="text-gradient">Moodify</h1>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active"><Music2 size={20} /><span>Explore</span></button>
          <button className="nav-item"><Search size={20} /><span>Search</span></button>
          <button className="nav-item"><Bell size={20} /><span>Notifications</span></button>
          <button className="nav-item"><Settings size={20} /><span>Settings</span></button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={logout} className="logout-btn">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-viewport">
        <header className="main-header">
          <div className="search-bar glass-morphism">
            <Search size={18} className="text-muted" />
            <input type="text" placeholder="Search for songs, artists..." />
          </div>
          
          <div className="user-profile">
            <div className="user-info">
              <p className="user-name">{user?.username || 'Guest'}</p>
              <p className="user-status">Premium Member</p>
            </div>
            <div className="avatar accent-gradient">
              <User color="white" size={20} />
            </div>
          </div>
        </header>

        <div className="content-grid">
          <section className="mood-section">
            <MoodControl emotion={emotion} isRunning={isRunning}>
              <EmotionDetector controls={gestureControls} />
            </MoodControl>
          </section>

          <section className="queue-section">
            <Playlist 
              tracks={tracks} 
              currentIndex={currentIndex} 
              selectTrack={(i) => { setCurrentIndex(i); setIsPlaying(true); }}
              isPlaying={isPlaying}
            />
          </section>
        </div>
      </main>

      {/* Music Player Bar */}
      <MusicPlayer 
        currentTrack={tracks[currentIndex]}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        handlePrev={handlePrev}
        handleNext={handleNext}
        progress={currentTime}
        duration={duration}
        handleSeek={handleSeek}
        formatTime={formatTime}
        volume={volume}
        setVolume={setVolume}
        shuffle={shuffle}
        setShuffle={setShuffle}
        repeat={repeat}
        setRepeat={setRepeat}
      />
    </div>
  );
};

export default Home;