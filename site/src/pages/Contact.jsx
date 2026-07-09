import { HeroSection } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import { CONTACT } from '../data.js'
import { useT } from '../i18n.jsx'
import './Contact.css'

// ---------------------------------------------------------------------------
// Contact — the plain "reach a human" page. Text-first: a Google Voice text
// line and WhatsApp (both text only, no calls), plus email and a short message
// form that posts to the CMS inbox (same InquiryForm as the tools).
// ---------------------------------------------------------------------------

const SmsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 21l1.9-5.6A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
  </svg>
)
const WhatsappIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.9-.9L3 21l1.9-5.6A8.38 8.38 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5Z" />
    <path d="M8.5 9.5c0 3 2 5 5 5.5l1-1.4 1.8.7c.2 1.3-1 2-2.3 1.8C11 15.6 8 12.6 7.7 9.7 7.6 8.4 8.2 7.2 9.5 7.4l.7 1.8-1.4 1Z" />
  </svg>
)
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

export default function Contact() {
  const t = useT()
  const textOnly = t('Text only — no calls', 'Solo texto — sin llamadas')
  const methods = [
    {
      icon: <SmsIcon />, name: t('Text line', 'Línea de texto'),
      value: CONTACT.textLine.display, href: `sms:${CONTACT.textLine.sms}`,
      note: `${textOnly} · ${t('Google Voice', 'Google Voice')}`, cta: t('Send a text', 'Enviar un texto'),
    },
    {
      icon: <WhatsappIcon />, name: 'WhatsApp',
      value: CONTACT.whatsapp.display, href: CONTACT.whatsapp.link,
      note: textOnly, cta: t('Message on WhatsApp', 'Escribir por WhatsApp'), external: true,
    },
    {
      icon: <MailIcon />, name: t('Email', 'Correo'),
      // Break opportunity after "@" so the address wraps cleanly (never mid-word).
      value: (() => { const [u, d] = CONTACT.email.split('@'); return <>{u}@<wbr />{d}</> })(),
      href: `mailto:${CONTACT.email}`,
      note: t('We reply within a business day', 'Respondemos dentro de un día hábil'), cta: t('Send an email', 'Enviar un correo'),
    },
  ]

  return (
    <>
      <Seo
        title={t('Contact', 'Contacto')}
        description={t(
          'Reach Guillen Solutions — text us (text only, no calls), message us on WhatsApp, or email. Boston in person, everywhere else remote. English or Español.',
          'Contacta a Guillen Solutions — envíanos un texto (solo texto, sin llamadas), escríbenos por WhatsApp o por correo. Boston en persona, todo lo demás remoto. En inglés o español.',
        )}
        path="/contact"
      />

      <HeroSection
        eyebrow={t('Contact', 'Contacto')}
        headline={t('Text us — we\'ll text right back.', 'Escríbenos — te respondemos enseguida.')}
        subtext={t(
          'The fastest way to reach us is a text or a message. Boston in person, everywhere else remote — in English or Español.',
          'La forma más rápida de contactarnos es un texto o un mensaje. Boston en persona, todo lo demás remoto — en inglés o español.',
        )}
        size="compact"
        variant="alt"
        ctas={[]}
      />

      <section className="section section--default gs-seam-bottom">
        <div className="section-container">
          <div className="gs-contact">
            {methods.map(m => (
              <a
                key={m.name}
                className="gs-contact__card"
                href={m.href}
                {...(m.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="gs-contact__icon" aria-hidden="true">{m.icon}</span>
                <span className="gs-contact__name">{m.name}</span>
                <span className="gs-contact__value">{m.value}</span>
                <span className="gs-contact__note">{m.note}</span>
                <span className="gs-contact__cta">{m.cta} →</span>
              </a>
            ))}
          </div>
          <p className="gs-contact__callout">
            {t(
              'Both phone lines are text only — we don\'t take voice calls. It keeps things clear, in writing, and easy to pick up in two languages.',
              'Ambas líneas telefónicas son solo texto — no tomamos llamadas de voz. Mantiene todo claro, por escrito y fácil de atender en dos idiomas.',
            )}
          </p>
        </div>
      </section>

      <section className="section section--alt gs-seam-top">
        <div className="section-container gs-contact__form-wrap">
          <p className="section-eyebrow">{t('Or send a message', 'O envía un mensaje')}</p>
          <h2 className="section-title">{t('Tell us what you need', 'Cuéntanos qué necesitas')}</h2>
          <p className="section-sub">
            {t(
              'A sentence or two about your business is plenty to start — we\'ll reply with next steps. Nothing is charged, and every number is confirmed in writing first.',
              'Una o dos frases sobre tu negocio bastan para empezar — te respondemos con los siguientes pasos. No se cobra nada, y cada número se confirma primero por escrito.',
            )}
          </p>
          <InquiryForm source="contact" summary={t('Contact form message', 'Mensaje del formulario de contacto')} />
        </div>
      </section>
    </>
  )
}
