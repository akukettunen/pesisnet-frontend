<template>
  <v-card>
    <div class="text-h5 ">
      {{ title }}
    </div>
    <div color="green" style="text-align: center;" class="text-h6">
      {{ rounded_value }}
    </div>
  </v-card>
</template>

<script>
export default {
  props: ['title', 'value', 'round'],
  computed: {
    rounded_value() {
      return this.value.toFixed(this.round)
    }
  }
}
</script>