import { useState, useRef, useEffect } from "react";
import {
  Linkedin, Github, Mail, MessageCircle, Facebook, Download,
  Menu, X, ThumbsUp, Heart, Frown, Angry, Smile, ChevronRight,
  Sun, Moon, ExternalLink
} from "lucide-react";
import { SkillCarousel } from "./SkillCarousel";
import { supabase } from "../supabaseClient";

const PROFILE = {
  initials: "HS",
  firstLine: "Bonjour, je suis",
  name: "Herimampionona SAMBIZARA",
  roles: ["Développeur Fullstack", "Designer UI/UX", "Créateur de solutions web"],
  bio: "Je suis un développeur web passionné par la création de solutions numériques à la fois fonctionnelles, élégantes et efficaces. J'aime transformer des idées complexes en outils simples à utiliser, en combinant rigueur technique, créativité visuelle et sens du détail. Mon objectif est de concevoir des applications performantes, modernes et adaptées aux besoins réels des utilisateurs et des entreprises.",
  cvUrl: "/CV_herimampionona.pdf",
  social: {
    linkedin: "https://www.linkedin.com/in/herimampionona-sambizara-57575a406/",
    whatsapp: "https://wa.me/261388752956",
    email: "mailto:sambizarahenri@gmail.com",
    github: "https://github.com/sambizara/",
    facebook: "https://www.facebook.com/henri.varel.s",
  },
  photoUrl: "/sambizara.jpg",
};

const SKILL_CATEGORIES = ["Frontend", "Backend", "Base de données", "Outils"];

const DEVICON = (slug, variant = "original") => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-${variant}.svg`;
const SIMPLE_ICON = (slug, hex = "ffffff") => `https://cdn.simpleicons.org/${slug}/${hex}`;

const SKILLS = {
  Frontend: [
    { name: "HTML", logo: DEVICON("html5"), bg: "#ffffff" },
    { name: "CSS", logo: DEVICON("css3"), bg: "#ffffff" },
    { name: "JavaScript", logo: DEVICON("javascript"), bg: "#ffffff" },
    { name: "TypeScript", logo: DEVICON("typescript"), bg: "#ffffff" },
    { name: "Tailwind CSS", logo: DEVICON("tailwindcss"), bg: "#ffffff" },
    { name: "React JS", logo: DEVICON("react"), bg: "#ffffff" },
    { name: "Next JS", logo: DEVICON("nextjs", "original-wordmark"), bg: "#ffffff" },
  ],
  Backend: [
    { name: "Node.js", logo: DEVICON("nodejs"), bg: "#ffffff" },
    { name: "Express.js", logo: DEVICON("express", "original-wordmark"), bg: "#ffffff" },
    { name: "Nest JS", logo: DEVICON("nestjs"), bg: "#ffffff" },
    { name: "PHP", logo: DEVICON("php"), bg: "#ffffff" },
    { name: "Prisma", logo: DEVICON("prisma"), bg: "#ffffff" },
  ],
  "Base de données": [
    { name: "MongoDB", logo: DEVICON("mongodb"), bg: "#ffffff" },
    { name: "PostgreSQL", logo: DEVICON("postgresql"), bg: "#ffffff" },
    { name: "MySQL", logo: DEVICON("mysql"), bg: "#ffffff" },
  ],
  Outils: [
    { name: "Git", logo: DEVICON("git"), bg: "#ffffff" },
    { name: "GitHub", logo: DEVICON("github", "original"), bg: "#ffffff" },
    { name: "Vercel", logo: DEVICON("vercel", "original"), bg: "#ffffff" },
    { name: "Render", logo: SIMPLE_ICON("render", "000000"), bg: "#ffffff" },
    { name: "Docker", logo: DEVICON("docker"), bg: "#ffffff" },
    { name: "Postman", logo: DEVICON("postman"), bg: "#ffffff" },
    { name: "Figma", logo: DEVICON("figma"), bg: "#ffffff" },
    { name: "VS Code", logo: DEVICON("vscode"), bg: "#ffffff" },
  ],
};

