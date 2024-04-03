<template>
  <v-card flat class="px-2" @click="$router.push(`/games/${game.id}`)">
    <v-divider></v-divider>
    <v-sheet class="d-flex">
      <!--
        batTurn 0 = koti, 1 = vieras
        lastInning 1 = 1. vuoro pelattu, toinen menossa
        lastPeriod 1 = 1. jakso pelattu, toinen menossa
        lastPeriodFinished true -> tauolla
      -->
      <span :style="`color: ${game.live ? 'red' : ''}`" class="d-flex mr-4 sport-font" style="align-items: center;">
        {{ pretty_day_from_date(game.date) }}
      </span>
      <v-sheet class="d-flex-column">
        <game-card-team :team="game.home"></game-card-team>
        <game-card-team :team="game.away"></game-card-team>
      </v-sheet>
      <v-spacer></v-spacer>
      <div v-if="game.liveResult" :class="{'pr-16': !$vuetify.display.mobile}">
        <!-- Live game -->
        <div v-if="game.playing_type == 2">
          <PointBoxes>
            <PointBox :color="game.live ? 'secondary' : 'primary'" :value="game.liveResult.periods.home"></PointBox>
            <PointBox :color="game.live ? 'secondary' : 'primary'" :value="game.liveResult.periods.away"></PointBox>
          </PointBoxes>
          <span v-if="!$vuetify.display.mobile">
            <PointBoxes v-for="(runs, i) in game.liveResult.runs.filter(r => r.home[0] != null || r.away[0] != null)" :key="i + 'runs'">
              <PointBox :value="get_runs(runs.home)"></PointBox>
              <PointBox :value="get_runs(runs.away)"></PointBox>
            </PointBoxes>
          </span>
        </div>
        <div v-else>
          <PointBoxes v-for="(runs, i) in game.liveResult.runs.filter(r => r.home[0] != null || r.away[0] != null)" :key="i + 'runs'">
            <PointBox 
              :color="game.live ? 'secondary' : 'primary'" 
              :value="get_runs(runs.home)"
            ></PointBox>
            <PointBox 
              :color="game.live ? 'secondary' : 'primary'" 
              :value="get_runs(runs.away)"
            ></PointBox>
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
      'pretty_day_from_date',
      'get_runs'
    ]),
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>