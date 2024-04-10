<template>
  <v-sheet class="dt" style="max-width: calc(100%); min-width: 0; border-radius: 10px;">
    <div class="text-h5 mb-4 text-center">
      {{ data.title }}
    </div>
    <v-skeleton-loader
      type="list-item-three-line	, list-item-three-line	, list-item-three-line	"
      :style="`width: 100%; max-width: calc(100vw - 40px); justify-content: center; display: flex;`"
      :loading="loading"
    >
      <div class="dt-table">
        <div class="dt-table-locked" >
          <data-table-column
            @cell-clicked="$emit('cell-clicked', $event)"
            v-for="(header, i) in locked_headers" 
            :data="data.data" 
            :header="header"
            :key="i + 'header'"
            :density="density"
          />
        </div>
        <div class="dt-table-scroll">
            <data-table-column
            @cell-clicked="$emit('cell-clicked', $event)" 
            v-for="(header, i) in unlocked_headers" 
            :data="data.data" 
            :header="header"
            :key="i + 'header'"
            :density="density"
          />
        </div>
      </div>
    </v-skeleton-loader>
  </v-sheet>
</template>

<script>
/*
{
  headers: [
    {
      key: "position",
      text: "Short text",
      longs_text: "Tooltip text"
    },
    {
      key: "scores",
      text: "S",
      longs_text: "Lyödyt juoksut"
    }
  ],
  data: [
    {
      "position": 0,
      "scores": 5
    }
  ]
}
*/

import DataTableColumn from './DataTableColumn.vue'
export default {
  components: { DataTableColumn },
  props: ['data', 'density', 'loading'],
  /*
    headers
  */
  computed: {
    locked_headers() {
      let locked = []
      let got_locked = false

      if(!this.data || !this.data.headers) return []

      this.data.headers.forEach(h => {
        if(got_locked) return

        locked.push(h)
        if(h.lock) got_locked = true
      })

      return got_locked ? locked : []
    },
    unlocked_headers() {
      let unlocked = []
      let not_locked = true

      if(!this.data || !this.data.headers) return []

      this.data.headers.forEach(h => {
        if(h.lock) return not_locked = false
        if(not_locked) return

        unlocked.push(h)
      })

      return not_locked ? this.data.headers : unlocked
    }
  }
}
</script>

<style lang="scss">
.dt {
  display: flex;
  flex-shrink: 1;
  flex-direction: column;
  justify-content: center;

  &-table {
    display: flex;
    justify-content: center;
    flex-direction: row;
    min-width: 0;
    min-width: 100px; // or a suitable minimum width
    max-width: 1000px;

    &-locked {
      display: flex; 
      flex-direction: row;
    }

    &-scroll {
      overflow-x: scroll; 
      min-width: 100px;
      overflow: scroll; 
      display: flex; 
      flex-direction: row;
    }
  }
}
</style>