import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import nexioraLogo from "@/imports/nexiora.jpeg";
import {
  Globe,
  Smartphone,
  Palette,
  Brain,
  Cloud,
  Zap,
  Database,
  Server,
  Headphones,
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Star,
  ChevronRight,
  Menu,
  X,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Code2,
} from "lucide-react";

const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Process", "Contact"];

const SERVICES = [
  { icon: Globe, title: "Website Development", desc: "Crafting pixel-perfect, fast-loading websites that convert visitors into customers." },
  { icon: Code2, title: "Web Application Development", desc: "Scalable, robust web apps built with modern frameworks and best practices." },
  { icon: Palette, title: "UI/UX Design", desc: "Intuitive interfaces and delightful experiences that users love and trust." },
  { icon: Smartphone, title: "Mobile App Development", desc: "Native and cross-platform mobile apps for iOS and Android ecosystems." },
  { icon: Brain, title: "AI Integration", desc: "Intelligent automation and AI-powered features that give you a competitive edge." },
  { icon: Server, title: "Backend Development", desc: "Secure, high-performance APIs and server architectures that scale seamlessly." },
  { icon: Database, title: "Database Design", desc: "Optimised database schemas and queries for speed, reliability, and integrity." },
  { icon: Cloud, title: "Cloud Deployment", desc: "Hassle-free cloud infrastructure setup, CI/CD pipelines, and DevOps support." },
  { icon: Headphones, title: "Maintenance & Support", desc: "Ongoing updates, monitoring, and dedicated support so you can focus on growth." },
];

const WHY_US = [
  { icon: Zap, title: "Modern Technologies", desc: "We stay ahead of the curve, using the latest frameworks and tools for every project." },
  { icon: Clock, title: "Fast Project Delivery", desc: "Agile sprints and clear milestones mean you go live ahead of schedule, every time." },
  { icon: DollarSign, title: "Affordable Pricing", desc: "Premium quality without a premium price. Transparent, competitive pricing always." },
  { icon: Users, title: "Dedicated Support", desc: "A named point of contact throughout. Real humans, real answers, real accountability." },
];

const PROCESS = [
  { num: "01", title: "Requirement Analysis", desc: "Deep-dive discovery to fully understand your goals, users, and success criteria." },
  { num: "02", title: "Planning & UI/UX Design", desc: "Wireframes, prototypes, and visual design reviewed and approved before a line of code is written." },
  { num: "03", title: "Development", desc: "Clean, well-documented code built in focused sprints with regular demos." },
  { num: "04", title: "Testing & Quality Assurance", desc: "Rigorous automated and manual testing across devices, browsers, and edge cases." },
  { num: "05", title: "Deployment", desc: "Zero-downtime releases with rollback capability and full monitoring from day one." },
  { num: "06", title: "Support & Maintenance", desc: "Ongoing updates, performance reviews, and feature enhancements post-launch." },
];

const TECHS = [
  "HTML5","CSS3","JavaScript","React","Next.js","Node.js","Express.js",
  "Python","Java","MySQL","MongoDB","Firebase","Git","GitHub","Figma","VS Code",
];

const PROJECTS = [
  { cat: "E-Commerce", title: "Textile Website", desc: "A sophisticated fabric marketplace with real-time inventory and B2B ordering." },
  { cat: "Hospitality", title: "Hotel Website", desc: "Seamless booking experience with room management and guest portal." },
  { cat: "Food & Beverage", title: "Restaurant Website", desc: "Online reservations, digital menu, and loyalty programme integration." },
  { cat: "Fitness", title: "Gym Website", desc: "Member management, class scheduling, and progress tracking dashboard." },
  { cat: "Healthcare", title: "Medical Store Website", desc: "Prescription management, inventory control, and patient records system." },
  { cat: "Education", title: "Educational Website", desc: "Learning management system with course builder, quizzes, and certificates." },
];

