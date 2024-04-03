<template>
  <v-row class="my-5">
    <v-col order-md="1" order="2" cols="12" md="6">
      <div style="max-height: 500px; overflow-y: scroll;">
        <div class="my-2" v-for="(event, i) in reversed_events" :key="event.id + 'event' + i">
          <!-- {{ event }} -->
          {{ event }}
        </div>
      </div>
    </v-col>
    <v-col order-md="2" order="1" class="justify-center d-flex" cols="12" md="6">
      <div style="position: relative;">
        <GameField :width="width" :height="height" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import GameField from '@/components/games/game/GameField.vue'
export default {
  components: {
    GameField
  },
  data: () => ({
    width: 267,
    height: 400
  }),
  computed: {
    ...mapGetters('game', [
      'reversed_events'
    ])
  }
}
</script>

<style lang="scss">
</style>