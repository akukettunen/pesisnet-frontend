<template>
  <v-card flat>
    <v-sheet class="my-3">
      <span class="text-h6">
        {{ seasonSeries.name }}
      </span>
      <span class="ml-5">
        {{ seasonSeries.group_name }}
      </span>
    </v-sheet>
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