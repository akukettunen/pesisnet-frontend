<template>
  <v-container fluid class="px-0" style="padding-top: 64px; max-width: 1000px;">
    <!-- {{ stats_by_hitter }} -->
    <v-sheet class="pa-10" style="height: 100%;">
      <GameHeader/>
      Fin {{ finished }}
      <div></div>
      <!-- {{ game_data }}
      {{ game }} -->

      <GameEvents/>
      <!-- <div class="my-5" v-for="a in happening_type_events" :key="a">
        {{ a }}
      </div>
      <div class="my-5" v-for="a in events" :key="a">
        {{ a }}
      </div> -->
      <v-row style="flex-direction: row;" class="my-5">
        <v-col v-for="side in ['home', 'away']" :key="`${side}-game-data-table-stats`" cols="12" md="6">
          <v-skeleton-loader
            type="list-item-three-line	, list-item-three-line	, list-item-three-line	"
            style="width: 100%; max-width: calc(100vw - 80px); justify-content: center; display: flex;"
            :loading="loading_game"
          >
            <DataTable @cell-clicked="handleCellClicked($event)" :data="stats_table(side)" />
          </v-skeleton-loader>
          <Prizes :side="side"></Prizes>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import GameBar from '@/components/games/game/GameBar.vue'
import GameHeader from '@/components/games/game/GameHeader.vue'
import DataTable from '@/components/data/DataTable.vue'
import GameEvents from '@/components/games/game/GameEvents.vue'
import Prizes from '@/components/games/game/Prizes.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: { GameHeader, GameBar, DataTable, GameEvents, Prizes },
  created() {
    this.getGameData(this.$route.params.id)
  },
  methods: {
    ...mapActions('game', [
      'getGameData'
    ]),
    handleCellClicked(e) {
      if(e.column == 'pointhits') {
        let fil_events = this.events.filter(event => event.batter == e.row.player_id && event.groupType == 'o')

        console.log(fil_events)
      }
    }
  },
  computed: {
    ...mapGetters('game', [
      'events', 
      'game',
      'stat_type_events',
      'happening_type_events',
      'stat_points',
      'stats_by_hitter',
      'stats_table',
      'loading_game',
      'game_data',
      'finished'
    ])
  }
}
</script>