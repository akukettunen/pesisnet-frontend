<template>
  <v-expand-transition>
    <v-sheet v-if="latest_hitter">
      {{ latest_hitter }}
    </v-sheet>
  </v-expand-transition>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('game', [
      'latest_hitter'
    ])
  }
}
</script>