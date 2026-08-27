import { useRef, useState, type PointerEvent } from "react";

type Category = "All" | "Research" | "Hobbies" | "Activities" | "Landscape";
type GalleryItem = { category: Exclude<Category, "All">; title: string; caption: string; images: string[]; imageAlt: string };

const items: GalleryItem[] = [
  { category: "Research", title: "AURORA system teaser", caption: "Active perception for in-hand reconstruction", images: ["/aurora-teaser.webp"], imageAlt: "AURORA research system teaser" },
  { category: "Research", title: "RIM Lab", caption: "The lab where the robot-learning experiments run", images: ["/gallery/Research_lab.jpg"], imageAlt: "RIM Lab workspace" },
  { category: "Research", title: "Leap Hand", caption: "A dexterous hand platform for in-hand manipulation", images: ["/gallery/Research_Leap_hand.jpg"], imageAlt: "Leap Hand dexterous hand" },
  { category: "Research", title: "Gesture Mouse", caption: "A wearable motion-sensing mouse, built on STM32", images: ["/gallery/Research_Motion-Sensing_Gesture_Mouse.jpg"], imageAlt: "Motion-sensing gesture mouse prototype" },
  { category: "Activities", title: "Electronics Design Contest", caption: "A navigating car built for the contest", images: ["/gallery/Activites_Electronics_Design_Contest_navigating_car.jpg"], imageAlt: "Navigating car from the electronics design contest" },
  { category: "Activities", title: "Flag Guard Team", caption: "A memorable moment from campus activities", images: ["/gallery/activity_flag_guard_team.jpg"], imageAlt: "Flag guard team group photo" },
  { category: "Activities", title: "Flag Guard Team II", caption: "A candid frame with the team", images: ["/gallery/activity_flag-guard-team2.jpg"], imageAlt: "Flag guard team candid photo" },
  { category: "Hobbies", title: "Gundam Narrative", caption: "Plastic kits, assembled and posed", images: ["/gallery/hobby_GUNDAM_narrative.jpg", "/gallery/hobby_GUNDAM_narritive2.jpg"], imageAlt: "Assembled Gundam model kit" },
  { category: "Hobbies", title: "Artoria Lily", caption: "A figure from the Fate series", images: ["/gallery/hobby_figurines_Artoria_Lily.jpg", "/gallery/hobby_figurines_Artoria_Lily2.jpg"], imageAlt: "Artoria Lily figure" },
  { category: "Hobbies", title: "Vertin", caption: "A figure from Reverse: 1999", images: ["/gallery/hobby_figurines_Vertin.jpg", "/gallery/hobby_figurines_Vertin2.jpg"], imageAlt: "Vertin figure" },
  { category: "Hobbies", title: "Zero Two", caption: "A figure from Darling in the Franxx", images: ["/gallery/hobby_figurines_Zero_Two.jpg", "/gallery/hobby_figurines_Zero_Two1.jpg", "/gallery/hobby_figurines_Zero_Two2.jpg"], imageAlt: "Zero Two figure" },
  { category: "Hobbies", title: "Swiss roll", caption: "Making a swiss roll, in three steps", images: ["/gallery/hobby_baking_swiss_roll2.jpg", "/gallery/hobby_baking_swiss_roll1.jpg", "/gallery/hobby_baking_swiss_roll.jpg"], imageAlt: "Homemade swiss roll" },
  { category: "Hobbies", title: "Pudding", caption: "An attempt at custard pudding", images: ["/gallery/hobby_baking_pudding.jpg", "/gallery/hobby_baking_pudding1.jpg"], imageAlt: "Homemade pudding" },
  { category: "Hobbies", title: "Coffee moments", caption: "A slow cup between experiments", images: ["/gallery/hobby_coffee.jpg", "/gallery/hobby_coffee1.jpg"], imageAlt: "Coffee photo" },
  { category: "Hobbies", title: "Badminton", caption: "Weekend games on the court", images: ["/gallery/hobby_badminton.jpg"], imageAlt: "Badminton game photo" },
  { category: "Hobbies", title: "Self-portrait studies", caption: "Practicing framing and light on myself", images: ["/gallery/hobby_selfy_photography.jpg"], imageAlt: "Self-portrait photography" },
  { category: "Landscape", title: "ShanghaiTech campus", caption: "Campus scenes between classes", images: ["/gallery/photography_scene_SHTech.jpg"], imageAlt: "ShanghaiTech campus photo" },
  { category: "Landscape", title: "ShanghaiTech campus II", caption: "Campus scenes between classes", images: ["/gallery/photography_scene_SHTech2.jpg"], imageAlt: "ShanghaiTech campus photo" },
  { category: "Landscape", title: "ShanghaiTech campus III", caption: "Campus scenes between classes", images: ["/gallery/photography_scene_SHTech3.jpg"], imageAlt: "ShanghaiTech campus photo" },
  { category: "Landscape", title: "ShanghaiTech campus IV", caption: "Campus scenes between classes", images: ["/gallery/photography_scene_SHTech4.jpg"], imageAlt: "ShanghaiTech campus photo" },
  { category: "Landscape", title: "ShanghaiTech campus V", caption: "Campus scenes between classes", images: ["/gallery/photography_scene_SHTech5.jpg"], imageAlt: "ShanghaiTech campus photo" },
  { category: "Landscape", title: "Shanghai", caption: "City scenes from Shanghai", images: ["/gallery/photography_scene_Shanghai.jpg"], imageAlt: "Shanghai city scene" },
  { category: "Landscape", title: "Shanghai II", caption: "City scenes from Shanghai", images: ["/gallery/photography_scene_Shanghai2.jpg"], imageAlt: "Shanghai city scene" },
  { category: "Landscape", title: "Shanghai Museum", caption: "Scenes from the Shanghai Museum", images: ["/gallery/photography_scene_Shanghai_Museum.jpg"], imageAlt: "Shanghai Museum photo" },
  { category: "Landscape", title: "Guyuan", caption: "Landscapes from Guyuan", images: ["/gallery/photography_scene_Guyuan.jpg"], imageAlt: "Guyuan landscape" },
  { category: "Landscape", title: "Guyuan II", caption: "Landscapes from Guyuan", images: ["/gallery/photography_scene_Guyuan2.jpg"], imageAlt: "Guyuan landscape" },
  { category: "Landscape", title: "Qingdao", caption: "Seaside scenes from Qingdao", images: ["/gallery/photography_scene_Qingdao.jpg"], imageAlt: "Qingdao seaside scene" },
  { category: "Landscape", title: "Zhoushan islands", caption: "Islands off the Zhejiang coast", images: ["/gallery/photography_scene_Zhoushan_islands.jpg"], imageAlt: "Zhoushan islands scene" },
];

