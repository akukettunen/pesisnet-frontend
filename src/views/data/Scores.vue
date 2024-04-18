<template>
  <PesisData 
    specifier="lyodyt"
    :formDataFunction="formTableData"
  ></PesisData>
</template>

<script>
import PesisData from '@/components/data/PesisData.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    PesisData
  },
  computed: {
    ...mapGetters('pt_data', [
      'data'
    ]),
    formTableData() {
      if(!this.data) return {}
      const d = this.data

      let headers = [
        { key: "pos", text: "#", long_text: "Sijoitus", lock: true },
        { key: "player_name", text: "Nimi", long_text: "Pelaaja", left: true },
        { key: "teams", text: "J", long_text: "Joukkueet", left: false },
        { key: "matches", text: "O", long_text: "Ottelut", left: false },
        { key: "homeruns", text: "K", long_text: "Kunnarit", left: false },
        { key: "scorings", text: "L", long_text: "Lyödyt", left: false },
        // { key: "homeruns_and_scorings", text: "K + L", long_text: "Lyödyt", left: false },
        { key: "batpe_succeeded_3", text: "K + L", long_text: "Kunarit + Lyödyt", left: false },
      ]

      let data = d.data.map((r, i) => {
        return {
          pos: i + 1,
          player_name: d.maps.player.find(p => p.id == r.player_id).value.name,
          matches: r.matches,
          teams: r.team_ids.map(team_id => d.maps.team.find(t => t.id == team_id).value.shorthand).flat()[0],
          homeruns: r.homeruns,
          scorings: r.scorings,
          // homeruns_and_scorings: r.homeruns_and_scorings,
          batpe_succeeded_3: r.batpe_succeeded_3
        }
      })

      // const player = d.maps.players.find(p => p.id == player_id)

      return {
        data, headers,
         title: "Lyödyt"
      }
    }
  }
}
</script>