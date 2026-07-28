import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom'
import { useLang, langPath } from '../i18n.jsx'

// ---------------------------------------------------------------------------
// LangLink — drop-in Link/NavLink that keeps the visitor inside their language.
//
// Pages author internal paths in their ENGLISH form (`to="/pricing/"`). On a
// Spanish page (/es/*) these resolve to `/es/pricing/`, so a Spanish visitor
// never gets bounced into English by clicking the nav. External links, hashes,
// mailto/tel, and non-string `to` values pass through untouched.
// ---------------------------------------------------------------------------
const localize = (to, lang) =>
  typeof to === 'string' && to.startsWith('/') ? langPath(to, lang) : to

export function Link({ to, ...rest }) {
  const { lang } = useLang()
  return <RouterLink to={localize(to, lang)} {...rest} />
}

export function NavLink({ to, ...rest }) {
  const { lang } = useLang()
  return <RouterNavLink to={localize(to, lang)} {...rest} />
}

export default Link
