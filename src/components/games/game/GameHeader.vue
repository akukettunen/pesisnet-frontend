<template>
  <v-sheet>
    <v-row>
      <v-col order-md="1" md="5" cols="6">
        <GameHeaderTeam :points="game_data.result ? game_data.result.periods_home : ''" :team="game_data.home" />
      </v-col>
      <v-col class="d-flex align-center pt-0 pb-5" style="align-items: center; flex-direction: column; justify-content: center;" order="3" order-md="2" md="2" cols="12">
        <!-- <v-sheet :style="`flex-grow: 0; text-wrap: nowrap; font-size: ${$vuetify.display.mobile ? '16px' : '18px'}`" class="sport-font">
          {{game_data.result ? `${game_data.result.periods_home} - ${game_data.result.periods_away}` : ''}} 
        </v-sheet> -->
        <v-sheet :style="`flex-grow: 0; text-wrap: nowrap; font-size: ${$vuetify.display.mobile ? '16px' : '18px'}`" class="sport-font">
          {{game_data.result ? `(${game_data.result.result_string_periods})` : ''}}
        </v-sheet>
      </v-col>
      <v-col order-md="3" md="5" cols="6">
        <GameHeaderTeam :points="game_data.result ? game_data.result.periods_away : ''" :team="game_data.away" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
import GameHeaderTeam from '@/components/games/game/GameHeaderTeam.vue'
export default {
  components: {
    GameHeaderTeam
  },
  computed: {
    ...mapGetters('game', [
      'game',
      'game_data',
      'loading_game',
      'loading_game'
    ])
  }
}
</script>