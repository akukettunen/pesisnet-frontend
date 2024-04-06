<template>
  <v-sheet class="dt-col" :key="col.key">
    <v-sheet :style="cellStyle" :class="{ 'dt-col-cell--left': col.left }" class="dt-col-cell dt-col-cell--header">
      {{ col.text }}
      <v-tooltip
        v-if="col.long_text"
        activator="parent"
      >
        {{ col.long_text }}
      </v-tooltip>
    </v-sheet>
    <v-sheet 
      v-for="cell in data" 
      @click="$emit('cell-clicked', { column: col.key, row: cell })" 
      :class="{ 'dt-col-cell--left': col.left }"
      class="dt-col-cell dt-col-cell" 
      :style="cellStyle"
      :key="cell[col]"
    >
      {{ cell[col.key] }}
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  props: ['data', 'header'],
  computed: {
    col() {
      return this.header
    },
    cellStyle() {
      return `padding: ${this.density == 'sparse' ? 5 : 1}px ${this.density == 'sparse' ? 15 : 4}px;`
    }
  }
}
</script>

<style lang="scss">
.dt {
  &-col {
    display: flex;
    flex-direction: column;
    
    &-cell {
      text-wrap: nowrap;
      max-width: 200px;
      // border: 1px solid rgba(255, 255, 255, 0.333);
      cursor: pointer;
      transition-duration: 0.2s;
      text-align: center;

      &:hover {
        font-weight: bold;
        transform: scale(1.1, 1.1)
      }

      &--left {
        text-align: left;
      }

      &--header {
        font-weight: bold;
      }
    }
  }
}
</style>