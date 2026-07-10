// ---------------------------------------------------------------------------
// marketImages — fetch the CMS `markets` global (one photo per market) and
// return { [marketId]: imageUrl }. Coded pages (Home markets grid, the local
// guide photo rails) merge these in, so uploading a photo in the CMS makes it
// appear on the site — no image paths in code, placeholders until authored.
// ---------------------------------------------------------------------------
import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_CMS_URL

export function useMarketImages() {
  const [images, setImages] = useState({})
  useEffect(() => {
    let alive = true
    fetch(`${API}/api/globals/markets?depth=1`)
      .then(r => r.json())
      .then(d => {
        if (!alive) return
        const map = {}
        for (const item of d?.items || []) {
          const url = item.image?.sizes?.hero?.url || item.image?.url
          if (item.marketId && url) map[item.marketId] = url
        }
        setImages(map)
      })
      .catch(() => {})
    return () => { alive = false }
  }, [])
  return images
}
