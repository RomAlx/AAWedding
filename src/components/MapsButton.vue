<script setup lang="ts">
import { MapPin } from 'lucide-vue-next'
import { computed } from 'vue'
import { config } from '@/data/config'

const props = withDefaults(
  defineProps<{
    href: string
    label?: string
    variant?: 'primary' | 'secondary' | 'schedule' | 'slim'
    iconSize?: number
  }>(),
  {
    variant: 'secondary',
    iconSize: 16,
  },
)

const text = computed(() => props.label ?? config.labels.openInMaps)
const btnClass = computed(() => {
  if (props.variant === 'primary') return 'btn-primary'
  if (props.variant === 'schedule') return 'btn-secondary btn-schedule'
  if (props.variant === 'slim') return 'btn-slim'
  return 'btn-secondary'
})
</script>

<template>
  <a
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="btnClass"
  >
    <MapPin :size="iconSize" />
    {{ text }}
  </a>
</template>
