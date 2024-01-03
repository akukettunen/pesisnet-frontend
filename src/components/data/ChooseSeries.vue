<template>
  <v-row style="display: flex; flex-direction: row;">
    <v-col cols="12" md="4">
      <v-select
        hide-details
        :density="$vuetify.display.mobile ? 'compact' : 'default'"
        class="mx-3"
        :loading="loading_maps"
        label="Kausi"
        :items="seasons_choosable"
        @update:modelValue="handleSeasonChange($event)"
        :model-value="season_id"
      />
    </v-col>
    <v-col cols="12" md="4">
      <v-select
        hide-details
        :density="$vuetify.display.mobile ? 'compact' : 'default'"
        class="mx-3"
        :loading="loading_maps"
        label="Sarja"
        :items="season_serieses()"
        @update:modelValue="handleSeriesChange($event)"
        :model-value="season_series_id"
      />
    </v-col>
    <v-col cols="12" md="4">
      <v-select
        hide-details
        :density="$vuetify.display.mobile ? 'compact' : 'default'"
        class="mx-3"
        :loading="loading_maps"
        label="Vaihe"
        :items="season_series_phases()"
        @update:modelValue="handlePhaseChange($event)"
        :model-value="phase_id"
      />
    </v-col>
    <!-- {{ season_serieses }} -->
    <!-- {{ season_series_phases() }} -->
    <!-- {{ season_serieses_raw() }} -->
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters('data', [
      'season_id',
      'phase_id',
      'seasons_choosable',
      'loading_maps',
      'season_serieses',
      'season_series_id',
      'season_series_phases',
      'season_serieses_raw'
    ])
  },
  methods: {
    ...mapActions('data', [
      'setSeasonId',
      'setSeasonSeriesId',
      'setPhaseId'
    ]),
    handleSeasonChange(e) {
      this.setSeasonId(e)

      this.$nextTick(() => {
        this.$emit('update')
      })
    },
    handleSeriesChange(e) {
      this.setSeasonSeriesId(e)

      this.$nextTick(() => {
        this.$emit('update')
      })
    },
    handlePhaseChange(e) {
      this.setPhaseId(e)

      this.$nextTick(() => {
        this.$emit('update')
      })
    }
  }
}
</script>