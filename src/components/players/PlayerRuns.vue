<template>
  <v-sheet class="mt-10" v-if="run_data">
    <div class="text-h4">
      <span v-if="type == 'run'">
        Etenemisajat
      </span>
      <span v-else>
        Suoritusajat
      </span>
      <v-btn class="ml-5" rounded fab size="small" color="primary">
        <v-tooltip
          v-if="type == 'run'"
          activator="parent"
        >
          <div>
            ePesis mittaa miesten ja naisten superpesiksessä kaikki täydet etenemisajat. 
          </div>
          <div>
            Taulukossa etenemisten keskiarvot ja piikit pesänväleillä.
          </div>
        </v-tooltip>
        <v-tooltip
          v-else
          activator="parent"
        >
          <div>
            ePesis mittaa miesten superpesiksessä etukenttäpelaajien ja lukkarin suoritukset näpeistä sekä kolmoskoppareiden suoritukset tappikumuroista. 
          </div>
          <div>
            Taulukossa pelaajan suoritusten keskiarvot ja parhaat pesille.
          </div>
        </v-tooltip>
        <v-icon>
          mdi-help
        </v-icon>
      </v-btn>
    </div>
    <div class="text-p my-5">
    </div>
    <!-- {{ run_data }} -->
    <!-- <div class="d-flex justify-center" variant="rounded">
      <v-btn
        @click="chosen_base = base.id"
        :color="base.id == chosen_base ? 'primary' : ''"
        v-for="base in bases" 
        class="mr-1" 
        size="small" 
        :key="base.id + 'base'" 
        rounded
      >
        {{ base.text }}
      </v-btn>
    </div> -->
    <div style="max-width: 100vw; overflow-x: scroll;">
      <v-data-table
        :density="$vuetify.display.mobile ? 'compact' : 'default'"
        hide-default-footer
        :headers="type == 'run' ? headers_run : headers_play"
        :items="type == 'run' ? run_data : play_data"
        width="100px"
      >
        <template v-slot:item.amount="{ value }">
          <v-chip label :color="value < 4 ? 'error' : 'secondary'">
            {{ value }}
          </v-chip>
        </template>
        <template v-slot:item.min_aika="{ value }">
          <v-chip class="sport-font" style="text-align: right;">
            {{ item_value(value) }}
          </v-chip>
        </template>
        <template v-slot:item.avg_aika="{ value }">
          <v-chip class="sport-font" style="text-align: right;">
            {{ item_value(value) }}
          </v-chip>
        </template>
        <template v-slot:item.avg_suoritus="{ value }">
          <v-chip class="sport-font" style="text-align: right;">
            {{ item_value(value) }}
          </v-chip>
        </template>
        <template #bottom></template>
      </v-data-table>
    </div>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: [
    'type' // run, play
  ],
  data: () => ({
    chosen_base: 1,
    bases: [ 
      { id: 1, text: "1-2" },
      { id: 2, text: "2-3" },
      { id: 3, text: "3-K" }
    ],
    headers_run: [
      { title: 'Pesänväli', align: 'start', key: 'base' },
      { title: 'Paras eteneminen (s)', align: 'end', key: 'min_aika' },
      { title: 'Keskiarvo (s)', align: 'end', key: 'avg_aika' },
      { title: 'Mitatut ajat (n)', align: 'end', key: 'amount' },
    ],
    headers_play: [
      { title: 'Pesälle', align: 'start', key: 'base' },
      { title: 'Paras suoritus (s)', align: 'end', key: 'min_aika' },
      { title: 'Keskiarvo (s)', align: 'end', key: 'avg_suoritus' },
      { title: 'Mitatut ajat (n)', align: 'end', key: 'amount' },
    ],
  }),
  computed: {
    ...mapGetters('players', [
      'run_data',
      'play_data'
    ]),
    show_run_data() {
      return this.run_data.find(d => d.base == this.chosen_base)
    }
  },
  methods: {
    item_value(val) {
      return this.$vuetify.display.mobile ? val : `${val} s`
    } 
  }
}
</script>