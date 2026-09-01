"use client";

import React from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

export default function WorkCTA() {
  const { language } = useLanguage();

  return (
    <section className="work-cta">
      <div className="work-cta-inner">
        <Reveal>
          <div className="work-cta-eyebrow">{language === 'id' ? 'PUNYA IDE PROYEK?' : 'HAVE A PROJECT IN MIND?'}</div>
        </Reveal>

        <Reveal delay={150}>
          <div className="work-cta-main">
            <h2 className="work-cta-heading">{language === 'id' ? 'Mari berkolaborasi.' : 'Let\'s build something useful.'}</h2>
            <Link href="/#contact" className="work-cta-button">
              {language === 'id' ? 'Rekrut Saya →' : 'Hire Me →'}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
