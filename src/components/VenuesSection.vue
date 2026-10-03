<script setup lang="ts">
import PlaceCard from '@/components/PlaceCard.vue'
import AnimatedReveal from '@/components/AnimatedReveal.vue'
import { config, getPlace, type PlaceId } from '@/data/config'

const { venues } = config

function venueRoutes(id: PlaceId) {
  const place = getPlace(id)
  return 'routes' in place ? [...place.routes] : undefined
}

const venueList = venues.placeIds.map((id) => {
  const place = getPlace(id)
  return {
    id,
    name: place.name,
    address: place.address,
    mapUrl: place.mapUrl,
    directions: 'directions' in place ? place.directions : undefined,
    routes: venueRoutes(id),
  }
})
</script>

<template>
  <section id="venues" class="scroll-section px-4 py-12">
    <div class="mx-auto max-w-[640px]">
      <AnimatedReveal
        preset="drift"
        tag="h2"
        class="section-title"
      >
        {{ venues.title }}
      </AnimatedReveal>

      <div class="mt-6">
        <PlaceCard
          v-for="venue in venueList"
          :key="venue.id"
          :name="venue.name"
          :address="venue.address"
          :map-url="venue.mapUrl"
          :directions="venue.directions"
          :routes="venue.routes"
          preset="drift"
        />
      </div>
    </div>
  </section>
</template>
