import type { Lang } from "./i18n";

export default function LangToggle({ lang, setLang }: { lang: Lang; setLang: (lang: Lang) => void }) {
  return (
    <div className="lang-toggle" role="group" aria-label="Language / 语言">
      <button type="button" className={lang === "en" ? "active" : ""} aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
      <button type="button" className={lang === "zh" ? "active" : ""} aria-pressed={lang === "zh"} onClick={() => setLang("zh")}>中</button>
    </div>
  );
}
