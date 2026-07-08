import { useEffect, useRef, useState } from 'react'

/**
 * Reveal — tiny, dependency-free scroll-reveal wrapper.
 *
 * Renders a <div class="reveal"> that starts slightly translated-down and
 * transparent, then gets `.is-visible` (which theme.css transitions) the first
 * time it scrolls into view. Reveals once, then disconnects the observer.
 *
 * Safe by default: if reduced-motion is requested, or IntersectionObserver
 * isn't available (SSR / prerender), it renders visible immediately so content
 * is never stuck hidden.
 */
export default function Reveal({ children, delay = 0, className = '', ...rest }) {
  // Decide the initial state at mount so prerender/SSR emits visible markup.
  const shouldAnimate =
    typeof window !== 'undefined' &&
    typeof IntersectionObserver !== 'undefined' &&
    !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const ref = useRef(null)
  const [visible, setVisible] = useState(!shouldAnimate)

  useEffect(() => {
    if (!shouldAnimate) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldAnimate])

  return (
    <div
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}
