<template>
  <v-container style="padding-top: 150px">
    <v-row max-width="500" class="mx-auto">
      <v-col cols="12" md="4">
        <v-select
          density="compact"
          :items="leagueOptions"
          label="Sarja"
          variant="outlined"
          v-model="league_id"
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          density="compact"
          :items="yearOptions[league_id]"
          label="Kausi"
          variant="outlined"
          v-model="season"
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          density="compact"
          :items="baseOptions"
          label="Pesänväli"
          variant="outlined"
          v-model="base"
        ></v-select>
      </v-col>
    </v-row>
    <v-sheet max-width="800" class="mx-auto">
      <data-table
        :loading="loading_pitcher_data"
        :data="formPitcherData"
        :density="$vuetify.display.mobile ? 'compact' : 'sparse'"
      ></data-table>
    </v-sheet>
    <v-card-text>
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

export default {
  components: { DataTable },
  created() {
    this.handleChange()
  },
  data: () => ({
    league_id_value: 1,
    yearOptions: {
      1: [2024, 2023, 2022, 2021],
      2: [2024, 2023, 2022, 2021],
      3: [2024],
    },
    leagueOptions: [
      { title: 'Miesten Superpesis', value: 1 },
      { title: 'Naisten Superpesis', value: 2 },
      { title: 'Miesten Ykköspesis', value: 3 },
    ],
    baseOptions: [
      { title: '1-2 väli', value: 1 },
      { title: '2-3 väli', value: 2 }
    ],
    base: 1,
    season_number: 2023,
  }),
  computed: {
    season: {
      get() {
        return this.season_number
      },
      set(val) {
        this.season_number = val

        this.$nextTick(() => {
          this.handleChange()
        })
      }
    },
    league_id: {
      get() {
        return this.league_id_value
      },
      set(val) {
        this.league_id_value = val
        if(val == 3) this.season = 2024

        this.$nextTick(() => {
          this.handleChange()
        })
      }
    },
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
        season: this.season
      })
    }
  }
}
</script>