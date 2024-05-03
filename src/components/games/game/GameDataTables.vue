<template>
  <v-row style="flex-direction: row;" class="my-5">
    <v-col v-for="side in ['home', 'away']" :key="`${side}-game-data-table-stats`" cols="12" md="6">
      <GameExtraDatas :loading="loading_events" :side="side"></GameExtraDatas>
      <v-skeleton-loader
        type="list-item-three-line	, list-item-three-line	, list-item-three-line	"
        style="width: 100%; max-width: calc(100vw - 36px); justify-content: center; display: flex;"
        :loading="loading_events"
      >
        <DataTable :unorderable="true" @cell-clicked="$emit('cell-clicked', $event)" :data="stats_table_v2(side)" />
      </v-skeleton-loader>
      <Prizes :side="side"></Prizes>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import DataTable from '@/components/data/DataTable.vue'
import Prizes from '@/components/games/game/Prizes.vue'
import GameExtraDatas from '@/components/games/game/GameExtraDatas.vue'

export default {
  components: { DataTable, Prizes, GameExtraDatas },
  computed: {
    ...mapGetters('game', [
      'loading_events',
      'stats_table_v2'
    ])
  }
}
</script>