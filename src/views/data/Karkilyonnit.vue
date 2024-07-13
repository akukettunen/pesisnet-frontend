<template>
  <PesisData 
    specifier="karkilyonnit"
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
        { key: "pos", text: "#", long_text: "Sijoitus" },
        { key: "player_name", text: "Nimi", long_text: "Pelaaja", left: true },
        { key: "teams", text: "J", long_text: "Joukkueet", left: false },
        { key: "matches", text: "O", long_text: "Ottelut", left: false },

        { key: "batpe_succeeded_0", text: "K1", long_text: "Kärkilyonnit ykköselle", left: false },
        { key: "batpe_succeeded_1", text: "K2", long_text: "Kärkilyonnit kakkoselle", left: false },
        { key: "batpe_succeeded_2", text: "K3", long_text: "Kärkilyonnit kolmoselle", left: false },
        { key: "batpe_succeeded_3", text: "KK", long_text: "Kärkilyonnit kotiin", left: false },
        { key: "batpe_succeeded_3", text: "KK", long_text: "Kärkilyonnit kotiin", left: false },
        { key: "batpe_total_succeeded", text: "YHT", long_text: "Kärkilyönnit yhteensä", left: false },
        { key: "batpe_total_tries", text: "YRI", long_text: "Kärkilyöntiyritykset", left: false },
        { key: "percentage", text: "%", long_text: "Kärkilyöntiprosentti", left: false },
        // { key: "homeruns_and_scorings", text: "K + L", long_text: "Lyödyt", left: false },
      ]

      
      let data = d.data.map((r, i) => {
        const percentage = `${(r.batpe_total_succeeded / r.batpe_total_tries * 100).toFixed(1)}`
        return {
          pos: i + 1,
          player_name: d.maps.player.find(p => p.id == r.player_id).value.name,
          matches: r.matches,
          teams: r.team_ids.map(team_id => d.maps.team.find(t => t.id == team_id).value.shorthand).flat()[0],
          batpe_succeeded_0: r.batpe_succeeded_0,
          batpe_succeeded_1: r.batpe_succeeded_1,
          batpe_succeeded_2: r.batpe_succeeded_2,
          batpe_succeeded_3: r.batpe_succeeded_3,
          batpe_total_succeeded: r.batpe_total_succeeded,
          batpe_total_tries: r.batpe_total_tries,
          percentage
        }
      })

      // const player = d.maps.players.find(p => p.id == player_id)

      return {
        data, headers,
         title: "Kärkilyönnit"
      }
    }
  }
}
</script>