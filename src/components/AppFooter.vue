<script setup lang="ts">
import { computed } from 'vue'
import AnimatedReveal from '@/components/AnimatedReveal.vue'
import { config } from '@/data/config'

const { dateShort, footer } = config

const ornamentUrl = computed(
  () => `${import.meta.env.BASE_URL}${footer.ornament}`,
)
</script>

<template>
  <footer class="scroll-section px-4 pb-10 pt-12 text-center">
    <div class="mx-auto max-w-[640px] border-t border-[var(--color-accent)]/25 pt-8">
      <AnimatedReveal preset="fade" tag="div">
        <p
          class="font-script text-[clamp(2rem,7vw,2.75rem)] leading-none text-[var(--color-accent)]"
        >
          {{ footer.closing }}
        </p>
        <p class="mt-3 text-sm tracking-wide text-[var(--color-text-muted)]">
          {{ dateShort }}
        </p>
      </AnimatedReveal>

      <AnimatedReveal preset="rise" tag="div" class="mt-8 flex justify-center">
        <img
          :src="ornamentUrl"
          alt=""
          class="footer-ornament"
          width="280"
          height="200"
        />
      </AnimatedReveal>
    </div>
  </footer>
</template>
