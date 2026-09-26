<template>
  <Teleport to="body">
    <div v-if="!isMobile" ref="cursorRef" class="target-cursor-wrapper">
      <div ref="dotRef" class="target-cursor-dot" :style="{ backgroundColor: cursorColor }"></div>
      <div class="target-cursor-corner corner-tl" :style="{ borderColor: cursorColor }"></div>
      <div class="target-cursor-corner corner-tr" :style="{ borderColor: cursorColor }"></div>
      <div class="target-cursor-corner corner-br" :style="{ borderColor: cursorColor }"></div>
      <div class="target-cursor-corner corner-bl" :style="{ borderColor: cursorColor }"></div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'

interface Props {
  targetSelector?: string
  spinDuration?: number
  hideDefaultCursor?: boolean
  hoverDuration?: number
  parallaxOn?: boolean
  cursorColor?: string
  cursorColorOnTarget?: string
}

const props = withDefaults(defineProps<Props>(), {
  targetSelector: '.cursor-target',
  spinDuration: 2,
  hideDefaultCursor: true,
  hoverDuration: 0.2,
  parallaxOn: true,
  cursorColor: '#ffffff',
  cursorColorOnTarget: undefined
})

const cursorRef = ref<HTMLElement | null>(null)
const dotRef = ref<HTMLElement | null>(null)
const cornersRef = ref<NodeListOf<HTMLElement> | null>(null)
const spinTl = ref<gsap.core.Timeline | null>(null)
const containingBlockRef = ref<Element | null>(null)

const isActiveRef = ref(false)
const targetCornerPositionsRef = ref<{ x: number; y: number }[] | null>(null)
const tickerFnRef = ref<(() => void) | null>(null)
const activeStrengthRef = ref({ current: 0 })

const constants = {
  borderWidth: 3,
  cornerSize: 12
}

const isMobile = computed(() => {
  if (typeof window === 'undefined') return true
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0
  const isSmallScreen = window.innerWidth <= 768
  const userAgent = navigator.userAgent || (navigator as any).vendor || (window as any).opera
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
  const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase())
  return (hasTouchScreen && isSmallScreen) || isMobileUserAgent
})

const getContainingBlock = (element: Element | null): Element | null => {
  let node = element?.parentElement
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node)
    if (
      style.transform !== 'none' ||
      style.perspective !== 'none' ||
      style.filter !== 'none' ||
      style.willChange.includes('transform') ||
      style.willChange.includes('perspective') ||
      style.willChange.includes('filter') ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node
    }
    node = node.parentElement
  }
  return null
}

const getContainingBlockOffset = (block: Element | null): { x: number; y: number } => {
  if (!block) return { x: 0, y: 0 }
  const rect = block.getBoundingClientRect()
  return { x: rect.left + (block as HTMLElement).clientLeft, y: rect.top + (block as HTMLElement).clientTop }
}

const moveCursor = (x: number, y: number) => {
  if (!cursorRef.value) return
  const { x: offsetX, y: offsetY } = getContainingBlockOffset(containingBlockRef.value)
  gsap.to(cursorRef.value, {
    x: x - offsetX,
    y: y - offsetY,
    duration: 0.1,
    ease: 'power3.out'
  })
}

