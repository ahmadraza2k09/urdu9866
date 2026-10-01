import { useEffect, useMemo, useState, type ReactNode } from "react";
import { allWorks, syllabus, type Language, type WorkType } from "./syllabus";

type IconName = "arrow" | "book" | "chevron" | "close" | "download" | "file" | "home" | "info" | "menu" | "search";
const iconPaths: Record<IconName, ReactNode> = {
  arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  close: <><path d="m18 6-12 12"/><path d="m6 6 12 12"/></>,
  download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h6"/></>,
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/></>,
  menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
};
function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

const copy = {
  ur: {
    home: "گھر", syllabus: "نصاب", about: "ہمارے بارے میں",
    intro: "اردو کے اہم اسباق، غزلیں، نظمیں اور افسانے ایک جگہ",
    introSub: "منتخب نصابی مواد، خوب صورت ترتیب اور آسان رسائی کے ساتھ۔",
    browse: "موضوعات دیکھیں", sections: "نصاب کے حصے", section: "سیکشن", part: "حصہ", search: "موضوع، شاعر یا مصنف تلاش کریں", searchLabel: "نصاب میں تلاش کریں",
    all: "تمام", ghazal: "غزلیں", nazm: "نظمیں", afsana: "افسانے", results: "تلاش کے نتائج", noResults: "کوئی نتیجہ نہیں ملا", noResultsSub: "دوسرے الفاظ سے تلاش کریں یا فلٹر تبدیل کریں۔",
    author: "مصنف", poet: "شاعر", syllabusYear: "نصاب", pdfViewer: "PDF مطالعہ", download: "PDF ڈاؤن لوڈ کریں", back: "واپس جائیں", openPdf: "PDF نئی ونڈو میں کھولیں",
    pdfNote: "PDF کو براہ راست پڑھیں یا اپنے آلے پر محفوظ کریں۔", aboutTitle: "Urdu9866 کے بارے میں",
    aboutBody: "Urdu9866 ایک سادہ تعلیمی ویب سائٹ ہے جس کا مقصد اردو کے منتخب اسباق، غزلوں، نظموں اور افسانوں کو PDF کی صورت میں ایک جگہ منظم کرنا ہے تاکہ طلبہ اور اساتذہ انہیں آسانی سے دیکھ اور ڈاؤن لوڈ کر سکیں۔",
    aboutPoints: ["آسان اور تیز رسائی", "موبائل پر مطالعے کے لیے موزوں", "منظم اور قابلِ اعتماد نصابی مواد"],
    footer: "اردو کے تعلیمی مواد کو آسان اور منظم انداز میں قابل رسائی بنانے کے لیے۔", library: "آپ کی ذاتی اردو لائبریری",
  },
  roman: {
    home: "Ghar", syllabus: "Nisaab", about: "Hamaray Baray Mein",
    intro: "Urdu ke aham sabaq, ghazlain, nazmain aur afsanay aik jagah",
    introSub: "Muntakhib nisaabi mawaad, khoobsurat tarteeb aur aasaan rasai ke saath.",
    browse: "Mauzuaat Dekhein", sections: "Nisaab ke Hissay", section: "Section", part: "Part", search: "Mauzu, shair ya musannif talash karein", searchLabel: "Nisaab mein talash karein",
    all: "Tamam", ghazal: "Ghazlain", nazm: "Nazmain", afsana: "Afsanay", results: "Talash ke Nataij", noResults: "Koi natija nahin mila", noResultsSub: "Doosray alfaaz se talash karein ya filter tabdeel karein.",
    author: "Musannif", poet: "Shair", syllabusYear: "Nisaab", pdfViewer: "PDF Mutalia", download: "PDF Download Karein", back: "Wapas Jayein", openPdf: "PDF Nai Window Mein Kholein",
    pdfNote: "PDF ko barah-e-rast parhein ya apne aalay par mehfooz karein.", aboutTitle: "Urdu9866 ke Baray Mein",
    aboutBody: "Urdu9866 aik sada taleemi website hai jis ka maqsad Urdu ke muntakhib asbaaq, ghazlon, nazmon aur afsanon ko PDF ki surat mein aik jagah munazzam karna hai taa ke talaba aur asatiza inhein aasani se dekh aur download kar saken.",
    aboutPoints: ["Aasaan aur taiz rasai", "Mobile par mutaliay ke liye mauzoon", "Munazzam aur qabil-e-aitemad nisaabi mawaad"],
    footer: "Urdu ke taleemi mawaad ko aasaan aur munazzam andaaz mein qabil-e-rasai banane ke liye.", library: "Aap ki zaati Urdu library",
  },
};

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const navigate = (next: string) => {
    window.history.pushState({}, "", next);
    setPath(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return { path, navigate };
}

function Header({ lang, setLang, path, navigate }: { lang: Language; setLang: (lang: Language) => void; path: string; navigate: (path: string) => void }) {
  const [open, setOpen] = useState(false);
  const t = copy[lang];
  const links = [{ label: t.home, path: "/", icon: "home" as IconName }, { label: t.syllabus, path: "/syllabus", icon: "book" as IconName }, { label: t.about, path: "/about", icon: "info" as IconName }];
  const go = (next: string) => { navigate(next); setOpen(false); };
  const isActive = (next: string) => path === next || (next !== "/" && path.startsWith(next));
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={() => go("/")} aria-label="Urdu9866"><span className="brand-mark">اُ</span><span>Urdu<span>9866</span></span></button>
        <nav className="desktop-nav" aria-label={t.syllabus}>
          {links.map((link) => <button key={link.path} className={`nav-link ${isActive(link.path) ? "active" : ""}`} onClick={() => go(link.path)}>{link.label}</button>)}
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Language">
            <button className={lang === "ur" ? "selected" : ""} onClick={() => setLang("ur")}>اردو</button><i></i>
            <button className={lang === "roman" ? "selected" : ""} onClick={() => setLang("roman")}>Roman Urdu</button>
          </div>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}><Icon name={open ? "close" : "menu"} /></button>
        </div>
      </div>
      {open && <nav className="mobile-nav">{links.map((link) => <button key={link.path} className={`mobile-link ${isActive(link.path) ? "active" : ""}`} onClick={() => go(link.path)}><Icon name={link.icon}/>{link.label}</button>)}</nav>}
    </header>
  );
}

