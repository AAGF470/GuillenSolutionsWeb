import { createContext, useCallback, useContext, useEffect, useState } from 'react'

// ---------------------------------------------------------------------------
// i18n — a tiny bilingual (English / Español) layer.
//
//  • LanguageProvider auto-detects the visitor's browser language on first
//    visit (Spanish browsers land in Spanish), remembers their explicit choice
//    in localStorage, and keeps <html lang> in sync for accessibility + SEO.
//  • useLang()  → { lang, setLang, toggle } for the toggle control.
//  • useT()     → t(en, es): pick the current-language string inline, falling
//    back to English wherever a Spanish string isn't provided yet.
//
// Page/data content lives in ../content.js (useContent), which merges the
// English source (data.js) with Spanish overrides (content.es.js) the same
// fallback way — so nothing ever renders blank if a translation is missing.
// ---------------------------------------------------------------------------

const KEY = 'gs-lang'
const LangContext = createContext({ lang: 'en', setLang: () => {}, toggle: () => {} })

// First-visit language: an explicit saved choice wins; otherwise follow the
// browser. SSR/prerender has no window, so default to English there.
function detectInitial() {
  if (typeof window === 'undefined') return 'en'
  try {
    const saved = window.localStorage.getItem(KEY)
    if (saved === 'en' || saved === 'es') return saved
  } catch { /* storage blocked — fall through to browser detection */ }
  const nav = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase()
  return nav.startsWith('es') ? 'es' : 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitial)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback(next => {
    setLangState(next)
    try { window.localStorage.setItem(KEY, next) } catch { /* ignore */ }
  }, [])

  const toggle = useCallback(() => {
    setLangState(prev => {
      const next = prev === 'es' ? 'en' : 'es'
      try { window.localStorage.setItem(KEY, next) } catch { /* ignore */ }
      return next
    })
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

// t('English', 'Español') — returns the string for the active language, falling
// back to the English one when a Spanish translation isn't supplied.
export function useT() {
  const { lang } = useContext(LangContext)
  return useCallback((en, es) => (lang === 'es' && es != null ? es : en), [lang])
}
