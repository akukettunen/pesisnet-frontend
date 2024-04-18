<template>
  <v-sheet class="dt-col" :key="col.key">
    <v-sheet @click="$emit('sort', col.key)" :style="cellStyle" :class="{ 'dt-col-cell--left': col.left }" class="dt-col-cell dt-col-cell--header">
      {{ col.text }}
      <v-icon v-if="sort.key == col.key && !this.sort.desc">mdi-chevron-up</v-icon>
      <v-icon v-if="sort.key == col.key && this.sort.desc">mdi-chevron-down</v-icon>
      <v-tooltip
        v-if="col.long_text"
        activator="parent"
        location="top"
      >
        {{ col.long_text }}
      </v-tooltip>
    </v-sheet>
    <v-sheet 
      v-for="(cell, i) in data" 
      @click="$emit('cell-clicked', { column: col.key, row: cell })" 
      :class="{ 'dt-col-cell--left': col.left }"
      class="dt-col-cell dt-col-cell"
      :color="i % 2 == 0 ? $vuetify.theme.name == 'dark' ? 'blue-grey-darken-4' : 'blue-lighten-5' : ''"
      :style="cellStyle"
      :key="cell[col]"
      style="white-space: nowrap;"
    >
      {{ cell[col.key] }}
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  props: ['data', 'header', 'density', 'sort'],
  computed: {
    col() {
      return this.header
    },
    cellStyle() {
      const isSparse = this.density == 'sparse' && !this.$vuetify.display.mobile

      return `padding: ${isSparse ? 5 : 1}px ${isSparse ? 15 : 4}px;`
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
      white-space: nowrap;
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