const TESTIMONIALS = [
  { name: "Arun Mehta", role: "CEO, FabriqueTextiles", rating: 5, text: "Nexiora delivered a world-class e-commerce platform on time and under budget. The attention to detail and communication throughout was exceptional." },
  { name: "Priya Sharma", role: "Founder, EduSpark", rating: 5, text: "Our LMS went from concept to launch in six weeks. The team understood exactly what educators need and built it flawlessly." },
  { name: "Ravi Krishnan", role: "Director, PeakFit Gyms", rating: 5, text: "The member portal increased our online sign-ups by 300%. Clean design, fast performance, and fantastic ongoing support." },
];

const STATS = [
  { value: 10, suffix: "+", label: "Projects Completed" },
  { value: 5, suffix: "+", label: "Client Happiness" },
  { value: 1, suffix: "+", label: "Years Building" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

const PROJECT_ICONS = [Globe, Code2, Palette, Smartphone, Brain, Database];
const PROJECT_BG = [
  "linear-gradient(135deg,#e8f4f8,#c8dff0)",
  "linear-gradient(135deg,#f8f0e8,#f0dcc0)",
  "linear-gradient(135deg,#edf8e8,#c8f0c0)",
  "linear-gradient(135deg,#f8e8e8,#f0c0c0)",
  "linear-gradient(135deg,#eae8f8,#c8c0f0)",
  "linear-gradient(135deg,#f8f8e8,#f0f0c0)",
];

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const count = useCountUp(value, 1800, active);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="text-center">
      <div style={{ fontFamily: "'Inter',sans-serif" }} className="text-5xl md:text-6xl font-bold text-white mb-2">{count}{suffix}</div>
      <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(200,155,60,0.8)" }}>{label}</div>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", color: "#1F2937" }} className="min-h-screen bg-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;600;700&display=swap');
        html { scroll-behavior: smooth; }
        .nx-display { font-family: 'Playfair Display', serif; }
        @keyframes nxfloat  { 0%,100%{transform:translateY(0) rotate(0)} 33%{transform:translateY(-18px) rotate(3deg)} 66%{transform:translateY(8px) rotate(-2deg)} }
        @keyframes nxfloat2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-28px)} }
        @keyframes nxfloat3 { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(14px) rotate(-3deg)} }
        .nxf1{animation:nxfloat 8s ease-in-out infinite}
        .nxf2{animation:nxfloat2 11s ease-in-out infinite}
        .nxf3{animation:nxfloat3 14s ease-in-out infinite}
        .svc-card{transition:transform .28s ease,box-shadow .28s ease}
        .svc-card:hover{transform:translateY(-6px);box-shadow:0 20px 56px rgba(10,35,66,.10)}
        .proj-card .proj-overlay{opacity:0;transition:opacity .28s ease}
        .proj-card:hover .proj-overlay{opacity:1}
        .tech-pill{transition:all .2s ease;cursor:default}
        .tech-pill:hover{background:#0A2342;color:#fff;border-color:#0A2342;transform:translateY(-2px)}
        .nx-navlink{position:relative}
        .nx-navlink::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1.5px;background:#C89B3C;transition:width .25s ease}
        .nx-navlink:hover::after{width:100%}
        .nx-btn-primary{background:#0A2342;color:#fff;transition:background .2s}
        .nx-btn-primary:hover{background:#C89B3C}
        .nx-btn-outline{border:2px solid #0A2342;color:#0A2342;transition:all .2s}
        .nx-btn-outline:hover{background:#0A2342;color:#fff}
        .nx-gold-line{width:48px;height:2px;background:#C89B3C}
        .nx-icon-box{transition:background .25s}
        .nx-icon-box:hover{background:#0A2342}
        .nx-icon-box:hover svg{color:#fff!important}
      `}</style>

      {/* ── NAV ── */}
      <header style={{ background: scrolled ? "rgba(255,255,255,0.96)" : "transparent", backdropFilter: scrolled ? "blur(12px)" : "none", boxShadow: scrolled ? "0 1px 16px rgba(10,35,66,.06)" : "none", transition: "all .3s" }} className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          <button onClick={() => goto("home")} className="flex items-center">
            <ImageWithFallback src={nexioraLogo} alt="Nexiora" className="h-10 w-auto object-contain" />
          </button>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => goto(l.toLowerCase())} className="nx-navlink text-sm font-medium tracking-wide" style={{ color: "#0A2342" }}>{l}</button>
            ))}
          </nav>
          <a href="mailto:tech.nexiora@gmail.com" className="nx-btn-primary hidden lg:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full">
            Get in Touch <ArrowRight size={14} />
          </a>
          <button className="lg:hidden" style={{ color: "#0A2342" }} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t px-6 py-6 flex flex-col gap-5" style={{ borderColor: "#e5e7eb" }}>
            {NAV_LINKS.map((l) => (
              <button key={l} onClick={() => goto(l.toLowerCase())} className="text-left font-medium text-base" style={{ color: "#0A2342" }}>{l}</button>
            ))}
            <a href="mailto:tech.nexiora@gmail.com" className="nx-btn-primary inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full w-fit">
              Get in Touch <ArrowRight size={14} />
            </a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{ background: "#ffffff" }}>
        {/* Floating bg blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="nxf1 absolute rounded-full" style={{ top: "8%", right: "4%", width: 280, height: 280, background: "#0A2342", opacity: 0.04 }} />
          <div className="nxf2 absolute rounded-full" style={{ bottom: "12%", right: "18%", width: 180, height: 180, background: "#C89B3C", opacity: 0.05 }} />
          <div className="nxf3 absolute rounded-full" style={{ top: "38%", right: "32%", width: 100, height: 100, background: "#0A2342", opacity: 0.05 }} />
          <div className="nxf1 absolute rounded-full" style={{ top: "55%", left: "2%", width: 70, height: 70, background: "#C89B3C", opacity: 0.06 }} />
          <div className="nxf2 absolute rounded-full" style={{ top: "20%", left: "8%", width: 40, height: 40, background: "#0A2342", opacity: 0.04 }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center py-24 w-full">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-8" style={{ background: "rgba(10,35,66,0.06)", border: "1px solid rgba(10,35,66,0.1)", color: "#0A2342" }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#C89B3C" }} />
              Premium Software Development
            </div>
            <h1 className="nx-display font-bold leading-tight mb-6" style={{ fontSize: "clamp(2.6rem,6vw,4.2rem)", color: "#0A2342" }}>
              Building the<br />
              <span style={{ color: "#C89B3C" }}>Next Era</span> of<br />
              Technology
            </h1>
            <p className="text-lg leading-relaxed mb-10 max-w-lg" style={{ color: "#6b7280" }}>
              We design and develop premium websites, business applications, mobile apps, UI/UX experiences, AI-powered solutions and scalable software for startups and businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => goto("contact")} className="nx-btn-primary inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-sm">
                Start Your Project <ArrowRight size={16} />
              </button>
              <button onClick={() => goto("services")} className="nx-btn-outline inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-sm">
                Our Services <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <HeroIllustration />
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest uppercase" style={{ color: "#d1d5db" }}>Scroll</span>
          <div className="w-px h-12" style={{ background: "linear-gradient(to bottom,#d1d5db,transparent)" }} />
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28" style={{ background: "#F8F9FA" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="font-semibold text-sm tracking-widest uppercase mb-4" style={{ color: "#C89B3C" }}>Who We Are</p>
              <h2 className="nx-display font-bold leading-tight mb-6" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#0A2342" }}>
                A Technology Partner<br />You Can Trust
              </h2>
              <p className="text-lg leading-relaxed mb-8" style={{ color: "#6b7280" }}>
                Nexiora is a modern technology company dedicated to helping businesses grow through innovative software solutions. We combine creativity, technology and strategy to build high-quality digital products that deliver real business value.
              </p>
              <button onClick={() => goto("contact")} className="inline-flex items-center gap-2 font-semibold text-sm" style={{ color: "#0A2342" }}>
                Work With Us <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: CheckCircle, title: "Client-First Approach", desc: "Every decision we make is guided by your business goals and your users' needs." },
                { icon: Zap, title: "Agile Delivery", desc: "Rapid sprints, transparent progress, and zero surprises — ever." },
                { icon: Brain, title: "Innovation-Led", desc: "We bring emerging technology to real-world problems, practically and effectively." },
                { icon: Users, title: "Long-Term Partnership", desc: "We're not a vendor — we're a technology extension of your team." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white rounded-2xl p-6 border" style={{ borderColor: "#f3f4f6", boxShadow: "0 2px 12px rgba(10,35,66,.05)" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(10,35,66,0.06)" }}>
                    <Icon size={20} style={{ color: "#0A2342" }} />
                  </div>
                  <h3 className="font-semibold text-base mb-2" style={{ color: "#0A2342" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm tracking-widest uppercase mb-4" style={{ color: "#C89B3C" }}>What We Do</p>
            <h2 className="nx-display font-bold" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#0A2342" }}>Our Services</h2>
            <div className="nx-gold-line mx-auto mt-5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="svc-card group bg-white border rounded-2xl p-7" style={{ borderColor: "#f3f4f6" }}>
                <div className="nx-icon-box w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(10,35,66,0.06)" }}>
                  <Icon size={22} style={{ color: "#0A2342" }} />
                </div>
                <h3 className="font-semibold text-lg mb-3" style={{ color: "#0A2342" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{desc}</p>
                <div className="mt-5 flex items-center gap-1 text-sm font-medium" style={{ color: "#C89B3C" }}>
                  Learn more <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-28" style={{ background: "#F8F9FA" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm tracking-widest uppercase mb-4" style={{ color: "#C89B3C" }}>Our Edge</p>
            <h2 className="nx-display font-bold" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#0A2342" }}>Why Choose Nexiora</h2>
            <div className="nx-gold-line mx-auto mt-5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-8 text-center border" style={{ borderColor: "#f3f4f6", boxShadow: "0 2px 12px rgba(10,35,66,.05)" }}>
                <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-5" style={{ background: "#0A2342" }}>
                  <Icon size={24} style={{ color: "#C89B3C" }} />
                </div>
                <h3 className="font-semibold text-lg mb-3" style={{ color: "#0A2342" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm tracking-widest uppercase mb-4" style={{ color: "#C89B3C" }}>How We Work</p>
            <h2 className="nx-display font-bold" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#0A2342" }}>Our Process</h2>
            <div className="nx-gold-line mx-auto mt-5" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS.map(({ num, title, desc }) => (
              <div key={num} className="group rounded-2xl p-8 border hover:border-yellow-300 transition-colors" style={{ background: "#F8F9FA", borderColor: "#f3f4f6" }}>
                <div className="nx-display font-bold mb-4" style={{ fontSize: "3.5rem", color: "rgba(200,155,60,0.25)", lineHeight: 1 }}>{num}</div>
                <h3 className="font-semibold text-lg mb-3" style={{ color: "#0A2342" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGIES ── */}
      <section className="py-20" style={{ background: "#F8F9FA" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-12">
            <p className="font-semibold text-sm tracking-widest uppercase mb-4" style={{ color: "#C89B3C" }}>Our Stack</p>
            <h2 className="nx-display font-bold" style={{ fontSize: "clamp(1.8rem,3.5vw,2.6rem)", color: "#0A2342" }}>Technologies We Use</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {TECHS.map((t) => (
              <span key={t} className="tech-pill border bg-white text-sm font-medium px-5 py-2.5 rounded-full" style={{ borderColor: "#e5e7eb", color: "#0A2342" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm tracking-widest uppercase mb-4" style={{ color: "#C89B3C" }}>Our Work</p>
            <h2 className="nx-display font-bold" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#0A2342" }}>Featured Projects</h2>
            <div className="nx-gold-line mx-auto mt-5" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map(({ cat, title, desc }, i) => {
              const Icon = PROJECT_ICONS[i];
              return (
                <div key={title} className="proj-card rounded-2xl overflow-hidden border" style={{ borderColor: "#f3f4f6", boxShadow: "0 2px 12px rgba(10,35,66,.05)" }}>
                  <div className="relative h-48 flex items-center justify-center" style={{ background: PROJECT_BG[i] }}>
                    <Icon size={52} style={{ color: "rgba(10,35,66,0.18)" }} />
                    <div className="proj-overlay absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,35,66,0.82)" }}>
                      <button className="text-sm font-semibold px-6 py-2.5 rounded-full border transition-colors" style={{ border: "1.5px solid #C89B3C", color: "#C89B3C" }}>
                        View Project
                      </button>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#C89B3C" }}>{cat}</span>
                    <h3 className="font-semibold text-lg mt-2 mb-2" style={{ color: "#0A2342" }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#9ca3af" }}>{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "#0A2342" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute rounded-full" style={{ top: "-20%", right: "-10%", width: 400, height: 400, background: "#C89B3C", opacity: 0.06 }} />
          <div className="absolute rounded-full" style={{ bottom: "-20%", left: "-8%", width: 280, height: 280, background: "#C89B3C", opacity: 0.05 }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm tracking-widest uppercase mb-4" style={{ color: "#C89B3C" }}>By The Numbers</p>
            <h2 className="nx-display font-bold text-white" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>Our Achievements</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {STATS.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </div>
      </section>


      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="font-semibold text-sm tracking-widest uppercase mb-4" style={{ color: "#C89B3C" }}>Get In Touch</p>
            <h2 className="nx-display font-bold" style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#0A2342" }}>
              {"Let's Build Something"}<br />{"Great Together"}
            </h2>
            <p className="mt-4 max-w-md mx-auto text-sm" style={{ color: "#9ca3af" }}>{"Have an idea? Let's turn it into reality."}</p>
            <div className="nx-gold-line mx-auto mt-5" />
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="space-y-6 mb-10">
                {[
                  { icon: Mail, label: "Email", value: "tech.nexiora@gmail.com", href: "mailto:tech.nexiora@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+91 6381251300  /  +91 8300150181", href: "tel:+916381251300" },
                  { icon: MapPin, label: "Location", value: "Edappadi, Salem, Tamil Nadu", href: "#" },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-start gap-4">
                    <div className="nx-icon-box w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(10,35,66,0.06)" }}>
                      <Icon size={18} style={{ color: "#0A2342" }} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold tracking-wider uppercase mb-0.5" style={{ color: "#C89B3C" }}>{label}</div>
                      <div className="font-medium text-sm" style={{ color: "#0A2342" }}>{value}</div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="rounded-2xl border flex items-center justify-center h-52" style={{ background: "#F8F9FA", borderColor: "#f3f4f6" }}>
                <div className="text-center" style={{ color: "#d1d5db" }}>
                  <MapPin size={32} className="mx-auto mb-2" />
                  <p className="text-sm">Edappadi, Salem, Tamil Nadu</p>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                {[Linkedin, Twitter, Github, Instagram].map((Icon) => (
                  <a key={Icon.name} href="#" className="w-10 h-10 rounded-full border flex items-center justify-center transition-colors" style={{ borderColor: "#e5e7eb", color: "#9ca3af" }}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-16" style={{ background: "#0A2342" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="mb-4">
                <svg width="120" height="44" viewBox="0 0 120 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="28" fontFamily="'Playfair Display', serif" fontSize="28" fontWeight="700" fill="white">nexiora</text>
                  <rect x="0" y="32" width="120" height="2" fill="#C89B3C" rx="1"/>
                </svg>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>Building the Next Era of Technology</p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-5">Services</h4>
              <ul className="space-y-3">
                {["Web Development","Mobile Apps","UI/UX Design","AI Solutions","Cloud Services"].map((s) => (
                  <li key={s}><span className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>{s}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-5">Company</h4>
              <ul className="space-y-3">
                {["About Us","Our Process","Portfolio","Testimonials"].map((s) => (
                  <li key={s}><span className="text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>{s}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold text-xs tracking-widest uppercase mb-5">Contact</h4>
              <ul className="space-y-3 text-sm" style={{ color: "rgba(255,255,255,0.38)" }}>
                <li>tech.nexiora@gmail.com</li>
                <li>+91 6381251300</li>
                <li>+91 8300150181</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.28)" }}>© 2026 Nexiora. All Rights Reserved.</p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Github, Instagram].map((Icon) => (
                <a key={Icon.name} href="#" className="w-8 h-8 rounded-full border flex items-center justify-center transition-colors" style={{ borderColor: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.28)" }}>
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[500px]">
      <svg viewBox="0 0 520 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ filter: "drop-shadow(0 24px 48px rgba(10,35,66,0.12))" }}>
        <defs>
          <filter id="nx-s">
            <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0A2342" floodOpacity="0.08" />
          </filter>
        </defs>
        {/* Main dashboard card */}
        <rect x="30" y="50" width="360" height="230" rx="20" fill="white" stroke="#e5e7eb" strokeWidth="1.5" filter="url(#nx-s)" />
        {/* Header bar */}
        <rect x="30" y="50" width="360" height="52" rx="20" fill="#0A2342" />
        <rect x="30" y="82" width="360" height="20" fill="#0A2342" />
        <circle cx="58" cy="76" r="7" fill="white" fillOpacity="0.18" />
        <circle cx="80" cy="76" r="7" fill="white" fillOpacity="0.18" />
        <circle cx="102" cy="76" r="7" fill="white" fillOpacity="0.18" />
        <text x="220" y="81" textAnchor="middle" fill="white" fontSize="10" fontFamily="Inter,sans-serif" opacity="0.55">nexiora.io / dashboard</text>
        {/* Bars */}
        {[
          [62,  185, 62],
          [104, 160, 82],
          [146, 170, 72],
          [188, 145, 97],
          [230, 155, 87],
          [272, 135, 107],
          [314, 148, 94],
        ].map(([x, y, h], i) => (
          <g key={`bar-${x}`}>
            <rect x={x} y={155} width="26" height={92} rx="4" fill="#0A2342" opacity="0.07" />
            <rect x={x} y={y} width="26" height={h} rx="4" fill={i % 2 === 1 ? "#C89B3C" : "#0A2342"} opacity={i % 2 === 1 ? 1 : 0.85} />
          </g>
        ))}
        {/* Trend line */}
        <polyline points="75,178 117,158 159,168 201,146 243,155 285,136 327,148" stroke="#3B82F6" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {[75,117,159,201,243,285,327].map((cx, i) => {
          const cys = [178,158,168,146,155,136,148];
          return <circle key={`dot-${cx}`} cx={cx} cy={cys[i]} r="4" fill="#3B82F6" stroke="white" strokeWidth="1.5" />;
        })}
        {/* Floating: AI badge */}
        <rect x="330" y="14" width="136" height="52" rx="14" fill="white" stroke="#f3f4f6" strokeWidth="1" filter="url(#nx-s)" />
        <circle cx="356" cy="40" r="13" fill="#0A2342" />
        <text x="356" y="45" textAnchor="middle" fill="#C89B3C" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="700">AI</text>
        <text x="376" y="36" fill="#0A2342" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="600">AI Solutions</text>
        <text x="376" y="50" fill="#9ca3af" fontSize="9" fontFamily="Inter,sans-serif">Active</text>
        {/* Floating: Projects badge */}
        <rect x="0" y="308" width="168" height="54" rx="14" fill="white" stroke="#f3f4f6" strokeWidth="1" filter="url(#nx-s)" />
        <circle cx="26" cy="335" r="13" fill="#C89B3C" />
        <text x="26" y="340" textAnchor="middle" fill="white" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="700">25+</text>
        <text x="48" y="330" fill="#0A2342" fontSize="10" fontFamily="Inter,sans-serif" fontWeight="600">Projects Done</text>
        <text x="48" y="344" fill="#9ca3af" fontSize="9" fontFamily="Inter,sans-serif">Delivered on time</text>
        {/* Floating: satisfaction card */}
        <rect x="220" y="308" width="228" height="88" rx="16" fill="white" stroke="#f3f4f6" strokeWidth="1" filter="url(#nx-s)" />
        <text x="242" y="334" fill="#0A2342" fontSize="11" fontFamily="Inter,sans-serif" fontWeight="700">Client Satisfaction</text>
        <rect x="242" y="346" width="170" height="5" rx="2.5" fill="#e5e7eb" />
        <rect x="242" y="346" width="170" height="5" rx="2.5" fill="#C89B3C" />
        <text x="242" y="372" fill="#9ca3af" fontSize="9" fontFamily="Inter,sans-serif">100% across all projects</text>
        <text x="414" y="334" fill="#C89B3C" fontSize="20" fontFamily="Inter,sans-serif" fontWeight="800">100%</text>
        {/* Decorative dots */}
        <circle cx="472" cy="170" r="6" fill="#C89B3C" opacity="0.35" />
        <circle cx="490" cy="192" r="4" fill="#0A2342" opacity="0.25" />
        <circle cx="480" cy="215" r="3" fill="#C89B3C" opacity="0.4" />
        <circle cx="10" cy="270" r="5" fill="#0A2342" opacity="0.15" />
        <circle cx="22" cy="290" r="3" fill="#C89B3C" opacity="0.3" />
      </svg>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl p-10 flex flex-col items-center justify-center text-center border" style={{ background: "#F8F9FA", borderColor: "#f3f4f6", minHeight: 400 }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: "#0A2342" }}>
          <CheckCircle size={28} style={{ color: "#C89B3C" }} />
        </div>
        <h3 className="nx-display font-bold text-2xl mb-3" style={{ color: "#0A2342" }}>Message Sent!</h3>
        <p className="text-sm max-w-xs" style={{ color: "#9ca3af" }}>{"Thank you for reaching out. We'll get back to you within 24 hours."}</p>
        <button onClick={() => setSent(false)} className="mt-8 text-sm font-medium" style={{ color: "#C89B3C" }}>Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-2xl p-8 border space-y-5" style={{ background: "#F8F9FA", borderColor: "#f3f4f6" }}>
      <div className="grid sm:grid-cols-2 gap-5">
        {[
          { label: "Full Name", fieldKey: "name", type: "text", placeholder: "John Smith" },
          { label: "Email", fieldKey: "email", type: "email", placeholder: "john@company.com" },
        ].map(({ label, fieldKey, type, placeholder }) => (
          <div key={fieldKey}>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#0A2342" }}>{label}</label>
            <input required type={type} value={(form as Record<string,string>)[fieldKey]} onChange={(e) => setForm({ ...form, [fieldKey]: e.target.value })}
              placeholder={placeholder}
              className="w-full bg-white border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors"
              style={{ borderColor: "#e5e7eb", color: "#0A2342" }} />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#0A2342" }}>Service Needed</label>
        <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full bg-white border rounded-xl px-4 py-3 text-sm focus:outline-none"
          style={{ borderColor: "#e5e7eb", color: "#0A2342" }}>
          <option value="">Select a service…</option>
          {SERVICES.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#0A2342" }}>Message</label>
        <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your project…"
          className="w-full bg-white border rounded-xl px-4 py-3 text-sm focus:outline-none resize-none"
          style={{ borderColor: "#e5e7eb", color: "#0A2342" }} />
      </div>
      <button type="submit" className="nx-btn-primary w-full font-semibold py-4 rounded-xl flex items-center justify-center gap-2 text-sm">
        Send Message <ArrowRight size={16} />
      </button>
    </form>
  );
}