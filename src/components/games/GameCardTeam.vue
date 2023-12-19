<template>
  <v-sheet class="d-flex justify-start" style="align-items: center; height: 30px;">
    <v-img height="30" width="30" max-height="20" max-width="20" :src="team.sport_club.icon" />
    <span v-if="!$vuetify.display.mobile" class="ml-3 text-button">
      {{ team.name }}
    </span>
    <span v-else class="ml-2 text-button">
      {{ team.shorthand }}
    </span>
  </v-sheet>
</template>

<script>
export default {
  props: ['team']
}
</script>