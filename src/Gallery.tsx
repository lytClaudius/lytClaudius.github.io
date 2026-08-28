import { useEffect, useRef, useState, type PointerEvent } from "react";
import { L, strings, useLang, type Lang, type Localized } from "./i18n";
import LangToggle from "./LangToggle";

type Category = "All" | "Research" | "Hobbies" | "Activities" | "Landscape";
type GalleryItem = { category: Exclude<Category, "All">; title: Localized; caption: Localized; images: string[]; imageAlt: Localized };

const items: GalleryItem[] = [
  { category: "Research", title: { en: "AURORA system teaser", zh: "AURORA 系统展示" }, caption: { en: "Active perception for in-hand reconstruction", zh: "面向手内重建的主动感知" }, images: ["/aurora-teaser.webp"], imageAlt: { en: "AURORA research system teaser", zh: "AURORA 研究系统展示图" } },
  { category: "Research", title: { en: "RIM Lab", zh: "RIM 实验室" }, caption: { en: "The lab where the robot-learning experiments run", zh: "机器人学习实验的所在地" }, images: ["/gallery/Research_lab.jpg"], imageAlt: { en: "RIM Lab workspace", zh: "RIM 实验室工作场景" } },
  { category: "Research", title: { en: "Leap Hand", zh: "Leap Hand" }, caption: { en: "A dexterous hand platform for in-hand manipulation", zh: "用于手内操作研究的灵巧手平台" }, images: ["/gallery/Research_Leap_hand.jpg"], imageAlt: { en: "Leap Hand dexterous hand", zh: "Leap Hand 灵巧手" } },
  { category: "Research", title: { en: "Gesture Mouse", zh: "手势鼠标" }, caption: { en: "A wearable motion-sensing mouse, built on STM32", zh: "基于 STM32 的可穿戴体感鼠标" }, images: ["/gallery/Research_Motion-Sensing_Gesture_Mouse.jpg"], imageAlt: { en: "Motion-sensing gesture mouse prototype", zh: "体感手势鼠标原型" } },
  { category: "Activities", title: { en: "Electronics Design Contest", zh: "电子设计竞赛" }, caption: { en: "A navigating car built for the contest", zh: "为竞赛打造的巡线小车" }, images: ["/gallery/Activites_Electronics_Design_Contest_navigating_car.jpg"], imageAlt: { en: "Navigating car from the electronics design contest", zh: "电子设计竞赛巡线小车" } },
  { category: "Activities", title: { en: "Flag Guard Team", zh: "国旗护卫队" }, caption: { en: "Moments from the flag guard", zh: "护卫队里的时光" }, images: ["/gallery/activity_flag-guard-team2.jpg", "/gallery/activity_flag_guard_team.jpg", "/gallery/activity_flag-guard-team3.jpg", "/gallery/activity_flag-guard-team4.jpg"], imageAlt: { en: "Flag guard team photo", zh: "国旗护卫队合影" } },
  { category: "Activities", title: { en: "Shanghai Marathon", zh: "上海马拉松" }, caption: { en: "Volunteering at the Shanghai Marathon", zh: "上海马拉松志愿服务" }, images: ["/gallery/activity_Shanghai_Marason.jpg", "/gallery/activity_Shanghai_Marason2.jpg"], imageAlt: { en: "Shanghai Marathon volunteer service", zh: "上海马拉松志愿服务" } },
  { category: "Activities", title: { en: "Guyuan social practice", zh: "固原社会实践" }, caption: { en: "Volunteer work during the Guyuan summer practice", zh: "固原暑期社会实践中的志愿服务" }, images: ["/gallery/activity_social_practice_Guyuan.jpg", "/gallery/activity_social_practice_Guyuan2.jpg"], imageAlt: { en: "Guyuan social practice volunteer work", zh: "固原社会实践志愿服务" } },
  { category: "Activities", title: { en: "OneRepublic · China Shanghai · 2024", zh: "OneRepublic · 中国上海 · 2024" }, caption: { en: "Live, from the 2024 tour", zh: "2024 巡演现场" }, images: ["/gallery/activity_onerepublic_concert_2024.jpg", "/gallery/activity_onerepublic_concert_2024(2).jpg", "/gallery/activity_onerepublic_concert_2024(3).jpg", "/gallery/activity_onerepublic_concert_2024(4).jpg"], imageAlt: { en: "OneRepublic concert 2024", zh: "OneRepublic 演唱会 2024" } },
  { category: "Activities", title: { en: "OneRepublic · China Shanghai · 2026", zh: "OneRepublic · 中国上海 · 2026" }, caption: { en: "Live, from the 2026 tour", zh: "2026 巡演现场" }, images: ["/gallery/activity_onerepublic_concert_2026.jpg", "/gallery/activity_onerepublic_concert_2026(2).jpg", "/gallery/activity_onerepublic_concert_2026(3).jpg", "/gallery/activity_onerepublic_concert_2026(4).jpg", "/gallery/activity_onerepublic_concert_2026(5).jpg"], imageAlt: { en: "OneRepublic concert 2026", zh: "OneRepublic 演唱会 2026" } },
  { category: "Hobbies", title: { en: "Anime figurines", zh: "动漫手办" }, caption: { en: "Figures from the series I love", zh: "来自我喜欢的作品的收藏" }, images: ["/gallery/hobby_figurines_Artoria_Lily.jpg", "/gallery/hobby_figurines_Artoria_Lily2.jpg", "/gallery/hobby_figurines_Vertin.jpg", "/gallery/hobby_figurines_Vertin2.jpg", "/gallery/hobby_figurines_Zero_Two.jpg", "/gallery/hobby_figurines_Zero_Two1.jpg", "/gallery/hobby_figurines_Zero_Two2.jpg"], imageAlt: { en: "Anime figurine collection", zh: "动漫手办收藏" } },
  { category: "Hobbies", title: { en: "Model building", zh: "拼装模型" }, caption: { en: "Gundam kits, assembled and posed", zh: "组装并摆好造型的高达套件" }, images: ["/gallery/hobby_GUNDAM_narrative.jpg", "/gallery/hobby_GUNDAM_narritive2.jpg"], imageAlt: { en: "Assembled Gundam model kit", zh: "组装完成的高达模型" } },
  { category: "Hobbies", title: { en: "Baking", zh: "烘焙" }, caption: { en: "Making a swiss roll, in three steps", zh: "制作瑞士卷的三个步骤" }, images: ["/gallery/hobby_baking_swiss_roll2.jpg", "/gallery/hobby_baking_swiss_roll1.jpg", "/gallery/hobby_baking_swiss_roll.jpg"], imageAlt: { en: "Homemade swiss roll", zh: "自制瑞士卷" } },
  { category: "Hobbies", title: { en: "Baking II", zh: "烘焙 II" }, caption: { en: "An attempt at custard pudding", zh: "一次焦糖布丁的尝试" }, images: ["/gallery/hobby_baking_pudding.jpg", "/gallery/hobby_baking_pudding1.jpg"], imageAlt: { en: "Homemade pudding", zh: "自制布丁" } },
  { category: "Hobbies", title: { en: "Coffee moments", zh: "咖啡时光" }, caption: { en: "A slow cup between experiments", zh: "实验间隙里的一杯慢咖啡" }, images: ["/gallery/hobby_coffee.jpg", "/gallery/hobby_coffee1.jpg", "/gallery/hobby_coffee2.jpg"], imageAlt: { en: "Coffee photo", zh: "咖啡照片" } },
  { category: "Hobbies", title: { en: "Badminton", zh: "羽毛球" }, caption: { en: "Weekend games on the court", zh: "周末球场上的几局" }, images: ["/gallery/hobby_badminton.jpg"], imageAlt: { en: "Badminton game photo", zh: "羽毛球照片" } },
  { category: "Hobbies", title: { en: "Self-portrait studies", zh: "自拍光影练习" }, caption: { en: "Practicing framing and light on myself", zh: "拿自己练习构图与光线" }, images: ["/gallery/hobby_selfy_photography.jpg"], imageAlt: { en: "Self-portrait photography", zh: "自拍光影练习" } },
  { category: "Landscape", title: { en: "ShanghaiTech campus", zh: "上海科技大学校园" }, caption: { en: "Campus scenes between classes", zh: "课间的校园风景" }, images: ["/gallery/photography_scene_SHTech.jpg"], imageAlt: { en: "ShanghaiTech campus photo", zh: "上海科技大学校园照片" } },
  { category: "Landscape", title: { en: "ShanghaiTech campus II", zh: "上海科技大学校园 II" }, caption: { en: "Campus scenes between classes", zh: "课间的校园风景" }, images: ["/gallery/photography_scene_SHTech2.jpg"], imageAlt: { en: "ShanghaiTech campus photo", zh: "上海科技大学校园照片" } },
  { category: "Landscape", title: { en: "ShanghaiTech campus III", zh: "上海科技大学校园 III" }, caption: { en: "Campus scenes between classes", zh: "课间的校园风景" }, images: ["/gallery/photography_scene_SHTech3.jpg"], imageAlt: { en: "ShanghaiTech campus photo", zh: "上海科技大学校园照片" } },
  { category: "Landscape", title: { en: "ShanghaiTech campus IV", zh: "上海科技大学校园 IV" }, caption: { en: "Campus scenes between classes", zh: "课间的校园风景" }, images: ["/gallery/photography_scene_SHTech4.jpg"], imageAlt: { en: "ShanghaiTech campus photo", zh: "上海科技大学校园照片" } },
  { category: "Landscape", title: { en: "ShanghaiTech campus V", zh: "上海科技大学校园 V" }, caption: { en: "Campus scenes between classes", zh: "课间的校园风景" }, images: ["/gallery/photography_scene_SHTech5.jpg"], imageAlt: { en: "ShanghaiTech campus photo", zh: "上海科技大学校园照片" } },
  { category: "Landscape", title: { en: "Shanghai", zh: "上海" }, caption: { en: "City scenes from Shanghai", zh: "上海的城市风景" }, images: ["/gallery/photography_scene_Shanghai.jpg"], imageAlt: { en: "Shanghai city scene", zh: "上海城市风景" } },
  { category: "Landscape", title: { en: "Shanghai II", zh: "上海 II" }, caption: { en: "City scenes from Shanghai", zh: "上海的城市风景" }, images: ["/gallery/photography_scene_Shanghai2.jpg"], imageAlt: { en: "Shanghai city scene", zh: "上海城市风景" } },
  { category: "Landscape", title: { en: "Shanghai Museum", zh: "上海博物馆" }, caption: { en: "Scenes from the Shanghai Museum", zh: "在上海博物馆拍到的" }, images: ["/gallery/photography_scene_Shanghai_Museum.jpg"], imageAlt: { en: "Shanghai Museum photo", zh: "上海博物馆照片" } },
  { category: "Landscape", title: { en: "Guyuan", zh: "固原" }, caption: { en: "Landscapes from Guyuan", zh: "固原的自然风光" }, images: ["/gallery/photography_scene_Guyuan.jpg"], imageAlt: { en: "Guyuan landscape", zh: "固原风光" } },
  { category: "Landscape", title: { en: "Guyuan II", zh: "固原 II" }, caption: { en: "Landscapes from Guyuan", zh: "固原的自然风光" }, images: ["/gallery/photography_scene_Guyuan2.jpg"], imageAlt: { en: "Guyuan landscape", zh: "固原风光" } },
  { category: "Landscape", title: { en: "Qingdao", zh: "青岛" }, caption: { en: "Seaside scenes from Qingdao", zh: "青岛的海边" }, images: ["/gallery/photography_scene_Qingdao.jpg"], imageAlt: { en: "Qingdao seaside scene", zh: "青岛海边" } },
  { category: "Landscape", title: { en: "Zhoushan islands", zh: "舟山群岛" }, caption: { en: "Islands off the Zhejiang coast", zh: "浙江外海的群岛" }, images: ["/gallery/photography_scene_Zhoushan_islands.jpg"], imageAlt: { en: "Zhoushan islands scene", zh: "舟山群岛" } },
];

