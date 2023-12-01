<template>
  <v-card flat>
    <v-sheet style="justify-content: center; display: flex;" class="my-4">
      <v-btn 
        v-for="region in regions"
        class="ml-1"
        :key="region.id + 'region'"
        size="small"
        color="primary"
      >
        {{ region.name }}
      </v-btn>
    </v-sheet>
    <Region
      v-for="region in regions"
      :key="region.id + 'region'"
      :region="region"
    ></Region>
  </v-card>
</template>

<script>
import Region from '@/components/games/Region'

export default {
  props: ['regions'],
  components: { Region }
}
</script>