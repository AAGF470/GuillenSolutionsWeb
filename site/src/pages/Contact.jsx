import { HeroSection, ContactMethods, Reveal } from '@aagf470/ui'
import Seo from '../components/Seo.jsx'
import SocialLinks from '../components/SocialLinks.jsx'
import InquiryForm from '../components/InquiryForm.jsx'
import { CONTACT } from '../data.js'
import { useT } from '../i18n.jsx'
import './Contact.css'

// ---------------------------------------------------------------------------
// Contact — the plain "reach a human" page. Text-first: a Google Voice text
// line and WhatsApp (both text only, no calls), plus email — rendered with the
// shared ContactMethods section — and a short message form that posts to the
// CMS inbox (same InquiryForm as the tools).
// ---------------------------------------------------------------------------

export default function Contact() {
  const t = useT()
  const textOnly = t('Text only for new inquiries', 'Solo texto para consultas nuevas')
  const methods = [
    {
      icon: 'message', name: t('Text line', 'Línea de texto'),
      value: CONTACT.textLine.display, href: `sms:${CONTACT.textLine.sms}`,
      note: `${textOnly} · Google Voice`, cta: t('Send a text', 'Enviar un texto'),
    },
    {
      icon: 'whatsapp', name: 'WhatsApp',
      value: CONTACT.whatsapp.display, href: CONTACT.whatsapp.link,
      note: textOnly, cta: t('Message on WhatsApp', 'Escribir por WhatsApp'), external: true,
    },
    {
      icon: 'mail', name: t('Email', 'Correo'),
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
          'Reach Guillen Solutions — text us, message us on WhatsApp, or email (new inquiries by text; current clients get calls and visits). Based in Boston and North Houston, remote everywhere else. English or Español.',
          'Contacta a Guillen Solutions — envíanos un texto, escríbenos por WhatsApp o por correo (consultas nuevas por texto; los clientes actuales reciben llamadas y visitas). Con base en Boston y el norte de Houston, todo lo demás remoto. En inglés o español.',
        )}
        path="/contact"
      />

      <HeroSection
        eyebrow={t('Contact', 'Contacto')}
        headline={t('Text us — we\'ll text right back.', 'Escríbenos — te respondemos enseguida.')}
        subtext={t(
          'The fastest way to reach us is a text or a message. Based in Boston and North Houston, remote everywhere else — in English or Español.',
          'La forma más rápida de contactarnos es un texto o un mensaje. Con base en Boston y el norte de Houston, todo lo demás remoto — en inglés o español.',
        )}
        size="compact"
        variant="alt"
        ctas={[]}
      />

      <Reveal>
      <ContactMethods
        methods={methods}
        columns={3}
        variant="default"
        callout={t(
          'New inquiries are text only — it keeps everything clear and in writing, in either language. Current clients get more than text: calls, and in-person visits around Boston and North Houston, are part of working together.',
          'Las consultas nuevas son solo por texto — mantiene todo claro y por escrito, en cualquiera de los dos idiomas. Los clientes actuales reciben más que texto: llamadas, y visitas en persona por Boston y el norte de Houston, son parte de trabajar juntos.',
        )}
      />
      </Reveal>

      {/* Official profiles — same URLs as ORG.sameAs */}
      <div className="section-container gs-contact-socials">
        <SocialLinks withLabel />
      </div>

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
