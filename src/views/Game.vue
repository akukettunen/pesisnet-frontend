<template>
  <v-container fluid class="px-0" style="padding-top: 64px; max-width: 1000px;">
    <!-- {{ stats_by_hitter }} -->
    <v-sheet class="pa-10" style="height: 100%;">
      <GameHeader/>
      <GameBar/>
      <!-- <div class="my-5" v-for="a in happening_type_events" :key="a">
        {{ a }}
      </div>
      <div class="my-5" v-for="a in events" :key="a">
        {{ a }}
      </div> -->
      <v-row style="flex-direction: row;" class="my-5">
        <v-col cols="12" md="6">
          <v-skeleton-loader
            type="list-item-three-line	, list-item-three-line	, list-item-three-line	"
            style="width: 100%; max-width: calc(100vw - 80px); justify-content: center; display: flex;"
            :loading="loading_game"
          >
            <DataTable :data="stats_table('home')" />
          </v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="6">
          <v-skeleton-loader
            type="list-item-three-line	, list-item-three-line	, list-item-three-line	"
            style="width: 100%; max-width: calc(100vw - 80px); justify-content: center; display: flex;"
            :loading="loading_game"
          >
            <DataTable :data="stats_table('away')" />
          </v-skeleton-loader>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import GameBar from '@/components/games/game/GameBar.vue'
import GameHeader from '@/components/games/game/GameHeader.vue'
import DataTable from '@/components/data/DataTable.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  components: { GameHeader, GameBar, DataTable },
  created() {
    this.getGameData(this.$route.params.id)
  },
  methods: {
    ...mapActions('game', [
      'getGameData'
    ])
  },
  computed: {
    ...mapGetters('game', [
      'events', 
      'game',
      'stat_type_events',
      'happening_type_events',
      'stat_points',
      'stats_by_hitter',
      'stats_table',
      'loading_game'
    ]),
    exampleData() {
      return {
        headers: [
          { text: 'Pelaaja', key: 'player' },
          { text: '1-til', key: '1' },
        ],
        data: [
          { player: '1. Eetu Kettunen', 1: '95%' },
          { player: '2. Jari Lettunen', 1: '55%' },
          { player: '3. Tero Lettunen', 1: '98%' },
        ]
      }
    }
  }
}
</script>