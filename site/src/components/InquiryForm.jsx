import { useState } from 'react'
import { sendInquiry } from '../lib/inquiries'
import { CONTACT_EMAIL } from '../data'
import './InquiryForm.css'

// ---------------------------------------------------------------------------
// InquiryForm — the reusable "send this from the site" form. No mailto: it
// POSTs to the CMS inquiries collection and shows an inline confirmation.
// A mailto link is kept ONLY as the failure fallback, so a network problem
// never loses a lead.
//
// Props:
//   source   'plan-finder' | 'configurator' | 'estimator' | 'contact'
//   summary  string  — one-line description of what they're requesting
//   details  object  — full selection payload (stored as JSON in the CMS)
//   cta      string  — button label (default "Send request")
//   compact  boolean — single-row name/email layout (for sidebars)
// ---------------------------------------------------------------------------

export default function InquiryForm({ source, summary, details, cta = 'Send request', compact = false }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [trap, setTrap] = useState('') // honeypot — humans never see it
  const [state, setState] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    if (state === 'sending') return
    setState('sending')
    const res = await sendInquiry({ source, summary, details, name, email, message, website: trap })
    if (res.ok) { setState('sent') } else { setError(res.error); setState('error') }
  }

  if (state === 'sent') {
    return (
      <div className="gs-inq gs-inq--sent" role="status">
        <p className="gs-inq__sent-title">Request sent ✓</p>
        <p className="gs-inq__sent-body">
          We'll reply to <strong>{email}</strong> — usually within a business day.
          Nothing is charged; every number is confirmed in writing first.
        </p>
      </div>
    )
  }

  const mailtoFallback = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(summary || 'Website request')}` +
    `&body=${encodeURIComponent((message ? message + '\n\n' : '') + (summary || ''))}`

  return (
    <form className={`gs-inq${compact ? ' gs-inq--compact' : ''}`} onSubmit={submit}>
      <div className="gs-inq__row">
        <input
          type="text" placeholder="Your name (optional)" autoComplete="name"
          value={name} onChange={e => setName(e.target.value)}
        />
        <input
          type="email" placeholder="you@email.com" required autoComplete="email"
          value={email} onChange={e => setEmail(e.target.value)}
        />
      </div>
      {!compact && (
        <textarea
          placeholder="Anything we should know? (optional)"
          rows={3} value={message} onChange={e => setMessage(e.target.value)}
        />
      )}
      {/* honeypot — hidden from people, tempting to bots */}
      <input
        className="gs-inq__hp" type="text" tabIndex={-1} autoComplete="off"
        aria-hidden="true" value={trap} onChange={e => setTrap(e.target.value)}
        placeholder="Website"
      />
      <button type="submit" className="gs-inq__send" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : cta}
      </button>
      {state === 'error' && (
        <p className="gs-inq__error">
          {error} — or <a href={mailtoFallback}>email us directly</a> instead.
        </p>
      )}
    </form>
  )
}
