<template>
  <v-row style="flex-direction: row;" class="my-5">
    <v-col v-for="side in ['home', 'away']" :key="`${side}-game-data-table-stats`" cols="12" md="6">
      <v-skeleton-loader
        type="list-item-three-line	, list-item-three-line	, list-item-three-line	"
        style="width: 100%; max-width: calc(100vw - 32px); justify-content: center; display: flex;"
        :loading="loading_game"
      >
        <DataTable :unorderable="unorderable" @cell-clicked="$emit('cell-clicked', $event)" :data="stats_table(side)" />
      </v-skeleton-loader>
      <Prizes :side="side"></Prizes>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import DataTable from '@/components/data/DataTable.vue'
import Prizes from '@/components/games/game/Prizes.vue'

export default {
  components: { DataTable, Prizes },
  computed: {
    ...mapGetters('game', [
      'loading_game',
      'stats_table'
    ])
  }
}
</script>