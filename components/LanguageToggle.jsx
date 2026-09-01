"use client";

import React from "react";
import { useLanguage } from "./LanguageProvider";

export default function LanguageToggle({ className, style }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      className={className}
      onClick={toggleLanguage}
      aria-label="Toggle language"
      style={{
        fontWeight: "bold",
        fontSize: "12px",
        fontFamily: "'Inter', sans-serif",
        ...style
      }}
    >
      {language.toUpperCase()}
    </button>
  );
}
