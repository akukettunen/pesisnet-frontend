<template>
  <v-sheet
    :style="`align-self: center; font-size: ${ $vuetify.display.mobile ? '10px' : '14px' }`"
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
  font-weight: bold;
  padding: 0px 5px;
  border-radius: 5px;
  margin: 2px;
  text-align: center;
}
</style>