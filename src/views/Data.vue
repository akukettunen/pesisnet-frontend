<template>
  <v-container class="mx-auto" style="height: 100%;">
    <v-app-bar>
      <v-btn style="padding-top: 100px;"></v-btn>
    </v-app-bar>
    <v-card max-width="1000" flat class="px-3 mx-auto" style="padding-top: 80px; height: 100%;">
      <v-card style="z-index: 10;" class="pa-2 overflow-visible" flat>
        <v-card-title>
          <v-icon>mdi-account-outline</v-icon>
          Pelaajahaku
        </v-card-title>
        <v-sheet class="py-3 flex-column">
          <v-card-text>Kokeile näitä</v-card-text>
          <v-btn
            v-for="pl in example_players"
            @click="player_name = pl.value; chosen_player = null;"
            :key="pl.value" 
            class="ml-1 my-1" 
            variant="outlined"
            size="x-small"
          >
              {{ pl.text }}
          </v-btn>
        </v-sheet>
        <v-sheet class="my-5">
          <!-- <vue-select
            v-model="player_name"
            v-if="!loading_players"
            :options="players"
            placeholder="Hae pelaajaa (Sukunimi Etunimi)"
          ></vue-select> -->
          <!-- <v-card v-else>
            <v-progress-linear color="primary" indeterminate />
            <v-card-text>Ladataan pelaajia...</v-card-text>
          </v-card> -->
          <b-select
            :options="mapped_players"
            placeholder="Hae pelaajaa nimellä..."
            @search="inputChanged($event)"
            @option:selected="player_name = chosen_player.label"
            v-model="chosen_player"
            :filter="filterPlayers"
          ></b-select>
          <!-- <v-text-field
            placeholder="Hae pelaajaa nimellä"
            v-model="player_name_typed"
            @input="inputChanged($event)"
          >
          <v-menu 
            dense
            activator="parent" 
            :value="false"
            max-height="300px"
          >
            <v-list dense>
              <v-list-item
                dense
                v-for="(item, index) in filtered_players"
                :key="index"
                :value="index"
              >
                <v-list-item-title dense>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          </v-text-field> -->
        </v-sheet>
      </v-card>
      <player-card v-if="player_name" :key="player_name" :player_id="parsePlayerIdFromName(player_name)"></player-card>
    </v-card>
  </v-container>
</template>

<script>
import PlayerCard from '@/components/players/PlayerCard.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: { PlayerCard },
  created() {
    // if(!this.players.length) this.initAllPlayers()
  },
  data: () => ({
    player_name: null,
    chosen_player: null,
    player_name_typed: null,
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
    ]),
    inputChanged(e) {
      this.player_name_typed = e
      this.getPlayers(e)
    },
    ...mapActions('players', [
      'getPlayers'
    ]),
    filterPlayers() {
      if(!this.player_name_typed) return []

      return this.players.filter(p => {
        let left = this.player_name_typed.split(' ').filter(spot => p.name.includes(spot)).length
        let right = this.player_name_typed.split(' ').length

        return left >= right
      }).map(p => {
        let [f, l] = p.name.split(' ')
        f = f.charAt(0).toUpperCase() + f.slice(1).toLowerCase();
        l = l.charAt(0).toUpperCase() + l.slice(1).toLowerCase();

        return {
          label: `${f} ${l} (${p.id})`,
          code: p.id
        }
      })
    }
  },
  computed: {
    mapped_players() {
      if(!this.player_name_typed) return []

      return this.players.filter(p => {
        let left = this.player_name_typed.split(' ').filter(spot => p.name.includes(spot)).length
        let right = this.player_name_typed.split(' ').length

        return left >= right
      }).map(p => {
        let [f, l] = p.name.split(' ')
        f = f.charAt(0).toUpperCase() + f.slice(1).toLowerCase();
        l = l.charAt(0).toUpperCase() + l.slice(1).toLowerCase();

        return {
          label: `${f} ${l} (${p.id})`,
          code: p.id
        }
      })
    },
    ...mapGetters('players', [
      'loading_players',
      'players',
      'parsePlayerIdFromName',
      'player'
    ]),
    ...mapGetters('data', [
      'maps',
      'season_serieses'
    ])
  }
}
</script>

<style>
@import "vue-select/dist/vue-select.css";
</style>