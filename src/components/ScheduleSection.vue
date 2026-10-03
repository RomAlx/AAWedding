<script setup lang="ts">
import AnimatedReveal from '@/components/AnimatedReveal.vue'
import { computed } from 'vue'
import { config } from '@/data/config'

const { schedule } = config

const flatEvents = computed(() =>
  schedule.blocks.flatMap((block, blockIndex) =>
    block.events.map((event, eventIndex) => {
      const globalIndex =
        schedule.blocks
          .slice(0, blockIndex)
          .reduce((sum, b) => sum + b.events.length, 0) + eventIndex

      return {
        ...event,
        blockTitle: block.title,
        showBlockTitle: eventIndex === 0,
        side: globalIndex % 2 === 0 ? 'right' : 'left',
        key: `${block.title}-${event.time}-${event.title}`,
      }
    }),
  ),
)
</script>

<template>
  <section
    id="schedule"
    class="schedule-bg scroll-section px-4 py-14 text-[var(--color-schedule-text)]"
  >
    <div class="relative mx-auto max-w-[640px]">
      <AnimatedReveal
        preset="fade"
        tag="h2"
        class="section-title section-title-light"
      >
        {{ schedule.title }}
      </AnimatedReveal>

      <div class="relative mt-12">
        <!-- Цельная волна без dash-анимации (иначе линия «обрывается») -->
        <svg
          class="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-[var(--color-schedule-text)] opacity-60"
          viewBox="0 0 100 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M50 0
               C12 40, 12 80, 50 120
               C88 160, 88 200, 50 240
               C12 280, 12 320, 50 360
               C88 400, 88 440, 50 480
               C12 520, 12 560, 50 600"
            fill="none"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        <ol class="relative space-y-12 sm:space-y-16">
          <AnimatedReveal
            v-for="event in flatEvents"
            :key="event.key"
            :preset="event.side === 'right' ? 'slide-right' : 'slide-left'"
            tag="li"
            class="relative"
          >
            <div
              class="w-[58%] max-w-[17rem] sm:w-[46%] sm:max-w-none"
              :class="
                event.side === 'left'
                  ? 'mr-auto text-left'
                  : 'ml-auto text-right'
              "
            >
              <p
                v-if="event.showBlockTitle"
                class="schedule-block-title mb-4"
              >
                {{ event.blockTitle }}
              </p>

              <time
                class="block font-[family-name:var(--font-display)] text-xl font-semibold tracking-wide"
              >
                {{ event.time }}
              </time>
              <h3
                class="mt-1 font-[family-name:var(--font-display)] text-base font-bold uppercase tracking-[0.14em] sm:text-lg"
              >
                {{ event.title }}
              </h3>
              <p
                v-if="event.details"
                class="mt-2 text-sm leading-relaxed text-[var(--color-schedule-muted)]"
              >
                {{ event.details }}
              </p>
            </div>
          </AnimatedReveal>
        </ol>
      </div>
    </div>
  </section>
</template>
