<template>
  <v-card class="pa-3" style="z-index: 0;">
    <v-row v-if="player && !loading_player">
      <v-col cols="4">
        <v-avatar :color="player.image && player.image.original ? 'white' : 'primary'" variant="elevated" size="150">
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
      <v-col cols="8">
        <v-sheet class="d-flex-column">
          <span v-if="$vuetify.display.mobile" class="text-h5">
            {{ playerName }}
          </span>
          <span v-else class="text-h3">
            {{ playerName }}
          </span>
          <v-sheet class="mt-10 d-flex">
            <v-btn size="x-small" class="mr-1" color="primary" @click="openPesiksenMaailma()">
              <v-icon class="mr-3">mdi-link</v-icon>
              Pesiksen maailma
              <v-tooltip
                activator="parent"
                location="bottom"
              >
                Pesiksen maailman pelaajakortti
              </v-tooltip>
            </v-btn>
            <v-btn size="x-small" class="ml-1" color="primary" @click="openPesisTulokset()">
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
    <player-runs></player-runs>
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
      'events'
    ])
  }
}
</script>