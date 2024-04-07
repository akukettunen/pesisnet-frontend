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
    <!-- {{ player }} -->
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['player_id', 'team_id'],
  computed: {
    ...mapGetters('game', [
      'game',
      'game_data',
      'home_team_id',
      'away_team_id'
    ]),
    player() {
      if(!this.game || !this.game['home']) return {}
      if(!this.game_data || !this.game_data.liveResult) return {}

      let players_home = this.game['home'].players.map(p => {return {...p, side: 'home'}})
      let players_away = this.game['away'].players.map(p => {return {...p, side: 'away'}})
      let players = this.team_id == this.home_team_id ? players_home : players_away

      return players
              .find(p => {
                return p.id === this.player_id || (
                    p.number == this.player_id
                  )
              }
            )
    }
  }
}
</script>