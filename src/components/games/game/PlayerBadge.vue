<template>
  <div v-if="player" style="background-color: rgba(0, 0, 0, 0); display: flex; align-items: center;">
    <v-avatar size="40px" color="secondary" style="border: 2px solid lightgrey;">
      <div 
        :style="{ 
          'height': '50px',
          'width': '50px',
          'background-image': `url('${player.image ? player.image.medium : ''}')`,
          'background-size': '170%', 
          'background-position': 'center top',
        }"
        class="my-avatar-img" 
        v-if="player.image" 
        width="40" 
        style="border-radius: 50%;" cover 
      />
      <v-icon size="30" v-else>mdi-account-outline</v-icon>
    </v-avatar>
    <div class="pr-3 pl-5 sport-font" :style="`color: ${$vuetify.theme.dark ? 'white' : 'black'}; font-size: 12px; border-radius: 5px; border: 2px solid lightgrey; background-color: white; white-space: nowrap; text-align: center; height: 20px; line-height: 15px; margin-left: -10px;`">
      {{ player_name }}
    </div>
    <!-- {{ player }} -->
  </div>
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
    player_name() {
      if(!this.player) return ''
      return `${this.player.first_name ? this.player.first_name[0] : ''}. ${ this.player.last_name }`
    },
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