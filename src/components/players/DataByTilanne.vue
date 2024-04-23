<template>
  <v-card id="cont-card" flat class="my-3">
    <div class="text-h4">
      Data tilanteittain
    </div>
    <div style="text-align: center;" class="text-h6 mt-3">
      {{ tilanne }}-tilanne
    </div>
    <v-sheet class="d-flex justify-center my-2">
      <v-btn
        class="ml-1"
        rounded
        size="small" 
        :color="tilanne == til ? 'primary' : ''"
        v-for="til in tilanteet" 
        :key="til + 'tilanne'"
        @click="tilanne = til"
      >
        {{ til }}
      </v-btn>
    </v-sheet>
    <div class="my-3">
      Lyöntejä tilanteessa
      <v-chip class="ml-3">
        {{ this.tilanne_events ? this.tilanne_events.length : 0 }}
      </v-chip>
    </div>
    <div class="text-h5 mt-5">
      Lyöntikartta
    </div>
    <hit-map :width="$vuetify.display.mobile ? 200 : 300" :events="tilanne_events"></hit-map>
    <div class="text-h5">
      Lyönnin tyypit
    </div>
    <pie-chart
      :data="pie_chart_data"
      :key="tilanne"
    ></pie-chart>
    <v-sheet class="mt-5" v-if="all_events_length">
      <div class="text-h5 mb-4">
        Kauden 2023 lyönnit 3D-kartalla
      </div>
      <div style="text-align: center;">
        <iframe style="border-radius: 10px;" v-show="animationKey" :key="animationKey" :src="`https://3d.pesis.net?player_id=${player.id}`" :width="windowWidth" height="500" frameborder="0"></iframe>
      </div>
        
      <div style="text-align: center;">
        <v-btn color="primary" @click="animationKey++">
          <span v-if="!animationKey">
            Aloita
            <v-icon>mdi-play</v-icon>
          </span>
          <span v-else>
            Alusta
            <v-icon>mdi-replay</v-icon>
          </span>
        </v-btn>
      </div>
    </v-sheet>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'
import PieChart from './PieChart.vue'
import HitMap from '@/components/players/HitMap.vue'
export default {
  components: { PieChart, HitMap },
  data: () => ({
    tilanteet: ['0', '1', '1-2', 'Ajo'],
    tilanne: '0',
    animationKey: 0
  }),
  computed: {
    ...mapGetters('players', [
      'events',
      'player'
    ]),
    tilanne_events() {
      if(!this.events) return []
      return this.events[this.tilanne]
    },
    windowWidth() {
      return document.getElementById("cont-card").offsetWidth
    },
    all_events_length() {
      if(!this.events) return
      const keys = Object.keys(this.events)
      let events = []
      keys.forEach(key => {
        events = events.concat(this.events[key])
      })

      return events.length
    },
    pie_chart_data() {
      if(!this.tilanne_events || !this.tilanne_events.length) return

      let data = {}
      this.tilanne_events.forEach(e => {
        if(!e.tyyppi) return
        else if(data[e.tyyppi]) data[e.tyyppi] = data[e.tyyppi] +  1
        else data[e.tyyppi] = 1
      })

      const labels = Object.keys(data)
      return {
        labels,
        datasets: [
          {
            data: labels.map(l => data[l]),
            backgroundColor: [
              '#77CEFF', // Light Blue
              '#0079AF', // Dark Blue
              '#123E6B', // Navy
              '#97B0C4', // Slate Blue
              '#A5C8ED', // Sky Blue
              '#D4E4F2', // Pale Blue
              '#3498db', // Dodger Blue
              '#1f618d', // Dark Blue
              '#5499C7', // Steel Blue
              '#5DADE2', // Light Sky Blue
              '#AED6F1', // Light Steel Blue
              '#aed6f1', // Periwinkle
              '#aed6f1', // Powder Blue
              '#aed6f1', // Light Cyan
              '#aed6f1'  // Light Slate Gray
            ]
          }
        ]
      }
    }
  }
}
</script>