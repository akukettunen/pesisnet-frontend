<template>
  <v-container :key="current_url" fluid style="height: 99vh; padding: 0px; padding-top: 124px;">
    <v-sheet :key="current_url" style="height: 100%; width: 100%; max-width: 1000px; margin: 0 auto;" class="px-10">
      <iframe :style="`visibility: ${visibility};`" :onload="onload()" id="frame-2" width="100%" height="100%" :src="current_url" frameborder="0"></iframe>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    visibility: 'hidden'
  }),
  methods: {
    onload() {
      console.log('visible')
      this.visibility = 'visible'
    }
  },
  computed: {
    ...mapGetters('news', [
      'chosen_button_or_first',
      'chosen_button',
      'current_url'
    ])
  },
  watch: {
    'current_url': {
      handler() {
        console.log('handler hidden')
        this.visibility = 'hidden'
      }
    }
  }
}
</script>