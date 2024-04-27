<template>
  <v-dialog @update:model-value="$emit('close')" :model-value="show">
    <v-card width="100%" style="display: flex; flex-direction: row; align-items: center; justify-content: center; position: relative;">
      <v-btn @click="$emit('close')" style="position: absolute !important; top: 10px; right: 10px;" variant="text">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card style="display: flex; flex-direction: column; justify-content: center;" class="pt-10 pb-5 pa-5" :width="width + 30">
        <v-card-title>
          {{ title }}
        </v-card-title>
        <game-field :hits="hits" :height="height" :width="width"></game-field>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import GameField from './GameField.vue'
import { mapMutations } from 'vuex'

export default {
  components: { GameField },
  props: ['value', 'title', 'hits'],
  data: () => ({
    width: 275,
    height: 400
  }),
  computed: {
    show: {
      get() {
        return this.value
      },
      set(val) {
        console.log(val)
        this.SET_SHOW_FIELD(val)
      }
    }
  },
  methods: {
    ...mapMutations('game', [
      'SET_SHOW_FIELD'
    ]),
    onClickOutside() {
      this.$emit('close')
    }
  }
}
</script>