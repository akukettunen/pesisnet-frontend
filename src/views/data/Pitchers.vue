<template>
  <v-container :style="`padding-top: ${$vuetify.display.mobile ? '80' : '150'}px`">
    <choose-season
      v-model:base="base"
      v-model:league_id="league_id"
      v-model:season="season"
      @input="handleChange()"
      :disabled_bases="[ 3 ]"
    ></choose-season>
    <v-sheet max-width="800" class="mx-auto">
      <data-table
        :loading="loading_pitcher_data"
        :data="formPitcherData"
        :density="$vuetify.display.mobile ? 'compact' : 'sparse'"
      ></data-table>
    </v-sheet>
    <v-card-text class="mt-4">
      <p class="mb-2">
        Lukkarivertailussa on mukana lukkarit, joilta on mitattu kaudella yli 20 etenemisaikaa pesänvälillä. 
      </p>
      <p>
        Taulukossa on kutakin lukkaria vastaan mitattujen pesänvälien keskiarvo. 
      </p>
      <p>
        Miesten Ykköspesiksestä data saatavilla kaudesta 2024 eteenpäin. 
      </p>
    </v-card-text>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DataTable from '@/components/data/DataTable.vue'
import ChooseSeason from '@/components/data/ChooseSeason.vue'

export default {
  components: { DataTable, ChooseSeason },
  created() {
    this.handleChange()
  },
  data: () => ({
    base: 1,
    season: 2024,
    league_id: 1
  }),
  computed: {
    formPitcherData() {
      if(!this.pitcher_data) return {}
      const d = this.pitcher_data.filter(p => p.base == this.base)

      let headers = [
        { key: "pos", text: "#", long_text: "Sijoitus" },
        { key: "player_name", text: "Nimi", long_text: "Pelaaja", left: true, lock: true },
        { key: "avg", text: "Keskiarvo", long_text: "Aikojen keskiarvo", left: false },
        { key: "amount", text: "Määrä", long_text: "Mitattujen aikojen määrä", left: false },
      ]

      let data = d.map((r, i) => {
        return {
          pos: i + 1,
          player_name: r.lukkari,
          avg: r.average_time + ' s',
          amount: r.amount
        }
      })

      // const player = d.maps.players.find(p => p.id == player_id)

      return {
        data, headers,
      }
    },
    ...mapGetters('data', [
      'pitcher_data',
      'loading_pitcher_data'
    ])
  },
  methods: {
    ...mapActions('data', [
      'getPitcherData'
    ]),
    handleChange() {
      this.getPitcherData({
        league_id: this.league_id,
        season: this.season,
        base: this.base
      })
    }
  }
}
</script>