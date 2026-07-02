import { useParams, Link } from 'react-router-dom'
import PayloadPage from '../PayloadPage.jsx'

// Any page authored in the CMS is live here at its slug (e.g. /services).
// Static routes (/, /work, /components, /about) still win — this only catches
// slugs the app doesn't hard-code. Unknown slugs fall back to a small 404.
function NotFound() {
  return (
    <section style={{ maxWidth: 640, margin: '0 auto', padding: '8rem 1.5rem', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '0.5rem' }}>Page not found</h1>
      <p style={{ opacity: 0.7, marginBottom: '1.5rem' }}>
        This page doesn’t exist (yet). It may not have been published in the CMS.
      </p>
      <Link to="/" className="gs-nav__cta">Back home</Link>
    </section>
  )
}

export default function CmsPage() {
  const { slug } = useParams()
  return <PayloadPage slug={slug} fallback={<NotFound />} />
}
