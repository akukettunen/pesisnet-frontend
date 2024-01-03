<template>
  <div class="d-flex mx-auto justify-center" style="max-width: 800px;">
    <v-sheet color="primary" class="game-bar-item sport-font">
      Peli
    </v-sheet>
    <v-sheet color="primary" class="game-bar-item sport-font">
      Kokoonpanot
    </v-sheet>
  </div>
</template>

<style lang="scss">
.game-bar {
  &-item {
    height: 20px;
    flex-grow: 1;
    max-width: 150px;
    margin: 10px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>