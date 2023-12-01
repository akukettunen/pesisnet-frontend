<template>
  <v-card class="game-card" @click="$router.push(`/games/${game.id}`)">
    <game-card-team :team="game.home"></game-card-team>
    <game-card-team :team="game.away"></game-card-team>
    <!-- {{ game }} -->
  </v-card>
</template>

<script>
import GameCardTeam from '@/components/games/GameCardTeam.vue'
export default {
  components: { GameCardTeam },
  props: ['game']
}
</script>

<style lang="scss" scoped>
.game-card {
  border-top: 1px solid grey;
}
</style>