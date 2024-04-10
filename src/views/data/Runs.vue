<template>
  <v-container style="padding-top: 150px;">
    <ChooseSeries @update="handleUpdate()" />
    <div style="justify-content: center; display: flex;" class="mb-15 mt-10">
      <data-table
      :data="formTableData"
      density="sparse"
      :loading="loading_boards"
      ></data-table>
      <!-- {{ data }} -->
      <!-- {{ data ? data.maps : '' }} -->
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ChooseSeries from '@/components/data/ChooseSeries.vue'
import DataTable from '@/components/data/DataTable.vue'

export default {
  components: {
    ChooseSeries,
    DataTable
  },
  created() {
    if(this.maps) this.handleUpdate()
    else {
      var self = this
      setTimeout(() => {
        self.handleUpdate()
      }, 1000)
    }
  },
  computed: {
    ...mapGetters('data', [
      'season_id',
      'season_series_id',
      'phase_id',
      'maps'
      // 'loading_maps'      
    ]),
    ...mapGetters('standings', [
      'data',
      'loading_boards'
    ]),
    formTableData() {
      if(!this.data) return {}
      const d = this.data

      let headers = [
        { key: "pos", text: "#", long_text: "Sijoitus", lock: true },
        { key: "player_name", text: "Nimi", long_text: "Pelaaja", left: true },
        { key: "teams", text: "J", long_text: "Joukkueet", left: false },
        { key: "matches", text: "O", long_text: "Ottelut", left: false },
        { key: "runs", text: "T", long_text: "Tuodut", left: false },
        // { key: "run_tries", text: "TY", long_text: "Tuotujen yritykset", left: false },
        // { key: "homeruns_and_scorings", text: "K + L", long_text: "Lyödyt", left: false },
        // { key: "batpe_succeeded_3", text: "K + L", long_text: "Kunarit + Lyödyt", left: false },
      ]

      let data = d.data.map((r, i) => {
        return {
          pos: i + 1,
          player_name: d.maps.player.find(p => p.id == r.player_id).value.name,
          teams: r.team_ids.map(team_id => d.maps.team.find(t => t.id == team_id).value.shorthand).flat()[0],
          matches: r.matches,
          runs: r.runs,
          runs_tries: r.runs_tries,
        }
      })

      // const player = d.maps.players.find(p => p.id == player_id)

      return {
        data, headers,
         title: "Tuodut"
      }
    }
  },
  methods: {
    ...mapActions('standings', [
      'getRuns'
    ]),
    handleUpdate() {
      this.getRuns({
        season_id: this.season_id, 
        series_id: this.season_series_id, 
        phase_id: this.phase_id
      })
    }
  }
}
</script>