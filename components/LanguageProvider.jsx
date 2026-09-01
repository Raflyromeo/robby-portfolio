"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children, defaultLanguage = "id" }) {
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-language");
    if (saved && saved !== defaultLanguage) {
      setLanguage(saved);
      document.cookie = `portfolio-language=${saved}; path=/; max-age=31536000`;
    }
  }, [defaultLanguage]);

  const toggleLanguage = () => {
    const newLang = language === "en" ? "id" : "en";
    setLanguage(newLang);
    localStorage.setItem("portfolio-language", newLang);
    document.cookie = `portfolio-language=${newLang}; path=/; max-age=31536000`;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