function Swipeable({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const [ratio, setRatio] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const drag = useRef({ active: false, startX: 0, delta: 0 });
  const count = images.length;

  const handleDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current.active = true;
    drag.current.startX = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.delta = e.clientX - drag.current.startX;
    setDragX(drag.current.delta);
  };
  const handleUp = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const { delta } = drag.current;
    setDragging(false);
    setDragX(0);
    if (delta < -60 && index < count - 1) setIndex((i) => i + 1);
    else if (delta > 60 && index > 0) setIndex((i) => i - 1);
  };

  return (
    <div className="gallery-frame" style={{ aspectRatio: ratio ? String(ratio) : "4 / 3" }}>
      <div
        className={`gallery-track${dragging ? " dragging" : ""}`}
        style={{
          transform: `translateX(calc(${-index * 100}% + ${dragX}px))`,
          transition: dragging ? "none" : "transform .4s cubic-bezier(.45, 0, .2, 1)",
        }}
        onPointerDown={handleDown}
        onPointerMove={handleMove}
        onPointerUp={handleUp}
        onPointerCancel={handleUp}
      >
        {images.map((src, i) => <img key={src} src={src} alt={alt} draggable={false} loading="lazy" onLoad={i === 0 ? (e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight) : undefined} />)}
      </div>
      {count > 1 && <>
        <button className="gallery-btn prev" type="button" aria-label="Previous image" onPointerDown={(e) => e.stopPropagation()} onClick={() => setIndex((i) => (i - 1 + count) % count)}>‹</button>
        <button className="gallery-btn next" type="button" aria-label="Next image" onPointerDown={(e) => e.stopPropagation()} onClick={() => setIndex((i) => (i + 1) % count)}>›</button>
        <div className="gallery-dots">{images.map((_, i) => <button key={i} type="button" className={i === index ? "active" : ""} aria-label={`Go to image ${i + 1}`} onPointerDown={(e) => e.stopPropagation()} onClick={() => setIndex(i)} />)}</div>
      </>}
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<Category>("All");
  const visible = filter === "All" ? items : items.filter((item) => item.category === filter);

  return <div className="site bg-aurora gallery-page">
    <div className="noise" aria-hidden="true" />
    <header className="nav-wrap"><a className="wordmark" href="/" aria-label="Yuetong Li, home"><span>YL</span> Yuetong Li</a><nav aria-label="Primary navigation"><a href="/">Home</a><a className="active" href="/gallery.html">Gallery</a></nav></header>
    <main>
      <section className="gallery-hero"><p className="eyebrow"><span className="status-dot" /> NOTES, FRAMES &amp; FIELDWORK</p><h1>A small gallery <em>of what I explore.</em></h1><p>Research artifacts, personal interests, and moments between experiments. I&apos;ll keep expanding this collection over time.</p></section>
      <section className="gallery-content"><div className="gallery-filters" role="tablist" aria-label="Gallery categories">{(["All", "Research", "Hobbies", "Activities", "Landscape"] as Category[]).map((category) => <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div><div className="gallery-grid">{visible.map((item) => <figure className="gallery-item reveal is-visible" key={item.title}><div className="gallery-image">{item.images.length > 1 ? <Swipeable images={item.images} alt={item.imageAlt} /> : <img src={item.images[0]} alt={item.imageAlt} loading="lazy" />}</div><figcaption><span>{item.category}</span><h2>{item.title}</h2><p>{item.caption}</p></figcaption></figure>)}</div></section>
    </main>
    <footer><span>Yuetong Li · 2026</span><span>Shanghai ↔ Anywhere</span><a href="/">Back home ↑</a></footer>
  </div>;
}
