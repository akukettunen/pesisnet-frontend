<template>
  <v-card style="padding: 20px; display: flex; justify-content: center;" flat>
    <!-- {{ game_dates }}
    {{ next_games }} -->
    <v-btn @click="previousDay()" class="mr-2">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-btn>
      {{ pretty_date }}
      <v-menu v-model="open" activator="parent" :close-on-content-click="false">
        <v-card max-width="600">
          <v-date-picker
            :model-value="date_formal"
            :month="month_index"
            @update:modelValue="setDateFormal($event); open = false;"
            hide-header
          >
          </v-date-picker>
        </v-card>
      </v-menu>
    </v-btn>
    <v-btn @click="nextDay()" class="ml-2">
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
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
      'next_games'
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
    ])
  }
}
</script>