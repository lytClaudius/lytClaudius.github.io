"use client";

import { CSSProperties, useEffect, useState } from "react";

const interests = [
  { no: "01", title: "Active & Contact-Rich Manipulation", text: "Learning dexterous behaviors that use vision, touch, and proprioception not only to act, but to actively reduce uncertainty." },
  { no: "02", title: "Predictive Models for Embodied Decisions", text: "Building hierarchical agents that imagine outcomes, seek informative experience, and connect high-level reasoning with feasible control." },
  { no: "03", title: "Adaptive Multi-Agent Collaboration", text: "Enabling embodied agents to infer intent, adapt roles, and coordinate safely under partial observability and limited communication." },
];

type Project = { year: string; tag: string; title: string; text: string; github?: string; report?: string; reportLabel?: string };

const projects: Project[] = [
  { year: "2026", tag: "AI", title: "Multi-Agent Coordination in Overcooked", text: "Developed two complementary approaches to long-horizon coordination: Macro-Expectimax with Bayesian teammate-intent inference, and a neural Q-learning agent trained through parameter-shared self-play.", github: "https://github.com/lytClaudius/MultiAgentCollab_in_Overcooked", report: "/reports/overcooked-coordination-report.pdf" },
  { year: "2025", tag: "Computer Graphics", title: "Real-Time Global Illumination", text: "Implemented Radiance Cascades in 2D and 3D, with SDF-guided probe tracing, hierarchical radiance merging, and interactive OpenGL rendering.", github: "https://github.com/lytClaudius/Real-time-Global-Illumination-via-Radiance-Cascades", report: "/reports/radiance-cascades-report.pdf" },
  { year: "2024", tag: "Probability & Statistics", title: "Performance Evaluation of Bandit Learning", text: "Implemented and compared Epsilon-Greedy, UCB, and Thompson Sampling, then explored approximate dynamic programming and preference-based methods under dependent and biased reward settings.", report: "/reports/bandit-learning-report.pdf" },
  { year: "2024", tag: "AI for Medical Imaging", title: "Cardiac Cine MRI Segmentation", text: "Developed a PyTorch U-Net for multi-class cardiac MRI segmentation and evaluated skip connections, Dice and cross-entropy losses, data augmentation, and UNet++ variants.", report: "/reports/cardiac-mri-segmentation-report.pdf" },
];

const moreProjects: Project[] = [
  { year: "2025", tag: "Mechatronics", title: "Unknown-Object Tracking & Reconstruction", text: "Built a closed-loop RGB-D system combining SAM2, BundleTrack, keyframe filtering, point-cloud alignment, and TSDF fusion for metric 3D reconstruction.", report: "/reports/unknown-object-reconstruction-report.pdf" },
  { year: "2025", tag: "Mechatronics", title: "Motion-Sensing Gesture Mouse", text: "Designed a wearable mouse using STM32, MPU6050, flex sensors, complementary filtering, and the HID Mouse protocol for real-time cursor and gesture control.", report: "/reports/gesture-mouse-report.pdf" },
  { year: "2025", tag: "Intro to Machine Learning", title: "ML-Patch", text: "Proposed a multi-layer hidden-state patching framework for identifying factual knowledge inside large language models and studied its behavior across model families.", report: "/reports/ml-patch-slides.pptx", reportLabel: "Slides" },
  { year: "2023", tag: "Intro to Info Science & Tech", title: "Raspberry Pi Handwritten Digit Recognition", text: "Built an integrated camera, k-NN, OpenCV, and eight-segment display system with a controlled enclosure and lighting setup for reliable on-device recognition.", report: "/reports/handwritten-digit-recognition-report.pdf" },
];

function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card reveal"><div className="project-top"><span>{project.year}</span><small>{project.tag}</small></div><h3>{project.title}</h3><p>{project.text}</p>{(project.github || project.report) && <div className="project-links">{project.github && <a href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>}{project.report && <a href={project.report} target="_blank" rel="noreferrer">{project.reportLabel || "Report"} ↗</a>}</div>}</article>;
}

const bgOptions = ["aurora", "grid", "paper"] as const;

