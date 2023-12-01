<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-card
    flat
  >
    {{ organizer.name }}
    <Level
      v-for="level in organizer.levels"
      :key="level.id + 'level'"
      :level="level"
    ></Level>
  </v-card>
</template>

<script>
import Level from '@/components/games/Level'
export default {
  components: { Level },
  props: ['organizer']
}
</script>