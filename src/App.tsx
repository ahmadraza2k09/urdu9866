import { useEffect, useMemo, useState, type ReactNode } from "react";
import { allWorks, syllabus, type Language, type WorkType } from "./syllabus";

type IconName = "arrow" | "book" | "chevron" | "close" | "download" | "file" | "home" | "info" | "menu" | "search";
const iconPaths: Record<IconName, ReactNode> = {
  arrow: <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"/>,
  book: <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>,
  chevron: <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>,
  close: <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>,
  download: <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>,
  file: <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>,
  home: <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"/>,
  info: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>,
  menu: <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>,
  search: <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>,
};
function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{iconPaths[name]}</svg>;
}

const copy = {
  ur: {
    home: "Home", syllabus: "Syllabus", about: "About",
    intro: "Urdu lessons, ghazals, poems, and stories all in one place",
    introSub: "Curated syllabus content with beautiful layout and easy access.",
    browse: "Explore Topics", sections: "Syllabus Sections", section: "Section", part: "Part", search: "Search topic, poet, or author...", searchLabel: "Search in Syllabus",
    all: "All", ghazal: "Ghazals", nazm: "Poems", afsana: "Stories", results: "Search Results", noResults: "No results found", noResultsSub: "Try searching with different keywords or change filter.",
    author: "Author", poet: "Poet", syllabusYear: "Syllabus", pdfViewer: "PDF Reader", viewPdf: "View PDF", download: "Download PDF", back: "Back", openPdf: "Open PDF in New Window",
    pdfNote: "Read PDF directly or save it to your device.", aboutTitle: "About Urdu 9866",
    aboutBody: "Urdu 9866 is a clean educational portal designed to organize selected Urdu lessons, ghazals, poems, and stories in PDF format in one place for easy access for students and teachers.",
    aboutPoints: ["Fast & easy access", "Optimized for mobile reading", "Organized and reliable syllabus content"],
    footer: "Making Urdu educational content easily accessible and beautifully organized.", library: "Your Personal Urdu Library",
  },
  roman: {
    home: "Home", syllabus: "Syllabus", about: "About",
    intro: "Urdu lessons, ghazals, poems, and stories all in one place",
    introSub: "Curated syllabus content with beautiful layout and easy access.",
    browse: "Explore Topics", sections: "Syllabus Sections", section: "Section", part: "Part", search: "Search topic, poet, or author...", searchLabel: "Search in Syllabus",
    all: "All", ghazal: "Ghazals", nazm: "Poems", afsana: "Stories", results: "Search Results", noResults: "No results found", noResultsSub: "Try searching with different keywords or change filter.",
    author: "Author", poet: "Poet", syllabusYear: "Syllabus", pdfViewer: "PDF Reader", viewPdf: "View PDF", download: "Download PDF", back: "Back", openPdf: "Open PDF in New Window",
    pdfNote: "Read PDF directly or save it to your device.", aboutTitle: "About Urdu 9866",
    aboutBody: "Urdu 9866 is a clean educational portal designed to organize selected Urdu lessons, ghazals, poems, and stories in PDF format in one place for easy access for students and teachers.",
    aboutPoints: ["Fast & easy access", "Optimized for mobile reading", "Organized and reliable syllabus content"],
    footer: "Making Urdu educational content easily accessible and beautifully organized.", library: "Your Personal Urdu Library",
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
  const links = [{ label: t.home, path: "/", icon: "home" as IconName }, { label: t.syllabus, path: "/syllabus", icon: "book" as IconName }];
  const go = (next: string) => { navigate(next); setOpen(false); };
  const isActive = (next: string) => path === next || (next !== "/" && path.startsWith(next));
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={() => go("/")} aria-label="Urdu 9866"><span className="brand-mark">اُ</span><span>Urdu <span>9866</span></span></button>
        <nav className="desktop-nav" aria-label={t.syllabus}>
          {links.map((link) => <button key={link.path} className={`nav-link ${isActive(link.path) ? "active" : ""}`} onClick={() => go(link.path)}>{link.label}</button>)}
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label="Language">
            <button className={lang === "ur" ? "selected" : ""} onClick={() => setLang("ur")}>Urdu</button><i></i>
            <button className={lang === "roman" ? "selected" : ""} onClick={() => setLang("roman")}>Roman</button>
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
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="footer-brand">Urdu 9866</div>
          <p>{t.footer}</p>
        </div>
        <div className="footer-links">
          <button onClick={() => navigate("/")}>{t.home}</button>
          <button onClick={() => navigate("/syllabus")}>{t.syllabus}</button>
        </div>
      </div>
      <div className="copyright">
        © 2026 Urdu 9866 · Made by{" "}
        <a href="https://link.me/ahmad.raza" target="_blank" rel="noopener noreferrer">
          Muhammad Ahmad Raza
        </a>
      </div>
    </footer>
  );
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
      <div className="hero-copy"><h1>Urdu <span>9866</span></h1><p className="hero-lead">{t.intro}</p><p className="hero-sub">{t.introSub}</p><button className="primary-button" onClick={() => navigate("/syllabus")}>{t.browse}<Icon name="arrow"/></button></div>
      <div className="hero-motif" aria-hidden="true"><div className="motif-ring"><span>علم</span></div><div className="motif-card motif-one">غزل</div><div className="motif-card motif-two">افسانہ</div></div>
    </section>
    <section className="section-wrap home-sections"><div className="section-heading"><div><span className="section-kicker">{t.syllabus}</span><h2>{t.sections}</h2></div><span className="section-count">02</span></div><SectionCards lang={lang} navigate={navigate}/></section>
  </main>;
}