function Footer({ lang, navigate }: { lang: Language; navigate: (path: string) => void }) {
  const t = copy[lang];
  return <footer><div className="footer-inner"><div><div className="footer-brand">Urdu9866</div><p>{t.footer}</p></div><div className="footer-links"><button onClick={() => navigate("/")}>{t.home}</button><button onClick={() => navigate("/syllabus")}>{t.syllabus}</button><button onClick={() => navigate("/about")}>{t.about}</button></div></div><div className="copyright">© 2026 Urdu9866</div></footer>;
}

function SectionCards({ lang, navigate }: { lang: Language; navigate: (path: string) => void }) {
  const t = copy[lang];
  return <div className="section-grid">{syllabus.map((section) =>
    <button className="section-card" key={section.slug} onClick={() => navigate(`/syllabus/${section.slug}`)}>
      <span className="section-number">0{section.number}</span>
      <span className="card-copy"><small>{t.section} {section.number}</small><strong>{section.title[lang]}</strong><span>{section.description[lang]}</span></span>
      <span className="card-arrow"><Icon name="arrow"/></span>
    </button>)}</div>;
}

function Home({ lang, navigate }: { lang: Language; navigate: (path: string) => void }) {
  const t = copy[lang];
  return <main>
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow"><i></i>{t.library}</span><h1>Urdu<span>9866</span></h1><p className="hero-lead">{t.intro}</p><p className="hero-sub">{t.introSub}</p><button className="primary-button" onClick={() => navigate("/syllabus")}>{t.browse}<Icon name="arrow"/></button></div>
      <div className="hero-motif" aria-hidden="true"><div className="motif-ring"><span>علم</span></div><div className="motif-card motif-one">غزل</div><div className="motif-card motif-two">افسانہ</div></div>
    </section>
    <section className="section-wrap home-sections"><div className="section-heading"><div><span className="section-kicker">{t.syllabus}</span><h2>{t.sections}</h2></div><span className="section-count">02</span></div><SectionCards lang={lang} navigate={navigate}/></section>
  </main>;
}

