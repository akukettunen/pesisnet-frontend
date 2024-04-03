<template>
  <div class="mt-3" v-if="game.prizes">
    <div v-for="prize in game.prizes[side]" :key="prize.id">
      <span>
        {{ prize.prize.name }}
      </span>
      <!-- <v-img style="display: inline-block; border-radius: 10px;" height="50" width="50" :src="prize.player.image.medium">

      </v-img> -->
      <span class="ml-2">
        {{ prize.player.name }}
      </span>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: ['side'],
  computed: {
    ...mapGetters('game', [
      'game'
    ])
  }
}
</script>