function SyllabusPage({ lang, path, navigate }: { lang: Language; path: string; navigate: (path: string) => void }) {
  const t = copy[lang];
  const [query, setQuery] = useState("");
  const getFilterFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const f = params.get("filter");
    return (f === "ghazal" || f === "nazm" || f === "afsana") ? f : "all";
  };
  const [filter, setFilterState] = useState<"all" | WorkType>(getFilterFromUrl);

  useEffect(() => {
    setFilterState(getFilterFromUrl());
  }, [path]);

  const setFilter = (nextFilter: "all" | WorkType) => {
    setFilterState(nextFilter);
    const url = new URL(window.location.href);
    if (nextFilter === "all") {
      url.searchParams.delete("filter");
    } else {
      url.searchParams.set("filter", nextFilter);
    }
    window.history.replaceState({}, "", url.pathname + url.search);
  };

  const sectionSlug = (path.split("/")[2] || "").split("?")[0];
  const section = syllabus.find((item) => item.slug === sectionSlug);
  const partSlug = (path.split("/")[3] || "").split("?")[0];
  const partNumber = Number(partSlug.replace("part-", ""));
  const selectedPart = section?.parts.find((part) => part.number === partNumber);
  const normalized = query.trim().toLocaleLowerCase();
  const matches = useMemo(() => allWorks.filter(({ item, author }) => {
    const text = `${item.title.ur} ${item.title.roman} ${author.name.ur} ${author.name.roman}`.toLocaleLowerCase();
    return (!normalized || text.includes(normalized)) && (filter === "all" || item.type === filter);
  }), [normalized, filter]);
  const filters: Array<["all" | WorkType, string]> = [["all", t.all], ["ghazal", t.ghazal], ["nazm", t.nazm], ["afsana", t.afsana]];
  const openWork = (slug: string, type: WorkType) => {
    const currentFilter = filter !== "all" ? filter : type;
    navigate(`/work/${slug}?filter=${currentFilter}`);
  };

  return <main className="page-main">
    <section className="page-intro"><span className="section-kicker">{t.syllabus}</span><h1>{section ? section.title[lang] : t.sections}</h1><p>{section ? section.description[lang] : t.intro}</p></section>
    <section>
      <div className="search-panel"><label htmlFor="syllabus-search">{t.searchLabel}</label><div className="search-field"><Icon name="search"/><input id="syllabus-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.search}/></div><div className="filters">{filters.map(([value, label]) => <button key={value} data-type={value} className={filter === value ? "active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div></div>
      {query ? <SearchResults lang={lang} matches={matches} navigate={navigate} currentFilter={filter}/> :
      !section ? <SectionCards lang={lang} navigate={navigate}/> :
      <><div className="part-tabs"><button className={!selectedPart ? "active" : ""} onClick={() => navigate(`/syllabus/${section.slug}${filter !== "all" ? `?filter=${filter}` : ""}`)}>{t.all}</button>{section.parts.map((part) => <button key={part.number} className={selectedPart?.number === part.number ? "active" : ""} onClick={() => navigate(`/syllabus/${section.slug}/part-${part.number}${filter !== "all" ? `?filter=${filter}` : ""}`)}>{t.part} {part.number}</button>)}</div>
      <div className="parts-list">{(selectedPart ? [selectedPart] : section.parts).map((part) => {
        const authorsWithWorks = part.authors.map((author) => ({
          author,
          works: author.works.filter((w) => filter === "all" || w.type === filter)
        })).filter((group) => group.works.length > 0);

        if (authorsWithWorks.length === 0) return null;

        return (
          <section className="part-section" key={part.number}>
            <div className="part-heading"><span>{String(part.number).padStart(2, "0")}</span><h2>{t.part} {part.number}</h2><i></i></div>
            <div className="authors-grid">
              {authorsWithWorks.map(({ author, works }) => (
                <article className="author-group" key={author.name.roman}>
                  <h3>{author.name[lang]}</h3>
                  <div className="works-list">
                    {works.map((work) => (
                      <button key={work.slug} className={`work-row type-${work.type}`} onClick={() => openWork(work.slug, work.type)}>
                        <span className="file-icon"><Icon name="file"/></span>
                        <span className="work-title">{work.title[lang]}</span>
                        {work.year && <span className="year">{work.year}</span>}
                        <Icon name="chevron"/>
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}</div></>}
    </section>
  </main>;
}

function SearchResults({ lang, matches, navigate, currentFilter }: { lang: Language; matches: typeof allWorks; navigate: (path: string) => void; currentFilter?: "all" | WorkType }) {
  const t = copy[lang];
  const openWork = (slug: string, type: WorkType) => {
    const activeFilter = currentFilter && currentFilter !== "all" ? currentFilter : type;
    navigate(`/work/${slug}?filter=${activeFilter}`);
  };
  return <div><div className="results-head"><h2>{t.results}</h2><span>{matches.length}</span></div>
    {matches.length ? <div className="search-results">{matches.map(({ item, author, section, part }) =>
      <button key={item.slug} onClick={() => openWork(item.slug, item.type)} className={`result-row type-${item.type}`}><span className="file-icon"><Icon name="file"/></span><span className="result-copy"><strong>{item.title[lang]}</strong><small>{author.name[lang]} · {t.section} {section.number} · {t.part} {part.number}</small></span>{item.year && <span className="year">{item.year}</span>}<Icon name="chevron"/></button>)}</div>
    : <div className="empty-state"><Icon name="search" size={28}/><strong>{t.noResults}</strong><p>{t.noResultsSub}</p></div>}
  </div>;
}

function PdfPage({ lang, slug, navigate }: { lang: Language; slug: string; navigate: (path: string) => void }) {
  const t = copy[lang];
  const found = allWorks.find(({ item }) => item.slug === slug);
  if (!found) return <main className="page-main"><div className="empty-state"><strong>{t.noResults}</strong></div></main>;
  const { item, author, section, part } = found;
  const goBack = () => {
    const params = new URLSearchParams(window.location.search);
    const returnFilter = params.get("filter") || item.type;
    navigate(`/syllabus/${section.slug}/part-${part.number}?filter=${returnFilter}`);
  };
  return <main className={`page-main pdf-page type-${item.type}`}>
    <button className="back-link" onClick={goBack}><Icon name="arrow"/>{t.back}</button>
    <section className="pdf-title"><span className="section-kicker">{section.title[lang]} · {t.part} {part.number}</span><h1>{item.title[lang]}</h1><div className="meta-row"><span>{item.type === "afsana" ? t.author : t.poet}: <strong>{author.name[lang]}</strong></span>{item.year && <span>{t.syllabusYear}: <strong>{item.year}</strong></span>}</div></section>
    <section className="viewer-card"><div className="viewer-toolbar"><div><Icon name="file"/><span><strong>{t.pdfViewer}</strong><small>{t.pdfNote}</small></span></div><div className="viewer-actions"><a href={item.pdf} target="_blank" rel="noreferrer" className="primary-button"><Icon name="file"/>{t.viewPdf}</a></div></div>
      <object className="pdf-object" data={item.pdf} type="application/pdf"><div className="pdf-fallback"><Icon name="file" size={32}/><p>{t.pdfNote}</p><a className="primary-button" href={item.pdf} target="_blank" rel="noreferrer">{t.viewPdf}</a></div></object>
    </section>
  </main>;
}

export default function App() {
  const { path, navigate } = useRoute();
  const [lang, setLangState] = useState<Language>(() => localStorage.getItem("urdu9866-language") === "ur" ? "ur" : "roman");
  const setLang = (next: Language) => { setLangState(next); localStorage.setItem("urdu9866-language", next); };
  const workSlug = path.startsWith("/work/") ? (path.split("/")[2] || "").split("?")[0] : "";
  useEffect(() => {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    const found = workSlug ? allWorks.find(({ item }) => item.slug === workSlug) : null;
    document.title = `${found ? found.item.title[lang] : path.startsWith("/syllabus") ? copy[lang].syllabus : copy[lang].home} | Urdu 9866`;
  }, [lang, path, workSlug]);
  const page = workSlug ? <PdfPage lang={lang} slug={workSlug} navigate={navigate}/> : path.startsWith("/syllabus") ? <SyllabusPage lang={lang} path={path} navigate={navigate}/> : <Home lang={lang} navigate={navigate}/>;
  return <div className={`app ${lang === "ur" ? "urdu" : "roman"}`}><Header lang={lang} setLang={setLang} path={path} navigate={navigate}/>{page}<Footer lang={lang} navigate={navigate}/></div>;
}
