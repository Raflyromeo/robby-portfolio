"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import WorkHeader from "../../components/WorkHeader";
import TechnicalArchive from "../../components/TechnicalArchive";
import DigitalGallery from "../../components/DigitalGallery";
import WorkCTA from "../../components/WorkCTA";
import { PROJECTS } from "../../lib/projects";
import { useLanguage } from "../../components/LanguageProvider";
import Reveal from "../../components/Reveal";

const technical = PROJECTS.filter((p) => !p.category.includes("Digital"));
const digital = PROJECTS.filter((p) => p.category.includes("Digital"));

export default function Work() {
  const { language } = useLanguage();

  return (
    <main style={{ position: "relative" }}>
      <WorkHeader />

      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '140px 40px 0', position: 'relative', zIndex: 10 }}>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--muted)', fontFamily: 'Inter, sans-serif' }}>
              <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none', transition: 'color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--text)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--muted)'}>
                Home
              </Link>
              <ChevronRight size={14} />
              <span style={{ color: 'var(--text)', fontWeight: 500 }}>{language === 'id' ? 'Semua Karya' : 'All Work'}</span>
            </div>

            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600, padding: '10px 20px', borderRadius: '8px', background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--text)', textDecoration: 'none', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.background = 'var(--line)'; e.currentTarget.style.transform = 'translateY(-2px)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <ArrowLeft size={16} />
              {language === 'id' ? 'Kembali ke Halaman Utama' : 'Back to Home'}
            </Link>
          </div>
        </Reveal>
      </section>

      <div style={{ marginTop: '-40px' }}>
        <TechnicalArchive projects={technical} />
      </div>

      <DigitalGallery projects={digital} />

      <WorkCTA />
    </main>
  );
}
