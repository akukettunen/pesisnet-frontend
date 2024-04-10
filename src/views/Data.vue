<template>
  <v-container :fluid="$vuetify.display.mobile" class="mx-auto" style="height: 100%; max-width: 100vw;">
    <v-app-bar>
      <v-btn style="padding-top: 100px;"></v-btn>
    </v-app-bar>
    <v-card max-width="1000" flat class="px-3 mx-auto" :style="`padding-top: ${$vuetify.display.mobile ? '20px' : '80px'}; height: 100%;`">
      <v-card style="z-index: 10;" class="pa-2 overflow-visible" flat>
        <!-- <v-card-title>
          <v-icon>mdi-account-outline</v-icon>
          Pelaajahaku
        </v-card-title> -->
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
        <v-sheet 
          class="my-5" 
          :class="{ 
            'dark': $vuetify.theme.name === 'dark', 
            'light' : $vuetify.theme.name !== 'dark' 
          }">
          <b-select
            placeholder="Hae pelaajaa nimellä..."
            @search="inputChanged($event)"
            @option:selected="player_name = chosen_player.label"
            v-model="chosen_player"
            :filter="filterPlayers"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching && search.length > 1">
                Ei tuloksia haulle <em>{{ search }}</em
                >.
              </template>
              <em v-else style="opacity: 0.5">Kirjoita kaksi kirjainta</em>
            </template>
          </b-select>

          <v-select 
            class="mt-3"
            v-model="season"
            :items="[2020, 2021, 2022, 2023, 2024].reverse()" 
            variant="outlined" 
            placeholder="Kausi" 
            label="Kausi"
            density="compact"
          >

          </v-select>
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
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
      'initAllPlayers',
      'getPlayerData'
    ]),
    ...mapMutations('players', [
      'SET_PLAYER_CARD_SEASON'  
    ]),
    inputChanged(e) {
      if(!e) this.player_name_typed = null
      this.player_name_typed = e.toLowerCase()
      this.getPlayers(e.toLowerCase())
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
        l = l.charAt(0).toUpperCase() + l.slice(1).toLowerCase();
        f = f.split('-').map(part => { 
          // console.log(part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() )
          return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase() 
        }).join('-')

        return {
          label: `${f} ${l} (${p.id})`,
          code: p.id
        }
      })
    }
  },
  computed: {
    season: {
      get() {
        return this.player_card_season
      },
      set(val) {
        var self = this
        this.SET_PLAYER_CARD_SEASON(val)

        if(!this.player || !this.player.id) return

        this.$nextTick(() => {
          self.getPlayerData(self.player.id)
        })
      }
    },
    ...mapGetters('players', [
      'loading_players',
      'players',
      'parsePlayerIdFromName',
      'player',
      'player_card_season'
    ]),
    ...mapGetters('data', [
      'maps',
      'season_serieses'
    ])
  }
}
</script>

<style scoped>
@import "vue-select/dist/vue-select.css";

.dark :deep() {
  --vs-controls-color: #d1d1d1;
  --vs-border-color: #a6a6a6;

  --vs-dropdown-bg: #020A0F;
  --vs-dropdown-color: #c7c7c7;
  --vs-dropdown-option-color: #c5c5c5;

  --vs-selected-bg: #d4d4d4;
  --vs-selected-color: #eeeeee;

  --vs-search-input-color: #eeeeee;

  --vs-dropdown-option--active-bg: #4c6ac3;
  --vs-dropdown-option--active-color: #eeeeee;
}

.light :deep() {
  --vs-controls-color: #090225;
  --vs-border-color: #1f1f1f;

  --vs-dropdown-bg: #ffffff;
  --vs-dropdown-color: #1f1f1f;
  --vs-dropdown-option-color: #121212;

  --vs-selected-bg: #dadada;
  --vs-selected-color: #161616;

  --vs-search-input-color: #363636;

  --vs-dropdown-option--active-bg: #cdcdcd;
  --vs-dropdown-option--active-color: #222222;
}
</style>