const PROJECTS = [
  {
    title: "PharmaStock - Gestion de stockage des medicaments",
    description: "Application de gestion pharmaceutique conçue pour organiser le stockage des médicaments, suivre les mouvements et améliorer la traçabilité des produits.",
    tags: ["Next.js", "Nest.js", "PostgreSQL", "Tailwind CSS"],
    image: "/pharma.png",
    gradient: "linear-gradient(135deg, #ec4899, #7c3aed)",
    link: "https://github.com/sambizara/",
  },
  {
    title: "GRH - Gestion et suivi du personnel",
    description: "Application de gestion destinée à suivre les employés, organiser les informations du personnel et faciliter la gestion administrative au quotidien.",
    tags: ["React JS", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "/dash_admin.png",
    gradient: "linear-gradient(135deg, #06b6d4, #3b82f6)",
    link: "https://github.com/sambizara/",
  },
  {
    title: "Mon Portfolio",
    description: "Portfolio personnel conçu pour présenter mes compétences, mes projets et mon profil professionnel de manière claire, élégante et impactante.",
    tags: ["Vite", "React", "Portfolio"],
    image: "/mon_porfolio.png",
    gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
    link: "https://herimampionona-sambizara.vercel.app/",
  },
  {
    title: "Pulse - Messagerie Instantanée",
    description: "Plateforme de messagerie instantanée avec conversations privées et de groupe, présence en temps réel, indicateur de frappe, accusés de lecture et partage de fichiers jusqu'à 10 Mo.",
    tags: ["Next.js", "TypeScript", "Socket.io", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "/Pulse.png",
    gradient: "linear-gradient(135deg, #6366f1, #a855f7)",
    link: "https://pulse-ashen-eight.vercel.app/",
  },
];

const REACTIONS = [
  { key: "sad", icon: Frown, color: "#facc15" },
  { key: "angry", icon: Angry, color: "#f87171" },
  { key: "like", icon: ThumbsUp, color: "#60a5fa" },
  { key: "wow", icon: Smile, color: "#facc15" },
  { key: "love", icon: Heart, color: "#f472b6" },
];

const REVIEWS_SEED = [
  { name: "Exemple", role: "Étudiant", comment: "Écris ici un premier avis d'exemple.", reaction: "love" },
  { name: "Exemple2", role: "Recruteur", comment: "Un second avis d'exemple pour remplir la liste.", reaction: "like" },
];

/* ============================================================ */

const NAV_LINKS = [
  { id: "accueil", label: "Accueil" },
  { id: "apropos", label: "A propos" },
  { id: "competences", label: "Compétences" },
  { id: "projets", label: "Projets" },
  { id: "contact", label: "Contact" },
];

export default function Portfolio() {
  const sectionRefs = useRef({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleText, setRoleText] = useState("");
  const [skillTab, setSkillTab] = useState("Frontend");
  const [reviews, setReviews] = useState(REVIEWS_SEED);
  const [reviewView, setReviewView] = useState("liste");
  const [form, setForm] = useState({ name: "", role: "", comment: "", reaction: "love" });
  const [formError, setFormError] = useState("");
  const [visibleSections, setVisibleSections] = useState({});
  const isDark = theme === "dark";

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("avis")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) setReviews(data);
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const sections = Object.entries(sectionRefs.current).filter(([_, el]) => el);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((prev) => {
          const next = { ...prev };
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              next[entry.target.id] = true;
            }
          });
          return next;
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach(([id, el]) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // typing effect for role text
  useEffect(() => {
    const full = PROFILE.roles[roleIndex % PROFILE.roles.length];
    let i = 0;
    let deleting = false;
    const tick = () => {
      if (!deleting) {
        i++;
        setRoleText(full.slice(0, i));
        if (i === full.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        i--;
        setRoleText(full.slice(0, i));
        if (i === 0) {
          setRoleIndex((r) => r + 1);
          return;
        }
      }
      setTimeout(tick, deleting ? 40 : 80);
    };
    const t = setTimeout(tick, 80);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleIndex]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim() || !form.comment.trim()) {
      setFormError("Merci de remplir tous les champs.");
      return;
    }
    setFormError("");
    const { data, error } = await supabase.from("avis").insert([form]).select();
    if (!error && data) {
      setReviews((r) => [data[0], ...r]);
      setForm({ name: "", role: "", comment: "", reaction: "love" });
    }
  };

  const reactionCounts = REACTIONS.map((r) => ({
    ...r,
    count: reviews.filter((rev) => rev.reaction === r.key).length,
  }));
  const maxCount = Math.max(1, ...reactionCounts.map((r) => r.count));

  return (
    <div
      style={{
        background: isDark ? "#0a0912" : "#f4f7fb",
        color: isDark ? "#f5f5f7" : "#111827",
        fontFamily: "Inter, ui-sans-serif, system-ui",
        paddingTop: 70,
      }}
      className="min-h-screen w-full relative overflow-x-hidden"
    >
      <style>{`
        @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        @keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes spin-slow { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes pulse-soft { 0%,100%{transform:scale(1); opacity:0.9} 50%{transform:scale(1.04); opacity:1} }
        .cursor-blink { animation: blink 1s step-start infinite; }
        .float-el { animation: floaty 6s ease-in-out infinite; }
        .spin-el { animation: spin-slow 14s linear infinite; }
        .soft-panel {
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .reveal-section {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hover-lift {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 14px 30px rgba(236,72,153,0.12);
        }
        .icon-bounce:hover {
          animation: pulse-soft 0.6s ease;
        }
        ::selection { background:#ec4899; color:#fff; }
      `}</style>

      {/* ambient glow */}
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #a21caf, transparent 70%)" }} />
      <div className="pointer-events-none absolute top-40 -right-40 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #ec4899, transparent 70%)" }} />

      {/* NAV */}
      <header className="soft-panel border-b" style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(17,24,39,0.08)",
        background: isDark ? "rgba(10,9,18,0.75)" : "rgba(255,255,255,0.8)",
        width: "100%",
      }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <button onClick={() => scrollTo("accueil")} className="font-bold text-xl" style={{ color: "#ec4899" }}>
            {PROFILE.initials}
          </button>
          <nav className="hidden md:flex gap-8 text-sm items-center">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="hover:text-pink-400 transition-colors" style={{ color: isDark ? "#f5f5f7" : "#111827" }}>
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 hover:scale-[1.02]"
              style={{
                borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(17,24,39,0.12)",
                background: isDark
                  ? "linear-gradient(135deg, rgba(236,72,153,0.16), rgba(124,58,237,0.14))"
                  : "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(59,130,246,0.08))",
                color: isDark ? "#f5f5f7" : "#1f2937",
                boxShadow: isDark ? "0 0 0 1px rgba(255,255,255,0.04)" : "0 0 0 1px rgba(17,24,39,0.04)",
              }}
            >
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
              <span>{isDark ? "Light" : "Dark"}</span>
            </button>
            <button className="md:hidden" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div className="md:hidden flex flex-col gap-1 px-6 pb-4">
            {NAV_LINKS.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="text-left py-2 text-sm border-b" style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(17,24,39,0.08)" }}>
                {l.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO / ACCUEIL */}
      <section id="accueil" ref={(el) => (sectionRefs.current.accueil = el)} className={`reveal-section ${visibleSections.accueil ? "is-visible" : ""} max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center`}>
        <div className="max-w-xl">
          <p className="text-lg mb-2" style={{ color: isDark ? "#f5f5f7" : "#111827" }}>{PROFILE.firstLine}</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight" style={{ background: "linear-gradient(90deg,#ec4899,#a21caf)", WebkitBackgroundClip: "text", color: "transparent" }}>
            {PROFILE.name}
          </h1>
          <p className="text-xl mb-6 h-8" style={{ color: isDark ? "#d4d4d8" : "#374151" }}>
            {roleText}<span className="cursor-blink">|</span>
          </p>
          <a href={PROFILE.cvUrl} className="inline-block px-6 py-3 rounded-full font-semibold mb-6 shadow-lg shadow-pink-500/20"
            style={{ background: "linear-gradient(90deg,#ec4899,#7c3aed)" }}>
            <Download size={16} className="inline mr-2 -mt-1" />
            Télécharger mon CV
          </a>
          <div className="flex gap-3">
            {[
              { icon: Linkedin, href: PROFILE.social.linkedin, bg: "#0A66C2", hover: "#004182" },
              { icon: MessageCircle, href: PROFILE.social.whatsapp, bg: "#25D366", hover: "#1da851" },
              { icon: Mail, href: PROFILE.social.email, bg: "#EA4335", hover: "#c1352d" },
              { icon: Github, href: PROFILE.social.github, bg: "#181717", hover: "#2f2f2f" },
            ].map(({ icon: Icon, href, bg, hover }, i) => (
              <a key={i} href={href} className="icon-bounce w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200 hover:scale-105"
                style={{ borderColor: "rgba(255,255,255,0.15)", background: bg }}>
                <Icon size={18} color="#fff" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-center relative">
          <div
            className="float-el w-72 h-72 md:w-80 md:h-80 rounded-full p-[3px] relative flex items-center justify-center transition-transform duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, rgba(236,72,153,1), rgba(168,85,247,1), rgba(59,130,246,1), rgba(34,197,94,0.9))",
              boxShadow: isDark
                ? "0 0 0 1px rgba(255,255,255,0.08), 0 0 28px rgba(236,72,153,0.28), 0 0 32px rgba(96,165,250,0.16)"
                : "0 0 0 1px rgba(17,24,39,0.06), 0 0 24px rgba(236,72,153,0.18), 0 0 28px rgba(96,165,250,0.12)",
            }}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden relative"
              style={{ background: isDark ? "#140f1f" : "#f3f4f6" }}>
              <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.28), transparent 34%)" }} />
              {PROFILE.photoUrl ? (
                <img src={PROFILE.photoUrl} alt={PROFILE.name} className="w-[92%] h-[92%] rounded-full object-cover relative z-10"
                  style={{ border: isDark ? "2px solid rgba(255,255,255,0.18)" : "2px solid rgba(17,24,39,0.12)" }}
                />
              ) : (
                <span className="text-6xl font-bold opacity-80 relative z-10">{PROFILE.initials}</span>
              )}
            </div>
          </div>
          <div className="spin-el absolute -top-2 right-6 w-6 h-6 border-2 rounded-full" style={{ borderColor: "#a21caf" }} />
        </div>
      </section>

      {/* Carrousel infini des compétences */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-center text-sm mb-8" style={{ color: "#a1a1aa" }}>Et beaucoup d'autres technologies...</p>
        <SkillCarousel isDark={isDark} />
      </div>

      {/* A PROPOS */}
      <section id="apropos" ref={(el) => (sectionRefs.current.apropos = el)} className={`reveal-section ${visibleSections.apropos ? "is-visible" : ""} max-w-3xl mx-auto px-6 py-16 text-center`}>
        <h2 className="text-2xl font-bold mb-6 tracking-wide">A PROPOS DE MOI</h2>
        <p style={{ color: isDark ? "#a1a1aa" : "#4b5563", lineHeight: 1.9, fontSize: "1.02rem" }}>{PROFILE.bio}</p>
      </section>

      {/* COMPETENCES */}
      <section id="competences" ref={(el) => (sectionRefs.current.competences = el)} className={`reveal-section ${visibleSections.competences ? "is-visible" : ""} max-w-6xl mx-auto px-6 py-16`}>
        <h2 className="text-2xl font-bold mb-8 text-center tracking-wide">COMPETENCES</h2>
        <div className="flex justify-center gap-6 mb-10 text-sm flex-wrap">
          {SKILL_CATEGORIES.map((c) => (
            <button key={c} onClick={() => setSkillTab(c)}
              className="pb-1"
              style={{
                color: skillTab === c ? "#ec4899" : "#a1a1aa",
                borderBottom: skillTab === c ? "2px solid #ec4899" : "2px solid transparent",
              }}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8 w-full max-w-5xl">
            {SKILLS[skillTab].map((s) => (
              <div key={s.name} className="hover-lift flex flex-col items-center justify-center gap-3 p-4 sm:p-6 rounded-xl"
                style={{ background: isDark ? "#151220" : "#ffffff", width: "120px", height: "120px", border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(17,24,39,0.08)" }}>
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 p-2 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <img src={s.logo} alt={s.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs sm:text-sm text-center font-medium" style={{ color: isDark ? "#d4d4d8" : "#374151" }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJETS */}
      <section id="projets" ref={(el) => (sectionRefs.current.projets = el)} className={`reveal-section ${visibleSections.projets ? "is-visible" : ""} max-w-6xl mx-auto px-6 py-16`}>
        <h2 className="text-2xl font-bold mb-10 text-center tracking-wide">PROJETS</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROJECTS.map((p, i) => (
            <a
              key={i}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift rounded-xl overflow-hidden border flex flex-col justify-between group transition-transform"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(17,24,39,0.08)", background: isDark ? "#120f1c" : "#ffffff", boxShadow: isDark ? "0 18px 40px rgba(0,0,0,0.18)" : "0 18px 40px rgba(15,23,42,0.06)" }}
            >
              <div>
                {p.image ? (
                  <img src={p.image} alt={p.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="h-48" style={{ background: p.gradient }} />
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm group-hover:text-pink-500 transition-colors" style={{ color: isDark ? "#f5f5f7" : "#111827" }}>{p.title}</h3>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" style={{ color: "#ec4899" }} />
                  </div>
                  <p className="text-xs mb-3" style={{ color: isDark ? "#a1a1aa" : "#4b5563" }}>{p.description}</p>
                </div>
              </div>
              <div className="p-4 pt-0">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full border" style={{ borderColor: "#ec4899", color: isDark ? "#f9a8d4" : "#9d174d", background: isDark ? "rgba(236,72,153,0.05)" : "rgba(236,72,153,0.06)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={(el) => (sectionRefs.current.contact = el)} className={`reveal-section ${visibleSections.contact ? "is-visible" : ""} max-w-6xl mx-auto px-6 py-16`}>
        <h2 className="text-2xl font-bold mb-2">Merci pour votre visite !</h2>
        <p className="mb-6 text-sm" style={{ color: "#a1a1aa" }}>
          Donnez votre avis <button onClick={() => document.getElementById("avis-form")?.scrollIntoView({ behavior: "smooth" })} className="underline" style={{ color: "#ec4899" }}>ici</button>
        </p>
        <div className="rounded-2xl p-6 max-w-sm shadow-xl" style={{ background: isDark ? "#eceaf2" : "#ffffff", color: isDark ? "#18181b" : "#111827", border: isDark ? "none" : "1px solid rgba(17,24,39,0.08)", boxShadow: isDark ? "0 22px 45px rgba(0,0,0,0.2)" : "0 22px 45px rgba(15,23,42,0.08)" }}>
          <p className="text-center text-sm mb-4 font-medium">Rejoignez-moi sur</p>
          <div className="flex justify-center gap-3">
            {[
              { icon: Mail, href: PROFILE.social.email, bg: "#EA4335" },
              { icon: MessageCircle, href: PROFILE.social.whatsapp, bg: "#25D366" },
              { icon: Linkedin, href: PROFILE.social.linkedin, bg: "#0A66C2" },
              { icon: Facebook, href: PROFILE.social.facebook, bg: "#1877F2" },
            ].map(({ icon: Icon, href, bg }, i) => (
              <a key={i} href={href} className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:scale-105 transition-transform shadow-md" style={{ background: bg }}>
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* AVIS */}
        <div className="grid md:grid-cols-2 gap-8 mt-12" id="avis-form">
          <form onSubmit={submitReview} className="rounded-2xl p-6" style={{ background: "#eceaf2", color: "#18181b" }}>
            <h3 className="text-center text-lg font-semibold mb-4">Donnez votre commentaire</h3>
            <div className="flex justify-center gap-3 mb-5">
              {REACTIONS.map(({ key, icon: Icon, color }) => (
                <button type="button" key={key} onClick={() => setForm((f) => ({ ...f, reaction: key }))}
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: form.reaction === key ? color : "#fff",
                    border: form.reaction === key ? "none" : "1px solid #d4d4d8",
                  }}>
                  <Icon size={18} color={form.reaction === key ? "#18181b" : color} />
                </button>
              ))}
            </div>
            <label className="text-sm block mb-1">Votre nom ou nom de votre entreprise*</label>
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full rounded-md px-3 py-2 mb-4 border" style={{ borderColor: "#a21caf" }} />
            <label className="text-sm block mb-1">Votre statut (CEO, Tech Lead, Étudiant, ...)*</label>
            <input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
              className="w-full rounded-md px-3 py-2 mb-4 border" style={{ borderColor: "#d4d4d8" }} />
            <label className="text-sm block mb-1">Votre commentaire*</label>
            <textarea value={form.comment} onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
              rows={3} className="w-full rounded-md px-3 py-2 mb-2 border" style={{ borderColor: "#d4d4d8" }} />
            {formError && <p className="text-sm mb-3" style={{ color: "#dc2626" }}>{formError}</p>}
            <button type="submit" className="w-full py-3 rounded-md font-semibold text-white mt-2"
              style={{ background: "linear-gradient(90deg,#ec4899,#7c3aed)" }}>
              Envoyez
            </button>
          </form>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">{reviews.length} Avis</h3>
              <div className="flex rounded-full overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
                <button onClick={() => setReviewView("liste")} className="px-4 py-1.5 text-xs font-semibold"
                  style={{ background: reviewView === "liste" ? "#a21caf" : "transparent" }}>LISTE</button>
                <button onClick={() => setReviewView("graph")} className="px-4 py-1.5 text-xs font-semibold"
                  style={{ background: reviewView === "graph" ? "#a21caf" : "transparent" }}>GRAPH</button>
              </div>
            </div>

            {reviewView === "liste" ? (
              <div className="max-h-[420px] overflow-y-auto pr-2 space-y-0 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                {reviews.map((r, i) => {
                  const reaction = REACTIONS.find((x) => x.key === r.reaction) || REACTIONS[4];
                  const Icon = reaction.icon;
                  return (
                    <div key={i} className="flex gap-3 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      <div className="relative shrink-0">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm"
                          style={{ background: "#7c3aed" }}>
                          {r.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: reaction.color }}>
                          <Icon size={10} color="#18181b" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm"><span className="font-semibold">{r.name}</span> <span style={{ color: "#a1a1aa" }}>- {r.role}</span></p>
                        <p className="text-sm" style={{ color: "#d4d4d8" }}>{r.comment}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                {reactionCounts.map(({ key, icon: Icon, color, count }) => (
                  <div key={key} className="flex items-center gap-3">
                    <Icon size={18} color={color} />
                    <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "#1f1b2e" }}>
                      <div className="h-full rounded-full" style={{ width: `${(count / maxCount) * 100}%`, background: color }} />
                    </div>
                    <span className="text-xs w-5 text-right" style={{ color: "#a1a1aa" }}>{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="text-center py-8 text-xs border-t" style={{ borderColor: "rgba(255,255,255,0.06)", color: "#71717a" }}>
        © {new Date().getFullYear()} - {PROFILE.name}
      </footer>
    </div>
  );
}
