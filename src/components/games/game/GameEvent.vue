<template>
  <v-sheet @click="openEvent(event); $emit('event-clicked', event)" style="cursor: pointer;" >
    <!-- {{ event }} -->
    <v-sheet 
      v-for="(instant, i) in reversed_events" 
      style="cursor: pointer;" 
      class="d-flex justify-space-between mb-2" 
      :key="`${event.id}_${i}`"
    >
      <!-- EVERY INSTANT HAS A runnersAtBases -->
      <!-- {{ instant }} -->
      <span>
        {{ event_text(instant, i).text }}
      </span>
      <span style="width: 70px; flex-grow: 1; text-align: right;">
        <v-icon size="18" color="red" v-for="(_, i) in event_text(instant, i).outs" :key="`out-${i}`">mdi-close</v-icon>
      </span>
    </v-sheet>
    <v-divider></v-divider>
  </v-sheet>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['event'],
  computed: {
    ...mapGetters('game', [
      'game',
      'outsUpToEvent'
    ]),
    reversed_events() {
      return this.event.events.reverse()
    }
  },
  methods: {
    ...mapActions('game', [
      'openEvent'
    ]),
    event_text(a, index) {
      let ret = {}

      const text = a.texts.map((t) => {
        if(typeof t == 'string') return t
        else if (t.type == "stat" && t.out) ret['outs'] = this.outsUpToEvent(this.event, index)
        else if (t.type == 'player') {
          const side = this.game.home?.id == t.team ? 'home' : 'away'
          return this.game[side]?.players.find(p => (p.id == t.id && t.id) || (p.number == t.number && t.number))?.name
        }
        else return t.text
      })
      .filter(e => !!e).join(' ')

      return { text, ...ret }
    }
  }
}
</script>