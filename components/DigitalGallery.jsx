"use client";

import React from "react";
import TypewriterTitle from "./TypewriterTitle";
import Reveal from "./Reveal";
import { useLanguage } from "./LanguageProvider";

export default function DigitalGallery({ projects = [] }) {
  const { language } = useLanguage();
  const [hero, ...rest] = projects;

  return (
    <section className="digital-section" id="digital">
      <Reveal>
        <div className="digital-header">
          <div className="section-label">{language === 'id' ? 'Proyek Digital' : 'Digital Projects'}</div>
          <TypewriterTitle text={language === 'id' ? 'Lebih dari Kode' : 'Beyond Code'} />
          <div className="section-desc">
            {language === 'id' ? 'Kreatif, visual, konten, dan proyek digital yang dikembangkan bersamaan dengan karya teknis saya.' : 'Creative, visual, content, and digital projects developed alongside my technical work.'}
          </div>
        </div>
      </Reveal>

      {hero && (
        <Reveal delay={100}>
          <div className="digital-card digital-card--hero">
            <div className="digital-image-wrap digital-image-wrap--hero">
              <img src={hero.image} alt={hero.title} className="digital-image" />
            </div>
            <div className="digital-content digital-content--hero">
              <span className="digital-hero-num" aria-hidden="true">{hero.num}</span>
              <h3 className="digital-title">{hero.title}</h3>
              <p className="digital-desc">{language === 'id' && hero.descId ? hero.descId : hero.desc}</p>
            </div>
          </div>
        </Reveal>
      )}

      <Reveal delay={100}>
        <div className="digital-grid">
          {rest.map((project) => (
            <div
              key={project.num}
              className="digital-card"
            >
              <div className="digital-image-wrap">
                <img src={project.image} alt={project.title} className="digital-image" />
              </div>
              <div className="digital-content digital-content--grid">
                <span className="digital-grid-num" aria-hidden="true">{project.num}</span>
                <h3 className="digital-title">{project.title}</h3>
                <p className="digital-desc">{language === 'id' && project.descId ? project.descId : project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}