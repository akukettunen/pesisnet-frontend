<template>
  <v-container :style="`padding-top: ${$vuetify.display.mobile ? '80' : '150'}px`">
    <ChooseSeries @update="handleUpdate()" />
    <div style="justify-content: center; display: flex;" class="mb-15 mt-10">
      <data-table
        :data="formDataFunction"
        :density="dense ? 'compact' : 'sparse'"
        :loading="loading_boards"
      ></data-table>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ChooseSeries from '@/components/data/ChooseSeries.vue'
import DataTable from '@/components/data/DataTable.vue'

export default {
  name: 'PTRuns',
  props: {
    specifier: String, 
    formDataFunction: Object,
    dense: Boolean
  },
  components: {
    ChooseSeries,
    DataTable
  },
  created() {
    if(this.maps) this.handleUpdate()
    else if(!this.loading_maps) this.initMaps()
  },
  computed: {
    ...mapGetters('data', [
      'season_id',
      'season_series_id',
      'phase_id',
      'maps',
      'loading_maps'
    ]),
    ...mapGetters('pt_data', [
      'loading_boards',
      'data'
    ]),
    formTableData() {
      return this.dataGetter()
    }
  },
  methods: {
    ...mapActions('data', [
      'initMaps'
    ]),
    ...mapActions('pt_data', [
      'getData'
    ]),
    handleUpdate() {
      this.getData({
        season_id: this.season_id, 
        series_id: this.season_series_id, 
        phase_id: this.phase_id, 
        specifier: this.specifier
      })
    }
  },
  watch: {
    'maps': {
      handler() {
        this.handleUpdate()
      }
    }
  }
}
</script>