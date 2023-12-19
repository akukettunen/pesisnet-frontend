<template>
  <v-sheet class="mt-10" v-if="run_data">
    <div class="text-h4">
      Etenemisajat
      <v-btn class="ml-5" rounded fab size="small" color="primary">
        <v-tooltip
          activator="parent"
        >
          <div>
            ePesis mittaa miesten ja naisten superpesiksessä kaikki täydet etenemisajat. 
          </div>
          <div>
            Taulukossa etenemisten keskiarvot ja piikit pesänväleillä.
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
    <v-data-table
      hide-default-footer
      :headers="headers"
      :items="run_data"
    >
      <template #bottom></template>
    </v-data-table>
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    chosen_base: 1,
    bases: [ 
      { id: 1, text: "1-2" },
      { id: 2, text: "2-3" },
      { id: 3, text: "3-K" }
    ],
    headers: [
      { title: 'Pesänväli', align: 'start', key: 'base' },
      { title: 'Paras eteneminen (s)', align: 'end', key: 'min_aika' },
      { title: 'Keskiarvo (s)', align: 'end', key: 'avg_aika' },
      { title: 'Mitatut ajat (n)', align: 'end', key: 'amount' },
    ],
  }),
  computed: {
    ...mapGetters('players', [
      'run_data'
    ]),
    show_run_data() {
      return this.run_data.find(d => d.base == this.chosen_base)
    }
  }
}
</script>