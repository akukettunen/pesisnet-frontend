<template>
  <v-sheet
    color="primary"
    class="sport-font point-box align-self-center"
  >
    {{ value }}
  </v-sheet>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style lang="scss">
.point-box {
  background-color: blue;
  color: white;
  padding: 0px 6px;
  border-radius: 5px;
  font-size: 16px;
  margin: 2px;
  text-align: center;
}
</style>