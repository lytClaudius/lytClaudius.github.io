import { useEffect, useState } from "react";

export type Lang = "en" | "zh";
export type Localized<T = string> = { en: T; zh: T };

/** Pick the localized value for the current language. */
export const L = <T,>(field: Localized<T>, lang: Lang): T => field[lang];

/** Reads/writes the language choice (localStorage, default "en"), syncs <html lang>. */
export function useLang() {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      return localStorage.getItem("lang") === "zh" ? "zh" : "en";
    } catch {
      return "en";
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem("lang", lang);
    } catch { /* storage unavailable — ignore */ }
    document.documentElement.lang = lang;
  }, [lang]);
  return { lang, setLang };
}

const en = {
  nav: {
    interests: "interests",
    research: "research",
    projects: "projects",
    gallery: "gallery",
    home: "Home",
    primaryNav: "Primary navigation",
    wordmarkAria: "Yuetong Li, home",
  },
  hero: {
    eyebrow: "OPEN TO PHD OPPORTUNITIES · 2027",
    title1: "I build robots that",
    title2: "learn by interacting.",
    introBefore: "I'm ",
    introAfter: ", a Computer Science undergraduate at ShanghaiTech University exploring active perception, dexterous manipulation, and embodied decision-making.",
    researchFocus: "RESEARCH FOCUS",
    focusTags: ["Robot Learning", "Dexterous Manipulation", "Active Exploration"],
    focusAria: "Research focus tags",
    currentlyAt: "CURRENTLY AT",
    rimLab: "RIM Lab · ShanghaiTech",
    education: "EDUCATION",
    university: "ShanghaiTech University",
    degree: "B.Eng. in Computer Science & Technology",
    years: "2023 — 2027 (expected)",
    selectedHonors: "SELECTED HONORS",
    toolbox: "TOOLBOX",
    explore: "Explore my research",
    viewCv: "View CV",
  },
  common: {
    certificate: "Certificate",
    github: "GitHub",
    report: "Report",
    slides: "Slides",
  },
  university: {
    kicker: "THE UNIVERSITY",
    h2: "About ShanghaiTech",
    h3: "Built around research and innovation.",
    p1: "Founded in 2013 by the Shanghai Municipal People's Government and the Chinese Academy of Sciences, ShanghaiTech is a young, research-oriented university located in Shanghai's Zhangjiang Hi-Tech Park.",
    p2: "With a small-scale, high-standard model, the university brings education, research, and innovation together across fields including artificial intelligence, biomedical engineering, life sciences, materials, and energy.",
    visit: "Visit ShanghaiTech",
    rank1: "2026 Best Chinese Universities",
    rank2: "2025 GRAS · Artificial Intelligence",
    rankingsAria: "ShanghaiTech University rankings",
  },
  interests: {
    kicker: "RESEARCH INTERESTS / 01",
    h2: "Questions I want to pursue.",
  },
  featured: {
    kicker: "FEATURED RESEARCH / 02",
    paperTitle: "Active Uncertainty-Driven Re-Orientation for In-Hand Reconstruction",
    body: "A closed-loop framework that lets a dexterous hand actively reveal under-observed object surfaces. Ray-GPIS translates geometric uncertainty into next-best-view targets, then maps them to feasible in-hand rotation actions.",
    badge: "CORL 2026 · IN SUBMISSION",
    projectPage: "Project page",
    imageAlt: "AURORA system teaser showing hardware, uncertainty-driven active planning, in-hand reorientation, and reconstructed objects",
  },
  projects: {
    kicker: "SELECTED PROJECTS / 03",
    h2a: "Across algorithms",
    h2b: "and hardware.",
    intro: "From Bayesian intent inference to embedded sensing and real-time graphics, I enjoy turning ideas into complete, measurable systems.",
    archive: "PROJECT ARCHIVE",
    archiveMore: "More projects from my CV",
    archiveCount: "04 additional projects",
  },
  contact: {
    kicker: "LET'S CONNECT / 04",
    h2a: "Interested in building",
    h2b: "robots that keep learning?",
    body: "I'm seeking PhD opportunities starting in 2027 in robotics, embodied intelligence, and robot learning.",
  },
  footer: {
    name: "Yuetong Li · 2026",
    anywhere: "Shanghai ↔ Anywhere",
    backTop: "Back to top ↑",
    backHome: "Back home ↑",
  },
  gallery: {
    eyebrow: "NOTES, FRAMES & FIELDWORK",
    title1: "A small gallery",
    title2: "of what I explore.",
    intro: "Research artifacts, personal interests, and moments between experiments. I'll keep expanding this collection over time.",
    categories: { All: "All", Research: "Research", Hobbies: "Hobbies", Activities: "Activities", Landscape: "Landscape" },
    categoriesAria: "Gallery categories",
    prev: "Previous image",
    next: "Next image",
    dot: (i: number) => `Go to image ${i + 1}`,
  },
};