function SyllabusPage({ lang, path, navigate }: { lang: Language; path: string; navigate: (path: string) => void }) {
  const t = copy[lang];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | WorkType>("all");
  const section = syllabus.find((item) => item.slug === path.split("/")[2]);
  const partNumber = Number(path.split("/")[3]?.replace("part-", ""));
  const selectedPart = section?.parts.find((part) => part.number === partNumber);
  const normalized = query.trim().toLocaleLowerCase();
  const matches = useMemo(() => allWorks.filter(({ item, author }) => {
    const text = `${item.title.ur} ${item.title.roman} ${author.name.ur} ${author.name.roman}`.toLocaleLowerCase();
    return (!normalized || text.includes(normalized)) && (filter === "all" || item.type === filter);
  }), [normalized, filter]);
  const filters: Array<["all" | WorkType, string]> = [["all", t.all], ["ghazal", t.ghazal], ["nazm", t.nazm], ["afsana", t.afsana]];
  return <main className="page-main">
    <section className="page-intro"><span className="section-kicker">{t.syllabus}</span><h1>{section ? section.title[lang] : t.sections}</h1><p>{section ? section.description[lang] : t.intro}</p></section>
    <section>
      <div className="search-panel"><label htmlFor="syllabus-search">{t.searchLabel}</label><div className="search-field"><Icon name="search"/><input id="syllabus-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search}/></div><div className="filters">{filters.map(([value, label]) => <button key={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div></div>
      {(query || filter !== "all") ? <SearchResults lang={lang} matches={matches} navigate={navigate}/> :
      !section ? <SectionCards lang={lang} navigate={navigate}/> :
      <><div className="part-tabs"><button className={!selectedPart ? "active" : ""} onClick={() => navigate(`/syllabus/${section.slug}`)}>{t.all}</button>{section.parts.map((part) => <button key={part.number} className={selectedPart?.number === part.number ? "active" : ""} onClick={() => navigate(`/syllabus/${section.slug}/part-${part.number}`)}>{t.part} {part.number}</button>)}</div>
      <div className="parts-list">{(selectedPart ? [selectedPart] : section.parts).map((part) =>
        <section className="part-section" key={part.number}><div className="part-heading"><span>{String(part.number).padStart(2, "0")}</span><h2>{t.part} {part.number}</h2><i></i></div>
          <div className="authors-grid">{part.authors.map((author) => <article className="author-group" key={author.name.roman}><h3>{author.name[lang]}</h3><div className="works-list">{author.works.map((work) =>
            <button key={work.slug} className="work-row" onClick={() => navigate(`/work/${work.slug}`)}><span className="file-icon"><Icon name="file"/></span><span className="work-title">{work.title[lang]}</span>{work.year && <span className="year">{work.year}</span>}<Icon name="chevron"/></button>)}</div></article>)}</div>
        </section>)}</div></>}
    </section>
  </main>;
}

function SearchResults({ lang, matches, navigate }: { lang: Language; matches: typeof allWorks; navigate: (path: string) => void }) {
  const t = copy[lang];
  return <div><div className="results-head"><h2>{t.results}</h2><span>{matches.length}</span></div>
    {matches.length ? <div className="search-results">{matches.map(({ item, author, section, part }) =>
      <button key={item.slug} onClick={() => navigate(`/work/${item.slug}`)} className="result-row"><span className="file-icon"><Icon name="file"/></span><span className="result-copy"><strong>{item.title[lang]}</strong><small>{author.name[lang]} · {t.section} {section.number} · {t.part} {part.number}</small></span>{item.year && <span className="year">{item.year}</span>}<Icon name="chevron"/></button>)}</div>
    : <div className="empty-state"><Icon name="search" size={28}/><strong>{t.noResults}</strong><p>{t.noResultsSub}</p></div>}
  </div>;
}

