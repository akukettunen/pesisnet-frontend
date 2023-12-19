<template>
  <v-card flat class="px-2" @click="$router.push(`/games/${game.id}`)">
    <v-divider></v-divider>
    <v-sheet class="d-flex">
      <span class="d-flex mr-4 sport-font" style="align-items: center;">
        {{ pretty_day_from_date(game.date) }}
      </span>
      <v-sheet class="d-flex-column">
        <game-card-team :team="game.home"></game-card-team>
        <game-card-team :team="game.away"></game-card-team>
      </v-sheet>
      <v-spacer></v-spacer>
      <div v-if="game.result">
        <div style="padding-top: 1.5px;" v-if="game.playing_type == 2" :class="{'pr-16': !$vuetify.display.mobile}">
          <PointBoxes>
            <PointBox color="secondary" :value="game.result.details.runs_home_first_period"></PointBox>
            <PointBox color="secondary" :value="game.result.details.runs_away_first_period"></PointBox>
          </PointBoxes>
          <PointBoxes>
            <PointBox color="secondary" :value="game.result.details.runs_home_second_period"></PointBox>
            <PointBox color="secondary" :value="game.result.details.runs_away_second_period"></PointBox>
          </PointBoxes>
          <PointBoxes>
            <PointBox :value="2"></PointBox>
            <PointBox :value="0"></PointBox>
          </PointBoxes>
        </div>
        <div style="padding-top: 1.5px;" v-else :class="{'pr-16': !$vuetify.display.mobile}">
          <PointBoxes>
            <PointBox :value="game.result.details.runs_home_first_period"></PointBox>
            <PointBox :value="game.result.details.runs_away_first_period"></PointBox>
          </PointBoxes>
        </div>
      </div>
    </v-sheet>
    <!-- {{ game }} -->
    <!-- {{ game.result.details }} -->
  </v-card>
</template>

<script>
import GameCardTeam from '@/components/games/GameCardTeam.vue'
import PointBox from '@/components/games/game/PointBox.vue'
import PointBoxes from '@/components/games/game/PointBoxes.vue'
import { mapGetters } from 'vuex'

export default {
  components: { GameCardTeam, PointBox, PointBoxes },
  props: ['game'],
  computed: {
    ...mapGetters('games', [
      'pretty_day_from_date'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>