const categoryLabels: Record<Category, Localized> = {
  All: { en: "All", zh: "全部" },
  Research: { en: "Research", zh: "研究" },
  Hobbies: { en: "Hobbies", zh: "爱好" },
  Activities: { en: "Activities", zh: "活动" },
  Landscape: { en: "Landscape", zh: "风景" },
};

function Swipeable({ images, alt, lang }: { images: string[]; alt: string; lang: Lang }) {
  const [index, setIndex] = useState(0);
  const [ratio, setRatio] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);
  const drag = useRef({ active: false, startX: 0, delta: 0 });
  const count = images.length;
  const s = strings[lang];

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
        <button className="gallery-btn prev" type="button" aria-label={s.gallery.prev} onPointerDown={(e) => e.stopPropagation()} onClick={() => setIndex((i) => (i - 1 + count) % count)}>‹</button>
        <button className="gallery-btn next" type="button" aria-label={s.gallery.next} onPointerDown={(e) => e.stopPropagation()} onClick={() => setIndex((i) => (i + 1) % count)}>›</button>
        <div className="gallery-dots">{images.map((_, i) => <button key={i} type="button" className={i === index ? "active" : ""} aria-label={s.gallery.dot(i)} onPointerDown={(e) => e.stopPropagation()} onClick={() => setIndex(i)} />)}</div>
      </>}
    </div>
  );
}

