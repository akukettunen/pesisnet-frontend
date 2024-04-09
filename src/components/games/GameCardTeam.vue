<template>
  <v-sheet class="d-flex justify-start" style="align-items: center; height: 30px;">
    <div v-if="use_team.sport_club" class="d-flex justify-center align-items-center" style="height: 25px; width: 25px; background-color: white; border-radius: 5px;">
      <v-img class="align-self-center" style="border-radius: 5px;" height="30" width="30" max-height="22" max-width="22" :src="use_team.sport_club.icon" />
    </div>
    <span v-if="!$vuetify.display.mobile" class="ml-3 text-button" style="white-space: nowrap;">
      {{ use_team.name }}
    </span>
    <span v-else class="ml-2 text-button" style="white-space: nowrap;">
      {{ use_team.shorthand }}
    </span>
  </v-sheet>
</template>

<script>
export default {
  props: ['team'],
  computed: {
    use_team() {
      return this.team || { sport_club: { icon: null } }
    }
  }
}
</script>