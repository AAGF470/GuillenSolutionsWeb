// ---------------------------------------------------------------------------
// inquiries — POST form submissions to the CMS's public `inquiries` collection.
// No mailto involved: the request lands in /admin (Inquiries), where it's
// read and answered. Returns { ok, error } — callers show a mailto fallback
// on failure so a network hiccup never eats a lead.
// ---------------------------------------------------------------------------
const API = import.meta.env.VITE_CMS_URL

export async function sendInquiry({ source, summary, details, name, email, business, message, website }) {
  try {
    const res = await fetch(`${API}/api/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source, summary, details,
        name: name || undefined,
        email,
        business: business || undefined,
        message: message || undefined,
        website: website || undefined, // honeypot — must be empty
      }),
    })
    if (!res.ok) {
      let msg = `Request failed (${res.status})`
      try { msg = (await res.json())?.errors?.[0]?.message || msg } catch { /* keep default */ }
      return { ok: false, error: msg }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error — please try again.' }
  }
}
