<template>
  <v-container style="padding-top: 150px">
    <choose-season
      v-model:base="base"
      v-model:league_id="league_id"
      v-model:season="season"
      @input="handleChange()"
    ></choose-season>
    <v-sheet max-width="800" class="mx-auto">
      <data-table
        :loading="loading_runner_data"
        :data="formRunnerData"
        :density="$vuetify.display.mobile ? 'compact' : 'sparse'"
      ></data-table>
    </v-sheet>
    <v-card-text class="mt-4">
      <p class="mb-2">
        Eteneminen on aika siitä kun pallo irtoaa lukkarin kädestä siihen kun etenijä on pesässä. Vain lentomerkillä edetyt täydeksi etenemiseksi tulkitut etenemiset mitataan.
      </p>
      <p>
        Miesten Ykköspesiksestä data saatavilla kaudesta 2024 eteenpäin. 
      </p>
    </v-card-text>
  </v-container>
</template>

<script>
import ChooseSeason from '@/components/data/ChooseSeason.vue'
import DataTable from '@/components/data/DataTable.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: { ChooseSeason, DataTable },
  data: () => ({
    season: 2024,
    base: 1,
    league_id: 1
  }),
  created() {
    this.handleChange()
  },
  computed: {
    ...mapGetters('data', [
      'runner_data',
      'loading_runner_data'
    ]),
    formRunnerData() {
      if(!this.runner_data) return {}
      const d = this.runner_data.filter(p => p.base == this.base)

      let headers = [
        { key: "pos", text: "#", long_text: "Sijoitus" },
        { key: "player_name", text: "Nimi", long_text: "Pelaaja", left: true, lock: true },
        { key: "min_time", text: "Paras", long_text: "Paras eteneminen", left: false },
        { key: "avg", text: "Keskiarvo", long_text: "Aikojen keskiarvo", left: false },
        { key: "amount", text: "Määrä", long_text: "Mitattujen aikojen määrä", left: false },
      ]

      let data = d.map((r, i) => {
        return {
          pos: i + 1,
          player_name: r.runner,
          min_time: r.min_time + ' s',
          avg: r.average_time + ' s',
          amount: r.amount
        }
      })

      // const player = d.maps.players.find(p => p.id == player_id)

      return {
        data, headers, title: "TOP 20 Etenijät"
      }
    },
  },
  methods: {
    ...mapActions('data', [
      'getRunnerData'
    ]),
    handleChange() {
      this.getRunnerData({
        league_id: this.league_id,
        season: this.season
      })
    }
  }
}
</script>