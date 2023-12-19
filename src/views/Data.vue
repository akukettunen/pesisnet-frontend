<template>
  <v-container style="height: 100%;">
    <v-card flat class="px-3" style="padding-top: 80px; height: 100%;">
      <v-row>
        <v-col cols="12" md="6" class="">
          <v-card style="z-index: 10;" class="pa-2 overflow-visible" flat>
            <v-card-title>
              <v-icon>mdi-account-outline</v-icon>
              Pelaajahaku
            </v-card-title>
            <v-sheet class="py-3 flex-column">
              <v-card-text>Kokeile näitä</v-card-text>
              <v-btn
                v-for="pl in example_players"
                @click="player_name = pl.value"
                :key="pl.value" 
                class="ml-1 my-1" 
                variant="outlined"
                size="x-small"
              >
                  {{ pl.text }}
              </v-btn>
            </v-sheet>
            <v-sheet class="my-5">
              <vue-select
                v-model="player_name"
                v-if="!loading_players"
                :options="players"
                placeholder="Hae pelaajaa (Sukunimi Etunimi)"
              ></vue-select>
              <v-card v-else>
                <v-progress-linear color="primary" indeterminate />
                <v-card-text>Ladataan pelaajia...</v-card-text>
              </v-card>
            </v-sheet>
          </v-card>
          <player-card v-if="player_name" :key="player_name" :player_id="parsePlayerIdFromName(player_name)"></player-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import PlayerCard from '@/components/players/PlayerCard.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { PlayerCard },
  created() {
    if(!this.players.length) this.initAllPlayers()
  },
data: () => ({
  player_name: null,
  example_players: [
    { text: 'Roope Korhonen', value: 'Korhonen Roope (1456)' },
    { text: 'Janette Lepistö', value: 'Lepistö Janette (7132)' },
    { text: 'Mikko Kanala', value: 'Kanala Mikko (6131)' },
    { text: 'Virpi Hukka', value: 'Hukka Virpi (4365)' },
    { text: 'Otto Kauppinen', value: 'Kauppinen Otto (8518)' },
    { text: 'Emilia Linna', value: 'Linna Emilia (7584)' },

  ]
}),
  methods: {
    ...mapActions('players', [
      'initAllPlayers'
    ])
  },
  computed: {
    ...mapGetters('players', [
      'loading_players',
      'players',
      'parsePlayerIdFromName',
      'player'
    ])
  }
}
</script>

<style>
@import "vue-select/dist/vue-select.css";
</style>