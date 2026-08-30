//Pose estimation
import poseHome from '../assets/IMG_6689.jpg'
import poseSetup from '../assets/IMG_6690.jpg'
import poseProgress from '../assets/IMG_6691.jpg'
import poseSessionDetail from '../assets/IMG_6692.jpg'
import poseLiveFront from '../assets/IMG_6694.jpg'
import poseDemoVideo from '../assets/pose-estimation-demo.mp4'
import poseDemoPoster from '../assets/pose-estimation-demo-poster.jpg'

//Ovarro
import ovarroPoster from '../assets/OvarroPoster.jpg'

//Website
import ide from '../assets/Website-IDE.png'
import gitHubActions from '../assets/Website-GitHubActions.png'
import cloudFlare from '../assets/Website-CloudFlare.png'

//Robotics
import roboticsPhoto from '../assets/Robotics.jpg'

//Network
import bothNets from '../assets/BothNetworks.png'
import physicalNet from '../assets/Network-physical.png'
import virtualNet from '../assets/Network-virtual.png'
import routerConfig from '../assets/Router1-config.png'

//GAN Tutorial
import gan1 from '../assets/GAN-1.png'
import gan5 from '../assets/GAN-5.png'
import gan10 from '../assets/GAN-10.png'
import gan15 from '../assets/GAN-15.png'
import gan20 from '../assets/GAN-20.png'
import trainingImg from '../assets/GAN-TrainingImg.png'
import trainingLoss from '../assets/GAN-TrainingLoss.png'
import discrimOutput from '../assets/GAN-DiscriminatorOutputs.png'

