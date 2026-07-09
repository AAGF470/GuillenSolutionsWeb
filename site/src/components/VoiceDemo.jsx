import { useEffect, useState } from 'react'
import { VoiceSample } from '@aagf470/ui'
import { useT } from '../i18n.jsx'

// ---------------------------------------------------------------------------
// VoiceDemo — pricing-page AI phone-menu preview. Fetches the CMS `voiceDemo`
// global for its clips (label + uploaded audio) and renders the shared
// VoiceSample player. Until clips are authored in the CMS, it shows a
// bilingual "sample coming soon" placeholder so the section is never empty.
// This is what makes "upload a clip → it plays" work on a code-rendered page.
// ---------------------------------------------------------------------------

const API = import.meta.env.VITE_CMS_URL

export default function VoiceDemo() {
  const t = useT()
  const [clips, setClips] = useState(null) // null = loading

  useEffect(() => {
    let alive = true
    fetch(`${API}/api/globals/voiceDemo?depth=1`)
      .then(r => r.json())
      .then(d => {
        if (!alive) return
        const list = (d?.clips || [])
          .map(c => ({ label: c.label, sub: c.sub || undefined, src: c.audio?.url ?? null }))
          .filter(c => c.label)
        setClips(list)
      })
      .catch(() => { if (alive) setClips([]) })
    return () => { alive = false }
  }, [])

  // Placeholder structure (bilingual) shown while loading or before any clip
  // is uploaded in the CMS — each renders as "sample coming soon".
  const placeholder = [
    { label: t('Main greeting', 'Saludo principal'), sub: t('“Thank you for calling…”', '“Gracias por llamar…”') },
    { label: t('Press 1 — Sales', 'Marca 1 — Ventas') },
    { label: t('Press 2 — Support', 'Marca 2 — Soporte') },
    { label: t('After-hours message', 'Mensaje fuera de horario') },
  ]
  const finalClips = clips && clips.length ? clips : placeholder

  return (
    <VoiceSample
      eyebrow={t('The AI phone menu, out loud', 'El menú telefónico con IA, en voz alta')}
      headline={t('Hear what your callers would hear', 'Escucha lo que escucharían quienes llaman')}
      subtext={t(
        'A natural AI voice answers your line and routes every call. This is the actual quality that greets your customers — tap a sample to listen.',
        'Una voz de IA con sonido natural contesta tu línea y dirige cada llamada. Esta es la calidad real que recibe a tus clientes — toca una muestra para escuchar.',
      )}
      callerName={t('AI phone menu · demo', 'Menú telefónico con IA · demo')}
      clips={finalClips}
      variant="default"
    />
  )
}
