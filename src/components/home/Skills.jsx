import styles from './Skills.module.css'

const GROUPS = [
  {
    title: 'Vision & ML',
    context: 'From training to on-device deployment.',
    items: ['PyTorch', 'TensorFlow', 'PyCharm', 'U-Net', 'GANs', 'CoreML', 'OpenCV'],
  },
  {
    title: 'Systems & Infrastructure',
    context: 'What I used daily at Ovarro.',
    items: ['Java', 'C++', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD', 'Linux / Bash'],
  },
  {
    title: 'Networking & Security',
    context: 'From protocol theory to routers I configured myself.',
    items: ['TCP/IP', 'IS-IS', 'BGP', 'TLS / PKI', 'Cryptography', 'RTU / PLC Protocols'],
  },
  {
    title: 'Mobile & Web',
    context: 'Where the code meets a person.',
    items: ['Swift', 'Kotlin', 'JavaScript', 'ReactJS', 'PHP', 'Firebase'],
  },
  {
    title: 'Languages',
    context: 'Spoken, not compiled.',
    items: ['English (Fluent)', 'French (Fluent)', 'Spanish (Working)'],
  },
  {
    title: 'AI Tools',
    context: 'Accelerating the workflow.',
    items: ['Claude Code', 'Skills.md', 'Prompt engineering'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section section-border">
      <div className="wrap">
        <p className="eyebrow">Skills</p>
        <h2 className={styles.heading}>Grouped by what they're for, not just what they are.</h2>

        <div className={styles.grid}>
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h3 className={styles.groupTitle}>{g.title}</h3>
              <p className={styles.groupContext}>{g.context}</p>
              <div className={styles.items}>
                {g.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
