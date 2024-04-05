<template>
  <div v-if="game.liveResult" style="text-align: center;">
    <span>
      <span class="mr-5" v-for="(runs, period) in game.liveResult.runs" :key="period + 'runs'">
        <PointBoxes v-for="(these, inning) in runs['home']" :key="`${inning}-block-tiles`">
          <!-- {{these ? these : 'null'}} -->
            <PointBox :highlighted="is_highlighted(period, inning, 'home')" :key="`${period}-${inning}-runstile-home`" cursor="pointer" :large="true" :value="runs['home'][inning] != null ? runs['home'][inning] : '-'"></PointBox>
            <PointBox :highlighted="is_highlighted(period, inning, 'away')" :key="`${period}-${inning}-runstile-away`" cursor="pointer" :large="true" :value="runs['away'][inning] != null ? runs['away'][inning] : '-'"></PointBox>
        </PointBoxes>
        <PointBoxes v-if="runs['home'].length > 1">
          <PointBox cursor="pointer" :large="true" :color="game.live ? 'secondary' : 'primary'" :value="get_runs(runs['home'])"></PointBox>
          <PointBox cursor="pointer" :large="true" :color="game.live ? 'secondary' : 'primary'" :value="get_runs(runs['away'])"></PointBox>
        </PointBoxes>
      </span>
    </span>
    <PointBoxes>
      <PointBox cursor="pointer" :large="true" :color="game.live ? 'secondary' : 'primary'" :value="game.liveResult.periods.home"></PointBox>
      <PointBox cursor="pointer" :large="true" :color="game.live ? 'secondary' : 'primary'" :value="game.liveResult.periods.away"></PointBox>
    </PointBoxes>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import PointBox from './PointBox.vue';
import PointBoxes from './PointBoxes.vue';
export default {
  components: { PointBoxes, PointBox },
  computed: {
    ...mapGetters('game', [
      'game_data'
    ]),
    game() {
      return this.game_data
    },
    ...mapGetters('games', [
      'get_runs'
    ]),
  },
  methods: {
    is_highlighted(period, inning, key) {
      return period == this.game.liveResult.lastPeriod 
             && inning == this.game.liveResult.lastInning 
             && key == this.game.liveResult.lastTeamKey 
    },
  }
}
</script>