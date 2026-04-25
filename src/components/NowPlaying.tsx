import styles from './NowPlaying.module.css';

interface NowPlayingProps {
  visible: boolean;
  song: string;
  artist: string;
}

export default function NowPlaying({ visible, song, artist }: NowPlayingProps) {
  return (
    <div className={`${styles.container} ${visible ? styles.visible : ''}`}>
      <div className={styles.icon}>
        <i className="fas fa-music" />
      </div>
      <div className={styles.info}>
        <span className={styles.song}>{song}</span>
        <span className={styles.artist}>{artist}</span>
      </div>
      <div className={styles.bars}>
        <span /><span /><span />
      </div>
    </div>
  );
}