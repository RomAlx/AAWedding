<script setup lang="ts">
import AnimatedReveal from '@/components/AnimatedReveal.vue'
import MapsAddress from '@/components/MapsAddress.vue'
import MapsButton from '@/components/MapsButton.vue'
import type { RevealPreset } from '@/components/AnimatedReveal.vue'

withDefaults(
  defineProps<{
    name: string
    address: string
    mapUrl: string
    directions?: string
    routes?: readonly { label: string; mapUrl: string }[]
    preset?: RevealPreset
  }>(),
  {
    preset: 'rise',
  },
)
</script>

<template>
  <AnimatedReveal
    :preset="preset"
    tag="article"
    class="py-6"
  >
    <h3 class="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--color-text)]">
      {{ name }}
    </h3>
    <MapsAddress :href="mapUrl" class="mt-2 block text-base">
      {{ address }}
    </MapsAddress>
    <p
      v-if="directions"
      class="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]"
    >
      {{ directions }}
    </p>
    <div
      v-if="routes?.length"
      class="mt-4 flex flex-row flex-wrap items-center gap-2"
    >
      <MapsButton
        v-for="route in routes"
        :key="route.mapUrl"
        :href="route.mapUrl"
        :label="route.label"
        variant="slim"
        :icon-size="14"
      />
    </div>
  </AnimatedReveal>
</template>
