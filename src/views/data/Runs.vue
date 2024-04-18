<template>
  <PesisData 
    specifier="tuodut"
    :formDataFunction="formTableData"
  ></PesisData>
</template>

<script>
import { mapGetters } from 'vuex'
import PesisData from '@/components/data/PesisData.vue'

export default {
  name: 'Runs',
  components: {
    PesisData
  },
  computed: {
    ...mapGetters('pt_data', [
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
  }
}
</script>