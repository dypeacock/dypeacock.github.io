export const FLAGSHIP_PROJECTS = [
  {
    slug: 'pose-estimation',
    about: [
      'Final Year Project',
      'Loughborough University'
    ],
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
    metricLabel: 'Fully on-device',
    metricNote: 'zero server dependency, real-time inference',
    tags: ['PyTorch', 'RTMPose', 'CoreML', 'Swift', 'Model Quantisation'],
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
    about: [
      'Placement Year  Ovarro',
      'SCADA Product Team'
    ],
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
    metricLabel: '2024 – 2026',
    metricNote: 'retained part-time into final year',
    tags: ['Java', 'C++', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD'],
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

// Lighter-weight projects — shown in the Work page grid alongside the flagship
// projects above. They intentionally don't carry the full brief/process/
// implementation/outcome shape yet; ProjectDetail renders whatever a project
// actually has and quietly omits the rest, so these still get a working detail
// page today and can be filled in with full case studies later without any
// component changes.
export const OTHER_PROJECTS = [
  {
    slug: 'path-following-robot',
    about: [
      'Robotics Coursework',
      'Loughborough University'
    ],
    title: 'Autonomous Path-Following Robot',
    note: 'U-Net segmentation feeding a PID-controlled differential drive — real-time navigation on embedded hardware.',
    tags: ['U-Net', 'Robotics', 'PID Control'],
  },
  {
    slug: 'isis-bgp-network',
    about: [
      'Advanced Networking Coursework',
      'Loughborough University'
    ],
    title: 'Fully Connected Network — IS-IS & BGP',
    note: 'Multi-router, multi-AS network built from scratch: dynamic routing, external BGP peering, hardened remote access.',
    tags: ['IS-IS', 'BGP', 'Networking'],
  },
  {
    slug: 'gan-tutorial',
    about: [
      'Advanced AI Coursework',
      'Loughborough University'
    ],
    title: 'GAN Tutorial',
    note: 'A developer-facing walkthrough of DCGAN and conditional GAN architectures, bridging papers and practical code.',
    tags: ['PyTorch', 'GANs'],
  },
  {
    slug: 'knowledge-management-system',
    about: [
      'Group Project Coursework',
      'Loughborough University'
    ],
    title: 'Knowledge Management System',
    note: 'Full-stack web app deployed on Google Cloud Compute Engine — built and shipped as Scrum Master and developer.',
    tags: ['PHP', 'Google Cloud', 'Agile'],
  },
  {
    slug: 'rugby-kick-tracker',
    about: [
      'Mobile App Development Coursework',
      'Loughborough University'
    ],
    title: 'Rugby Place Kick Tracking App',
    note: 'Native Android app in Kotlin, Firebase-backed, built to track kicking performance — where the rugby and the code meet.',
    tags: ['Kotlin', 'Firebase', 'Android'],
  },
  {
    slug: 'arduino-smart-home-hub',
    about: [
      'Embedded Systems Coursework',
      'Loughborough University'
    ],
    title: 'Arduino Smart Home Hub',
    note: 'C++ firmware coordinating multiple devices over Serial, with deliberate SRAM optimisation on constrained hardware.',
    tags: ['C++', 'Embedded', 'IoT'],
  },
]

export const ALL_PROJECTS = [...FLAGSHIP_PROJECTS, ...OTHER_PROJECTS]

export function getProjectBySlug(slug) {
  return ALL_PROJECTS.find((p) => p.slug === slug)
}
