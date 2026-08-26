import { useState } from "react";

type Category = "All" | "Research" | "Hobbies" | "Activities";
type GalleryItem = { category: Exclude<Category, "All">; title: string; caption: string; image: string; imageAlt: string };

const items: GalleryItem[] = [
  { category: "Research", title: "AURORA system teaser", caption: "Active perception for in-hand reconstruction", image: "/aurora-teaser.webp", imageAlt: "AURORA research system teaser" },
  { category: "Research", title: "AURORA visual study", caption: "Hardware, planning, and reconstructed geometry", image: "/aurora-page1.png", imageAlt: "AURORA research overview" },
  { category: "Activities", title: "Flag Guard Team", caption: "A memorable moment from campus activities", image: "/gallery/flag-guard-team.jpg", imageAlt: "Flag guard team group photo" },
  { category: "Activities", title: "Campus moments I", caption: "Small moments beyond the lab", image: "/gallery/activity-01.jpg", imageAlt: "Campus activity photo" },
  { category: "Activities", title: "Campus moments II", caption: "Small moments beyond the lab", image: "/gallery/activity-02.jpg", imageAlt: "Campus activity photo" },
  { category: "Hobbies", title: "A visual diary", caption: "Personal interests and everyday observations", image: "/gallery/activity-03.jpg", imageAlt: "Personal gallery photo" },
  { category: "Hobbies", title: "A visual diary II", caption: "Personal interests and everyday observations", image: "/gallery/activity-04.jpg", imageAlt: "Personal gallery photo" },
  { category: "Activities", title: "Campus moments III", caption: "Small moments beyond the lab", image: "/gallery/activity-05.jpg", imageAlt: "Campus activity photo" },
  { category: "Hobbies", title: "A visual diary III", caption: "Personal interests and everyday observations", image: "/gallery/activity-06.jpg", imageAlt: "Personal gallery photo" },
];

export default function Gallery() {
  const [filter, setFilter] = useState<Category>("All");
  const visible = filter === "All" ? items : items.filter((item) => item.category === filter);

  return <div className="site bg-aurora gallery-page">
    <div className="noise" aria-hidden="true" />
    <header className="nav-wrap"><a className="wordmark" href="/" aria-label="Yuetong Li, home"><span>YL</span> Yuetong Li</a><nav aria-label="Primary navigation"><a href="/">Home</a><a className="active" href="/gallery.html">Gallery</a></nav></header>
    <main>
      <section className="gallery-hero"><p className="eyebrow"><span className="status-dot" /> NOTES, FRAMES &amp; FIELDWORK</p><h1>A small gallery<br /><em>of what I explore.</em></h1><p>Research artifacts, personal interests, and moments between experiments. I&apos;ll keep expanding this collection over time.</p></section>
      <section className="gallery-content"><div className="gallery-filters" role="tablist" aria-label="Gallery categories">{(["All", "Research", "Hobbies", "Activities"] as Category[]).map((category) => <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div><div className="gallery-grid">{visible.map((item) => <figure className="gallery-item reveal is-visible" key={item.title}><div className="gallery-image"><img src={item.image} alt={item.imageAlt} loading="lazy" /></div><figcaption><span>{item.category}</span><h2>{item.title}</h2><p>{item.caption}</p></figcaption></figure>)}</div></section>
    </main>
    <footer><span>Yuetong Li · 2026</span><span>Shanghai ↔ Anywhere</span><a href="/">Back home ↑</a></footer>
  </div>;
}
