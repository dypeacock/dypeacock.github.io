export const FLAGSHIP_PROJECTS = [
  {
    slug: 'pose-estimation',
    tag: 'Final Year Project · Loughborough University',
    title: 'Teaching a phone to watch how you walk',
    subtitle: 'On-device pose estimation for ankle rehabilitation',
    hook:
      'A phone-only gait tracking pipeline: on-device, real-time, and built to run without a specialist in the room.',
    metricLabel: 'Fully on-device',
    metricNote: 'zero server dependency, real-time inference',
    stack: ['PyTorch', 'RTMPose', 'CoreML', 'Swift', 'Model Quantisation'],
    brief:
      "Clinical gait rehab usually needs a specialist in the room to watch a patient's movement and judge whether they're recovering correctly. My final-year brief was self-directed: find out how much of that judgement a phone could take on by itself, with no server round-trip and no data ever leaving the device — relevant for both cost and for privacy in a clinical setting.",
    process: [
      "I scoped the problem around lower-body joint tracking specifically, since that's what matters for ankle rehab, rather than trying to build a general-purpose pose model. That meant an existing full-body architecture would carry weight I didn't need.",
      'I chose RTMPose as a backbone for its accuracy-to-latency ratio, then designed and trained a transfer-learned keypoint detection head on top of it, targeted at the joints relevant to gait analysis.',
      'Before touching mobile deployment, I set the success criteria I\'d be evaluated against: keypoint accuracy, inference latency, and frames-per-second — so "does it work" would have numbers behind it, not a demo that just looked fine.',
    ],
    implementation: [
      'Quantised the trained model and exported it to CoreML, which was the step that actually got inference running fully on-device on iOS.',
      'Tuned frame rate and input resolution against the hardware budget of a phone rather than a workstation GPU, then re-ran the accuracy/latency/FPS benchmarks after each change to see what the trade-off actually cost.',
      'Built a native Swift app around the pipeline that gives real-time visual feedback as the patient moves, rather than a post-hoc report.',
    ],
    outcome:
      "The result is a pipeline I took end to end myself: dataset preparation, model design, training, quantisation, mobile integration, and a structured performance evaluation, not just a trained model in a notebook. It runs in real time, on-device, in an app someone could actually hold.",
    media: [],
  },
  {
    slug: 'ovarro-placement',
    tag: 'Placement Year · Ovarro, SCADA Product Team',
    title: 'A year inside software that keeps the water running',
    subtitle: 'Production engineering on critical infrastructure',
    hook:
      'A placement year on a live SCADA codebase for water, energy, and national infrastructure clients — production work, not a simulated project.',
    metricLabel: '2024 – 2026',
    metricNote: 'retained part-time into final year',
    stack: ['Java', 'C++', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD'],
    brief:
      "Ovarro builds remote monitoring and SCADA systems for water, energy, and national infrastructure clients. I joined the product team as a placement engineer, dropped into a large, actively maintained, and sparsely documented codebase, and had to get productive without much hand-holding.",
    process: [
      'Onboarding was mostly self-directed: reading the existing codebase, asking senior engineers targeted questions rather than broad ones, and picking up small tickets first to learn the system\'s shape before touching anything client-facing.',
      'I worked daily across Java, C++, JavaScript, SQL, PostgreSQL, and Redis, which meant learning where each piece of the stack was responsible for what, rather than treating it as one undifferentiated codebase.',
      'I ran fully inside the team\'s agile process — daily stand-ups, sprint planning, code review — which shaped how I scoped and communicated my own work, not just how I wrote it.',
    ],
    implementation: [
      'Designed and built automated SQL reporting pipelines for major clients, including Affinity Water, replacing a manual data-extraction process with something repeatable.',
      'Used Docker to containerise components and CI/CD pipelines to support consistent, repeatable delivery across the team, rather than relying on manual deploy steps.',
      'Got hands-on with low-level RTU/PLC telemetry protocols — the layer where the software actually meets physical infrastructure — which is a different debugging mindset from a typical web stack.',
    ],
    outcome:
      "I was retained on a part-time contract into my final year, which was the clearest external signal that the contribution held up under normal team expectations, not just placement-student expectations.",
    media: [],
  },
]

export function getProjectBySlug(slug) {
  return FLAGSHIP_PROJECTS.find((p) => p.slug === slug)
}
