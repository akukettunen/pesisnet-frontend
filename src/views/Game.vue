<template>
  <v-container fluid class="px-0" style="padding-top: 74px; max-width: 1000px;">
    <!-- {{ game }} -->
    <v-sheet class="pa-2" style="height: 100%;">
      <GameHeader/>
      <!-- Fin {{ finished }} -->
      <div></div>
      <GameLiveBar/>
      <v-expand-transition>
        <GameEvents
          v-if="events && events.length"
        />
      </v-expand-transition>
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
            style="width: 100%; max-width: calc(100vw - 32px); justify-content: center; display: flex;"
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
import GameLiveBar from '@/components/games/game/GameLiveBar.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: { GameHeader, GameBar, DataTable, GameEvents, Prizes, GameLiveBar },
  data: () => ({
    event_polling_interval: null
  }),
  created() {
    this.getGameData({ id: this.$route.params.id })
  },
  methods: {
    ...mapActions('game', [
      'getGameData',
      'startPollingEvents',
      'pollGameEvents',
      'stopEventPollingInterval'
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
  },
  unmounted() {
    console.log("STOP POLLING EVENTS")
    this.stopEventPollingInterval()
  },
}
</script>