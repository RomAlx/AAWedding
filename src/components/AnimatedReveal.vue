<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { nextTick, onMounted, onUnmounted, ref, useAttrs } from 'vue'
import { isMobileMotion, prefersReducedMotion } from '@/utils/motion'

export type RevealPreset =
  | 'rise'
  | 'slide-left'
  | 'slide-right'
  | 'pop'
  | 'drift'
  | 'fade'

const props = withDefaults(
  defineProps<{
    preset?: RevealPreset
    tag?: string
    duration?: number
  }>(),
  {
    preset: 'rise',
    tag: 'div',
    duration: 0.65,
  },
)

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const el = ref<HTMLElement | null>(null)

let trigger: ScrollTrigger | null = null
let tween: gsap.core.Tween | null = null

function playIfVisible() {
  if (!el.value || !tween) return
  const rect = el.value.getBoundingClientRect()
  const vh = window.innerHeight || 1
  // Учитываем низ страницы: элемент может так и не дойти до mid-viewport
  if (rect.top < vh * 0.98 && rect.bottom > 0) {
    tween.play()
  }
}

onMounted(async () => {
  if (!el.value) return

  if (prefersReducedMotion()) {
    gsap.set(el.value, { clearProps: 'all' })
    return
  }

  const mobile = isMobileMotion()
  const d = mobile ? 0.55 : 1

  const presets: Record<RevealPreset, gsap.TweenVars> = {
    rise: { opacity: 0, y: 28 * d },
    'slide-left': mobile
      ? { opacity: 0, y: 22 }
      : { opacity: 0, x: -32 },
    'slide-right': mobile
      ? { opacity: 0, y: 22 }
      : { opacity: 0, x: 32 },
    pop: { opacity: 0, scale: mobile ? 0.92 : 0.88 },
    drift: mobile
      ? { opacity: 0, y: 22 }
      : { opacity: 0, y: 28, rotate: -2 },
    fade: { opacity: 0 },
  }

  const from = presets[props.preset]
  const duration = mobile ? Math.min(props.duration, 0.55) : props.duration

  gsap.set(el.value, { ...from, force3D: true })

  tween = gsap.to(el.value, {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    duration,
    ease: 'power2.out',
    force3D: true,
    paused: true,
  })

  // top bottom-=20: срабатывает, как только элемент чуть входит в экран —
  // важно для футера у нижнего края страницы.
  trigger = ScrollTrigger.create({
    trigger: el.value,
    start: 'top bottom-=20',
    onEnter: () => tween?.play(),
    onEnterBack: () => tween?.play(),
    onLeaveBack: () => tween?.reverse(),
  })

  await nextTick()
  ScrollTrigger.refresh()
  playIfVisible()

  // После догрузки шрифтов/картинок высота страницы меняется
  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
    playIfVisible()
  })
})

onUnmounted(() => {
  trigger?.kill()
  trigger = null
  tween?.kill()
  tween = null
})
</script>

<template>
  <component :is="tag" ref="el" v-bind="attrs">
    <slot />
  </component>
</template>
