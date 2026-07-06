// ---------------------------------------------------------------------------
// content.js — the bilingual content resolver.
//
// data.js stays the single English source of truth (also consumed by the
// Node prerender + JSON-LD schema, which stay English-primary). content.es.js
// holds the hand-written Spanish overrides. useContent() returns the English
// base merged with the Spanish overrides for the active language — so any key
// that isn't translated yet transparently falls back to English rather than
// rendering blank.
// ---------------------------------------------------------------------------
import * as EN_DATA from './data.js'
import { PLAN_PAGES } from './planPages.js'
import * as ES_DATA from './content.es.js'
import { PLAN_PAGES as PLAN_PAGES_ES } from './content.plans.es.js'
import { useLang } from './i18n.jsx'

// English base = everything data.js exports, plus the plan-page config.
const EN = { ...EN_DATA, PLAN_PAGES }
// Spanish overrides, assembled from the data + plan-page translations.
const ES = { ...ES_DATA, PLAN_PAGES: PLAN_PAGES_ES }

export function useContent() {
  const { lang } = useLang()
  if (lang !== 'es') return EN
  // Spanish overrides on top of the English base; anything ES omits falls back.
  return { ...EN, ...ES }
}
