import './Flagship.css'

const PROJECTS = [
  {
    tag: 'Final Year Project · Loughborough University',
    title: 'Teaching a phone to watch how you walk',
    subtitle: 'On-device pose estimation for ankle rehabilitation',
    problem:
      "Clinical gait rehab usually needs a specialist in the room to watch a patient's movement. I wanted to see how far a phone alone could get, with no server round-trip and no data ever leaving the device.",
    approach: [
      'Built a custom pose estimation model on an RTMPose backbone, with a transfer-learned head trained specifically for lower-body joint tracking.',
      'Quantised the model and exported it to CoreML, so inference runs fully on-device on iOS.',
      'Tuned frame rate and resolution against a hardware budget, then formally benchmarked accuracy, latency, and FPS rather than eyeballing it.',
      'Wrapped it in a native Swift app that gives patients real-time visual feedback as they move.',
    ],
    outcome:
      'A pipeline I designed, trained, optimised, and shipped end to end — dataset to a working app in someone\'s hand, with numbers to back up every claim about how well it performs.',
    stack: ['PyTorch', 'RTMPose', 'CoreML', 'Swift', 'Model Quantisation'],
    metricLabel: 'Fully on-device',
    metricNote: 'zero server dependency, real-time inference',
  },
  {
    tag: 'Placement Year · Ovarro, SCADA Product Team',
    title: 'A year inside software that keeps the water running',
    subtitle: 'Production engineering on critical infrastructure',
    problem:
      "Ovarro builds remote monitoring and SCADA systems for water, energy, and national infrastructure clients. I joined the product team with a large, actively maintained, sparsely documented codebase and had to get productive fast.",
    approach: [
      'Worked daily across Java, C++, JavaScript, SQL, PostgreSQL, and Redis inside a live production system.',
      'Designed automated SQL reporting pipelines for major clients, including Affinity Water, cutting out manual data extraction.',
      'Used Docker and CI/CD to support reliable, repeatable delivery, and got hands-on with low-level RTU/PLC telemetry protocols.',
      'Ran fully in agile sprints — stand-ups, code review, sprint planning — and was retained part-time into final year off the back of it.',
    ],
    outcome:
      'Not a simulation of professional software engineering — the real thing, on infrastructure that has to work. Being retained through final year was the clearest signal that the work held up.',
    stack: ['Java', 'C++', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD'],
    metricLabel: '2024 – 2026',
    metricNote: 'retained part-time into final year',
  },
]

export default function Flagship() {
  return (
    <section id="projects" className="section section-border">
      <div className="wrap">
        <p className="eyebrow">Flagship work</p>
        <h2 className="flagship-heading">Two projects, worth slowing down for.</h2>

        <div className="flagship-list">
          {PROJECTS.map((p) => (
            <article className="flagship-card" key={p.title}>
              <div className="flagship-meta">
                <p className="flagship-tag">{p.tag}</p>
                <h3 className="flagship-title">{p.title}</h3>
                <p className="flagship-subtitle">{p.subtitle}</p>

                <div className="flagship-metric">
                  <span className="metric-value">{p.metricLabel}</span>
                  <span className="metric-note">{p.metricNote}</span>
                </div>

                <div className="flagship-stack">
                  {p.stack.map((s) => (
                    <span key={s} className="stack-pill">{s}</span>
                  ))}
                </div>
              </div>

              <div className="flagship-detail">
                <p className="detail-block"><strong>The problem</strong><br />{p.problem}</p>
                <div className="detail-block">
                  <strong>What I did</strong>
                  <ul className="detail-list">
                    {p.approach.map((step, i) => <li key={i}>{step}</li>)}
                  </ul>
                </div>
                <p className="detail-block"><strong>Outcome</strong><br />{p.outcome}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
