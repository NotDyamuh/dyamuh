import { useState, useCallback } from 'react';
import styles from './Overlay.module.css';

interface OverlayProps {
  onStart: () => void;
  onEnter: () => void;
}

// const WORDS = ['dulio,', '力を貸して'];
const WORDS = ["Yeah, I'm in love.", 'With what?', 'With everything.'];
const DELAYS = [1300, 1800, 750];

export default function Overlay({ onStart, onEnter }: OverlayProps) {
  const [litWords, setLitWords] = useState<boolean[]>([false, false, false]);
  const [hiding, setHiding] = useState(false);
  const [active, setActive] = useState(false);

  const handleClick = useCallback(() => {
    if (active) return;
    setActive(true);
    onStart();

    let idx = 0;

    function process() {
      if (idx < WORDS.length) {
        const currentIdx = idx;
        setLitWords(prev => {
          const next = [...prev];
          next[currentIdx] = true;
          return next;
        });
        setTimeout(() => {
          idx++;
          process();
        }, DELAYS[currentIdx]);
      } else {
        setTimeout(() => {
          setHiding(true);
          setTimeout(onEnter);
        }, 900);
      }
    }

    process();
  }, [active, onStart, onEnter]);

  return (
    <div
      className={`${styles.overlay} ${hiding ? styles.hidden : ''}`}
      onClick={handleClick}
    >
      <div className={styles.content}>
        <div className={styles.lyricsContainer}>
          {WORDS.map((word, i) => (
            <span
              key={word}
              className={`${styles.word} ${litWords[i] ? styles.light : ''}`}
            >
              {word}
            </span>
          ))}
        </div>
        <div className={`${styles.hint} ${active ? styles.hintHidden : ''}`}>
          click anywhere to start
        </div>
      </div>
    </div>
  );
}