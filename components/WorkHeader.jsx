"use client";

import React, { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUp } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

export default function WorkHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navRef = useRef(null);
  const { language, toggleLanguage } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickAway = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("touchstart", handleClickAway);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("touchstart", handleClickAway);
    };
  }, [menuOpen]);

  return (
    <>
      <nav ref={navRef} className={`nav-bar ${scrolled ? "scrolled" : ""} ${menuOpen ? "nav-bar--expanded" : ""}`}>
        <div className="nav-mobile-header">
          <a href="/" className="nav-left">
            <div className="nav-logo">R</div>
            <div className="nav-brand">ROBBY</div>
          </a>
          <LanguageToggle className="md:hidden nav-theme-toggle" style={{ position: 'relative', zIndex: 210, marginLeft: 'auto' }} />
          <ThemeToggle className="md:hidden nav-theme-toggle" style={{ position: 'relative', zIndex: 210, marginLeft: '8px' }} />
          <button className="md:hidden nav-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, position: 'relative', zIndex: 210 }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="nav-mobile-menu">
            <div className="nav-mobile-menu-inner">
              <a href="/#work" className="nav-link" onClick={() => setMenuOpen(false)}>{language === 'id' ? 'Karya' : 'Work'}</a>
              <a href="/#about" className="nav-link" onClick={() => setMenuOpen(false)}>{language === 'id' ? 'Tentang' : 'About'}</a>
              <a href="/#contact" className="nav-cta" style={{ textAlign: 'center' }} onClick={() => setMenuOpen(false)}>{language === 'id' ? 'Rekrut Saya' : 'Hire Me'}</a>
            </div>
          </div>
        )}
        <div className="nav-center hidden md:flex">
          <a href="/#work" className="nav-link">{language === 'id' ? 'Karya' : 'Work'}</a>
          <a href="/#about" className="nav-link">{language === 'id' ? 'Tentang' : 'About'}</a>
        </div>
        <div className="nav-right">
          <LanguageToggle className="nav-theme-toggle hidden md:inline-flex" />
          <ThemeToggle className="nav-theme-toggle hidden md:inline-flex" style={{ marginRight: 8 }} />
          <a href="/#contact" className="nav-cta hidden md:block">{language === 'id' ? 'Rekrut Saya' : 'Hire Me'}</a>
        </div>
      </nav>

      {showBackToTop && !menuOpen && (
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <span className="back-to-top-icon">
            <ArrowUp size={20} />
          </span>
          <span className="back-to-top-text">
            {language === 'id' ? 'Kembali ke atas' : 'Scroll to top'}
          </span>
        </button>
      )}

    </>
  );
}