onMounted(() => {
  if (isMobile.value || !cursorRef.value) return

  const originalCursor = document.body.style.cursor
  if (props.hideDefaultCursor) {
    document.body.style.cursor = 'none'
  }

  const cursor = cursorRef.value
  cornersRef.value = cursor.querySelectorAll('.target-cursor-corner')

  containingBlockRef.value = getContainingBlock(cursor)
  const getOffset = () => getContainingBlockOffset(containingBlockRef.value)

  let activeTarget: HTMLElement | null = null
  let currentLeaveHandler: (() => void) | null = null
  let resumeTimeout: ReturnType<typeof setTimeout> | null = null

  const cleanupTarget = (target: HTMLElement) => {
    if (currentLeaveHandler) {
      target.removeEventListener('mouseleave', currentLeaveHandler)
    }
    currentLeaveHandler = null
  }

  const initialOffset = getOffset()
  gsap.set(cursor, {
    xPercent: -50,
    yPercent: -50,
    x: window.innerWidth / 2 - initialOffset.x,
    y: window.innerHeight / 2 - initialOffset.y
  })

  const createSpinTimeline = () => {
    if (spinTl.value) {
      spinTl.value.kill()
    }
    spinTl.value = gsap
      .timeline({ repeat: -1 })
      .to(cursor, { rotation: '+=360', duration: props.spinDuration, ease: 'none' })
  }

  createSpinTimeline()

  const tickerFn = () => {
    if (!targetCornerPositionsRef.value || !cursorRef.value || !cornersRef.value) {
      return
    }

    const strength = activeStrengthRef.value.current
    if (strength === 0) return

    const cursorX = gsap.getProperty(cursorRef.value, 'x') as number
    const cursorY = gsap.getProperty(cursorRef.value, 'y') as number

    const corners = Array.from(cornersRef.value)
    corners.forEach((corner, i) => {
      const currentX = gsap.getProperty(corner, 'x') as number
      const currentY = gsap.getProperty(corner, 'y') as number

      const targetX = targetCornerPositionsRef.value![i].x - cursorX
      const targetY = targetCornerPositionsRef.value![i].y - cursorY

      const finalX = currentX + (targetX - currentX) * strength
      const finalY = currentY + (targetY - currentY) * strength

      const duration = strength >= 0.99 ? (props.parallaxOn ? 0.2 : 0) : 0.05

      gsap.to(corner, {
        x: finalX,
        y: finalY,
        duration: duration,
        ease: duration === 0 ? 'none' : 'power1.out',
        overwrite: 'auto'
      })
    })
  }

  tickerFnRef.value = tickerFn

  const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY)
  window.addEventListener('mousemove', moveHandler)

  const scrollHandler = () => {
    if (!activeTarget || !cursorRef.value) return
    const { x: offsetX, y: offsetY } = getOffset()
    const mouseX = (gsap.getProperty(cursorRef.value, 'x') as number) + offsetX
    const mouseY = (gsap.getProperty(cursorRef.value, 'y') as number) + offsetY
    const elementUnderMouse = document.elementFromPoint(mouseX, mouseY)
    const isStillOverTarget =
      elementUnderMouse &&
      (elementUnderMouse === activeTarget || (elementUnderMouse as HTMLElement).closest(props.targetSelector) === activeTarget)
    if (!isStillOverTarget) {
      if (currentLeaveHandler) {
        currentLeaveHandler()
      }
    }
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })

  const mouseDownHandler = () => {
    if (!dotRef.value) return
    gsap.to(dotRef.value, { scale: 0.7, duration: 0.3 })
    gsap.to(cursorRef.value, { scale: 0.9, duration: 0.2 })
  }

  const mouseUpHandler = () => {
    if (!dotRef.value) return
    gsap.to(dotRef.value, { scale: 1, duration: 0.3 })
    gsap.to(cursorRef.value, { scale: 1, duration: 0.2 })
  }

  window.addEventListener('mousedown', mouseDownHandler)
  window.addEventListener('mouseup', mouseUpHandler)

  const enterHandler = (e: MouseEvent) => {
    const directTarget = e.target as HTMLElement
    const allTargets: HTMLElement[] = []
    let current: HTMLElement | null = directTarget
    while (current && current !== document.body) {
      if (current.matches(props.targetSelector)) {
        allTargets.push(current)
      }
      current = current.parentElement
    }
    const target = allTargets[0] || null
    if (!target || !cursorRef.value || !cornersRef.value) return
    if (activeTarget === target) return
    if (activeTarget) {
      cleanupTarget(activeTarget)
    }
    if (resumeTimeout) {
      clearTimeout(resumeTimeout)
      resumeTimeout = null
    }

    activeTarget = target
    const corners = Array.from(cornersRef.value)
    corners.forEach(corner => gsap.killTweensOf(corner, 'x,y'))

    gsap.killTweensOf(cursorRef.value, 'rotation')
    spinTl.value?.pause()
    gsap.set(cursorRef.value, { rotation: 0 })

    if (props.cursorColorOnTarget) {
      gsap.to(corners, {
        borderColor: props.cursorColorOnTarget,
        duration: 0.15,
        ease: 'power2.out'
      })
      if (dotRef.value) {
        gsap.to(dotRef.value, {
          backgroundColor: props.cursorColorOnTarget,
          duration: 0.15,
          ease: 'power2.out'
        })
      }
    }

    const rect = target.getBoundingClientRect()
    const { borderWidth, cornerSize } = constants
    const { x: offsetX, y: offsetY } = getOffset()
    const cursorX = gsap.getProperty(cursorRef.value, 'x') as number
    const cursorY = gsap.getProperty(cursorRef.value, 'y') as number

    targetCornerPositionsRef.value = [
      { x: rect.left - borderWidth - offsetX, y: rect.top - borderWidth - offsetY },
      { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.top - borderWidth - offsetY },
      { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY },
      { x: rect.left - borderWidth - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY }
    ]

    isActiveRef.value = true
    gsap.ticker.add(tickerFnRef.value!)

    gsap.to(activeStrengthRef.value, {
      current: 1,
      duration: props.hoverDuration,
      ease: 'power2.out'
    })

    corners.forEach((corner, i) => {
      gsap.to(corner, {
        x: targetCornerPositionsRef.value![i].x - cursorX,
        y: targetCornerPositionsRef.value![i].y - cursorY,
        duration: 0.2,
        ease: 'power2.out'
      })
    })

    const leaveHandler = () => {
      gsap.ticker.remove(tickerFnRef.value!)

      isActiveRef.value = false
      targetCornerPositionsRef.value = null
      gsap.set(activeStrengthRef.value, { current: 0, overwrite: true })
      activeTarget = null

      if (props.cursorColorOnTarget && cornersRef.value) {
        gsap.to(Array.from(cornersRef.value), {
          borderColor: props.cursorColor,
          duration: 0.15,
          ease: 'power2.out'
        })
        if (dotRef.value) {
          gsap.to(dotRef.value, {
            backgroundColor: props.cursorColor,
            duration: 0.15,
            ease: 'power2.out'
          })
        }
      }

      if (cornersRef.value) {
        const corners = Array.from(cornersRef.value)
        gsap.killTweensOf(corners, 'x,y')
        const { cornerSize } = constants
        const positions = [
          { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: cornerSize * 0.5 },
          { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
        ]
        const tl = gsap.timeline()
        corners.forEach((corner, index) => {
          tl.to(
            corner,
            {
              x: positions[index].x,
              y: positions[index].y,
              duration: 0.3,
              ease: 'power3.out'
            },
            0
          )
        })
      }

      resumeTimeout = setTimeout(() => {
        if (!activeTarget && cursorRef.value && spinTl.value) {
          const currentRotation = gsap.getProperty(cursorRef.value, 'rotation') as number
          const normalizedRotation = currentRotation % 360
          spinTl.value.kill()
          spinTl.value = gsap
            .timeline({ repeat: -1 })
            .to(cursorRef.value, { rotation: '+=360', duration: props.spinDuration, ease: 'none' })
          gsap.to(cursorRef.value, {
            rotation: normalizedRotation + 360,
            duration: props.spinDuration * (1 - normalizedRotation / 360),
            ease: 'none',
            onComplete: () => {
              spinTl.value?.restart()
            }
          })
        }
        resumeTimeout = null
      }, 50)

      cleanupTarget(target)
    }

    currentLeaveHandler = leaveHandler
    target.addEventListener('mouseleave', leaveHandler)
  }

  window.addEventListener('mouseover', enterHandler, { passive: true })

  const resizeHandler = () => {
    containingBlockRef.value = getContainingBlock(cursor)
  }
  window.addEventListener('resize', resizeHandler)

  onUnmounted(() => {
    if (tickerFnRef.value) {
      gsap.ticker.remove(tickerFnRef.value)
    }

    window.removeEventListener('mousemove', moveHandler)
    window.removeEventListener('mouseover', enterHandler)
    window.removeEventListener('scroll', scrollHandler)
    window.removeEventListener('resize', resizeHandler)
    window.removeEventListener('mousedown', mouseDownHandler)
    window.removeEventListener('mouseup', mouseUpHandler)

    if (activeTarget) {
      cleanupTarget(activeTarget)
    }

    spinTl.value?.kill()
    document.body.style.cursor = originalCursor

    isActiveRef.value = false
    targetCornerPositionsRef.value = null
    activeStrengthRef.value.current = 0
  })
})
</script>

<style>
.target-cursor-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 2147483647;
  mix-blend-mode: difference;
  transform: translate(-50%, -50%);
}

.target-cursor-dot {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 4px;
  height: 4px;
  background: #fff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  will-change: transform;
}

.target-cursor-corner {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 12px;
  height: 12px;
  border: 3px solid #fff;
  will-change: transform;
}

.corner-tl {
  transform: translate(-150%, -150%);
  border-right: none;
  border-bottom: none;
}

.corner-tr {
  transform: translate(50%, -150%);
  border-left: none;
  border-bottom: none;
}

.corner-br {
  transform: translate(50%, 50%);
  border-left: none;
  border-top: none;
}

.corner-bl {
  transform: translate(-150%, 50%);
  border-right: none;
  border-top: none;
}
</style>
