"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_COOKIE,
  type SiteLanguage,
  htmlLang,
} from "@/app/lib/site-language";

type LanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function persistLanguage(language: SiteLanguage) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LANGUAGE_COOKIE, language);
  window.document.cookie = `${LANGUAGE_COOKIE}=${language}; path=/; max-age=31536000; samesite=lax`;
  window.document.documentElement.lang = htmlLang(language);
}

export function LanguageProvider({
  children,
  initialLanguage = DEFAULT_LANGUAGE,
}: {
  children: React.ReactNode;
  initialLanguage?: SiteLanguage;
}) {
  const [language, setLanguageState] = useState<SiteLanguage>(initialLanguage);

  const value = useMemo<LanguageContextValue>(() => {
    function setLanguage(nextLanguage: SiteLanguage) {
      setLanguageState(nextLanguage);
      persistLanguage(nextLanguage);
    }

    function toggleLanguage() {
      setLanguage(language === "en" ? "zh" : "en");
    }

    return {
      language,
      setLanguage,
      toggleLanguage,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useSiteLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useSiteLanguage must be used within LanguageProvider");
  }

  return context;
}
