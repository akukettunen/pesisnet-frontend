<template>
  <v-dialog :modelValue="value">
    <v-card style="display: flex; justify-content: center;" class="mx-auto pt-10 pb-5 pa-5">
      <v-btn @click="$emit('close')" style="position: absolute; top: 10px; right: 10px;" variant="text">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <game-field :hits="hits" :height="height" :width="width"></game-field>
    </v-card>
  </v-dialog>
</template>

<script>
import GameField from './GameField.vue'
export default {
  components: { GameField },
  props: ['value', 'title', 'hits'],
  data: () => ({
    width: 275,
    height: 400
  }),
  methods: {
    update(e, a) {
      if(!e) this.$emit('close')
    }
  }
}
</script>