<template>
  <div style="position: relative;">
    <v-img
      v-if="$vuetify.theme.name == 'dark'"
      :height="this.height"
      :width="this.width"
      src="@/assets/images/field_dark.png"
    />
    <v-img
      v-else
      :height="this.height"
      :width="this.width"
      src="@/assets/images/field.png"
    />
    <!-- {{ ball_pos.x / 100 * width }}
    {{ ball_pos }}
    {{ width }} -->
    <v-img
      ref="ball"
      id="ball"
      :style="`z-index: 2; position: absolute; top: 0px; left: 0px; height: 1px; width: 1px;`"
      height="25"
      width="25"
      src="@/assets/images/ball.png"
    />
    <div 
      v-for="(hit, i) in hits" 
      :key="'hits' + i" 
      :style="`
        height: 15px;
        width: 15px;
        background-color: ${getHitColor(hit)};
        position: absolute;
        top: ${getHitPosition(hit).y}px;
        left: ${getHitPosition(hit).x}px;
        border-radius: 50%;
      `"
    >
      <v-tooltip activator="parent">
        <div v-for="(instant, i) in hit.events" :key="'map_instant' + i">
          {{ event_text(hit, instant, i).text }}
        </div>
      </v-tooltip>
    </div>
    <v-sheet 
      style="height: 30px; width: 100px; position: absolute; background-color: rgba(0, 0, 0, 0);" 
      v-for="player in bases.filter(b => !!b)" 
      :key="player"
      :id="`player_${player}`"
    >
      <player-badge :player_id="player" :team_id="hitting_team_id"/>
    </v-sheet>
    <!-- <div class="gf-player">
      <div class="gf-player-left">
        <div class="gf-player-left-icon sport-font">
          3
        </div>
      </div>
      <div class="gf-player-name sport-font">
        Jari Lettunen
      </div>
    </div> -->
    <!-- {{ hits }} -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { gsap } from 'gsap';
import PlayerBadge from './PlayerBadge.vue';

export default {
  props: ['height', 'width', 'hits'],
  components: { PlayerBadge },
  data: () => ({
    prev_rot: 1,
    home_base: { x: 0.4 ,y: 0.9 },
    first_base: { x: 0.2 ,y: 0.60 },
    second_base: { x: 0.6 ,y: 0.37 },
    third_base: { x: -0.1 ,y: 0.37 },
    last_base: { x: 0.2 ,y: 0.8 },
    bases: [null, null, null, null, null],
    hitting_team_id: null
  }),
  methods: {
    getHitPosition(hit) {
      hit = hit.hit
      return {
        x: parseFloat(hit.x) / 100 * this.width - 12.5,
        y: parseFloat(hit.y) / 100 * this.height / 1.28 - 17.5
      }
    },
    getHitColor(hit) {
      if(hit.is_haava) return 'yellow'
      else if(hit.is_fail) return 'red'
      if(hit.is_success) return 'green'

      return 'grey'
    },
    handleEvent(event) {
      if(this.hits) return 
      this.eventRefresh(event)

      const eventIndex = [...this.reversed_events].findIndex(e => e.id === event.id)
      const previousEvent = [...this.reversed_events][eventIndex + 1]
      this.hitting_team_id = event.team

      if(!previousEvent) return

      const inningChanged =
        previousEvent.period != event.period
        || previousEvent.inning != event.inning
        || previousEvent.batTurn != event.batTurn

      const previousBases = inningChanged ? [null, null, null, null, null] : previousEvent.events.map(e => e.runnersAtBases)[0]
      this.bases = [...new Set(event.events.map(e => e.runnersAtBases).flat())];
      const new_bases_arr = event.events.map(e => e.runnersAtBases).reverse()

      this.$nextTick(() => {
        new_bases_arr.forEach((bases, i) => {
          if(new_bases_arr.length === 1) {
            this.handleBasesChanges(bases, previousBases)
            return
          } else if(i != 0) {
            setTimeout(() => {
              this.handleBasesChanges(bases, new_bases_arr[i - 1])
            }, (i - 1) * 1000)
          }

        })
      })

      // const this_inning_events = this.inning_events_by_event(event)
      const events = event.events

      events.forEach(e => {
        const is_hit = e.texts.some(t => t.type == 'hit')

        if(is_hit) this.handleHit(e.texts)
        else this.hideBall()
      })
    },
    handleBasesChanges(ne, prev) {
      ne = Array(5).fill(null).map((_, index) => ne[index] || null);
      prev = Array(5).fill(null).map((_, index) => prev[index] || null);

      prev.forEach((id, i) => {
        if(!id) return 
        switch(i) {
          case 0:
            gsap.to(`#player_${id}`, { duration: 0, left: this.home_base.x * this.width, top: this.home_base.y * this.height, scale: 1, display: 'block' })
            break;
          case 1:
            gsap.to(`#player_${id}`, { duration: 0, left: this.first_base.x * this.width, top: this.first_base.y * this.height, scale: 1, display: 'block' })
            break;
          case 2:
            gsap.to(`#player_${id}`, { duration: 0, left: this.second_base.x * this.width, top: this.second_base.y * this.height, scale: 1, display: 'block' })
            break;
          case 3:
            gsap.to(`#player_${id}`, { duration: 0, left: this.third_base.x * this.width, top: this.third_base.y * this.height, scale: 1, display: 'block' })
            break;
          case 4:
            gsap.to(`#player_${id}`, { duration: 0, left: 0, top: 0, scale: 0, display: 'none' })
            break;
        }
      })

      ne.forEach((id, i) => {
        // Jos ei ole lyöjä kyseessä, pidetään näkyvillä het
        if(id && (i != 0 || prev[0] == ne[0])) {
          gsap.to(`#player_${id}`, { duration: 0, scale: 1 })
        }

        // Uusi lyöjä animaatio
        if(id && i == 0 && prev[0] != ne[0]) {
          gsap.to(`#player_${id}`, { duration: 0, left: this.home_base.x * this.width, top: this.home_base.y * this.height })
          gsap.to(`#player_${id}`, { duration: 0, scale: 0 })
          gsap.to(`#player_${id}`, { duration: 0.5, scale: 1 })
        }
      })

      // Menee kotoa ykköselle
      if(prev[0] == ne[1] && prev[0]) {
        gsap.to(`#player_${ne[1]}`, { duration: 0.4, left: this.first_base.x * this.width, top: this.first_base.y * this.height, delay: 1 })
      }
      // Poistuu kotoa ykköselle
      else if(prev[0] != ne[0] && prev[0]) {
        gsap.to(`#player_${prev[0]}`, { duration: 0.4, left: this.first_base.x * this.width, top: this.first_base.y * this.height, delay: 1 })
        gsap.to(`#player_${prev[0]}`, { duration: 0.4, scale: 0, delay: 1.4 })
      }

      // Menee ykköseltä kakkoselle
      if(prev[1] == ne[2] && prev[1]) {
        gsap.to(`#player_${ne[2]}`, { duration: 0.4, left: this.second_base.x * this.width, top: this.second_base.y * this.height, delay: 1 })
      }
      // Poistuu ykköseltä kakkoselle
      else if(prev[1] != ne[1] && prev[1]) {
        gsap.to(`#player_${prev[1]}`, { duration: 0.4, left: this.second_base.x * this.width, top: this.second_base.y * this.height, delay: 1 })
        gsap.to(`#player_${prev[1]}`, { duration: 0.4, scale: 0, delay: 1.4 })
      }

      // Menee kakkoselta kolmoselle
      if(prev[2] == ne[3] && prev[2]) {
        console.log('MENE')
        gsap.to(`#player_${prev[2]}`, { duration: 0.4, left: this.third_base.x * this.width, top: this.third_base.y * this.height, delay: 1 })
      }
      // Poistuu kakkoselta kolmoselle
      else if(prev[2] != ne[2] && prev[2]) {
        gsap.to(`#player_${prev[2]}`, { duration: 0.4, left: this.third_base.x * this.width, top: this.third_base.y * this.height, delay: 1 })
        gsap.to(`#player_${prev[2]}`, { duration: 0.4, scale: 0, delay: 1.4 })
      }

      // Poistuu tai menee kolmoselta kotiin
      else if((prev[3] != ne[3] && prev[3]) || (prev[3] == ne[4] && prev[3])) {
        gsap.to(`#player_${prev[3]}`, { duration: 0.4, left: this.last_base.x * this.width, top: this.last_base.y * this.height, delay: 1 })
        gsap.to(`#player_${prev[3]}`, { duration: 0.4, scale: 0, delay: 1.4 })
      }
    },
    handleHit(texts) {
      const hit = texts.find(t => t.type == 'hit')['hit']

      let x_init = 0.5 * this.width - 12.5
      let y_init = 0.9 * this.height - 17.5
      
      let x = parseFloat(hit.x) / 100 * this.width - 12.5
      let y = parseFloat(hit.y) / 100 * this.height / 1.28 - 17.5

      gsap.to("#ball", { duration: 0.2, height: 0, width: 0, x: 12.5, y: 12.5 });
      gsap.to("#ball", { duration: 0, left: x_init, top: y_init, delay: 0.2, });
      gsap.to("#ball", { duration: 0.3, height: 40, width: 40, delay: 0.2, x: -5, y: -5, ease: "power1.out" });
      gsap.to("#ball", { duration: 0.4, height: 15, width: 15, delay: 0.5, x: 0, y: 0, ease: "power1.in" });
      gsap.to("#ball", { duration: 0.8, height: 25, width: 25,  left: x, top: y, rotation: 320 * this.prev_rot, delay: 0.9 });
      this.prev_rot = -this.prev_rot
    },
    hideBall() {
      gsap.to("#ball", { duration: 0.2, height: 0, width: 0, x: 12.5, y: 12.5 });
      gsap.to("#ball", { duration: 0, height: 0, width: 0, x: 0, y: 0, delay: 0.2 });
    },
    ...mapActions('game', [
      'eventRefresh'
    ])
  },
  computed: {
    ...mapGetters('game', [
      'game',
      'home_team_id',
      'away_team_id',
      'opened_event',
      'inning_events_by_event',
      'events',
      'reversed_events',
      'event_text'
    ])
  }
}
</script>

<style lang="scss">
.gf-player {
  position: absolute;
  left: -30px;
  top: 155px;
  display: flex;

  &-left {
    z-index: 1;

    &-icon {
      justify-content: center;
      align-items: center;
      display: flex;
      height: 30px;
      width: 30px;
      border-radius: 50%;
      background-color: black;
      line-height: 100%;
      height: 30px;
    }
  }

  &-name {
    justify-content: center;
    align-items: center;
    display: flex;
    background-color: black;
    padding-left: 25px;
    padding-right: 12px;
    margin-left: -15px;
    height: 25px;
    margin-top: 2.5px;
    border-radius: 5px;
    font-size: 12px;
  }
}

</style>