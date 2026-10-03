<script setup lang="ts">
import AnimatedReveal from '@/components/AnimatedReveal.vue'
import { config } from '@/data/config'

const { wishes } = config
</script>

<template>
  <section id="wishes" class="scroll-section px-4 py-12">
    <div class="mx-auto max-w-[640px] text-center">
      <AnimatedReveal
        preset="rise"
        tag="h2"
        class="section-title"
      >
        {{ wishes.title }}
      </AnimatedReveal>

      <AnimatedReveal
        preset="fade"
        tag="p"
        class="mx-auto mt-6 max-w-md text-base leading-relaxed text-[var(--color-text-muted)]"
      >
        {{ wishes.body }}
      </AnimatedReveal>
    </div>
  </section>
</template>
