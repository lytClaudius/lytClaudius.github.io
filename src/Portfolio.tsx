"use client";

import { CSSProperties, useEffect, useState } from "react";
import { L, strings, useLang, type Lang, type Localized } from "./i18n";
import LangToggle from "./LangToggle";

type Interest = { no: string; title: Localized; text: Localized };
type Project = { year: string; tag: Localized; title: Localized; text: Localized; github?: string; report?: string; reportLabel?: Localized };
type Honor = { year: string; title: Localized; certificate?: string };

const interests: Interest[] = [
  { no: "01", title: { en: "Active & Contact-Rich Manipulation", zh: "主动与丰富接触的操作" }, text: { en: "Learning dexterous behaviors that use vision, touch, and proprioception not only to act, but to actively reduce uncertainty.", zh: "学习使用视觉、触觉与本体感知的灵巧行为——不仅用来行动，更用来主动降低不确定性。" } },
  { no: "02", title: { en: "Predictive Models for Embodied Decisions", zh: "具身决策的预测模型" }, text: { en: "Building hierarchical agents that imagine outcomes, seek informative experience, and connect high-level reasoning with feasible control.", zh: "构建分层智能体：预演可能的后果、主动获取有信息量的经验，把高层推理与可行的控制衔接起来。" } },
  { no: "03", title: { en: "Adaptive Multi-Agent Collaboration", zh: "自适应多智能体协作" }, text: { en: "Enabling embodied agents to infer intent, adapt roles, and coordinate safely under partial observability and limited communication.", zh: "让具身智能体在部分可观测、通信受限的条件下推断彼此意图、灵活切换角色、安全地协同行动。" } },
];

const honors: Honor[] = [
  { year: "2025", title: { en: "Merit Student", zh: "优秀学生" }, certificate: "/certificates/merit-student-2025.jpg" },
  { year: "2024", title: { en: "Merit Student", zh: "优秀学生" }, certificate: "/certificates/merit-student-2024.jpg" },
  { year: "2025", title: { en: "2nd Prize, National Electronics Design Contest · Shanghai", zh: "全国大学生电子设计竞赛 二等奖 · 上海" }, certificate: "/certificates/national-electronics-2025.jpg" },
  { year: "2025", title: { en: "1st Prize, ShanghaiTech Electronics Design Contest", zh: "上海科技大学电子设计竞赛 一等奖" }, certificate: "/certificates/shanghaitech-electronics-2025.jpg" },
];

const projects: Project[] = [
  { year: "2026", tag: { en: "AI", zh: "AI" }, title: { en: "Multi-Agent Coordination in Overcooked", zh: "Overcooked 中的多智能体协作" }, text: { en: "Developed two complementary approaches to long-horizon coordination: Macro-Expectimax with Bayesian teammate-intent inference, and a neural Q-learning agent trained through parameter-shared self-play.", zh: "为长时程协作开发了两种互补方法：带贝叶斯队友意图推断的 Macro-Expectimax，以及通过参数共享自博弈训练的神经 Q-learning 智能体。" }, github: "https://github.com/lytClaudius/MultiAgentCollab_in_Overcooked", report: "/reports/overcooked-coordination-report.pdf" },
  { year: "2025", tag: { en: "Computer Graphics", zh: "计算机图形学" }, title: { en: "Real-Time Global Illumination", zh: "基于辐射级联的实时全局光照" }, text: { en: "Implemented Radiance Cascades in 2D and 3D, with SDF-guided probe tracing, hierarchical radiance merging, and interactive OpenGL rendering.", zh: "在 2D 与 3D 中实现了 Radiance Cascades：SDF 引导的探针追踪、层级化辐射合并与交互式 OpenGL 渲染。" }, github: "https://github.com/lytClaudius/Real-time-Global-Illumination-via-Radiance-Cascades", report: "/reports/radiance-cascades-report.pdf" },
  { year: "2024", tag: { en: "Probability & Statistics", zh: "概率与统计" }, title: { en: "Performance Evaluation of Bandit Learning", zh: "多臂老虎机学习的性能评估" }, text: { en: "Implemented and compared Epsilon-Greedy, UCB, and Thompson Sampling, then explored approximate dynamic programming and preference-based methods under dependent and biased reward settings.", zh: "实现并比较了 Epsilon-Greedy、UCB 与 Thompson Sampling，并在奖励相关、有偏的场景下探索了近似动态规划与基于偏好的方法。" }, report: "/reports/bandit-learning-report.pdf" },
  { year: "2024", tag: { en: "AI for Medical Imaging", zh: "医学影像 AI" }, title: { en: "Cardiac Cine MRI Segmentation", zh: "心脏 MRI 分割" }, text: { en: "Developed a PyTorch U-Net for multi-class cardiac MRI segmentation and evaluated skip connections, Dice and cross-entropy losses, data augmentation, and UNet++ variants.", zh: "用 PyTorch 开发了多类别心脏 MRI 分割的 U-Net，并评估了跳跃连接、Dice 与交叉熵损失、数据增强与 UNet++ 变体。" }, report: "/reports/cardiac-mri-segmentation-report.pdf" },
];