//Kicking App
import pitch from '../assets/Kicker-Pitch.png'
import posts from '../assets/Kicker-Posts.png'
import sessions from '../assets/Kicker-Sessions.png'
import matchSummary from '../assets/Kicker-MatchSummary.png'
import signIn from '../assets/Kicker-SignIn.png'
import signUp from '../assets/Kicker-SignUp.png'

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
    metricNote: 'Zero server dependency, real-time inference',
    tags: ['PyTorch', 'RTMPose', 'CoreML', 'Swift', 'Model Quantisation'],
    brief:
        "Clinical gait rehab usually needs a specialist in the room to watch a patient's movement and judge whether they're recovering correctly. My final-year brief was self-directed: find out how much of that judgement a phone could take on by itself, with no server round-trip and no data ever leaving the device. Relevant for both cost and for privacy in a clinical setting.",
    process: [
      "I scoped the problem around lower-body joint tracking specifically, since that's what matters for ankle rehab, rather than trying to build a general-purpose pose model. That meant an existing full-body architecture would carry weight I didn't need.",
      'I chose RTMPose as a backbone for its accuracy-to-latency ratio, then designed and trained a transfer-learned keypoint detection head on top of it, targeted at the joints relevant to gait analysis.',
      'Before touching mobile deployment, I set the success criteria I\'d be evaluated against: keypoint accuracy, inference latency, and frames-per-second. Quantifying the question "does it work" meant having numbers behind the model, not a demo that just looked fine.',
    ],
    implementation: [
      'Quantised the trained model and exported it to CoreML, which was the step that actually got inference running fully on-device on iOS.',
      'Tuned frame rate and input resolution against the hardware budget of a phone rather than a workstation GPU, then re-ran the accuracy/latency/FPS benchmarks after each change to see what the trade-off actually cost.',
      'Built a native Swift app around the pipeline that gives real-time visual feedback as the patient moves, rather than a post-hoc report.',
    ],
    outcome:
        "The result is a pipeline I took end to end myself: dataset preparation, model design, training, quantisation, mobile integration, and a structured performance evaluation, not just a trained model in a notebook. It runs in real time, on-device, in an app someone could actually hold.",
    challenges: [
      "Environment management became its own early obstacle: manually tracking mismatched package versions across tools wasn't sustainable. Switching to Anaconda solved it: I could create environments, activate them per task, save to and restore them from a YAML file, which also turned out to matter later for keeping remote training environments identical to my local one.",
      'No existing pose-estimation framework was trained on lower-body and ankle-specific keypoints, so there was no dataset to fine-tune from. I recorded my own training footage and labelled it using an annotation and training pipeline built for animal-behavioural analysis, adapted for human joint tracking instead of the animal subjects it was designed around.',
      "My 8GB MacBook Air made local training impractical. I first moved training onto university lab machines, until I lost a run overnight to a nightly wipe I hadn't been told about; after that I moved to GCP VMs sized for the task, SSH'd in from my laptop, and used the saved Anaconda YAML file to keep the remote environment identical to my local one.",
      'This project was also where I properly learned PyTorch, picked up alongside the model design itself rather than as separate prep beforehand.',
    ],
    media: {
      type: 'phone',
      items: [
        {
          type: 'video',
          src: poseDemoVideo,
          poster: poseDemoPoster,
          alt: 'Live tracking during a dorsiflexion rep: skeleton overlay on the ankle and knee with a real-time angle readout',
        },
        {
          type: 'image',
          src: poseHome,
          alt: 'App home screen: Ankle Rehab, a dorsiflexion and plantarflexion tracker',
        },
        {
          type: 'image',
          src: poseSetup,
          alt: 'Session setup screen: choosing tracking side and movement type, with camera positioning guidance',
        },
        {
          type: 'image',
          src: poseLiveFront,
          alt: 'Live tracking from a front-on angle, both legs, with the angle readout overlaid at top',
        },
        {
          type: 'image',
          src: poseSessionDetail,
          alt: 'Single session detail: best angle, min/avg/max, and the angle-over-time waveform',
        },
        {
          type: 'image',
          src: poseProgress,
          alt: 'Progress screen: angle trend across sessions and a session history list',
        },
      ],
    },
  },
  {
    slug: 'ovarro-placement',
    about: [
      'Placement Year',
      'Ovarro - SCADA Product Team'
    ],
    title: 'A year inside software that keeps the water running',
    subtitle: 'Production engineering on critical infrastructure',
    problem:
        "Ovarro builds remote monitoring and SCADA systems for water, energy, and national infrastructure clients. I joined the product team with a large, actively maintained, sparsely documented codebase and had to get productive fast.",
    approach: [
      'Worked daily across Java, C++, JavaScript, SQL, PostgreSQL, and Redis inside a live production system.',
      'Designed automated SQL reporting pipelines for major clients, including Affinity Water, cutting out manual data extraction.',
      'Used Docker and CI/CD to support reliable, repeatable delivery, and got hands-on with low-level RTU/PLC telemetry protocols.',
      'Ran fully in agile sprints: stand-ups, code review, sprint planning, and was retained part-time into final year off the back of it.',
    ],
    metricLabel: '2024 - 2026',
    metricNote: 'retained part-time into final year',
    tags: ['Java', 'C++', 'PostgreSQL', 'Redis', 'Docker', 'CI/CD'],
    brief:
        "Ovarro builds remote monitoring and SCADA systems for water, energy, and national infrastructure clients. I joined the product team as a placement engineer, dropped into a large, actively maintained, and sparsely documented codebase, and had to get productive without much hand-holding.",
    process: [
      'Onboarding was mostly self-directed: reading the existing codebase, asking senior engineers targeted questions rather than broad ones, and picking up small tickets first to learn the system\'s shape before touching anything client-facing.',
      'I worked daily across Java, C++, JavaScript, SQL, PostgreSQL, and Redis, which meant learning where each piece of the stack was responsible for what, rather than treating it as one undifferentiated codebase.',
      'I ran fully inside the team\'s agile process: daily stand-ups, sprint planning, code review, which shaped how I scoped and communicated my own work, not just how I wrote it.',
    ],
    implementation: [
      'Designed and built automated SQL reporting pipelines for major clients, including Affinity Water, replacing a manual data-extraction process with something repeatable.',
      'Used Docker to containerise components and CI/CD pipelines to support consistent, repeatable delivery across the team, rather than relying on manual deploy steps.',
      'Got hands-on with low-level RTU/PLC telemetry protocols, the layer where the software actually meets physical infrastructure, which is a different debugging mindset from a typical web stack.',
    ],
    outcome:
        "I was retained on a part-time contract into my final year, which was the clearest external signal that the contribution held up under normal team expectations, not just placement-student expectations.",
    challenges: [
      'The codebase was large, actively maintained, and thinly documented, with only a few engineers who knew particular parts end to end. Getting productive meant reconstructing intent from old support tickets, ageing Confluence pages, and outdated requirements documents, rather than reading it off any current source.',
      'This was my first time working on a large, live, deployed system rather than a coursework-sized one, which is where distributed-systems and CI/CD practice actually stuck: Redis, PostgreSQL and pgAdmin, Maven, and Docker containers as a real delivery pipeline rather than named technologies.',
      'Day-to-day development ran on a Windows laptop through a Linux VM, which is where I picked up command-line skills.',
    ],
    media: {
      type: 'poster',
      items: [
        {
          type: 'image',
          src: ovarroPoster,
          alt: 'Placement-year summary poster: SCADA development at Ovarro, the tech stack used, and key takeaways from the year',
        },
      ],
    },
  },
]

