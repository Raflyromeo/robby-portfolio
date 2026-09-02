"use client";

import React, { useEffect, useState, useRef } from "react";
import { Github, Mail, ExternalLink, X, Code2, FlaskConical, Rocket, Trophy, GraduationCap, Linkedin, Minus } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "../data/projects";
import Header from "./Header";
import TypewriterTitle from "./TypewriterTitle";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";
import GithubSection from "./GithubSection";

const SKILLS = [
  {
    group: "Frontend",
    items: ["React.js", "Next.js", "Tailwind CSS", "Vite", "HTML5", "CSS3", "JavaScript", "TypeScript"],
  },
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "Laravel", "PHP", "Python"],
  },
  {
    group: "Database",
    items: ["MySQL", "Supabase"],
  },
  {
    group: "Design & Tools",
    items: ["Figma", "Canva", "UI/UX Design", "Git", "GitHub", "Postman", "Microsoft Office"],
  },
];

const WHAT_I_CAN_DO = [
  {
    group: "Web Development",
    description:
      "Building responsive, dynamic, and functional web applications using modern technologies and best practices.",
    visual: "qa",
    size: "large",
    items: [
      "Front-End Development",
      "Back-End Development",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Laravel",
      "PHP",
      "Python",
    ],
  },
  {
    group: "UI/UX Design",
    description: "Designing intuitive and visually appealing user interfaces focusing on user experience and seamless interaction.",
    visual: "va",
    items: [
      "Figma",
      "Wireframing",
      "Prototyping",
      "User Research",
      "Visual Hierarchy",
      "Responsive Design",
    ],
  },
];

const SOCIALS = [
  { label: "Email", value: "robbyhudaya21@gmail.com", href: "mailto:robbyhudaya21@gmail.com", icon: Mail, color: "#000000" },
  { label: "GitHub", value: "github.com/RobbyAH", href: "https://github.com/RobbyAH", icon: Github, color: "#000000" },
  { label: "LinkedIn", value: "linkedin.com/in/robbyardiansyah24", href: "https://www.linkedin.com/in/robbyardiansyah24/", icon: Linkedin, color: "#000000" },
  { label: "Instagram", value: "instagram.com/r.ardnsyh._", href: "https://www.instagram.com/r.ardnsyh._/", icon: ExternalLink, color: "#000000" },
];

const CARDS = [
  "Problem Solver",
  "Detail-Oriented",
  "Reliable",
  "Organized",
  "Curious",
  "Quick Learner",
  "Creative",
  "Adaptable",
  "User-Focused",
  "Open to Feedback",
];




const CARD_SCATTER = [
  { rot: -7, x: 6, y: -4 },
  { rot: 5, x: -8, y: 3 },
  { rot: -3, x: 10, y: 6 },
  { rot: 9, x: -5, y: -6 },
  { rot: -10, x: 4, y: 5 },
  { rot: 4, x: -10, y: -2 },
  { rot: -5, x: 9, y: -5 },
  { rot: 8, x: -3, y: 7 },
  { rot: -8, x: 7, y: 2 },
  { rot: 3, x: -6, y: -7 },
];

const CURRENTLY = [
  { icon: Code2, label: "Building", detail: "Modern web applications" },
  { icon: FlaskConical, label: "Exploring", detail: "UI/UX & Front-End trends" },
  { icon: Rocket, label: "Learning", detail: "Advanced data analysis" },
];






function WorkAlbumStack({ projects, activeIndex, onAdvance }) {
  const count = projects.length;

  return (
    <div className="work-mobile-stack" onClick={onAdvance}>
      {projects.map((project, i) => {
        const offset = (i - activeIndex + count) % count;
        const isExiting = offset === count - 1;
        
        if (offset > 2 && !isExiting) return null;

        const scatter = CARD_SCATTER[i % CARD_SCATTER.length];
        let style;

        if (isExiting) {
          style = {
            "--tx": `${scatter.x + 100}px`,
            "--ty": `${scatter.y - 40}px`,
            "--rot": `${scatter.rot + 25}deg`,
            "--sc": 0.88,
            "--op": 0,
            zIndex: 5,
          };
        } else {
          const depth = offset;
          const isFront = depth === 0;
          const calm = 0.4; 
          const dir = depth % 2 === 1 ? -1 : 1; 
          style = {
            "--tx": isFront ? "0px" : `${scatter.x * calm + depth * 8}px`,
            "--ty": isFront ? "0px" : `${scatter.y * calm + dir * depth * 10}px`,
            "--rot": isFront ? "0deg" : `${scatter.rot * calm + depth * (scatter.rot >= 0 ? 1.5 : -1.5)}deg`,
            "--sc": isFront ? 1 : 1 - depth * 0.06,
            "--op": isFront ? 1 : 0.75 - (depth - 1) * 0.2,
            zIndex: 30 - depth * 10,
          };
        }

        return (
          <img
            key={project.num}
            src={project.image}
            alt={project.title}
            className={`stacked-image${offset === 0 ? " stacked-image-front" : ""}`}
            style={style}
            draggable={false}
          />
        );
      })}
    </div>
  );
}

