import styles from './MainCard.module.css';

interface MainCardProps {
  visible: boolean;
}

export default function MainCard({ visible }: MainCardProps) {
  return (
    <div className={`${styles.container} ${visible ? styles.visible : ''}`}>
      <div className={styles.profilePic}>
        <a href="#">
          <img
            src="https://avatars.githubusercontent.com/u/81250612?v=4"
            alt="Profile Picture"
          />
        </a>
      </div>

      <div className={styles.bio}>
        <p>dyamuh</p>
        <p className={styles.subBio}>14 y/o developer. Passion for full stack development, cybersecurity & Linux®.</p>
      </div>

      <div className={styles.socialIcons}>
        <a href="https://github.com/dyamuh" title="GitHub" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github" />
        </a>
        <a href="https://discord.com/users/708493408481286155" title="Discord" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-discord" />
        </a>
        <a href="https://aluratech.org" title="Website" target="_blank" rel="noopener noreferrer">
          <i className="fas fa-globe" />
        </a>
        <a href="https://open.spotify.com/user/31qvl2s7oszg6zexqgvnktevgrxm?si=9f929084d8f64391" title="Spotify" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-spotify" />
        </a>
      </div>
    </div>
  );
}