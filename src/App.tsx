import { useState, useCallback, useRef } from 'react';
import Snow from './components/Snow';
import Overlay from './components/Overlay';
import MainCard from './components/MainCard';
import NowPlaying from './components/NowPlaying';
import SidePanels from './components/SidePanels';
import './App.css';

export default function App() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [cardVisible, setCardVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio('/ww.flac'));

  const handleStart = useCallback(() => {
    audioRef.current.play().catch(() => {});
  }, []);

  const handleEnter = useCallback(() => {
    setCardVisible(true);
    setTimeout(() => setShowOverlay(false), 1000);
  }, []);

  return (
    <>
      <Snow />
      {showOverlay && <Overlay onStart={handleStart} onEnter={handleEnter} />}
      <SidePanels visible={cardVisible} />
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        gap: '1.9rem'
      }}>
        <MainCard visible={cardVisible} />
        <NowPlaying
          visible={cardVisible}
          song="Went Wrong"
          artist="Yeat"
        />
      </div>
    </>
  );
}