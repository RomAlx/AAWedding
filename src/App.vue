<script setup lang="ts">
import { computed } from 'vue'
import AppFooter from '@/components/AppFooter.vue'
import CalendarSection from '@/components/CalendarSection.vue'
import CountdownTimer from '@/components/CountdownTimer.vue'
import HeroSection from '@/components/HeroSection.vue'
import ScheduleSection from '@/components/ScheduleSection.vue'
import VenuesSection from '@/components/VenuesSection.vue'
import WishesSection from '@/components/WishesSection.vue'

const paperBg = computed(
  () => `url(${import.meta.env.BASE_URL}background.png)`,
)
</script>

<template>
  <div
    class="paper-bg min-h-screen overflow-x-clip"
    :style="{ backgroundImage: paperBg }"
  >
    <HeroSection />
    <CountdownTimer />
    <CalendarSection />
    <ScheduleSection />
    <VenuesSection />
    <WishesSection />
    <AppFooter />
  </div>
</template>
