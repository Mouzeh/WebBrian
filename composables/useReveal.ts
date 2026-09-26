// composables/useReveal.ts
// Activa animaciones .reveal cuando los elementos entran al viewport

export function useReveal() {
  const initReveal = () => {
    if (import.meta.server) return

    const items = document.querySelectorAll('.reveal:not(.visible)')
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    )

    items.forEach((el) => observer.observe(el))
  }

  return { initReveal }
}