const moreProjects: Project[] = [
  { year: "2025", tag: { en: "Mechatronics", zh: "机电一体化" }, title: { en: "Unknown-Object Tracking & Reconstruction", zh: "未知物体跟踪与重建" }, text: { en: "Built a closed-loop RGB-D system combining SAM2, BundleTrack, keyframe filtering, point-cloud alignment, and TSDF fusion for metric 3D reconstruction.", zh: "构建了闭环 RGB-D 系统，融合 SAM2、BundleTrack、关键帧筛选、点云对齐与 TSDF 融合，实现公制 3D 重建。" }, report: "/reports/unknown-object-reconstruction-report.pdf" },
  { year: "2025", tag: { en: "Mechatronics", zh: "机电一体化" }, title: { en: "Motion-Sensing Gesture Mouse", zh: "体感手势鼠标" }, text: { en: "Designed a wearable mouse using STM32, MPU6050, flex sensors, complementary filtering, and the HID Mouse protocol for real-time cursor and gesture control.", zh: "基于 STM32、MPU6050、弯曲传感器、互补滤波与 HID Mouse 协议设计了可穿戴鼠标，实现实时光标与手势控制。" }, report: "/reports/gesture-mouse-report.pdf" },
  { year: "2025", tag: { en: "Intro to Machine Learning", zh: "机器学习导论" }, title: { en: "ML-Patch", zh: "ML-Patch" }, text: { en: "Proposed a multi-layer hidden-state patching framework for identifying factual knowledge inside large language models and studied its behavior across model families.", zh: "提出了一种多层隐状态 patching 框架，用于定位大语言模型内部的事实知识，并研究了它在不同模型家族中的表现。" }, report: "/reports/ml-patch-slides.pptx", reportLabel: { en: "Slides", zh: "幻灯片" } },
  { year: "2023", tag: { en: "Intro to Info Science & Tech", zh: "信息科学与技术导论" }, title: { en: "Raspberry Pi Handwritten Digit Recognition", zh: "树莓派手写数字识别" }, text: { en: "Built an integrated camera, k-NN, OpenCV, and eight-segment display system with a controlled enclosure and lighting setup for reliable on-device recognition.", zh: "集成了摄像头、k-NN、OpenCV 与八段数码管，配合受控外壳与光照设计，实现可靠的端侧手写数字识别。" }, report: "/reports/handwritten-digit-recognition-report.pdf" },
];

function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const s = strings[lang];
  return <article className="project-card reveal"><div className="project-top"><span>{project.year}</span><small>{L(project.tag, lang)}</small></div><h3>{L(project.title, lang)}</h3><p>{L(project.text, lang)}</p>{(project.github || project.report) && <div className="project-links">{project.github && <a href={project.github} target="_blank" rel="noreferrer">{s.common.github} ↗</a>}{project.report && <a href={project.report} target="_blank" rel="noreferrer">{project.reportLabel ? L(project.reportLabel, lang) : s.common.report} ↗</a>}</div>}</article>;
}

const bgOptions = ["aurora", "grid", "paper"] as const;

