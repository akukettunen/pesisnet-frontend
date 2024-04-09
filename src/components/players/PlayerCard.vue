<template>
  <v-card class="pa-3" style="z-index: 0; max-width: 100vw;">
    <v-row v-if="player && !loading_player">
      <v-col class="justify-center d-flex" cols="12" md="4">
        <v-avatar 
          :color="player.image && player.image.original ? 'white' : 'primary'" 
          variant="elevated" 
          :size="$vuetify.display.mobile ? 100 : 150"
        >
          <v-img
            v-if="player.image && player.image.original"
            :src="player.image.original"
            alt="Player image"
          ></v-img>
          <span v-else class="text-h5">
            {{ playerInitials }}
          </span>
        </v-avatar>
      </v-col>
      <v-col class="justify-center d-flex" cols="12" md="8">
        <v-sheet class="d-flex-column">
          <div style="text-align: center;" v-if="$vuetify.display.mobile" class="text-h5">
            {{ playerName }}
          </div>
          <div style="text-align: center;" v-else class="text-h3">
            {{ playerName }}
          </div>
          <v-sheet class="mt-10 d-flex flex-" :class="{ 'flex-column' : $vuetify.display.mobile }">
            <v-btn size="x-small" color="primary" @click="openPesiksenMaailma()">
              <v-icon class="mr-3">mdi-link</v-icon>
              Pesiksen maailma
              <v-tooltip
                activator="parent"
                location="bottom"
              >
                Pesiksen maailman pelaajakortti
              </v-tooltip>
            </v-btn>
            <v-btn size="x-small" :class="{ 'mt-3' : $vuetify.display.mobile, 'ml-3' : !$vuetify.display.mobile }" color="primary" @click="openPesisTulokset()">
              <v-icon class="mr-3">mdi-link</v-icon>
              Pesistulokset
              <v-tooltip
                activator="parent"
                location="bottom"
              >
                Pesistulokset.fi pelaajakortti
              </v-tooltip>
            </v-btn>
          </v-sheet>
        </v-sheet>
      </v-col>
    </v-row>
    <v-sheet style="text-align: center;" v-else>
      <v-progress-circular indeterminate size="40"></v-progress-circular>
    </v-sheet>
    <player-runs type="run" v-if="run_data && run_data.length"></player-runs>
    <player-runs type="play" v-if="play_data && play_data.length"></player-runs>
    <data-by-tilanne class="mt-5" :events="events" />
    <!-- {{ loadingPlayer }}
    {{ player }} -->
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DataByTilanne from '@/components/players/DataByTilanne.vue'
import PlayerRuns from './PlayerRuns.vue'

export default {
  components: { DataByTilanne, PlayerRuns },
  props: ['player_id'],
  created() {
    this.getPlayerData(this.player_id)
  },
  methods: {
    ...mapActions('players', [
      'getPlayerData'
    ]),
    openPesiksenMaailma() {
      window.open(`http://www.pesiksenmaailma.fi/index.php/pelaajakortit?pelaajaid=${this.player_id}&view=pelaajakortti`, "_blank")
    },
    openPesisTulokset() {
      window.open(`https://www.pesistulokset.fi/pelaaja/${this.player_id}#tab:1`, "_blank")
    }
  },
  computed: {
    ...mapGetters('players', [
      'player',
      'loading_player',
      'playerInitials',
      'playerName',
      'parsePlayerIdFromName',
      'events',
      'play_data',
      'run_data'
    ])
  }
}
</script>