// Lighter-weight projects — shown in the Work page grid alongside the flagship
// projects above. Now carrying the same brief/process/implementation/outcome
// shape as the flagship projects, sourced from the four role-targeted CVs
// (AI/Computer Vision, Cloud/DevOps, Cybersecurity, Software Engineer).
export const OTHER_PROJECTS = [
  {
    slug: 'portfolio-website',
    about: [
      'Personal Project',
      'Web Development'
    ],
    title: 'Upgrading my website',
    subtitle: 'A personal portfolio site built with React + Vite',
    problem: "CVs rarely show the whole story. I wanted a place where recruiters and potential employers could see my personality and taste, not just a list of projects.",
    approach: [
      'Started from a set of functional requirements and researched the best implementation for them before writing any code',
      'Chose React + Vite for the build, with deployment on GitHub Pages',
      'Iterated outward from a minimal landing page (hero, about, flagship, skills, contact), progressively adding more complex features once the basics worked',
      'Built and tested locally with npm first, then wired up GitHub Actions to build and deploy automatically on every push to main',
      'Designed for desktop and mobile from the start, not retrofitted afterwards',
      'Added Cloudflare Web Analytics to get a sense of actual traffic',
    ],
    metricLabel: 'Custom web page, built from scratch',
    metricNote: 'solo rebuild, deployed via GitHub Actions CI/CD',
    tags: ['React', 'Vite', 'CSS', 'GitHub Pages'],
    brief: "A while ago I used a template as the base for my own portfolio website. It was plain, simple, and let me say in interviews 'hey, you can check out my website and see what I built’, but it never really captured my own taste, or showed anything about myself beyond the few projects I'd put on there. When I graduated from university I set about rebuilding it properly, as a personal project.",
    process: [
      "Defined a bold, playful visual style early on and settled on a target audience split between recruiters and casual visitors. That decision shaped everything downstream: only one or two flagship projects on the homepage, with personality carried instead by a story-driven About section and some custom visual flare.",
      "Worked iteratively with git, branching off per feature so an experiment could be abandoned or reworked without risking whatever already worked.",
      "Built custom UI components: a polaroid photo stack in the About section, a floating word-cloud field in the hero, and a phone-frame media viewer on project pages.",
      "Structured all project content as data in a single file (`src/data/projects.js`) rather than hardcoding markup per project, so every case study renders from one template and adding a new project is a data change, not a UI one.",
    ],
    implementation: [
      "Set up the toolchain: React + Vite for the build, React Router for client-side routing, and a GitHub Actions workflow that builds `main` on every push and publishes straight to Pages - no build output committed to git.",
      "Implemented dark mode via a ThemeContext that reads the OS colour-scheme preference on first load and persists the user's choice to localStorage, with a small inline script in index.html that sets the theme before first paint to avoid a flash of the wrong theme.",
      "Worked around GitHub Pages having no server-side rewrites: a client-side-routed page means a direct link to a sub-page like `/work/pose-estimation` would normally just 404, so I added the standard `public/404.html` redirect trick to bounce it back to `index.html` and restore the real URL before React Router mounts.",
      "Wrote a small `generate-sitemap.js` script that runs as a prebuild step to keep `sitemap.xml` in sync with the actual routes, alongside a `robots.txt` file.",
      "Added Open Graph and Twitter Card metadata plus JSON-LD structured data to index.html, so links shared on social media or picked up by search engines show a proper title, description, and preview image instead of a bare URL.",
    ],
    outcome: "The result is this website: a from-scratch React + Vite rebuild of a site that used to be a template, deployed automatically on every push, with its own visual identity, dark mode, custom components, and the search engine optimisation (SEO), social-metadata, and analytics plumbing a template never had to think about.",
    challenges: [
      "First time working with React and Vite: most of the early effort went into getting comfortable with component structure and the build tooling, more than writing content.",
      "First time thinking properly about SEO: adding a robots.txt and a generated sitemap.xml, and considering how crawlers and scrapers actually see a client-side-rendered page rather than static HTML.",
      "First time adding link-preview metadata (Open Graph and Twitter Card tags plus a dedicated preview image) so the site looks intentional rather than blank when shared on LinkedIn or in a message, plus a custom 404 page for expired or mistyped links.",
      "First time adding web analytics to a personal site, which meant reading into GDPR and cookie-consent implications before picking a tool. Landed on Cloudflare Web Analytics specifically because it's cookieless and collects no personal data, so no consent banner was needed.",
    ],
    media: {
      type: 'poster',
      items: [
        {
          type: 'image',
          src: ide,
          alt: 'Git history and project structure in IntelliJ IDEA',
        },
        {
          type: 'image',
          src: gitHubActions,
          alt: 'GitHub Actions workflows from previous deployments',
        },
        {
          type: 'image',
          src: cloudFlare,
          alt: 'CloudFlare analytics for the website',
        },
      ],
    },
  },
  {
    slug: 'path-following-robot',
    about: [
      'Robotics Coursework',
      'Loughborough University'
    ],
    title: 'Autonomous Path-Following Robot',
    subtitle: 'U-Net segmentation driving a real-time differential-drive robot',
    note: 'U-Net segmentation feeding a PID-controlled differential drive: real-time navigation on embedded hardware.',
    problem:
        "Autonomous path-following means telling drivable ground apart from everything else in a live camera feed, then acting on that instantly, on hardware with limited compute power.",
    approach: [
      "Trained a U-Net segmentation model to identify and delineate the navigable path from the robot's live onboard camera feed, rather than relying on a simpler line-detection heuristic.",
      'Integrated the model\'s output into a PID-controlled differential drive system, translating detected path position into continuous steering corrections in real time.',
      'Balanced segmentation accuracy against the inference speed constraints of the embedded hardware, since a slower, more accurate model is no use if the robot has already driven off the path by the time it decides.',
    ],
    metricLabel: 'Real-time',
    metricNote: 'onboard inference, no external tracking',
    tags: ['U-Net', 'Robotics', 'PID Control'],
    brief:
        "Robotics coursework: get a robot to autonomously follow a path using nothing but its own onboard camera. No external tracking, no pre-mapped course, by treating 'where's the path' as a segmentation problem and feeding the answer straight into the drive system.",
    process: [
      "I framed the perception problem as pixel-level segmentation with U-Net rather than a simpler line-detection heuristic, so the approach could generalise past a single fixed course rather than being tuned to one track's lighting and markings.",
      "Because the robot had to make steering decisions from inference output in real time, model accuracy had to be weighed directly against the inference speed constraints of the embedded hardware, rather than optimised for accuracy alone and tuned down later.",
    ],
    implementation: [
      "Integrated the trained segmentation model's output directly into a PID-controlled differential drive system, converting detected path position into continuous left/right motor corrections.",
      "Tuned the PID gains against the segmentation model's actual real-world inference rate, so perception and control were tuned together as one loop rather than as two systems bolted together after the fact.",
    ],
    outcome:
        "A robot that follows an arbitrary path using only its own camera and an onboard model, with the perception and control loop tuned as a single system rather than two components that happen to be connected.",
    challenges: [
      'The deadline landed awkwardly between my dissertation submission and the first of three back-to-back exams, so the robot work had to be finished and buffered well ahead of that week rather than run alongside it.',
      'Good training footage turned out to be the actual bottleneck, not the model. With 50-plus students sharing three two-hour lab sessions a week and a limited number of robots, clear track time was scarce, and test runs were often interrupted by other teams\' robots crowding the same track.',
      'The brief rewarded deep learning generally, which still left classification, regression, reinforcement learning, and segmentation all on the table. Segmentation won because it let me apply the morphological operations I was already revising for a Computer Vision exam the following week.',
    ],
    media: {
      type: 'poster',
      items: [
        {
          type: 'image',
          src: roboticsPhoto,
          alt: 'Several path-following robots tethered on the lab floor during a coursework demo session',
        },
      ],
    },
  },
  {
    slug: 'isis-bgp-network',
    about: [
      'Advanced Networking Coursework',
      'Loughborough University'
    ],
    title: 'Fully Connected Network: IS-IS & BGP',
    subtitle: 'Multi-router, multi-AS network with dynamic routing and external peering',
    note: 'Multi-router, multi-AS network built from scratch: dynamic routing, external BGP peering, hardened remote access.',
    problem:
        "The brief was to design and build a fully connected network across two autonomous systems, then connect it to other teams' networks over external BGP.",
    approach: [
      'Co-designed a dual physical/virtual network split across two autonomous systems (customer and provider), each a full-mesh topology of three routers, with IPv4 addressing and subnetting planned from scratch to avoid overlap and leave room for growth.',
      'Implemented IS-IS as the interior gateway protocol for dynamic intra-AS routing, configuring NSAP addressing, routing levels, and metric styles across both physical and virtualised (Kathara) routers.',
      "Configured iBGP within each AS and eBGP between them, then established external BGP peering sessions with two other teams' networks, applying prefix-list policies to control route advertisement and prevent unintended transit.",
      'Hardened router access with hostnames, enable passwords, and SSH, and deployed supporting infrastructure including DNS and TFTP-based router config backups.',
    ],
    metricLabel: 'Two ASes, six routers',
    metricNote: 'full-mesh topology, external BGP peering',
    tags: ['IS-IS', 'BGP', 'Networking'],
    brief:
        "Advanced Networks coursework, built with a team: design and build a fully connected network across two autonomous systems, connect it to other teams' networks over external BGP, and hold up under real hardware faults rather than just a simulation.",
    process: [
      'We co-designed a dual physical/virtual network split across two autonomous systems (customer and provider), each a full-mesh topology of three routers, planning IPv4 addressing and subnetting from scratch to avoid overlap and leave room for growth.',
      'I configured IS-IS as the interior gateway protocol for dynamic intra-AS routing: NSAP addressing, routing levels, and metric styles across a mix of physical and virtualised (Kathara) routers, rather than relying on static routes within each AS.',
    ],
    implementation: [
      'Configured iBGP within each AS and eBGP between them, then established external BGP peering sessions with two other teams\' networks, applying prefix-list policies to control route advertisement and prevent unintended transit through our network.',
      'Hardened router access with hostnames, enable passwords, and SSH, replacing console-only access with secured remote administration, and deployed DNS and TFTP-based router config backups as supporting infrastructure.',
      'Diagnosed real-world faults as they came up: cabling issues, asymmetric routing, and configured weighted routing so the full-mesh topology could fail over automatically rather than dropping traffic.',
    ],
    outcome:
        "A network that had to survive actual physical faults and interoperate with networks built by other teams, not just pass a simulation: IS-IS handled the interior, BGP handled the edges, and the access-hardening and backup work meant it stayed manageable under pressure.",
    challenges: [
      "Physical faults were a recurring source of confusion early on: a broken or mislabelled cable can look identical to a routing misconfiguration until it's actually been ruled out, which made cable management as much a discipline as the routing configuration itself.",
      'For the virtual half of the topology, I learned Kathara, an open-source container-based network emulation tool, so the virtualised routers could be configured and tested through the same CLI workflow as the physical ones.',
    ],
    media: {
      type: 'poster',
      items: [
        {
          type: 'image',
          src: bothNets,
          alt: 'Both Network schemas',
        },
        {
          type: 'image',
          src: physicalNet,
          alt: 'Hand-drawn physical network',
        },
        {
          type: 'image',
          src: virtualNet,
          alt: 'Hand-drawn virtual network',
        },
        {
          type: 'image',
          src: routerConfig,
          alt: 'Both Network schemas',
        },
      ],
    },
  },
  {
    slug: 'gan-tutorial',
    about: [
      'Advanced AI Coursework',
      'Loughborough University'
    ],
    title: 'GAN Tutorial',
    subtitle: 'A developer-facing guide to DCGAN and conditional GAN architectures',
    note: 'A developer-facing walkthrough of DCGAN and conditional GAN architectures, bridging papers and practical code.',
    problem:
        "GAN papers are well documented, but the training dynamics and failure modes are what people actually get stuck on. The brief was to produce a tutorial that closes that gap rather than restating the papers.",
    approach: [
      'Structured the material to build from GAN theory and training dynamics up through known failure modes like mode collapse, before introducing architectural variants.',
      'Covered DCGAN and conditional GAN as the two architectural variants, with annotated code examples alongside the explanation at each stage.',
      'Wrote for a developer audience rather than an academic one, prioritising why training breaks and what to do about it over a literature-review tone.',
    ],
    metricLabel: 'DCGAN & cGAN',
    metricNote: 'annotated code throughout',
    tags: ['PyTorch', 'GANs', 'Jupyter Notebook'],
    brief:
        "Advanced AI Systems module: produce a developer-facing tutorial on Generative Adversarial Networks aimed at actually helping someone implement and train one, not at restating the papers.",
    process: [
      "I scoped the tutorial around the gap I'd noticed between GAN papers and practical implementation: the theory is well documented, but training dynamics and failure modes are the part people actually get stuck on.",
      'I structured the material to build from GAN theory and training dynamics up through known failure modes like mode collapse, before introducing architectural variants so a reader hits the "why does this break" material before the "here are more architectures" material.',
    ],
    implementation: [
      'Covered DCGAN and conditional GAN as the two architectural variants, with annotated code examples alongside the explanation at each stage rather than as a separate appendix.',
      "Wrote the whole thing for a developer audience, prioritising practical failure modes and fixes over an academic literature-review tone.",
    ],
    outcome:
        "A tutorial that treats mode collapse and training instability as first-class topics rather than footnotes, aimed at someone trying to get a GAN actually training, not trying to pass an exam on GAN theory.",
    challenges: [
      'Training locally was the same problem as the pose-estimation project: too slow to iterate on. I moved training onto a GCP VM again, which by this point was a workflow I could reuse rather than solve from scratch.',
      'Building the network itself pushed my PyTorch further than the transfer-learning work on the pose-estimation project had. This time, defining and training generator and discriminator architectures from scratch rather than fine-tuning an existing model\'s head.',
    ],
    media: {
      type: 'poster',
      items: [
        {
          type: 'image',
          src: trainingImg,
          alt: 'GAN Generator Training image',
        },
        {
          type: 'image',
          src: gan1,
          alt: 'Output of Generator after 1 epoch',
        },
        {
          type: 'image',
          src: gan5,
          alt: 'Output of Generator after 5 epochs',
        },
        {
          type: 'image',
          src: gan10,
          alt: 'Output of Generator after 10 epochs',
        },
        {
          type: 'image',
          src: gan15,
          alt: 'Output of Generator after 15 epochs',
        },
        {
          type: 'image',
          src: gan20,
          alt: 'Output of Generator after 20 epochs',
        },
        {
          type: 'image',
          src: trainingLoss,
          alt: 'Loss evolution over iterations',
        },
        {
          type: 'image',
          src: discrimOutput,
          alt: 'Outputs of the discriminator over iterations',
        },
      ],
    },
  },
  {
    slug: 'knowledge-management-system',
    about: [
      'Group Project Coursework',
      'Loughborough University'
    ],
    title: 'Knowledge Management System',
    subtitle: 'Full-stack web app shipped end-to-end as Scrum Master and developer',
    note: 'Full-stack web app deployed on Google Cloud Compute Engine: built and shipped as Scrum Master and developer.',
    problem:
        "The brief was to deliver a full-stack knowledge management web application end-to-end for a client, with me responsible for both running the team's agile process and writing a meaningful share of the code.",
    approach: [
      "Ran the team's agile process as Scrum Master alongside my own development work, so sprint planning and stand-ups had to fit around actually shipping features.",
      'Built the application across HTML, CSS, JavaScript, and PHP as a full-stack contributor.',
      'Managed Google Cloud Compute Engine VM setup and application deployment, alongside iterative feature development within the team.',
    ],
    metricLabel: 'Scrum Master & developer',
    metricNote: 'client-facing delivery on Google Cloud',
    tags: ['PHP', 'Google Cloud', 'Agile'],
    brief:
        "Team coursework project: deliver a full-stack knowledge management web application end-to-end for a client, deployed on Google Cloud, with me acting as both Scrum Master and developer.",
    process: [
      "I ran the team's agile process as Scrum Master alongside my own development work, which meant fitting sprint planning and stand-ups around shipping features and lectures.",
      'I built across HTML, CSS, JavaScript, and PHP as a full-stack contributor rather than owning a single layer of the application.',
    ],
    implementation: [
      "I handled Google Cloud Compute Engine VM setup and application deployment, so the team's iterative feature development had somewhere real to land rather than staying local.",
      'The project was delivered end-to-end for lecturers acting as clients, so scope and feedback came from outside the module as well as from the marking criteria.',
    ],
    outcome:
        "A working full-stack application shipped to a client, with responsibility for both the delivery process as Scrum Master, and a meaningful share of the code: a chance to see both sides of that trade-off on the same project.",
    media: null,
  },
  {
    slug: 'rugby-kick-tracker',
    about: [
      'Mobile App Development Coursework',
      'Loughborough University'
    ],
    title: 'Rugby Place Kick Tracking App',
    subtitle: 'Native Android app tracking kicking performance, built the way Android expects',
    note: 'Native Android app in Kotlin, Firebase-backed, built to track place-kicking performance.',
    problem:
        "Mobile App Development coursework, aimed at something I'd actually use myself: a native Android app to track rugby place-kicking performance, built properly around Android's data and lifecycle model rather than as a simple CRUD app.",
    approach: [
      'Designed the data model and local storage around a custom Content Provider, so kick data could be queried and shared the way Android apps are meant to interoperate.',
      'Layered Firebase on top for cloud storage, splitting responsibilities between local Content Provider access and cloud sync deliberately.',
      'Built the app in Kotlin with full Android lifecycle management, so tracking sessions survive rotation, backgrounding, and process death correctly.',
    ],
    metricLabel: 'Native Android',
    metricNote: 'Content Provider + Firebase sync',
    tags: ['Kotlin', 'Firebase', 'Android'],
    brief:
        "Mobile App Development coursework, built around something I'd actually want to use myself: a native Android app to track rugby place-kicking performance.",
    process: [
      "I designed the data model and local storage around a custom Content Provider, rather than reaching for a simpler local-only solution, so kick data could be queried and shared the way Android expects apps to interoperate.",
      'I layered Firebase on top for cloud storage, deliberately splitting responsibilities between local Content Provider access and cloud sync rather than routing everything through one path.',
    ],
    implementation: [
      'Built the app in Kotlin with full Android lifecycle management, so a kick-tracking session survives rotation, backgrounding, and process death correctly rather than only working in the intended path.',
      "Wired in Firebase for cloud storage so kick history isn't lost if the device is lost or reset.",
    ],
    outcome:
        "A native Android app that tracks kicking performance the way I'd actually want to use it, and a proper exercise in Android's Content Provider and lifecycle model rather than a CRUD app that happens to be about rugby.",
    challenges: [
      "I designed the app's layout in Figma before writing any UI code, which was new to me. It meant the Jetpack Compose work was implementing an already-decided design rather than designing and coding at the same time.",
      'Jetpack Compose itself meant learning a declarative UI style, building components that matched the Figma design precisely rather than assembling views imperatively.',
      'Getting Gradle dependencies (Firebase, the Content Provider setup, Compose itself) to actually sync together was a recurring obstacle, with small version mismatches costing disproportionate time to track down.',
    ],
    media: {
      type: 'phone',
      items: [
        {
          type: 'image',
          src: pitch,
          alt: '',
        },
        {
          type: 'image',
          src: posts,
          alt: '',
        },
        {
          type: 'image',
          src: sessions,
          alt: '',
        },
        {
          type: 'image',
          src: matchSummary,
          alt: '',
        },
        {
          type: 'image',
          src: signIn,
          alt: '',
        },
        {
          type: 'image',
          src: signUp,
          alt: '',
        },
      ],
    },
  },
  {
    slug: 'arduino-smart-home-hub',
    about: [
      'Embedded Systems Coursework',
      'Loughborough University'
    ],
    title: 'Arduino Smart Home Hub',
    subtitle: 'Multi-device C++ firmware under a real SRAM budget',
    note: 'C++ firmware coordinating multiple devices over Serial, with deliberate SRAM optimisation on constrained hardware.',
    problem:
        "Embedded Systems coursework: write C++ firmware for an Arduino-based hub that coordinates multiple smart home devices over Serial, under real memory constraints rather than assuming plenty of headroom.",
    approach: [
      "Designed the firmware to manage several device types over Serial rather than hard-wiring the hub to one device, since a hub that only speaks to a single device type isn't really a hub.",
      'Treated SRAM as the actual constraint it is on Arduino-class hardware, thinking about memory footprint while designing the communication layer rather than only after profiling it.',
      'Made deliberate SRAM optimisation decisions in how device state and messages were represented, given how little memory an Arduino has to work with.',
    ],
    metricLabel: 'Multi-device hub',
    metricNote: 'SRAM-optimised C++ firmware',
    tags: ['C++', 'Embedded', 'IoT'],
    brief:
        "Embedded Systems coursework: write C++ firmware for an Arduino-based hub that coordinates multiple smart home devices over Serial, under a real SRAM budget rather than assuming plenty of headroom.",
    process: [
      "I designed the firmware to manage several device types over Serial rather than hard-wiring the hub to a single device, since a hub that only speaks to one device type isn't really acting as a hub.",
      'I treated SRAM as the actual constraint it is on Arduino-class hardware, thinking about memory footprint while designing the communication layer itself rather than as a profiling pass after the fact.',
    ],
    implementation: [
      'Wrote the C++ firmware handling device communication over the Serial Monitor, coordinating multiple devices from a single hub.',
      'Made deliberate SRAM optimisation decisions in how device state and messages were represented, given how little memory an Arduino actually has to work with.',
    ],
    outcome:
        "Firmware that coordinates multiple devices from a single memory-constrained board, and a concrete lesson in how differently software has to be designed when kilobytes, not gigabytes, are the budget.",
    media: null,
  },
]

export const ALL_PROJECTS = [...FLAGSHIP_PROJECTS, ...OTHER_PROJECTS]

export function getProjectBySlug(slug) {
  return ALL_PROJECTS.find((p) => p.slug === slug)
}

// Wraps past the last project back to the first, so ProjectDetail's "next
// project" link is never in a dead-end state.
export function getNextProject(slug) {
  const index = ALL_PROJECTS.findIndex((p) => p.slug === slug)
  if (index === -1) return null
  return ALL_PROJECTS[(index + 1) % ALL_PROJECTS.length]
}
