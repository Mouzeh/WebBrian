// plugins/cursor.client.ts
// Solo corre en el cliente (no en SSR)

export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  let mx = 0, my = 0, rx = 0, ry = 0
  let rafId: number

  const cursor = document.createElement('div')
  const ring   = document.createElement('div')
  cursor.className = 'cursor'
  ring.className   = 'cursor-ring'
  document.body.appendChild(cursor)
  document.body.appendChild(ring)

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX
    my = e.clientY
    cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`
  })

  const animateRing = () => {
    rx += (mx - rx) * 0.12
    ry += (my - ry) * 0.12
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
    rafId = requestAnimationFrame(animateRing)
  }
  animateRing()

  // Hover en elementos interactivos
  document.addEventListener('mouseover', (e) => {
    const t = e.target as HTMLElement
    if (t.closest('a, button, input, textarea, select, .proyecto-card, [data-cursor]')) {
      cursor.classList.add('hover')
      ring.classList.add('hover')
    }
  })
  document.addEventListener('mouseout', (e) => {
    const t = e.target as HTMLElement
    if (t.closest('a, button, input, textarea, select, .proyecto-card, [data-cursor]')) {
      cursor.classList.remove('hover')
      ring.classList.remove('hover')
    }
  })
})
