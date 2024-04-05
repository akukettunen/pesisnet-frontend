<template>
  <v-row class="my-5">
    <v-col order-md="1" order="2" cols="12" md="6">
      <v-sheet elevation="2" style="max-height: 500px; overflow-y: scroll; height: 100%;">
        <transition-group name="list">
          <div class="my-2 px-5 list-item" v-for="(event) in reversed_events" :key="event.id + 'event'">
            <game-event
              @event-clicked="$emit('event-clicked', $event); $refs.field.handleEvent($event)"
              :event="event"
            />
            </div>
        </transition-group>
      </v-sheet>
    </v-col>
    <v-col order-md="2" order="1" class="justify-center d-flex" cols="12" md="6" style="flex-direction: column;">
      <div v-if="game_data.liveResult" style="text-align: center;">
        <span v-for="(_, i) in game_data.liveResult.outs" :key="`outs-${i}`">
          <v-icon color="red">mdi-close</v-icon>
        </span>
      </div>
      <div style="position: relative; justify-content: center;" class="d-flex">
        <GameField ref="field" :hits="[{x: 0.5, y: 0.4}]" :width="width" :height="height" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import GameField from '@/components/games/game/GameField.vue'
import GameEvent from '@/components/games/game/GameEvent.vue'
export default {
  components: {
    GameField,
    GameEvent
  },
  data: () => ({
    width: 275,
    height: 400
  }),
  computed: {
    ...mapGetters('game', [
      'reversed_events',
      'game_data',
      'events'
    ]),
    current_inning_events() {
      if(!this.game_data || !this.game_data.liveResult) return []

      const { batTurn, lastInning, maxPlayedPeriod } = this.game_data.liveResult

      return [...this.reversed_events].filter(e => {
        return e.period == maxPlayedPeriod && e.inning == lastInning && e.batTurn == batTurn
      })
    }
  },
  watch: {
    'events': {
      handler(newVal) {
        if(newVal.length <= 1) return
        
        this.$nextTick(() => {
          const new_event = [...newVal][newVal.length - 1]
          this.$refs.field.handleEvent(new_event)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>