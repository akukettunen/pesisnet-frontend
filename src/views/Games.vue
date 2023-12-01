<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-container style="padding-top: 100px;">
    <DateChooser />
    <v-card v-if="!loading_games && date_games.organizers">
      <Organizer
        v-for="organizer in date_games.organizers"
        :key="organizer.id"
        :organizer="organizer"
      />
    </v-card>
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
    yes: 1
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
