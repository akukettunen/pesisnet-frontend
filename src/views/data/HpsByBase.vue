<template>
  <PesisData 
    specifier="karkilyonnit_pesavaleittain"
    :formDataFunction="formTableData"
    :dense="true"
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
        { key: "batpe_succeeded_0", text: "KL1", long_text: "Kärkilyönnit ykköselle", left: false },
        { key: "batpe_tries_0", text: "KY1", long_text: "Yritykset ykköselle", left: false },
        { key: "percentage_0", text: "%1", long_text: "Kärkilyöntiprosentti ykköselle", left: false },
        { key: "batpe_succeeded_1", text: "KL2", long_text: "Kärkilyönnit kakkoselle", left: false },
        { key: "batpe_tries_1", text: "KY2", long_text: "Yritykset kakkoselle", left: false },
        { key: "percentage_1", text: "%2", long_text: "Kärkilyöntiprosentti kakkoselle", left: false },
        { key: "batpe_succeeded_2", text: "KL3", long_text: "Kärkilyönnit kolmoselle", left: false },
        { key: "batpe_tries_2", text: "KY3", long_text: "Yritykset kolmoselle", left: false },
        { key: "percentage_2", text: "%3", long_text: "Kärkilyöntiprosentti kolmoselle", left: false },
        { key: "batpe_succeeded_3", text: "KLK", long_text: "Kärkilyönnit kotiin", left: false },
        { key: "batpe_tries_3", text: "KYK", long_text: "Yritykset kotiin", left: false },
        { key: "percentage_3", text: "%K", long_text: "Kärkilyöntiprosentti kotiin", left: false },
        { key: "batpe_total_succeeded", text: "K", long_text: "Kärkilyönnit", left: false },
        { key: "batpe_total_tries", text: "KY", long_text: "Kärkilyöntiyritykset", left: false },
        { key: "percentage", text: "%", long_text: "Kärkilyöntiprosentti", left: false },
        // { key: "run_tries", text: "TY", long_text: "Tuotujen yritykset", left: false },
        // { key: "homeruns_and_scorings", text: "K + L", long_text: "Lyödyt", left: false },
        // { key: "batpe_succeeded_3", text: "K + L", long_text: "Kunarit + Lyödyt", left: false },
      ]

      /*
        batpe_succeeded_0
        batpe_tries_0
        batpe_succeeded_1
        batpe_tries_1
        batpe_succeeded_2
        batpe_tries_2
      */

      let data = d.data.map((r, i) => {
        const percentage_0 = (r.batpe_succeeded_0 / (parseInt(r.batpe_tries_0) || 1) * 100).toFixed(1)
        const percentage_1 = (r.batpe_succeeded_1 / (parseInt(r.batpe_tries_1) || 1) * 100).toFixed(1)
        const percentage_2 = (r.batpe_succeeded_2 / (parseInt(r.batpe_tries_2) || 1) * 100).toFixed(1)
        const percentage_3 = (r.batpe_succeeded_3 / (parseInt(r.batpe_tries_3) || 1) * 100).toFixed(1)
        const percentage = (r.batpe_total_succeeded / (parseInt(r.batpe_total_tries) || 1) * 100).toFixed(1)

        return {
          pos: i + 1,
          player_name: d.maps.player.find(p => p.id == r.player_id).value.name,
          teams: r.team_ids.map(team_id => d.maps.team.find(t => t.id == team_id).value.shorthand).flat()[0],
          matches: r.matches,
          batpe_succeeded_0: r.batpe_succeeded_0,
          batpe_tries_0: r.batpe_tries_0,
          percentage_0,
          batpe_succeeded_1: r.batpe_succeeded_1,
          batpe_tries_1: r.batpe_tries_1,
          percentage_1,
          batpe_succeeded_2: r.batpe_succeeded_2,
          batpe_tries_2: r.batpe_tries_2,
          percentage_2,
          batpe_succeeded_3: r.batpe_succeeded_3,
          batpe_tries_3: r.batpe_tries_3,
          percentage_3,
          batpe_total_succeeded: r.batpe_total_succeeded,
          batpe_total_tries: r.batpe_total_tries,
          percentage
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