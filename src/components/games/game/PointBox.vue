<template>
  <v-sheet
    :elevation="highlighted ? '5' : '0'"
    :style="`align-self: center; font-size: ${ large ? '20px' :  $vuetify.display.mobile ? '14px' : '14px' }; cursor: ${cursor ? cursor : 'default'}; ${styling}`"
    class="sport-font point-box align-self-center"
  >
    {{ value }}
  </v-sheet>
</template>

<script>
export default {
  props: ['value', 'large', 'cursor', 'highlighted'],
  computed: {
    styling() {
      let style = ''
      if(this.highlighted) {
        style += `border: 1px solid ${!this.$vuetify.theme.dark ? 'white' : 'black'}; `
      }

      if(!this.$vuetify.display.mobile) {
        style += `padding: 0px 5px; border-radius: 5px;`
      } else {
        style += `padding: 0px 2px; border-radius: 2px;`
      }

      return style
    }
  }
}
</script>

<style lang="scss">
.point-box {
  // font-weight: bold;
  margin: 2px;
  text-align: center;
}
</style>