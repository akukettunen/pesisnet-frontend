<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container style="padding-top: 100px; max-width: 1000px;">
    <DateChooser />
    <v-sheet v-if="!loading_games && date_games.organizers">
      <v-expansion-panels accordion v-model="panels" multiple>
        <v-expansion-panel
          class="pa-0"
          v-model="panels"
          v-for="(organizer, i) in date_games.organizers"
          :key="i"
        >
          <v-expansion-panel-title>
            <span class="text-h5">
              {{ organizer.name }}
            </span>
          </v-expansion-panel-title>
          <v-expansion-panel-text style="padding: 0 !important;">
            <Organizer
              :organizer="organizer"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-sheet>
    <v-card flat v-else-if="loading_games" style="text-align: center;">
      <v-progress-circular size="50" indeterminate></v-progress-circular>
    </v-card>
    <v-card flat v-else style="text-align: center;">
      <v-card-title class="mx-auto">
        Ei pelejä
      </v-card-title>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Organizer from '@/components/games/Organizer.vue'
import DateChooser from '@/components/games/DateChooser.vue'

export default {
  data: () => ({
    panels: [0, 1, 2, 3]
  }),
  components: { Organizer, DateChooser },
  created() {
    this.initDate()

    this.$nextTick(() => {
      this.getDateGames()
      this.initGameDates()
    })
  },
  methods: {
    ...mapActions({
      getDateGames: 'games/getDateGames',
      initDate: 'games/initDate',
      initGameDates: 'games/initGameDates'
    })
  },
  computed: {
    // ...mapGetters({
    //   date_games: 'games/date_games'
    // }),
    ...mapGetters('games', [
      'date_games',
      'loading_games'
    ])
  }
}
</script>
