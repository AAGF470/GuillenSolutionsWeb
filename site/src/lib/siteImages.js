// ---------------------------------------------------------------------------
// siteImages — fetch the CMS `siteImages` global (keyed image slots) and
// return { [slot]: url }. Coded pages read their image placeholders from
// these slots, so uploading + keying an image in the CMS fills the slot on
// the live site — no code, no paths. Empty slots keep their placeholders
// (which display the slot id, so it's obvious what to type in the CMS).
// ---------------------------------------------------------------------------
import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_CMS_URL

export function useSiteImages() {
  const [images, setImages] = useState({})
  useEffect(() => {
    let alive = true
    fetch(`${API}/api/globals/siteImages?depth=1`)
      .then(r => r.json())
      .then(d => {
        if (!alive) return
        const map = {}
        for (const item of d?.items || []) {
          const url = item.image?.sizes?.hero?.url || item.image?.url
          if (item.slot && url) map[item.slot.trim()] = url
        }
        setImages(map)
      })
      .catch(() => {})
    return () => { alive = false }
  }, [])
  return images
}
