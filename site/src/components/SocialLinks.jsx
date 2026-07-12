import { useT } from '../i18n.jsx'

// ---------------------------------------------------------------------------
// SocialLinks — icon links to the official profiles. Site-local SVGs (no
// library dependency); used in the footer and on the contact page. Keep the
// URLs in sync with ORG.sameAs in schema.js.
// ---------------------------------------------------------------------------

export const SOCIALS = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61591594841523',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3-.04-1.3-.12-2.45-.12-2.4 0-4.05 1.46-4.05 4.15v2.27H7.5V13h2.7v8h3.3z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/guillensolutions/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function SocialLinks({ withLabel = false }) {
  const t = useT()
  return (
    <div className="gs-socials">
      {withLabel && <span className="gs-socials__label">{t('Follow us', 'Síguenos')}</span>}
      {SOCIALS.map(s => (
        <a
          key={s.name}
          className="gs-socials__link"
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.name}
          title={s.name}
        >
          {s.icon}
        </a>
      ))}
    </div>
  )
}