export default function Home() {
  const { lang, setLang } = useLang();
  const s = strings[lang];
  const [background] = useState<(typeof bgOptions)[number]>("aurora");
  const [accent] = useState("#ff5a36");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    document.title = lang === "zh" ? "李岳桐 — 机器人学与具身智能" : "Yuetong Li — Robotics & Embodied Intelligence";
  }, [lang]);

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
        <a className="wordmark" href="#home" aria-label={s.nav.wordmarkAria}><span>YL</span> {lang === "zh" ? "李岳桐" : "Yuetong Li"}</a>
        <nav aria-label={s.nav.primaryNav}>
          {[{ id: "interests", label: s.nav.interests }, { id: "research", label: s.nav.research }, { id: "projects", label: s.nav.projects }].map((item) => <a key={item.id} className={activeSection === item.id ? "active" : ""} href={`#${item.id}`}>{item.label}</a>)}<a href="/gallery.html">{s.nav.gallery}</a>
        </nav>
        <LangToggle lang={lang} setLang={setLang} />
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy reveal">
            <p className="eyebrow"><span className="status-dot" /> {s.hero.eyebrow}</p>
            <h1>{s.hero.title1}<br /><em>{s.hero.title2}</em></h1>
            <p className="hero-intro">{s.hero.introBefore}<strong>{lang === "zh" ? "李岳桐" : "Yuetong Li"}</strong>{s.hero.introAfter}</p>
          </div>
          <div className="hero-visual reveal">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="avatar-frame">
              <img src="/wechat-portrait.jpg" alt={lang === "zh" ? "李岳桐" : "Yuetong Li"} />
              <span className="corner c1" /><span className="corner c2" /><span className="corner c3" /><span className="corner c4" />
            </div>
            <div className="float-card card-a">
              <small>{s.hero.researchFocus}</small>
              <div className="focus-rotator" aria-label={s.hero.focusAria}>
                {s.hero.focusTags.map((tag) => <b key={tag}>{tag}</b>)}
              </div>
            </div>
            <div className="float-card card-b"><small>{s.hero.currentlyAt}</small><b>{s.hero.rimLab}</b></div>
          </div>
          <div className="hero-credentials credentials reveal">
            <div><p className="section-kicker">{s.hero.education}</p><h3>{s.hero.university}</h3><p>{s.hero.degree}<br />{s.hero.years}</p></div>
            <div><p className="section-kicker">{s.hero.selectedHonors}</p><ul>{honors.map((honor) => <li key={honor.year + honor.title.en}><b>{honor.year}</b> {L(honor.title, lang)}{honor.certificate && <a className="honor-link" href={honor.certificate} target="_blank" rel="noreferrer">{s.common.certificate} ↗</a>}</li>)}</ul></div>
            <div><p className="section-kicker">{s.hero.toolbox}</p><div className="chips"><span>Python</span><span>C / C++</span><span>MATLAB</span><span>RISC-V</span><span>PyTorch</span><span>OpenGL</span><span>MuJoCo</span><span>IsaacGym</span></div></div>
          </div>
          <div className="hero-actions">
            <a className="primary-action" href="#research">{s.hero.explore} <span>↘</span></a>
            <a className="text-action" href="/Yuetong_Li_CV.pdf" target="_blank">{s.hero.viewCv} <span>↗</span></a>
          </div>
        </section>

        <section className="university-note reveal">
          <div>
            <p className="section-kicker">{s.university.kicker}</p>
            <h2>{s.university.h2}</h2>
            <h3>{s.university.h3}</h3>
            <p>{s.university.p1}</p>
            <p>{s.university.p2}</p>
            <a className="university-link" href="https://www.shanghaitech.edu.cn/en/" target="_blank" rel="noreferrer">{s.university.visit} <span>↗</span></a>
          </div>
          <div className="university-rankings" aria-label={s.university.rankingsAria}>
            <div><b>#47</b><span>{s.university.rank1}</span></div>
            <div><b>#151–200</b><span>{s.university.rank2}</span></div>
          </div>
        </section>

        <section className="interests" id="interests">
          <div className="section-heading reveal"><div><p className="section-kicker">{s.interests.kicker}</p><h2>{s.interests.h2}</h2></div></div>
          <div className="interest-list">
            {interests.map((item) => <article className="interest-card reveal" key={item.no}><span>{item.no}</span><h3>{L(item.title, lang)}</h3><p>{L(item.text, lang)}</p><i>↗</i></article>)}
          </div>
        </section>

        <section className="featured" id="research">
          <div className="feature-image reveal"><img src="/aurora-teaser.webp" alt={s.featured.imageAlt} /><span className="paper-label">{s.featured.badge}</span></div>
          <div className="feature-copy reveal">
            <p className="section-kicker">{s.featured.kicker}</p>
            <h2>AURORA</h2>
            <h3>{s.featured.paperTitle}</h3>
            <p>{s.featured.body}</p>
            <div className="feature-links"><a className="primary-action" href="https://aurorahand.github.io/" target="_blank" rel="noreferrer">{s.featured.projectPage} <span>↗</span></a></div>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="section-heading reveal"><div><p className="section-kicker">{s.projects.kicker}</p><h2>{s.projects.h2a}{lang === "en" && <><br />{s.projects.h2b}</>}</h2></div><p>{s.projects.intro}</p></div>
          <div className="project-grid">
            {projects.map((project) => <ProjectCard project={project} lang={lang} key={project.title.en} />)}
          </div>
          <details className="more-projects reveal">
            <summary><span><small>{s.projects.archive}</small>{s.projects.archiveMore}</span><b>{s.projects.archiveCount}</b></summary>
            <div className="project-grid more-project-grid">{moreProjects.map((project) => <ProjectCard project={project} lang={lang} key={project.title.en} />)}</div>
          </details>
        </section>

        <section className="contact reveal" id="contact"><p className="section-kicker">{s.contact.kicker}</p><h2>{s.contact.h2a}<br /><em>{s.contact.h2b}</em></h2><p>{s.contact.body}</p><div className="contact-links"><a href="mailto:liyt2023@shanghaitech.edu.cn">liyt2023@shanghaitech.edu.cn <span>↗</span></a><a href="mailto:yuetongli2004@gmail.com">yuetongli2004@gmail.com <span>↗</span></a><a href="tel:+8613963982972">+86 139 6398 2972 <span>↗</span></a></div></section>
      </main>

      <footer><span>{s.footer.name}</span><span>{s.footer.anywhere}</span><a href="#home">{s.footer.backTop}</a></footer>
    </div>
  );
}
