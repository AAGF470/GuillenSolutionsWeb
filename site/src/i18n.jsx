import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// ---------------------------------------------------------------------------
// i18n — bilingual (English / Español) layer.
//
// THE URL IS THE SOURCE OF TRUTH: "/es" and "/es/*" are Spanish, everything
// else is English. That's what makes the Spanish site indexable — each language
// has its own real URL with prerendered content and reciprocal hreflang, so the
// prerendered HTML, the hreflang cluster, and what a visitor sees can never
// disagree. (This replaced a localStorage/browser-detection toggle that
// rendered Spanish over the *English* URL — which meant Google had nothing
// Spanish to index, and the site could not rank for a single Spanish query.)
//
// Deliberately NO automatic browser-language redirect: Google advises against
// it and it can stop either version from being crawled. Language is chosen by
// the visitor (the EN/ES toggle) or by Google via hreflang.
//
//  • useLang() → { lang, setLang, toggle } — the toggle navigates to the
//    counterpart URL, preserving the page and hash.
//  • useT()    → t(en, es) picks the current-language string inline.
//  • langPath(to, lang) → prefix an internal path for a language.
//
// Page/data content lives in ../content.js (useContent), which merges the
// English source (data.js) with the Spanish overrides (content.es.js).
// ---------------------------------------------------------------------------

const LangContext = createContext({ lang: 'en', setLang: () => {}, toggle: () => {} })

// '/es' | '/es/...' → Spanish.
export function langFromPath(pathname) {
  return pathname === '/es' || pathname.startsWith('/es/') ? 'es' : 'en'
}

// Strip the /es prefix → the English-equivalent path.
export function stripLang(pathname) {
  if (pathname === '/es' || pathname === '/es/') return '/'
  if (pathname.startsWith('/es/')) return pathname.slice(3)
  return pathname
}

// Map an internal path into `lang`. Safe on an already-prefixed path.
export function langPath(to, lang) {
  if (typeof to !== 'string' || !to.startsWith('/')) return to
  const bare = stripLang(to)
  if (lang !== 'es') return bare
  return bare === '/' ? '/es/' : `/es${bare}`
}

export function LanguageProvider({ children }) {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()
  const lang = langFromPath(pathname)

  // Keep <html lang> honest for accessibility + search.
  useEffect(() => { document.documentElement.lang = lang }, [lang])

  const setLang = useCallback((next) => {
    if (next === lang) return
    navigate(`${langPath(pathname, next)}${hash || ''}`)
  }, [lang, pathname, hash, navigate])

  const toggle = useCallback(() => setLang(lang === 'es' ? 'en' : 'es'), [lang, setLang])

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, setLang, toggle])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

// t('English', 'Español') — falls back to English when no translation is given.
export function useT() {
  const { lang } = useContext(LangContext)
  return useCallback((en, es) => (lang === 'es' && es != null ? es : en), [lang])
}

// Hook form of langPath — for hrefs handed to UI-library components (which
// render plain <a>, bypassing LangLink). Usage: const lp = useLangPath().
export function useLangPath() {
  const { lang } = useContext(LangContext)
  return useCallback((to) => langPath(to, lang), [lang])
}
