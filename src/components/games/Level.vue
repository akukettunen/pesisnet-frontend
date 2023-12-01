<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card
    color="blue"
    flat
  >
    {{ level.name }}
    <Regions
      v-if="level.regions && level.regions.length"
      :regions="level.regions"
    ></Regions>
    <SeasonSeries
      v-for="seasonSeries in level.seasonSerieses"
      :key="seasonSeries.id + 'seriesSeason'"
      :seasonSeries="seasonSeries"
    ></SeasonSeries>
  </v-card>
</template>

<script>
import Regions from '@/components/games/Regions'
import SeasonSeries from '@/components/games/SeasonSeries.vue'
export default {
  components: { Regions, SeasonSeries },
  props: ['level']
}
</script>