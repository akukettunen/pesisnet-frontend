<template>
  <v-sheet @click="openEvent(event); $emit('event-clicked', event)" style="cursor: pointer;" >
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
        {{ event_text(event, instant, i).text }}
      </span>
      <span style="width: 70px; flex-grow: 1; text-align: right;">
        <v-icon size="18" color="red" v-for="(_, i) in event_text(event, instant, i).outs" :key="`out-${i}`">mdi-close</v-icon>
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
      'outsUpToEvent',
      'event_text'
    ]),
    reversed_events() {
      return this.event.events.reverse()
    }
  },
  methods: {
    ...mapActions('game', [
      'openEvent'
    ]),
  }
}
</script>