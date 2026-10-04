<script setup lang="ts">
import gsap from 'gsap'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { config } from '@/data/config'
import { prefersReducedMotion } from '@/utils/motion'

const { coupleDisplay, hero } = config

const heroImageUrl = computed(
  () => `${import.meta.env.BASE_URL}${hero.image}`,
)

const imageEl = ref<HTMLElement | null>(null)
const ctaEl = ref<HTMLAnchorElement | null>(null)

let timeline: gsap.core.Timeline | null = null
let scrollTween: gsap.core.Tween | null = null

function scrollToSchedule(event: MouseEvent) {
  const href = hero.ctaHref
  if (!href.startsWith('#')) return

  event.preventDefault()
  const id = href.slice(1)
  const target = document.getElementById(id)
  if (!target) return

  const top =
    target.getBoundingClientRect().top +
    (window.scrollY || window.pageYOffset || 0)

  if (prefersReducedMotion()) {
    window.scrollTo(0, top)
    return
  }

  // Анимируем scroll вручную — ScrollToPlugin/native smooth
  // часто ломаются из‑за overflow-x: clip и autoKill.
  scrollTween?.kill()
  const state = { y: window.scrollY || window.pageYOffset || 0 }
  scrollTween = gsap.to(state, {
    y: top,
    duration: 1.25,
    ease: 'power2.inOut',
    onUpdate: () => {
      window.scrollTo(0, state.y)
    },
  })
}

onMounted(() => {
  if (prefersReducedMotion()) {
    imageEl.value?.classList.add('is-visible')
    ctaEl.value?.classList.add('is-visible', 'is-ready')
    return
  }

  const targets = [imageEl.value, ctaEl.value].filter(Boolean)
  gsap.set(targets, { opacity: 0, y: 24 })

  timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
  timeline
    .to(imageEl.value, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      clearProps: 'transform',
      onComplete: () => imageEl.value?.classList.add('is-visible'),
    })
    .to(
      ctaEl.value,
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        clearProps: 'transform',
        onComplete: () => ctaEl.value?.classList.add('is-visible', 'is-ready'),
      },
      '-=0.3',
    )
})

onUnmounted(() => {
  timeline?.kill()
  timeline = null
  scrollTween?.kill()
  scrollTween = null
})
</script>

<template>
  <section class="hero-cloth">
    <div
      class="relative mx-auto flex min-h-[100dvh] w-full max-w-[720px] flex-col items-center justify-center gap-6 px-3 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(2.75rem,calc(env(safe-area-inset-bottom)+1.5rem))] sm:gap-7 sm:px-5 sm:pb-20"
    >
      <div ref="imageEl" class="hero-enter hero-invite-stage">
        <img
          :src="heroImageUrl"
          :alt="`${coupleDisplay} — свадебное приглашение`"
          class="hero-invite"
          width="720"
          height="1020"
        />
      </div>

      <a
        ref="ctaEl"
        :href="hero.ctaHref"
        class="btn-hero-ink hero-enter mt-8 sm:mt-0"
        @click="scrollToSchedule"
      >
        <span>{{ hero.ctaLabel }}</span>
      </a>
    </div>
  </section>
</template>
