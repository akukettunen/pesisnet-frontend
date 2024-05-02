<template>
  <div style="display: flex;">
    <div>
      3-tilanteet
      <v-chip class="sport-font" label>
        {{ stats['runner_at_3'] }}
      </v-chip>
    </div>
    <div class="ml-5">
      Harhalla
      <v-chip class="sport-font" label>
        {{ stats['wtscore'] }}
      </v-chip>
    </div>
    <div class="ml-5">
      Vapaat
      <v-chip class="sport-font" label>
        {{ stats['walkscore'] }}
      </v-chip>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['side'],
  computed: {
    ...mapGetters('game', [
      'stats_by_side'
    ]),
    stats() {
      return this.stats_by_side(this.side)
    }
  }
}
</script>