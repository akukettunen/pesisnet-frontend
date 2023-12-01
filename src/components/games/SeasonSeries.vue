<template>
  <v-card flat>
    S: {{ seasonSeries.name }} {{ seasonSeries.group_name }}
    <game-card
      v-for="game in seasonSeries.games"
      :key="game.id + 'gamecard'"
      :game="game"
    ></game-card>
  </v-card>
</template>

<script>
import GameCard from "@/components/games/GameCard.vue"

export default {
  components: { GameCard },
  props: ['seasonSeries']
}
</script>