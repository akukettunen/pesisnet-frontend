<template>
  <v-row max-width="500" class="mx-auto">
    <v-col cols="12" md="4">
      <v-select
        density="compact"
        :items="leagueOptions"
        label="Sarja"
        variant="outlined"
        :model-value="league_id"
        @update:modelValue="_league_id = $event"
      ></v-select>
    </v-col>
    <v-col cols="12" md="4">
      <v-select
        density="compact"
        :items="yearOptions[league_id]"
        label="Kausi"
        variant="outlined"
        :model-value="season"
        @update:modelValue="_season = $event"
      ></v-select>
    </v-col>
    <v-col cols="12" md="4">
      <v-select
        density="compact"
        :items="baseOptions"
        label="Pesänväli"
        variant="outlined"
        :model-value="base"
        @update:modelValue="_base = $event"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: [
    'season', 
    'base', 
    'league_id', 
    'disabled_bases',
    'disabled_seasons', 
    'disabled_leagues'
  ],
  mounted() {
  },
  computed: {
    _season: {
      get() {
        return
      },
      set(val) {
        this.$emit('update:season', val)

        this.$nextTick(() => {
          this.handleChange()
        })
      }
    },
    _league_id: {
      get() {
        return
      },
      set(val) {
        this.$emit('update:league_id', val)
        if(val == 3) this.$emit('update:season', 2024)

        this.$nextTick(() => {
          this.handleChange()
        })
      }
    },
    _base: {
      get() {
        return
      },
      set(val) {
        this.$emit('update:base', val)
        
        this.$nextTick(() => {
          this.handleChange()
        })
      }
    },
    yearOptions() {
      return {
        1: [2024, 2023, 2022, 2021].filter(l => !this['disabled_seasons']?.includes(l)),
        2: [2024, 2023, 2022, 2021].filter(l => !this['disabled_seasons']?.includes(l)),
        3: [2024].filter(l => !this['disabled_seasons']?.includes(l))
      }
    },
    leagueOptions() {
      return [
        { title: 'Miesten Superpesis', value: 1 },
        { title: 'Naisten Superpesis', value: 2 },
        { title: 'Miesten Ykköspesis', value: 3 },
      ].filter(l => !this['disabled_leagues']?.includes(l.value))
    },
    baseOptions() {
      return [
        { title: '1-2 väli', value: 1 },
        { title: '2-3 väli', value: 2 },
        { title: '3-K väli', value: 3 },
      ].filter(l => {
        return !this['disabled_bases']?.includes(l.value)
      })
    }
  },
  methods: {
    handleChange() {
      this.$emit('input')
    }
  }
}
</script>