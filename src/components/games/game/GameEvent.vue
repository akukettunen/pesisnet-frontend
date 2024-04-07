<template>
  <v-sheet @click="openEvent(event); $emit('event-clicked', event)" style="cursor: pointer;" >
    <!-- {{ event }} -->
    <!-- { 
      "id": 0, 
      "groupType": "is", 
      "period": 0, 
      "inning": 3, 
      "batTurn": 1, 
      "team": 12485, 
      "batter": null, 
      "pairIndex": null, 
      "hitNumber": null, 
      "hit": null, 
      "events": [ { "texts": [ { "type": "team", "id": 12485 }, "muutti lyöntijärjestystä. Uusi lyöntijärjestys:", { "type": "substitution", "as": { "id": 0, "eventType": "is", "newLineUp": [ 1, 2, 3, 4, 12, 6, 7, 8, 9, 10, 11, 5 ], "pitcher": 9 }, "team": 12485, "newLineUp": [ 1, 2, 3, 4, 12, 6, 7, 8, 9, 10, 11, 5 ], "pitcher": 9 } ], "runnersAtBases": [ null, null, null, null, null ] } ], "timestamp": null, "created": 1712498266, "updated": 1712498266 } -->

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
        } else if(t.type == 'team') {
          const side = this.game.home?.id == t.team ? 'home' : 'away'
          return this.game[side].name
        } else if(t.type == "substitution") {
          const side = this.game.home?.id == t.team ? 'home' : 'away'
          if(!side) return

          const lineup = t.as?.newLineUp || t.newLineUp
          const names = lineup.map((id, i) => {
            let val = (i + 1) + '. ' + this.game[side].players.find(p => p.id == id || p.number == id).name + ( i + 1 == t.as?.newLineUp.length ? '' : ',' )
            return val
          })

          return names.join('\n')
        }
        else return t.text
      })
      .filter(e => !!e).join(' ')

      return { text, ...ret }
    }
  }
}
</script>