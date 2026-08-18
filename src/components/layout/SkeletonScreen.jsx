import styles from './SkeletonScreen.module.css'

export default function SkeletonScreen({ visible }) {
  return (
    <div
      className={styles.screen}
      style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
    >
      <span className={styles.mark}>DP</span>
      <div className={styles.bar} />
    </div>
  )
}
