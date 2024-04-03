<template>
  <v-sheet>
    <div class="d-flex justify-center align-items-center" style="width: 100%;">
      <div 
        class="d-flex justify-center align-items-center"
        style="border-radius: 20px; background-color: white;"
        :style="`height: ${dim+20}px; width: ${dim+20}px;`"
      >
        <v-img
          v-if="!loading_game && team.sport_club"
          class="align-self-center" 
          style="border-radius: 20px;" 
          :height="dim" :width="dim"
          :max-height="dim" 
          :max-width="dim" 
          :src="team.sport_club.logo" 
        />
        <v-skeleton-loader
          v-else
          color="white"
          type="avatar"
        ></v-skeleton-loader>
      </div>
    </div>
    <div class="sport-font" style="width: 100%; text-align: center; font-size: 80px;"> 
      <span v-if="!loading_game && points">{{ points }}</span>
      <span v-else>0</span>
    </div>
    <!-- {{ team.sport_club }} -->
  </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['team', 'points'],
  computed: {
    ...mapGetters('game', [
      'loading_game'
    ]),
    dim() {
      return this.$vuetify.display.mobile ? 100 : 140;
    }
  }
}
</script>