export default function Portfolio() {
  const { language } = useLanguage();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rootRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const heroRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [cardIndex, setCardIndex] = useState(0);
  const [cardPaused, setCardPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMinimized, setIsModalMinimized] = useState(false);
  const [formStatus, setFormStatus] = useState("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeProject = PROJECTS[activeIndex];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goTo = (index) => {
    const normalized = ((index % PROJECTS.length) + PROJECTS.length) % PROJECTS.length;
    setActiveIndex(normalized);
  };

  useEffect(() => {
    const handleMouse = (e) => {
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    const syncMarqueeSpeed = () => {
      const enterSeconds = 8; 
      const pxPerSecond = window.innerWidth / enterSeconds; 
      const loopDistance = track.scrollWidth / 2; 
      const loopSeconds = loopDistance / pxPerSecond;
      
      
      
      heroRef.current?.style.setProperty("--marquee-loop-duration", `${loopSeconds}s`);
    };

    syncMarqueeSpeed();
    window.addEventListener("resize", syncMarqueeSpeed);
    return () => window.removeEventListener("resize", syncMarqueeSpeed);
  }, []);

  useEffect(() => {
    if (cardPaused) return;
    const id = setInterval(() => {
      setCardIndex((prev) => (prev + 1) % CARDS.length);
    }, 1500);
    return () => clearInterval(id);
  }, [cardPaused]);

  return (
    <div
  ref={rootRef}
  className="portfolio-root"
>
      <svg className="bg-lines" viewBox="0 0 1440 5000" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{width:'100%',height:'100%'}}>
        <g opacity="0.28">
          <path d="M-100 200 C 200 100, 500 300, 800 200 C 1100 100, 1300 280, 1540 180" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 350 C 300 250, 600 400, 900 320 C 1200 240, 1400 380, 1440 300" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-80 500 C 240 420, 540 580, 840 500 C 1140 420, 1360 560, 1500 480" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
        </g>
        <g opacity="0.32">
          <path d="M0 700 C 320 620, 620 780, 920 700 C 1220 620, 1420 760, 1440 680" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-100 850 C 260 780, 560 920, 860 860 C 1160 800, 1380 940, 1540 880" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 1000 C 300 940, 600 1060, 900 1000 C 1200 940, 1400 1080, 1440 1020" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
        </g>
        <g opacity="0.22">
          <path d="M-120 1250 C 200 1180, 500 1320, 820 1260 C 1140 1200, 1340 1340, 1560 1280" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 1400 C 280 1340, 580 1460, 880 1400 C 1180 1340, 1380 1480, 1440 1420" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-60 1550 C 240 1490, 540 1610, 840 1550 C 1140 1490, 1360 1630, 1500 1570" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 1700 C 320 1640, 620 1760, 920 1700 C 1220 1640, 1420 1780, 1440 1720" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
        </g>
        <g opacity="0.3">
          <path d="M-140 1950 C 220 1880, 520 2020, 860 1960 C 1200 1900, 1400 2040, 1580 1980" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 2100 C 300 2040, 600 2160, 900 2100 C 1200 2040, 1400 2180, 1440 2120" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-80 2250 C 240 2190, 540 2310, 840 2250 C 1140 2190, 1360 2330, 1500 2270" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
        </g>
        <g opacity="0.26">
          <path d="M0 2500 C 320 2440, 620 2560, 920 2500 C 1220 2440, 1420 2580, 1440 2520" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-100 2650 C 260 2590, 560 2710, 860 2650 C 1160 2590, 1380 2730, 1540 2670" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 2800 C 300 2740, 600 2860, 900 2800 C 1200 2740, 1400 2880, 1440 2820" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-60 2950 C 240 2890, 540 3010, 840 2950 C 1140 2890, 1360 3030, 1500 2970" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
        </g>
        <g opacity="0.34">
          <path d="M-120 3250 C 200 3180, 500 3320, 820 3260 C 1140 3200, 1340 3340, 1560 3280" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 3400 C 280 3340, 580 3460, 880 3400 C 1180 3340, 1380 3480, 1440 3420" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-80 3550 C 240 3490, 540 3610, 840 3550 C 1140 3490, 1360 3630, 1500 3570" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 3700 C 320 3640, 620 3760, 920 3700 C 1220 3640, 1420 3780, 1440 3720" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
        </g>
        <g opacity="0.24">
          <path d="M-100 4050 C 260 3990, 560 4110, 860 4050 C 1160 3990, 1380 4130, 1540 4070" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 4200 C 300 4140, 600 4260, 900 4200 C 1200 4140, 1400 4280, 1440 4220" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
          <path d="M-60 4350 C 240 4290, 540 4410, 840 4350 C 1140 4290, 1360 4430, 1500 4370" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
        </g>
        <g opacity="0.3">
          <path d="M-140 4600 C 220 4540, 520 4660, 860 4600 C 1200 4540, 1400 4680, 1580 4620" stroke="var(--light-gray)" strokeWidth="1.5" fill="none"/>
          <path d="M0 4750 C 300 4690, 600 4810, 900 4750 C 1200 4690, 1400 4830, 1440 4770" stroke="var(--light-gray)" strokeWidth="1" fill="none"/>
        </g>
      </svg>
      <Header />

      
      <section id="hero" className="hero-root" ref={heroRef}>

<div className="bg-name-marquee">
          <div className="bg-name-track" ref={marqueeTrackRef}>
            <span className="bg-name-text">ROBBY ARDIANSYAH HUDAYA</span>
            <span className="bg-name-text">ROBBY ARDIANSYAH HUDAYA</span>
          </div>
        </div>

        
        {["t1", "t2", "t3", "t4", "b1", "b2", "b3", "b4"].map((pos) => (
          <div
            key={pos}
            className={`bg-name-marquee bg-name-marquee--mobile-extra bg-name-marquee--${pos}`}
            aria-hidden="true"
          >
            <div className="bg-name-track">
              <span className="bg-name-text">ROBBY ARDIANSYAH HUDAYA</span>
              <span className="bg-name-text">ROBBY ARDIANSYAH HUDAYA</span>
            </div>
          </div>
        ))}

        <div className="concentric-circles">
          <div className="circle circle-1" />
          <div className="circle circle-2" />
          <div className="circle circle-3" />
        </div>

        <div className="profile-wrap">
          <img src="/images/profile/Robby.png" alt="Robby Ardiansyah Hudaya" className="profile-image" draggable={false} />
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span className="scroll-text">{language === 'id' ? 'GULIR KE BAWAH' : 'SCROLL DOWN'}</span>
        </div>
      </section>

      
      <section id="work" className="section">
        <Reveal>
          <div className="work-header">
            <div>
              <div className="section-label">{language === 'id' ? 'Karya Pilihan' : 'Selected Work'}</div>
              <TypewriterTitle text={language === 'id' ? 'Galeri Karya' : 'Work Gallery'} />
              <div className="section-desc">{language === 'id' ? 'Kumpulan sistem, proyek digital, dan pekerjaan teknis yang telah saya bangun.' : 'A collection of systems, digital projects, and technical work I\'ve built.'}</div>
            </div>
            <Link href="/work" className="work-album-btn-top">
              {language === 'id' ? 'Lihat Proyek Lainnya' : 'View More Projects'} <ExternalLink size={14} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="work-album">
            <div className="work-album-inner">
              {PROJECTS.map((project, index) => {
                const total = PROJECTS.length;

                let diff = (index - activeIndex + total) % total;
                if (diff > total / 2) diff -= total;

                const isCenter = diff === 0;
                const distance = Math.abs(diff);
                const dir = isCenter ? 0 : diff / distance;

                const style = isCenter
                  ? {
                      transform: "translate(-50%, -50%) scale(1)",
                      zIndex: 5,
                      opacity: 1,
                    }
                  : {
                      transform: `translate(calc(-50% + ${
                        dir * (200 + (distance - 1) * 130)
                      }px), -50%) scale(${Math.max(0.55, 1 - distance * 0.28)})`,
                      zIndex: 5 - distance,
                      opacity: distance <= 2 ? Math.max(0, 0.85 - (distance - 1) * 0.55) : 0,
                      pointerEvents: distance <= 2 ? "auto" : "none",
                    };

                return (
                  <div
                    key={project.num}
                    className={`work-album-item${isCenter ? " work-album-item-center" : ""}`}
                    style={style}
                    onClick={() => !isCenter && goTo(index)}
                  >
                    <img src={project.image} alt={project.title} className="work-album-img" draggable={false} />
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="work-mobile-stack-wrap">
            <WorkAlbumStack
              projects={PROJECTS}
              activeIndex={activeIndex}
              onAdvance={() => goTo(activeIndex + 1)}
            />
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="work-info" key={activeProject.num}>
            <h3 className="work-info-title">{activeProject.title}</h3>
            <p className="work-info-desc">{language === 'id' ? activeProject.descId : activeProject.desc}</p>

            <a
              href={activeProject.link}
              className="work-info-link"
              target={activeProject.link !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {language === 'id' ? activeProject.linkTextId : activeProject.linkText}
            </a>
          </div>
        </Reveal>
      </section>

      
      <section id="what-i-can-do" className="section">
        <div className="what-i-can-do-grid">
          <div className="what-i-can-do-left">
            <Reveal>
              <div className="section-label">{language === 'id' ? 'Kemampuan Saya' : 'My Capabilities'}</div>
              <TypewriterTitle text={language === 'id' ? 'Apa Saja Keahlian Saya' : 'What I Can Do'} />
              <div className="what-i-can-do-desc">
                {language === 'id' 
                  ? 'Saya memadukan kemampuan teknis dan pemecahan masalah untuk membangun serta menguji sistem, mengelola data, dan mendukung efisiensi alur kerja digital.' 
                  : 'I combine technical, problem-solving, and digital skills to build reliable systems, test systems, manage data, and support efficient digital workflows.'}
              </div>
              <div className="tech-stack">
                <div className="tech-stack-column">
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=html" alt="HTML5" draggable={false} />
                    <span className="tech-stack-label">HTML5</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=css" alt="CSS3" draggable={false} />
                    <span className="tech-stack-label">CSS3</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=js" alt="JavaScript" draggable={false} />
                    <span className="tech-stack-label">JavaScript</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" draggable={false} />
                    <span className="tech-stack-label">TypeScript</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=vite" alt="Vite" draggable={false} />
                    <span className="tech-stack-label">Vite</span>
                  </div>
                </div>
                <div className="tech-stack-column">
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=react" alt="React" draggable={false} />
                    <span className="tech-stack-label">React.js</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=nextjs" alt="Next.js" draggable={false} />
                    <span className="tech-stack-label">Next.js</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=tailwind" alt="TailwindCSS" draggable={false} />
                    <span className="tech-stack-label">TailwindCSS</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=wordpress" alt="WordPress" draggable={false} />
                    <span className="tech-stack-label">WordPress</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=postman" alt="Postman" draggable={false} />
                    <span className="tech-stack-label">Postman</span>
                  </div>
                </div>
                <div className="tech-stack-column workspace-column">
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=nodejs" alt="Node.js" draggable={false} />
                    <span className="tech-stack-label">Node.js</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=express" alt="Express.js" draggable={false} />
                    <span className="tech-stack-label">Express.js</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=php" alt="PHP" draggable={false} />
                    <span className="tech-stack-label">PHP</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=laravel" alt="Laravel" draggable={false} />
                    <span className="tech-stack-label">Laravel 11</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=mysql" alt="MySQL" draggable={false} />
                    <span className="tech-stack-label">MySQL</span>
                  </div>
                </div>
                <div className="tech-stack-column workspace-column">
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=supabase" alt="Supabase" draggable={false} />
                    <span className="tech-stack-label">Supabase</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=vercel" alt="Vercel" draggable={false} />
                    <span className="tech-stack-label">Vercel</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://skillicons.dev/icons?i=figma" alt="Figma" draggable={false} />
                    <span className="tech-stack-label">Figma</span>
                  </div>
                  <div className="tech-stack-item">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" alt="Canva" draggable={false} />
                    <span className="tech-stack-label">Canva</span>
                  </div>
            </div>
          </div>
        </Reveal>
          </div>

          <div className="what-i-can-do-right">
            {WHAT_I_CAN_DO.map((group, index) => (
              <Reveal key={group.group} delay={150 + index * 120}>
                <div className={`bento-card ${group.size === "large" ? "bento-large" : "bento-medium"}`}>
                  <div className="bento-header">
                    <div className="bento-number">{String(index + 1).padStart(2, "0")}</div>
                    <div className="bento-category">{group.group}</div>
                  </div>

                  <div className="bento-visual">
                    {index === 0 && (
                      <img src="/images/gif/coding.gif" alt="Web Development & QA" className="bento-gif" draggable={false} />
                    )}
                    {index === 1 && (
                      <img src="/images/gif/assistant.gif" alt="Virtual Assistance" className="bento-gif" draggable={false} />
                    )}
                    {index === 2 && (
                      <img src="/images/gif/social.gif" alt="Content & Digital" className="bento-gif" draggable={false} />
                    )}
                  </div>

                  <p className="bento-desc">{group.description}</p>

                  <div className="bento-skills">
                    {group.items.map((item) => (
                      <span key={item} className="bento-tag">{item}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      
      <GithubSection />

      
      <section id="about" className="section">
        <Reveal>
          <div className="section-label">{language === 'id' ? 'TENTANG SAYA' : 'ABOUT ME'}</div>
          <TypewriterTitle text={isMobile ? (language === 'id' ? "Problem Solver.\nDigital Generalist." : "Problem Solver.\nDigital Generalist.") : (language === 'id' ? "Problem Solver. Digital Generalist." : "Problem Solver. Digital Generalist.")} />
        </Reveal>

        <Reveal delay={100}>
          <div className="about-profile-card">
            <div className="about-profile-header">
              <div className="about-profile-image-wrapper">
                <img src="/images/profile/robby.jpg" alt="Robby Ardiansyah Hudaya" className="about-profile-image" draggable={false} />
              </div>
              <div className="about-profile-info">
                <div className="about-profile-name">
                  ROBBY ARDIANSYAH HUDAYA
                  <img src="/images/about/badge.png" alt="Verified" className="about-profile-badge" draggable={false} />
                </div>
                <div className="about-profile-stats">
                  <div className="about-stat-item">
                    <span className="about-stat-label">{language === 'id' ? 'SEMESTER' : 'SEMESTER'}</span>
                    <span className="about-stat-value">7</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="about-stat-label">{language === 'id' ? 'PROGRAM' : 'PROGRAM'}</span>
                    <span className="about-stat-value">{language === 'id' ? 'Sistem Informasi' : 'Information Systems'}</span>
                  </div>
                  <div className="about-stat-item">
                    <span className="about-stat-label">{language === 'id' ? 'IPK' : 'GPA'}</span>
                    <span className="about-stat-value">3.91 / 4.00</span>
                  </div>
                </div>
                <div className="about-description">
                  <p>
                    {language === 'id' 
                      ? 'Robby Ardiansyah Hudaya adalah mahasiswa Sistem Informasi di Universitas Gunadarma dengan minat yang kuat pada Pengembangan Front-End, Desain UI/UX, pemrograman, bisnis digital, dan analisis data. Saya aktif berpartisipasi dalam proyek pengembangan perangkat lunak dan kegiatan laboratorium, terus berusaha membangun pengalaman digital yang intuitif dan fungsional.' 
                      : 'Robby Ardiansyah Hudaya is an Information Systems undergraduate at Gunadarma University with a strong interest in Front-End Development, UI/UX Design, programming, digital business, and data analysis. I actively participate in software development projects and laboratory activities, continuously aiming to build intuitive and functional digital experiences.'}
                  </p>
                  <p>
                    {language === 'id' ? 'Ingin tahu lebih banyak tentang pengalaman saya?' : 'Want to know more about my experience?'} <a href="/documents/CV_ROBBY%20ARDIANSYAH%20HUDAYA.pdf" className="about-resume-link" target="_blank" rel="noopener noreferrer">{language === 'id' ? 'Unduh resume saya' : 'Download my resume'}</a>.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="about-bottom-row">
              <div className="currently-strip">
                <div className="currently-strip-label">{language === 'id' ? 'SAAT INI' : 'CURRENTLY'}</div>
                <div className="currently-strip-items">
                  {CURRENTLY.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div className="currently-item" key={item.label}>
                        <span className="currently-icon">
                          <Icon size={16} strokeWidth={2} />
                        </span>
                        <div className="currently-text">
                          <div className="currently-item-label">{item.label}</div>
                          <div className="currently-item-detail">{item.detail}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card-stack">
                <div
                  className="card-stack-container"
                  onClick={() => setCardIndex((prev) => (prev + 1) % CARDS.length)}
                  onMouseEnter={() => setCardPaused(true)}
                  onMouseLeave={() => setCardPaused(false)}
                >
                {CARDS.map((trait, i) => {
                  const offset = (i - cardIndex + CARDS.length) % CARDS.length;
                  const isExiting = offset === CARDS.length - 1;
                  
                  if (offset > 2 && !isExiting) return null;

                  const scatter = CARD_SCATTER[i];
                  let style;

                  if (isExiting) {
                    style = {
                      "--tx": `${scatter.x + 140}px`,
                      "--ty": `${scatter.y - 60}px`,
                      "--rot": `${scatter.rot + 40}deg`,
                      "--sc": 0.85,
                      "--op": 0,
                      zIndex: 5,
                    };
                  } else {
                    const depth = offset;
                    style = {
                      "--tx": `${scatter.x + depth * 10}px`,
                      "--ty": `${scatter.y + depth * 8}px`,
                      "--rot": `${scatter.rot + depth * (scatter.rot >= 0 ? 5 : -5)}deg`,
                      "--sc": 1 - depth * 0.045,
                      "--op": depth === 0 ? 1 : 0.55 + (2 - depth) * 0.15,
                      zIndex: 30 - depth * 10,
                    };
                  }

                  return (
                    <div
                      key={trait}
                      className={`card-stack-card${offset === 0 ? " card-stack-card-front" : ""}`}
                      style={style}
                    >
                      <div className="card-stack-label">{language === 'id' ? 'SIFAT' : 'TRAIT'}</div>
                      <div className="card-stack-value">{trait}</div>
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      
      <section id="education" className="section">
        <Reveal>
          <div className="section-label">{language === 'id' ? 'Latar Belakang Akademik' : 'Academic Background'}</div>
          <TypewriterTitle text={language === 'id' ? 'Pendidikan' : 'Education'} />
          <div className="section-desc">
            {language === 'id' ? 'Perjalanan akademik formal dan studi saya saat ini.' : 'My formal academic journey and current studies.'}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="awards-layout">
            <div className="awards-column" style={{ width: '100%' }}>
              <div className="award-item" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start', cursor: 'default' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="award-icon"><GraduationCap size={24} /></div>
                  <div className="award-title" style={{ fontSize: '1.2rem' }}>Universitas Gunadarma</div>
                </div>
                <div style={{ display: 'flex', gap: '16px', color: 'var(--text-secondary)', marginTop: '8px', flexWrap: 'wrap' }}>
                  <span><strong>{language === 'id' ? 'Program:' : 'Program:'}</strong> {language === 'id' ? 'Sarjana Sistem Informasi' : 'Information Systems'}</span>
                  <span><strong>{language === 'id' ? 'Semester:' : 'Semester:'}</strong> 7</span>
                  <span><strong>{language === 'id' ? 'IPK:' : 'GPA:'}</strong> 3.91 / 4.00</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      <section id="experience" className="section">
        <Reveal>
          <div className="section-label">{language === 'id' ? 'Jejak Karir & Pengalaman' : 'Growth & Experience'}</div>
          <TypewriterTitle text={language === 'id' ? 'Pengalaman Profesional' : 'Professional Experience'} />
          <div className="section-desc">
            {language === 'id' ? 'Berbagai peran profesional dan proyek yang membentuk keahlian teknis dan kemampuan kolaborasi saya.' : 'A collection of professional roles and projects that shaped my technical and collaborative skills.'}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="experience-bento-layout" style={{ display: 'flex', flexWrap: 'wrap', gap: '48px', marginTop: '40px', alignItems: 'stretch' }}>
            
            
            <div className="experience-timeline" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.3, margin: 0 }}>Advanced Management Laboratory</h3>
                <div style={{ color: 'var(--text-secondary)' }}>Universitas Gunadarma</div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', paddingLeft: '16px', borderLeft: '2px solid var(--line)', marginLeft: '8px' }}>
                
                
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-22px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text)' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)' }}>{language === 'id' ? 'Instruktur Kursus' : 'Course Instructor'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', marginTop: '4px' }}>{language === 'id' ? 'Jun 2026 – Sekarang' : 'Jun 2026 – Present'}</div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {language === 'id' 
                      ? 'Melakukan sesi pemrograman praktis dan membimbing mahasiswa melalui kegiatan laboratorium langsung. Menjelaskan konsep pemrograman, metodologi pengembangan perangkat lunak, dan praktik terbaik industri. Membantu mahasiswa dalam menyelesaikan tantangan pengkodean dan meningkatkan keterampilan pemecahan masalah mereka.' 
                      : 'Conducted practical programming sessions and guided students through hands-on laboratory activities. Explained programming concepts, software development methodologies, and industry best practices. Assisted students in solving coding challenges and improving their problem-solving skills.'}
                  </p>
                </div>

                
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-22px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text)' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)' }}>{language === 'id' ? 'Programmer' : 'Programmer'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', marginTop: '4px' }}>{language === 'id' ? 'Jan 2026 – Sekarang' : 'Jan 2026 – Present'}</div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {language === 'id' 
                      ? 'Mengembangkan dan memelihara proyek akademik dan laboratorium berbasis pemrograman. Berkolaborasi dengan anggota tim untuk memecahkan masalah perangkat lunak dan teknis. Menerapkan konsep pemrograman, pemecahan masalah, dan pemikiran analitis dalam proyek praktis.' 
                      : 'Developed and maintained programming-based academic and laboratory projects. Collaborated with team members to solve software and technical problems. Implemented programming concepts, problem-solving, and analytical thinking in practical projects.'}
                  </p>
                </div>

                
                <div style={{ position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '-22px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--text)' }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)' }}>{language === 'id' ? 'Asisten Programmer' : 'Assistant Programmer'}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px', marginTop: '4px' }}>{language === 'id' ? 'Jan 2026 – Sekarang' : 'Jan 2026 – Present'}</div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                    {language === 'id' 
                      ? 'Mengembangkan dan memelihara proyek akademik dan laboratorium berbasis pemrograman. Berkolaborasi dengan anggota tim untuk memecahkan masalah perangkat lunak dan teknis di lingkungan laboratorium.' 
                      : 'Developed and maintained programming-based academic and laboratory projects. Collaborated with team members to solve software and technical problems in laboratory environments.'}
                  </p>
                </div>

              </div>
            </div>

            
            <div className="experience-bento-grid" style={{ flex: '1 1 300px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ gridColumn: 'span 2', height: 'clamp(200px, 40vw, 250px)' }}>
                <img src="/images/certificates/Course Instructor - Advanced Management Laboratory.jpeg" alt="Course Instructor" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', border: '1px solid var(--line)' }} draggable={false} />
              </div>
              <div style={{ height: 'clamp(140px, 30vw, 200px)' }}>
                <img src="/images/certificates/Manlan.jpeg" alt="Manlan" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', border: '1px solid var(--line)' }} draggable={false} />
              </div>
              <div style={{ height: 'clamp(140px, 30vw, 200px)' }}>
                <img src="/images/certificates/programmer.jpeg" alt="Programmer" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px', border: '1px solid var(--line)' }} draggable={false} />
              </div>
            </div>

          </div>
        </Reveal>
      </section>

      
      <section id="contact" className="section">
        <div className="contact-grid">
          <div className="contact-left">
            <Reveal>
              <div className="contact-eyebrow">{language === 'id' ? 'MARI TERHUBUNG' : 'GET IN TOUCH'}</div>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="contact-headline">
                {language === 'id' ? 'MARI' : "LET'S"}<br />
                <span className="contact-headline-accent">{language === 'id' ? 'BEKERJA' : 'WORK'}</span><br />
                {language === 'id' ? 'SAMA' : 'TOGETHER'}
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="contact-description">{language === 'id' ? 'Siap memberikan solusi untuk tantangan berikutnya.' : 'Looking for the next problem worth solving.'}</p>
            </Reveal>
            <Reveal delay={300}>
              <p className="contact-secondary">
                {language === 'id' 
                  ? 'Saya terbuka untuk berbagai peluang baru di mana saya dapat berkontribusi pada pengujian perangkat lunak, pengembangan web, operasi TI, maupun alur kerja digital.' 
                  : 'I\'m open to opportunities where I can contribute to software testing, web development, IT operations, and digital workflows.'}
              </p>
            </Reveal>
            <Reveal delay={400}>
              <a href="/documents/CV_ROBBY%20ARDIANSYAH%20HUDAYA.pdf" className="contact-resume-btn" target="_blank" rel="noopener noreferrer">{language === 'id' ? 'UNDUH CV →' : 'DOWNLOAD RESUME →'}</a>
            </Reveal>
          </div>

          <div className="contact-right">
            <div className="contact-cards">
              <Reveal delay={200}>
                <a href="mailto:robbyhudaya21@gmail.com" className="contact-card" target="_blank" rel="noopener noreferrer">
                  <span className="contact-card-number">01</span>
                  <div className="contact-card-icon">
                    <Mail size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div className="contact-card-label">EMAIL</div>
                    <div className="contact-card-value">robbyhudaya21@gmail.com</div>
                  </div>
                </a>
              </Reveal>
              <Reveal delay={280}>
                <a href="https://github.com/RobbyAH" className="contact-card" target="_blank" rel="noopener noreferrer">
                  <span className="contact-card-number">02</span>
                  <div className="contact-card-icon">
                    <Github size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div className="contact-card-label">GITHUB</div>
                    <div className="contact-card-value">github.com/RobbyAH</div>
                  </div>
                  <ExternalLink size={16} className="contact-card-arrow" />
                </a>
              </Reveal>
              <Reveal delay={360}>
                <a href="https://www.linkedin.com/in/robbyardiansyah24/" className="contact-card" target="_blank" rel="noopener noreferrer">
                  <span className="contact-card-number">03</span>
                  <div className="contact-card-icon">
                    <Linkedin size={20} />
                  </div>
                  <div className="contact-card-info">
                    <div className="contact-card-label">LINKEDIN</div>
                    <div className="contact-card-value">linkedin.com/in/robbyardiansyah24</div>
                  </div>
                  <ExternalLink size={16} className="contact-card-arrow" />
                </a>
              </Reveal>
            </div>
            <Reveal delay={440}>
              <button className="contact-cta" onClick={() => { setIsModalOpen(true); setIsModalMinimized(false); }}>
                {language === 'id' ? 'KIRIM PESAN →' : 'SEND ME A MESSAGE →'}
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className={`contact-modal${isModalMinimized ? " contact-modal--minimized" : ""}`}>
          <div className="contact-modal-header" onClick={() => isModalMinimized && setIsModalMinimized(false)}>
            <h3 className="contact-modal-title">{language === 'id' ? 'Kirim Saya Pesan' : 'Send Me a Message'}</h3>
            <div className="contact-modal-controls">
              <button
                type="button"
                className="contact-modal-icon-btn contact-modal-minimize-btn"
                aria-label={isModalMinimized ? "Expand" : "Minimize"}
                onClick={(e) => { e.stopPropagation(); setIsModalMinimized((v) => !v); }}
              >
                <Minus size={16} />
              </button>
              <button
                type="button"
                className="contact-modal-icon-btn"
                aria-label="Close"
                onClick={(e) => { e.stopPropagation(); setIsModalOpen(false); }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {!isModalMinimized && (
            <div className="contact-modal-inner">
              <form
                className="contact-modal-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target;
                  const data = {
                    name: form.name.value.trim(),
                    email: form.email.value.trim(),
                    message: form.message.value.trim(),
                  };

                  setFormStatus("submitting");

                   try {
                     await fetch('https://script.google.com/macros/s/AKfycbz68sln0VIOOVOegEYiQLJwTdLonmPHMzq8jqzWCaqdgUAG2-LWxJVuRaEM5HQl6ABH/exec', {
                       method: 'POST',
                       mode: 'no-cors',
                       headers: { 'Content-Type': 'application/json' },
                       body: JSON.stringify(data),
                     });
                     setFormStatus("success");
                     form.reset();
                     setIsModalOpen(false);
                     setShowSuccessModal(true);
                   } catch (error) {
                     setFormStatus("error");
                   }
                }}
              >
                <div className="contact-modal-field">
                  <label className="contact-modal-label">{language === 'id' ? 'Nama Lengkap' : 'Full Name'}</label>
                  <input type="text" name="name" className="contact-modal-input" placeholder={language === 'id' ? 'Nama lengkap Anda' : 'Your full name'} required />
                </div>

                <div className="contact-modal-field">
                  <label className="contact-modal-label">{language === 'id' ? 'Alamat Email' : 'Email Address'}</label>
                  <input type="email" name="email" className="contact-modal-input" placeholder={language === 'id' ? 'email.anda@contoh.com' : 'your.email@example.com'} required />
                </div>

                <div className="contact-modal-field contact-modal-field--grow">
                  <label className="contact-modal-label">{language === 'id' ? 'Pesan' : 'Message'}</label>
                  <textarea rows="6" name="message" className="contact-modal-input" placeholder={language === 'id' ? 'Ceritakan tentang proyek Anda...' : 'Tell me about your project...'} required />
                </div>

                <button type="submit" className="contact-modal-submit" disabled={formStatus === "submitting"}>
                  {formStatus === "submitting" 
                    ? (language === 'id' ? 'MENGIRIM...' : 'SENDING...') 
                    : formStatus === "success" 
                      ? (language === 'id' ? 'PESAN TERKIRIM' : 'MESSAGE SENT') 
                      : (language === 'id' ? 'KIRIM PESAN →' : 'SEND MESSAGE →')}
                </button>

                {formStatus === "error" && (
                  <div className="contact-modal-error">
                    {language === 'id' ? 'Gagal mengirim pesan. Silakan coba lagi atau hubungi saya langsung.' : 'Failed to send message. Please try again or contact me directly.'}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      )}

      {showSuccessModal && (
        <div className="success-modal-overlay" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <button className="success-modal-close" onClick={() => setShowSuccessModal(false)}>
              <X size={20} />
            </button>
            <div className="success-modal-icon">✓</div>
            <h3 className="success-modal-title">{language === 'id' ? 'Pesan Terkirim!' : 'Message Sent!'}</h3>
            <p className="success-modal-text">{language === 'id' ? 'Terima kasih telah menghubungi saya. Saya akan membalas pesan Anda sesegera mungkin.' : 'Thanks for reaching out. I\'ll get back to you as soon as possible.'}</p>
            <button className="success-modal-btn" onClick={() => setShowSuccessModal(false)}>
              {language === 'id' ? 'LANJUT MENJELAJAH' : 'CONTINUE BROWSING'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}