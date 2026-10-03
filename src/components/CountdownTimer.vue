<script setup lang="ts">
import AnimatedReveal from '@/components/AnimatedReveal.vue'
import HeartSalute from '@/components/HeartSalute.vue'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { config } from '@/data/config'
import { parseCountdownTarget } from '@/utils/motion'

const targetMs = parseCountdownTarget(config.countdownTarget)

const remaining = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
const isPast = ref(false)

const cells = [
  { key: 'days' as const, label: 'дней' },
  { key: 'hours' as const, label: 'часов' },
  { key: 'minutes' as const, label: 'минут' },
  { key: 'seconds' as const, label: 'секунд' },
]

let timer: ReturnType<typeof setInterval> | null = null

function updateCountdown() {
  const diff = targetMs - Date.now()

  if (diff <= 0) {
    isPast.value = true
    remaining.value = { days: 0, hours: 0, minutes: 0, seconds: 0 }
    if (timer) {
      clearInterval(timer)
      timer = null
    }
    return
  }

  remaining.value = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const values = computed(() => remaining.value)

onMounted(() => {
  updateCountdown()
  if (!isPast.value) {
    timer = setInterval(updateCountdown, 1000)
  }
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section id="countdown" class="scroll-section px-4 pb-10 pt-0">
    <div
      class="mx-auto max-w-[640px] border-t border-[var(--color-accent)]/25 pt-10 text-center"
    >
      <AnimatedReveal
        preset="rise"
        tag="div"
        class="relative overflow-hidden py-2"
      >
        <HeartSalute v-if="isPast" />

        <p
          v-if="!isPast"
          class="relative section-subtitle text-on-paper"
        >
          {{ config.countdown.beforeLabel }}
        </p>

        <div class="relative mt-6 grid grid-cols-4 gap-2 sm:gap-3">
          <div
            v-for="cell in cells"
            :key="cell.key"
            class="px-1 py-2"
          >
            <span class="digit-slot relative mx-auto block h-[1.85rem] overflow-hidden">
              <Transition name="digit">
                <span
                  :key="values[cell.key]"
                  class="absolute inset-x-0 font-[family-name:var(--font-display)] text-3xl font-bold tabular-nums leading-[1.85rem] text-[var(--color-text)]"
                >
                  {{ values[cell.key] }}
                </span>
              </Transition>
            </span>
            <span class="mt-1 block text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--color-text)]">
              {{ cell.label }}
            </span>
          </div>
        </div>

        <p
          v-if="isPast"
          class="married-phrase relative mt-6"
        >
          {{ config.countdown.afterLabel }}
        </p>
      </AnimatedReveal>
    </div>
  </section>
</template>

<style scoped>
.digit-enter-active,
.digit-leave-active {
  transition:
    opacity 0.28s ease,
    transform 0.28s ease;
}

.digit-enter-from {
  opacity: 0;
  transform: translateY(55%);
}

.digit-enter-to,
.digit-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.digit-leave-to {
  opacity: 0;
  transform: translateY(-55%);
}

@media (prefers-reduced-motion: reduce) {
  .digit-enter-active,
  .digit-leave-active {
    transition: none;
  }

  .digit-enter-from,
  .digit-leave-to {
    transform: none;
  }
}
</style>
