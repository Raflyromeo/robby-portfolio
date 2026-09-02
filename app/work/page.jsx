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

      <section className="relative z-20 mx-auto max-w-[1200px] px-5 pt-[110px] sm:px-10 sm:pt-[140px]">
        <Reveal>
          <div className="flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 font-['Inter',sans-serif] text-[14px] text-[var(--muted)]">
              <Link href="/" className="text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--text)]">
                Home
              </Link>
              <ChevronRight size={14} />
              <span className="font-medium text-[var(--text)]">{language === 'id' ? 'Semua Karya' : 'All Work'}</span>
            </div>

            <Link href="/" className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 text-[13px] font-semibold text-[var(--text)] no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--line)]">
              <ArrowLeft size={16} />
              {language === 'id' ? 'Kembali ke Halaman Utama' : 'Back to Home'}
            </Link>
          </div>
        </Reveal>
      </section>

      <div className="-mt-6 sm:-mt-10">
        <TechnicalArchive projects={technical} />
      </div>

      <DigitalGallery projects={digital} />

      <WorkCTA />
    </main>
  );
}
