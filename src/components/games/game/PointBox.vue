<template>
  <v-sheet
    :elevation="highlighted ? '5' : '0'"
    :style="`align-self: center; font-size: ${ large ? '20px' :  $vuetify.display.mobile ? '10px' : '14px' }; cursor: ${cursor ? cursor : 'default'}; ${styling}`"
    class="sport-font point-box align-self-center"
  >
    {{ value }}
    {{this.$vuetify.theme.dark}}
  </v-sheet>
</template>

<script>
export default {
  props: ['value', 'large', 'cursor', 'highlighted'],
  computed: {
    styling() {
      if(this.highlighted) {
        return `border: 1px solid ${!this.$vuetify.theme.dark ? 'white' : 'black'}`
      }
    }
  }
}
</script>

<style lang="scss">
.point-box {
  // font-weight: bold;
  padding: 0px 5px;
  border-radius: 5px;
  margin: 2px;
  text-align: center;
}
</style>