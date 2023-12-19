<template>
  <v-container fluid class="px-0" style="padding-top: 64px; max-width: 1000px;">
    <v-sheet class="pa-10" style="height: 100%; background-color: blue;">
      <GameHeader></GameHeader>
      <div style="background-color: white;">
      </div>
    </v-sheet>
  </v-container>
</template>

<script>
import GameHeader from '@/components/games/game/GameHeader.vue'
export default {
  components: { GameHeader }
}
</script>