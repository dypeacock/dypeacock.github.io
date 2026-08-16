import './About.css'
import polaroid from '../assets/Polaroid.png'

const QUIRKS = [
  { label: 'Reading & making art', note: 'analogue hobbies for when life gets loud' },
  { label: 'Philosophy', note: 'studied it through my baccalaureate' },
  { label: 'Bilingual', note: 'fluent French & English, living in France since age 6' },
  { label: 'Snowboarding', note: 'taught by my dad — still where I find catharsis' },
  { label: 'Rugby', note: 'played to a high level, met my best friends through it' },
  { label: 'Film production & design', note: 'video essays are a genuine hobby, not procrastination' },
  { label: 'Dog', note: 'unofficial team lead on all household breaks' },
  { label: 'Music', note: 'usually playing something while I work' },
]

export default function About() {
  return (
    <section id="about" className="section section-border">
      <div className="wrap about-grid">
        <div className="about-side">
          <p className="eyebrow">About</p>
          <h2 className="about-title">Still figuring it out, deliberately.</h2>
          <div className="about-photo-frame">
            <img src={polaroid} alt="Dylan Peacock on graduation day" className="about-photo" />
          </div>
        </div>

        <div className="about-body">
          <p>
            I got into computer science because I was inspired by what technology
            can do for people — stories like Turing helping break the Enigma code
            stuck with me. I like that the field keeps facing forward, and how
            readily it embraces new ideas. What draws me in specifically is systems
            design: how things actually work under the hood, especially when the
            end goal is something a real person will use.
          </p>
          <p>
            What excites me right now is also what unsettles me a little: AI has
            lowered the barrier to building software so far that it's reshaping
            what junior roles even look like. But that cuts both ways — there's
            never been a better moment to pair real domain expertise with these
            tools and build something genuinely useful.
          </p>
          <p>
            Right now I'm weighing my interests and options deliberately before
            committing to a graduate path. Not indecision — due diligence.
          </p>

          <div className="quirks">
            <p className="quirks-label">Off-screen</p>
            <ul className="quirks-list">
              {QUIRKS.map((q) => (
                <li key={q.label}>
                  <span className="quirk-name">{q.label}</span>
                  <span className="quirk-note">{q.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