const zh: typeof en = {
  nav: {
    interests: "兴趣",
    research: "研究",
    projects: "项目",
    gallery: "画廊",
    home: "首页",
    primaryNav: "主导航",
    wordmarkAria: "李岳桐，首页",
  },
  hero: {
    eyebrow: "寻求 2027 年博士机会",
    title1: "在交互中学习，",
    title2: "于探索中理解",
    introBefore: "我是",
    introAfter: "，上海科技大学计算机科学专业本科生，研究方向是主动感知、灵巧操作与具身决策。",
    researchFocus: "研究方向",
    focusTags: ["机器人学习", "灵巧操作", "主动探索"],
    focusAria: "研究方向标签",
    currentlyAt: "目前所在",
    rimLab: "RIM 实验室 · 上海科技大学",
    education: "教育背景",
    university: "上海科技大学",
    degree: "计算机科学与技术 工学学士",
    years: "2023 — 2027（预计）",
    selectedHonors: "荣誉奖项",
    toolbox: "工具箱",
    explore: "了解我的研究",
    viewCv: "查看简历",
  },
  common: {
    certificate: "证书",
    github: "GitHub",
    report: "报告",
    slides: "幻灯片",
  },
  university: {
    kicker: "关于学校",
    h2: "关于上海科技大学",
    h3: "以研究与创新为基石",
    p1: "上海科技大学成立于 2013 年，由上海市人民政府与中国科学院共建，是一所年轻的研究型大学，坐落于上海张江高科技园区。",
    p2: "学校坚持小规模、高水平办学，将教育、科研与创新融为一体，覆盖人工智能、生物医学工程、生命科学、材料与能源等多个领域。",
    visit: "访问上海科技大学",
    rank1: "2026 软科中国大学排名",
    rank2: "2025 软科世界一流学科排名 · 人工智能",
    rankingsAria: "上海科技大学排名",
  },
  interests: {
    kicker: "研究兴趣 / 01",
    h2: "我想探索的问题",
  },
  featured: {
    kicker: "研究经历 / 02",
    paperTitle: "Active Uncertainty-Driven Re-Orientation for In-Hand Reconstruction",
    body: "这是一个闭环框架，让灵巧手主动揭示未被充分观测的物体表面：Ray-GPIS 把几何不确定性转化为下一个最佳视角，再映射为可行的旋转动作。",
    badge: "CORL 2026 · 投稿中",
    projectPage: "项目主页",
    imageAlt: "AURORA 系统概念图：硬件、不确定性驱动的主动规划、手内重定向与重建结果",
  },
  projects: {
    kicker: "项目经历 / 03",
    h2a: "横跨算法与硬件",
    h2b: "",
    intro: "从贝叶斯意图推断到嵌入式感知，再到实时图形，我喜欢把想法做成完整、可度量的系统。",
    archive: "项目档案",
    archiveMore: "更多项目见我的简历",
    archiveCount: "另有 4 个项目",
  },
  contact: {
    kicker: "联系我 / 04",
    h2a: "想一起打造",
    h2b: "不断学习的机器人吗？",
    body: "我正在寻找 2027 年入学的博士机会，方向为机器人学、具身智能与机器人学习。",
  },
  footer: {
    name: "李岳桐 · 2026",
    anywhere: "Shanghai ↔ Anywhere",
    backTop: "回到顶部 ↑",
    backHome: "返回首页 ↑",
  },
  gallery: {
    eyebrow: "札记 · 影像 · 随拍",
    title1: "窗中剪影，",
    title2: "人生侧写",
    intro: "这里展示的是我的研究作品、个人爱好，还有实验间隙的随手记录。持续更新中～",
    categories: { All: "全部", Research: "研究", Hobbies: "爱好", Activities: "活动", Landscape: "风景" },
    categoriesAria: "画廊分类",
    prev: "上一张",
    next: "下一张",
    dot: (i: number) => `第 ${i + 1} 张`,
  },
};

export const strings = { en, zh };
