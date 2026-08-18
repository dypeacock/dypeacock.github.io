import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { cx } from '../../lib/cx'
import styles from './Nav.module.css'

const LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#projects', label: 'Work' },
  { href: '/#skills', label: 'Skills' },
  { href: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className={styles.nav}>
      <div className={cx('wrap', styles.inner)}>
        <Link to="/" className={styles.mark}>DP</Link>
        <div className={styles.right}>
          <div className={styles.links}>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>{l.label}</a>
            ))}
          </div>
          <button
            type="button"
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={theme === 'dark'}
          >
            <span className={cx(styles.themeToggleIcon, theme === 'dark' && styles.isDark)} aria-hidden="true">
              {theme === 'dark' ? '☾' : '☀'}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
