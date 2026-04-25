import styles from './SidePanels.module.css';

interface SidePanelsProps {
  visible: boolean;
}

export default function SidePanels({ visible }: SidePanelsProps) {
  return (
    <>
      <div className={`${styles.panel} ${styles.left} ${visible ? styles.visible : ''}`}>
        <div className={styles.badge}><i className="fas fa-crown" /> owner @ alura</div>
        <div className={styles.badge}><i className="fas fa-code" /> contributor @ monochrome</div>
        <div className={styles.badge}><i className="fas fa-code" /> developer @ pedropathing</div>
      </div>

      <div className={`${styles.panel} ${styles.right} ${visible ? styles.visible : ''}`}>
        <div className={styles.badge}><i className="fas fa-shield-alt" /> daring</div>
        <div className={styles.badge}><i className="fas fa-compass" /> integrity</div>
        <div className={styles.badge}><i className="fas fa-bolt" /> self-taught</div>
      </div>
    </>
  );
}