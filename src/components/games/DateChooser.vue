<template>
  <v-card style="padding: 20px; display: flex; justify-content: center;" flat>
    <v-btn @click="previousDay()" class="mr-2">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn>
      {{ format(date) }}
      <v-menu v-model="open" activator="parent" :close-on-content-click="false">
        <v-card max-width="600">
          <v-date-picker
            :events="game_dates_formal"
            :first-day-of-week="1"
            :model-value="date_formal"
            :month="month_index"
            @update:modelValue="setDateFormal($event); open = false;"
            hide-header
            :show-adjacent-month="true"
          >
          </v-date-picker>
        </v-card>
        <!-- {{ date_formal }}
        {{ game_dates_formal }} -->
      </v-menu>
    </v-btn>
    <v-btn @click="nextDay()" class="ml-2">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import date from 'date-and-time'

export default {
  data: () => ({
    open: false
  }),
  computed: {
    ...mapGetters('games', [
      'date',
      'date_formal',
      'month_index',
      'year',
      'month',
      'day',
      'pretty_date',
      'game_dates',
      'next_games',
      'previous_games',
      'game_dates_formal'
    ])
  },
  methods: {
    ...mapMutations({
      SET_DATE: 'games/SET_DATE'
    }),
    ...mapActions('games', [
      'setDateFormal',
      'getDateGames',
      'nextDay',
      'previousDay'
    ]),
    format(d) {
      const diff = Math.round(date.subtract(new Date(), new Date(d)).toDays())
      if(diff == '2') return 'Eilen'
      if(diff == '1') return 'Tänään'
      if(diff == '0') return 'Huomenna'

      return date.format(new Date(d), 'DD.MM.YY')
    },
  }
}
</script>