function PdfPage({ lang, slug, navigate }: { lang: Language; slug: string; navigate: (path: string) => void }) {
  const t = copy[lang];
  const found = allWorks.find(({ item }) => item.slug === slug);
  if (!found) return <main className="page-main"><div className="empty-state"><strong>{t.noResults}</strong></div></main>;
  const { item, author, section, part } = found;
  return <main className="page-main pdf-page">
    <button className="back-link" onClick={() => navigate(`/syllabus/${section.slug}/part-${part.number}`)}><Icon name="arrow"/>{t.back}</button>
    <section className="pdf-title"><span className="section-kicker">{section.title[lang]} · {t.part} {part.number}</span><h1>{item.title[lang]}</h1><div className="meta-row"><span>{item.type === "afsana" ? t.author : t.poet}: <strong>{author.name[lang]}</strong></span>{item.year && <span>{t.syllabusYear}: <strong>{item.year}</strong></span>}</div></section>
    <section className="viewer-card"><div className="viewer-toolbar"><div><Icon name="file"/><span><strong>{t.pdfViewer}</strong><small>{t.pdfNote}</small></span></div><div className="viewer-actions"><a href={item.pdf} target="_blank" rel="noreferrer" className="secondary-button">{t.openPdf}</a><a href={item.pdf} download className="primary-button"><Icon name="download"/>{t.download}</a></div></div>
      <object className="pdf-object" data={item.pdf} type="application/pdf"><div className="pdf-fallback"><Icon name="file" size={32}/><p>{t.pdfNote}</p><a className="primary-button" href={item.pdf} target="_blank" rel="noreferrer">{t.openPdf}</a></div></object>
    </section>
  </main>;
}

function About({ lang }: { lang: Language }) {
  const t = copy[lang];
  return <main className="page-main about-page"><section className="about-card"><div className="about-monogram">اُ</div><div className="about-copy"><span className="section-kicker">Urdu9866</span><h1>{t.aboutTitle}</h1><p>{t.aboutBody}</p><div className="about-points">{t.aboutPoints.map((point, index) => <div key={point}><span>0{index + 1}</span>{point}</div>)}</div></div></section></main>;
}

export default function App() {
  const { path, navigate } = useRoute();
  const [lang, setLangState] = useState<Language>(() => localStorage.getItem("urdu9866-language") === "roman" ? "roman" : "ur");
  const setLang = (next: Language) => { setLangState(next); localStorage.setItem("urdu9866-language", next); };
  useEffect(() => {
    document.documentElement.lang = lang === "ur" ? "ur" : "en";
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    const found = path.startsWith("/work/") ? allWorks.find(({ item }) => item.slug === path.split("/")[2]) : null;
    document.title = `${found ? found.item.title[lang] : path === "/about" ? copy[lang].about : path.startsWith("/syllabus") ? copy[lang].syllabus : copy[lang].home} | Urdu9866`;
  }, [lang, path]);
  const page = path.startsWith("/work/") ? <PdfPage lang={lang} slug={path.split("/")[2]} navigate={navigate}/> : path.startsWith("/syllabus") ? <SyllabusPage lang={lang} path={path} navigate={navigate}/> : path === "/about" ? <About lang={lang}/> : <Home lang={lang} navigate={navigate}/>;
  return <div className={`app ${lang === "ur" ? "urdu" : "roman"}`}><Header lang={lang} setLang={setLang} path={path} navigate={navigate}/>{page}<Footer lang={lang} navigate={navigate}/></div>;
}