export default function Gallery() {
  const { lang, setLang } = useLang();
  const s = strings[lang];
  const [filter, setFilter] = useState<Category>("All");
  const visible = filter === "All" ? items : items.filter((item) => item.category === filter);

  useEffect(() => {
    document.title = lang === "zh" ? "画廊 · 李岳桐" : "Gallery · Yuetong Li";
  }, [lang]);

  return <div className="site bg-aurora gallery-page">
    <div className="noise" aria-hidden="true" />
    <header className="nav-wrap"><a className="wordmark" href="/" aria-label={s.nav.wordmarkAria}><span>YL</span> {lang === "zh" ? "李岳桐" : "Yuetong Li"}</a><nav aria-label={s.nav.primaryNav}><a href="/">{s.nav.home}</a><a className="active" href="/gallery.html">{s.nav.gallery}</a></nav><LangToggle lang={lang} setLang={setLang} /></header>
    <main>
      <section className="gallery-hero"><p className="eyebrow"><span className="status-dot" /> {s.gallery.eyebrow}</p><h1>{s.gallery.title1}{lang === "en" && <br />}<em>{s.gallery.title2}</em></h1><p>{s.gallery.intro}</p></section>
      <section className="gallery-content"><div className="gallery-filters" role="tablist" aria-label={s.gallery.categoriesAria}>{(["All", "Research", "Hobbies", "Activities", "Landscape"] as Category[]).map((category) => <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>{L(categoryLabels[category], lang)}</button>)}</div><div className="gallery-grid">{visible.map((item) => <figure className="gallery-item reveal is-visible" key={item.title.en}><div className="gallery-image">{item.images.length > 1 ? <Swipeable images={item.images} alt={L(item.imageAlt, lang)} lang={lang} /> : <img src={item.images[0]} alt={L(item.imageAlt, lang)} loading="lazy" />}</div><figcaption><span>{L(categoryLabels[item.category], lang)}</span><h2>{L(item.title, lang)}</h2><p>{L(item.caption, lang)}</p></figcaption></figure>)}</div></section>
    </main>
    <footer><span>{s.footer.name}</span><span>{s.footer.anywhere}</span><a href="/">{s.footer.backHome}</a></footer>
  </div>;
}
