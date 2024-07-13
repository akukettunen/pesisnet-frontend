<template>
  <v-container :style="`padding-top: ${$vuetify.display.mobile ? '80' : '150'}px`">
    <data-table
      :data="table_data"
      :loading="loading"
      :title="Ulkopeli"
      :order="true"
    >
  </data-table>
  <!-- {{ data }} -->
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import DataTable from '@/components/data/DataTable.vue'

export default {
  components: { DataTable },
  data: () => ({
    
  }),
  created() {
    this.getData()
  },
  computed: {
    ...mapGetters('outfield', [
      'table_data',
      'data',
      'loading'
    ])
  },
  methods: {
    ...mapActions('outfield', [
      'getData'
    ])
  }
}
</script>