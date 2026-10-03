<script setup lang="ts">
import AnimatedReveal from '@/components/AnimatedReveal.vue'
import { computed } from 'vue'
import { config } from '@/data/config'

const { calendar } = config

const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'] as const

/** Ячейки месяца: null = пустой день до/после */
const cells = computed(() => {
  const { year, monthIndex, highlightDay } = calendar
  // Понедельник = 0 … воскресенье = 6
  const firstWeekday = (new Date(year, monthIndex, 1).getDay() + 6) % 7
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  const result: Array<{ day: number | null; highlight: boolean }> = []

  for (let i = 0; i < firstWeekday; i++) {
    result.push({ day: null, highlight: false })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    result.push({ day, highlight: day === highlightDay })
  }

  while (result.length % 7 !== 0) {
    result.push({ day: null, highlight: false })
  }

  return result
})
</script>

<template>
  <section id="calendar" class="scroll-section px-4 pb-35 pt-3">

    <div class="mx-auto max-w-[360px]">
      <AnimatedReveal preset="rise" tag="div" class="text-center">
        <h2 class="section-title text-[clamp(2.75rem,11vw,3.5rem)]">
          {{ calendar.monthLabel }}
        </h2>

        <div
          class="mx-auto mt-5 grid grid-cols-7 gap-y-3 text-center text-sm text-[var(--color-text)]"
        >
          <span
            v-for="day in weekdays"
            :key="day"
            class="text-xs font-bold tracking-wide text-[var(--color-text)]"
          >
            {{ day }}
          </span>

          <span
            v-for="(cell, index) in cells"
            :key="index"
            class="relative flex h-9 items-center justify-center"
          >
            <template v-if="cell.day !== null">
              <span
                v-if="cell.highlight"
                class="relative flex h-10 w-10 items-center justify-center"
                :aria-label="`${cell.day} ${calendar.monthLabel} — день свадьбы`"
              >
                <svg
                  class="absolute inset-0 h-full w-full text-[var(--color-accent)]"
                  viewBox="0 0 40 36"
                  aria-hidden="true"
                >
                  <path
                    d="M20 33s-14-9-14-18a7.5 7.5 0 0 1 14-3.5A7.5 7.5 0 0 1 34 15c0 9-14 18-14 18z"
                    fill="currentColor"
                  />
                </svg>
                <span
                  class="relative z-10 font-[family-name:var(--font-display)] text-base font-semibold text-[var(--color-page-bg)]"
                >
                  {{ cell.day }}
                </span>
              </span>
              <span
                v-else
                class="font-[family-name:var(--font-display)] text-base font-semibold tabular-nums text-[var(--color-text)]"
              >
                {{ cell.day }}
              </span>

            </template>
          </span>
        </div>
      </AnimatedReveal>
    </div>
  </section>
</template>
