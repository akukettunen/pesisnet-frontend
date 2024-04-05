<template>
  <v-sheet v-if="player" style="background-color: rgba(0, 0, 0, 0)">
    <v-avatar size="45px" color="secondary">
      <div 
        :style="{ 
          'height': '50px',
          'width': '50px',
          'background-image': `url('${player.image.medium}')`,
          'background-size': '170%', 
          'background-position': 'center top',
        }"
        class="my-avatar-img" 
        v-if="player.image.medium" 
        width="40" 
        style="border-radius: 50%;" cover 
      />
      <v-icon size="30" v-else>mdi-account-outline</v-icon>
    </v-avatar>
    <v-chip class="pl-3" style="opacity: 1;" label flat>
      {{ player.first_name[0] }}. {{ player.last_name }}
    </v-chip>
    <!-- {{ player.number }} -->
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['player_id'],
  computed: {
    ...mapGetters('game', [
      'game'
    ]),
    player() {
      if(!this.game || !this.game['home']) return {}
      return this.game['home'].players.concat(this.game['away'].players).find(p => p.id == this.player_id)
    }
  }
}
</script>