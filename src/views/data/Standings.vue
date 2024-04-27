<template>
  <v-container :style="`padding-top: ${$vuetify.display.mobile ? '80' : '150'}px`">
    <ChooseSeries @update="handleUpdate()" />
    <v-sheet class="mt-10">
      <v-row style="justify-content: center;" v-if="!loading_maps && !loading_boards && boards">
        <v-col
          cols="12"
          md="6"
          v-for="(board, i) in boards"
          :key="i + 'board'"
          style="max-width: calc(100vw - 40px); justify-content: center;"
        >
          <div class="text-h6 mt-4" style="text-align: center;">
            {{ board.board_title }}
          </div>
          <data-table
            v-if="board && board.data.length"
            class="mx-auto mt-3 justify-center"
            :data="board"
          ></data-table>
        </v-col>
      </v-row>
      <div v-else class="d-flex justify-center">
        <v-skeleton-loader
          style="flex-grow: 1; margin-top: 50px;"
          max-width="400"
          type="list-item-two-line	, list-item-three-line	, list-item-two-line, list-item-three-line		"
        ></v-skeleton-loader>
      </div>
      <div
        class="my-5"
        v-for="(match, i) in matches"
        :key="i + 'match'"
      >
        {{ match }}
      </div>
    </v-sheet>
  </v-container>
</template>

<script>
import ChooseSeries from '@/components/data/ChooseSeries.vue'
import { mapActions, mapGetters } from 'vuex'
import DataTable from '@/components/data/DataTable.vue'

export default {
  components: { 
    ChooseSeries, 
    DataTable 
  },
  created() {
    if(this.maps) this.handleUpdate()
    else {
      var self = this
      setTimeout(() => {
        self.handleUpdate()
      }, 1000)
    }
  },
  methods: {
    handleUpdate() {
      this.getBoard({
        season_id: this.season_id, 
        series_id: this.season_series_id, 
        phase_id: this.phase_id
      })
    },
    ...mapActions('standings', [
      'getBoard'
    ])
  },
  computed: {
    ...mapGetters('data', [
      'season_id',
      'season_series_id',
      'phase_id',
      'maps',
      'loading_maps'      
    ]),
    ...mapGetters('standings', [
      'boards',
      'loading_boards',
      'matches'
    ])
  }
}
</script>