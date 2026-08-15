import './Skills.css'

const GROUPS = [
  {
    title: 'Vision & ML',
    context: 'From training to on-device deployment.',
    items: ['PyTorch', 'TensorFlow', 'RTMPose', 'U-Net', 'GANs', 'CoreML', 'Model Quantisation'],
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
    items: ['Swift', 'Kotlin', 'JavaScript', 'HTML/CSS', 'PHP', 'Firebase'],
  },
  {
    title: 'Languages',
    context: 'Spoken, not compiled.',
    items: ['English (Fluent)', 'French (Fluent)', 'Spanish (Working)'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section section-border">
      <div className="wrap">
        <p className="eyebrow">Skills</p>
        <h2 className="skills-heading">Grouped by what they're for, not just what they are.</h2>

        <div className="skills-grid">
          {GROUPS.map((g) => (
            <div className="skill-group" key={g.title}>
              <h3 className="skill-group-title">{g.title}</h3>
              <p className="skill-group-context">{g.context}</p>
              <div className="skill-items">
                {g.items.map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