export default function Home() {
  const [background] = useState<(typeof bgOptions)[number]>("aurora");
  const [accent] = useState("#ff5a36");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id));
    }, { rootMargin: "-35% 0px -55%" });
    document.querySelectorAll("main section[id]").forEach((el) => sectionObserver.observe(el));
    return () => { revealObserver.disconnect(); sectionObserver.disconnect(); };
  }, []);

  const style = { "--accent": accent } as CSSProperties;

  return (
    <div className={`site bg-${background}`} style={style}>
      <div className="noise" aria-hidden="true" />
      <header className="nav-wrap">
        <a className="wordmark" href="#home" aria-label="Yuetong Li, home"><span>YL</span> Yuetong Li</a>
        <nav aria-label="Primary navigation">
          {["interests", "research", "projects"].map((item) => <a key={item} className={activeSection === item ? "active" : ""} href={`#${item}`}>{item}</a>)}
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="status-dot" /> OPEN TO PHD OPPORTUNITIES · 2027</p>
            <h1>I build robots that<br /><em>learn by interacting.</em></h1>
            <p className="hero-intro">I&apos;m <strong>Yuetong Li</strong>, a Computer Science undergraduate at ShanghaiTech University exploring active perception, dexterous manipulation, and embodied decision-making.</p>
            <div className="hero-credentials credentials reveal">
              <div><p className="section-kicker">EDUCATION</p><h3>ShanghaiTech University</h3><p>B.Eng. in Computer Science &amp; Technology<br />2023 — 2027 (expected)</p></div>
              <div><p className="section-kicker">SELECTED HONORS</p><ul><li><b>2025</b> Merit Student</li><li><b>2024</b> Merit Student</li><li><b>2025</b> 2nd Prize, National Electronics Design Contest · Shanghai</li><li><b>2025</b> 1st Prize, ShanghaiTech Electronics Design Contest</li></ul></div>
              <div><p className="section-kicker">TOOLBOX</p><div className="chips"><span>Python</span><span>C / C++</span><span>PyTorch</span><span>OpenGL</span><span>MATLAB</span><span>Robotics</span></div></div>
            </div>
            <div className="hero-actions">
              <a className="primary-action" href="#research">Explore my research <span>↘</span></a>
              <a className="text-action" href="/Yuetong_Li_CV.pdf" target="_blank">View CV <span>↗</span></a>
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="avatar-frame">
              <img src="/wechat-portrait.jpg" alt="Yuetong Li" />
              <span className="corner c1" /><span className="corner c2" /><span className="corner c3" /><span className="corner c4" />
            </div>
            <div className="float-card card-a">
              <small>RESEARCH FOCUS</small>
              <div className="focus-rotator" aria-label="Research focus tags">
                <b>Robot Learning</b>
                <b>Dexterous Manipulation</b>
                <b>Active Exploration</b>
              </div>
            </div>
            <div className="float-card card-b"><small>CURRENTLY AT</small><b>RIM Lab · ShanghaiTech</b></div>
          </div>
          <a className="scroll-cue" href="#research"><span /> SCROLL TO DISCOVER</a>
        </section>

        <section className="university-note reveal">
          <div>
            <p className="section-kicker">THE UNIVERSITY</p>
            <h2>About ShanghaiTech</h2>
            <h3>Built around research and innovation.</h3>
            <p>Founded in 2013 by the Shanghai Municipal People&apos;s Government and the Chinese Academy of Sciences, ShanghaiTech is a young, research-oriented university located in Shanghai&apos;s Zhangjiang Hi-Tech Park.</p>
            <p>With a small-scale, high-standard model, the university brings education, research, and innovation together across fields including artificial intelligence, biomedical engineering, life sciences, materials, and energy.</p>
            <a className="university-link" href="https://www.shanghaitech.edu.cn/en/" target="_blank" rel="noreferrer">Visit ShanghaiTech <span>↗</span></a>
          </div>
          <div className="university-rankings" aria-label="ShanghaiTech University rankings">
            <div><b>#47</b><span>2026 Best Chinese Universities</span></div>
            <div><b>#301–400</b><span>2025 ARWU World Ranking</span></div>
          </div>
        </section>

        <section className="interests" id="interests">
          <div className="section-heading reveal"><div><p className="section-kicker">RESEARCH INTERESTS / 01</p><h2>Questions I want to pursue.</h2></div></div>
          <div className="interest-list">
            {interests.map((item) => <article className="interest-card reveal" key={item.no}><span>{item.no}</span><h3>{item.title}</h3><p>{item.text}</p><i>↗</i></article>)}
          </div>
        </section>

        <section className="featured" id="research">
          <div className="feature-image reveal"><img src="/aurora-teaser.webp" alt="AURORA system teaser showing hardware, uncertainty-driven active planning, in-hand reorientation, and reconstructed objects" /><span className="paper-label">CORL 2026 · IN SUBMISSION</span></div>
          <div className="feature-copy reveal">
            <p className="section-kicker">FEATURED RESEARCH / 02</p>
            <h2>AURORA</h2>
            <h3>Active Uncertainty-Driven Re-Orientation for In-Hand Reconstruction</h3>
            <p>A closed-loop framework that lets a dexterous hand actively reveal under-observed object surfaces. Ray-GPIS translates geometric uncertainty into next-best-view targets, then maps them to feasible in-hand rotation actions.</p>
            <div className="feature-links"><a className="primary-action" href="https://aurorahand.github.io/" target="_blank" rel="noreferrer">Project page <span>↗</span></a></div>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="section-heading reveal"><div><p className="section-kicker">SELECTED PROJECTS / 03</p><h2>Across algorithms<br />and hardware.</h2></div><p>From Bayesian intent inference to embedded sensing and real-time graphics, I enjoy turning ideas into complete, measurable systems.</p></div>
          <div className="project-grid">
            {projects.map((project) => <ProjectCard project={project} key={project.title} />)}
          </div>
          <details className="more-projects reveal">
            <summary><span><small>PROJECT ARCHIVE</small>More projects from my CV</span><b>04 additional projects</b></summary>
            <div className="project-grid more-project-grid">{moreProjects.map((project) => <ProjectCard project={project} key={project.title} />)}</div>
          </details>
        </section>

        <section className="contact reveal" id="contact"><p className="section-kicker">LET&apos;S CONNECT / 04</p><h2>Interested in building<br />robots that <em>keep learning?</em></h2><p>I&apos;m seeking PhD opportunities starting in 2027 in robotics, embodied intelligence, and robot learning.</p><a href="mailto:liyt2023@shanghaitech.edu.cn">liyt2023@shanghaitech.edu.cn <span>↗</span></a></section>
      </main>

      <footer><span>Yuetong Li · 2026</span><span>Shanghai ↔ Anywhere</span><a href="#home">Back to top ↑</a></footer>
    </div>
  );
}
