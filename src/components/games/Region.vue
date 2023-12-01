<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card
    flat
  >
    {{ region.name }}
    <SeasonSeries
      v-for="seasonSeries in region.seasonSerieses"
      :key="seasonSeries.id + 'seasonSeries'"
      :seasonSeries="seasonSeries"
    ></SeasonSeries>
  </v-card>
</template>

<script>
import SeasonSeries from '@/components/games/SeasonSeries.vue'
export default {
  components: { SeasonSeries },
  props: ['region']
}
</script>