import './OtherWork.css'

const PROJECTS = [
  {
    title: 'Autonomous Path-Following Robot',
    note: 'U-Net segmentation feeding a PID-controlled differential drive — real-time navigation on embedded hardware.',
    tags: ['U-Net', 'Robotics', 'PID Control'],
  },
  {
    title: 'Fully Connected Network — IS-IS & BGP',
    note: 'Multi-router, multi-AS network built from scratch: dynamic routing, external BGP peering, hardened remote access.',
    tags: ['IS-IS', 'BGP', 'Networking'],
  },
  {
    title: 'GAN Tutorial',
    note: 'A developer-facing walkthrough of DCGAN and conditional GAN architectures, bridging papers and practical code.',
    tags: ['PyTorch', 'GANs'],
  },
  {
    title: 'Knowledge Management System',
    note: 'Full-stack web app deployed on Google Cloud Compute Engine — built and shipped as Scrum Master and developer.',
    tags: ['PHP', 'Google Cloud', 'Agile'],
  },
  {
    title: 'Rugby Place Kick Tracking App',
    note: 'Native Android app in Kotlin, Firebase-backed, built to track kicking performance — where the rugby and the code meet.',
    tags: ['Kotlin', 'Firebase', 'Android'],
  },
  {
    title: 'Arduino Smart Home Hub',
    note: 'C++ firmware coordinating multiple devices over Serial, with deliberate SRAM optimisation on constrained hardware.',
    tags: ['C++', 'Embedded', 'IoT'],
  },
]

export default function OtherWork() {
  return (
    <section className="section section-border">
      <div className="wrap">
        <p className="eyebrow">Other work</p>
        <h2 className="other-heading">A broader spread.</h2>

        <div className="other-grid">
          {PROJECTS.map((p) => (
            <div className="other-card" key={p.title}>
              <h3 className="other-title">{p.title}</h3>
              <p className="other-note">{p.note}</p>
              <div className="other-tags">
                {p.tags.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
