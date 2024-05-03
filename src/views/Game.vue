<template>
  <v-container fluid class="px-0" :style="`padding-top: ${$vuetify.display.mobile ? '0' : '74'}px;`" style="max-width: 1200px;">
    <!-- {{ game_data }}
    <div>Game</div>
    {{ game }} -->
    <v-sheet class="pa-2" style="height: 100%;">
      <GameHeader/>
      <!-- Fin {{ finished }} -->
      <!-- {{ events }} -->
      <div></div>
      <GameLiveBar/>
      <v-expand-transition>
        <GameEvents
          v-if="events && events.length"
        />
      </v-expand-transition>
      <game-data-tables @cell-clicked="handleCellClicked($event)"></game-data-tables>
    </v-sheet>
    <game-field-dialog :hits="hits" @close="SET_SHOW_FIELD(false)" :title="title" :value="show_field"></game-field-dialog>
  </v-container>
</template>

<script>
import GameBar from '@/components/games/game/GameBar.vue'
import GameHeader from '@/components/games/game/GameHeader.vue'
import GameEvents from '@/components/games/game/GameEvents.vue'
import GameDataTables from '@/components/games/game/GameDataTables.vue'
import GameLiveBar from '@/components/games/game/GameLiveBar.vue'
import GameFieldDialog from '@/components/games/game/GameFieldDialog.vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: { GameHeader, GameBar, GameEvents, GameLiveBar, GameFieldDialog, GameDataTables },
  created() {
    const time = this.getGameData({ id: this.$route.params.id })
  },
  data() {
    return {
      event_polling_interval: null,
      hits: [],
      title: ''
    }
  },
  methods: {
    handleCellClicked(e) {
      this.hits = this.hits_by_player({ player_id: e.row.player_id, player_number: e.row.player_number, side: e.row.side })
      this.title = e.row.player
      this.SET_SHOW_FIELD(true)
    },
    ...mapActions('game', [
      'getGameData',
      'startPollingEvents',
      'pollGameEvents',
      'stopEventPollingInterval'
    ]),
    ...mapMutations('game', [
      'SET_SHOW_FIELD'
    ])
  },
  computed: {
    ...mapGetters('game', [
      'game',
      'stat_type_events',
      'happening_type_events',
      'stat_points',
      'stats_by_hitter',
      'loading_game',
      'game_data',
      'finished',
      'hits_by_player',
      'show_field',
      'events'
    ])
  },
  unmounted() {
    this.stopEventPollingInterval()
  },
}
</script>