<template>
  <v-sheet>
    <v-row>
      <v-col order-md="1" md="4" cols="6">
        <GameHeaderTeam :points="game_data.liveResult ? game_data.liveResult.periods.home : 0" :team="game_data.home" />
      </v-col>
      <v-col class="d-flex align-center pt-0 pb-5" style="align-items: center; flex-direction: column; justify-content: center;" order="3" order-md="2" md="4" cols="12">
        <!-- <v-sheet :style="`flex-grow: 0; white-space: nowrap; font-size: ${$vuetify.display.mobile ? '16px' : '18px'}`" class="sport-font">
          {{game_data.result ? `${game_data.result.periods_home} - ${game_data.result.periods_away}` : ''}} 
        </v-sheet> -->
        <!-- "liveResult": { "periods": { "home": 0, "away": 1 }, "runs": [ { "home": [ 1, 0, 2, 0 ], "away": [ 3, 1, 0, null ] }, { "home": [ 0, 1, 0, 0 ], "away": [ 1, 0, 1, 0 ] }, { "home": [ null ], "away": [ null ] }, { "home": [ null ], "away": [ null ] } ], "maxPlayedPeriod": 0, "lastPeriod": 1, "lastPeriodFinished": false, "lastInning": 3, "batTurn": 1, "lastTeam": 12518, "lastTeamKey": "home", "lastEventText": [ "Lyöntivuorossa", "Eetu Venäläinen" ], "lastRAB": [ 5, 6, 3, null, null ], "outs": 1, "finished": false } -->

         <!-- TODO: Result ei anna ulos livetulosta  -->
        <v-sheet v-if="game_data.liveResult || loading_game" :style="`flex-grow: 0; font-size: ${$vuetify.display.mobile ? '16px' : '24px'}`" class="sport-font">
          <v-sheet v-if="finished && !loading_game" style="text-align: center; font-size: 16px;" class="sport-font">
            Ottelu päättynyt
          </v-sheet>
          <div style="text-align: center;">
            {{ generateGameResultString(game_data.liveResult) }}
          </div>
          <!-- {{`(${game_data.result.result_string_periods})`}} -->
        </v-sheet>
        <v-sheet style="text-align: center;" class="sport-font" v-else-if="game.date">
          <div style="text-align: center; font-size: 20px;">
            {{ format(game.date) }}
          </div>
          <div style="text-align: center;">
            {{ pretty_day_from_date(game.date) }}
          </div>
        </v-sheet>
      </v-col>
      <v-col order-md="3" md="4" cols="6">
        <GameHeaderTeam :points="game_data.liveResult ? game_data.liveResult.periods.away : 0" :team="game_data.away" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import date from 'date-and-time'
import { result } from '@/utils/result'
import GameHeaderTeam from '@/components/games/game/GameHeaderTeam.vue'
export default {
  components: {
    GameHeaderTeam
  },
  mixins: [result],
  computed: {
    ...mapGetters('game', [
      'game',
      'game_data',
      'loading_game',
      'finished'
    ]),
    ...mapGetters('games', [
      'pretty_day_from_date',
      'get_runs'
    ]),
  },
  methods: {
    format(d) {
      // 2024-01-05T18:00:00+02:00
      const diff = Math.round(date.subtract(new Date(), new Date(d)).toDays())
      if(diff == '0') return 'Tänään'
      if(diff == '-1') return 'Huomenna'
      if(diff == '-2') return 'Ylihuomenna'

      return date.format(new Date(d), 'DD.MM.')
    },
    ...mapActions('game', [
      'stopEventPollingInterval'
    ])
  }
}
</script>