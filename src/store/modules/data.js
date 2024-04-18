import a from '@/utils/axios'

const data = {
  namespaced: true,
  state: () => ({
    season_id: null,
    maps: null,
    season_series_id: null,
    phase_id: null,
    loading_maps: false,
    pitcher_data: null,
    loading_pitcher_data: false,
    runner_data: null,
    loading_runner_data: false
  }),
  mutations: {
    SET_SEASON_ID(state, id) {
      state.season_id = id
    },
    SET_SEASON_SERIES_ID(state, id) {
      state.season_series_id = id
    },
    SET_PHASE_ID(state, id) {
      state.phase_id = id
    },
    SET_MAPS(state, val) {
      state.maps = val
    },
    SET_LOADING_MAPS(state, val) {
      state.loading_maps = val
    },
    SET_PITCHER_DATA(state, val) {
      state.pitcher_data = val
    },
    SET_LOADING_PITCHER_DATA(state, val) {
      state.loading_pitcher_data = val
    },
    SET_RUNNER_DATA(state, val) {
      state.runner_data = val
    },
    SET_LOADING_RUNNER_DATA(state, val) {
      state.loading_runner_data = val
    }
  },
  actions: {
    setSeasonId({ commit, getters, dispatch }, id) {
      commit('SET_SEASON_ID', id)

      const serieses = getters.season_serieses(id)

      dispatch('setSeasonSeriesId', serieses[0]['value'])
    },
    setSeasonSeriesId({ commit, getters, dispatch }, id) {
      commit('SET_SEASON_SERIES_ID', id)

      const phases = getters.season_series_phases(id)

      dispatch('setPhaseId', phases[0]['value'])
    },
    setPhaseId({ commit }, id) {
      commit('SET_PHASE_ID', id)
    },
    initMaps({ commit, dispatch }) {
      commit('SET_LOADING_MAPS', true)

      a('/maps')
        .then(e => {
          commit('SET_MAPS', e.data.maps)
          dispatch('setSeasonId', e.data.maps.seasons.seasons[0].season.id)
        })
        .catch(e => {
          alert(e)
        })
        .finally(() => {
          commit('SET_LOADING_MAPS', false)
        })
    },
    getPitcherData({ commit }, { league_id, season }) {
      commit('SET_LOADING_PITCHER_DATA', true)
      a(`/data/pitchers?league_id=${league_id}&season=${season}&filter_amount=20`)
        .then(e => {
          commit('SET_PITCHER_DATA', e.data)
        })
        .catch(e => {
          console.log(e)
        })
        .finally(() => {
          commit('SET_LOADING_PITCHER_DATA', false)
        })
    },
    getRunnerData({ commit }, { league_id, season }) {
      commit('SET_LOADING_RUNNER_DATA', true)
      a(`/data/top-runners?league_id=${league_id}&season=${season}&filter_amount=20`)
        .then(e => {
          commit('SET_RUNNER_DATA', e.data)
        })
        .catch(e => {
          console.log(e)
        })
        .finally(() => {
          commit('SET_LOADING_RUNNER_DATA', false)
        })
    }
  },
  getters: {
    season_id: state => state.season_id,
    season_series_id: state => state.season_series_id,
    phase_id: state => state.phase_id,
    runner_data: state => state.runner_data,
    loading_runner_data: state => state.loading_runner_data,
    pitcher_data: state => state.pitcher_data,
    loading_pitcher_data: state => state.loading_pitcher_data,
    season_serieses_raw: (_, getters) => id => {
      if((!getters.season_id && !id) || !getters.maps) return []

      return getters.maps.seasons.seasons.find(s => {
        return s.season.id == id || s.season.id == getters.season_id
      })?.seasonSerieses
    },
    season_serieses: (_, getters) => id => {
      if(!getters.season_serieses_raw?.length) return []

      return getters.season_serieses_raw(id || getters.season_id).map(s => {
        return {
          value: s.seasonSeries.id,
          title: s.seasonSeries.name,
        }
      })
    },
    season_series_phases_raw: (_, getters) => id => {
      if( !getters.season_serieses_raw(id)?.length ) return []

      return getters.season_serieses_raw(id).find(s => {
        return s.seasonSeries.id == (id || getters.season_series_id)
      }).phases.map(p => p.phase)
    },
    season_series_phases: (_, getters) => id => {
      return getters.season_series_phases_raw(id).map(s => {
        return {
          value: s.id,
          title: s.name,
        }
      }).sort((a, b) => {
        if(a.title == 'Runkosarja') return -1
        if(b.title == 'Runkosarja') return 1
        if(a.title == 'Itä-Länsi') return 1
        if(b.title == 'Itä-Länsi') return -1
        return 0
      })
    },
    maps: state => state.maps,
    loading_maps: state => state.loading_maps,
    seasons: (_, getters) => {
      if(!getters.maps) return null

      return getters.maps.seasons.seasons
    },
    seasons_choosable: (_, getters) => {
      if(!getters.seasons) return []

      return getters.seasons.map(s => {
        return {
          value: s.season.id,
          title: s.season.season
        }
      })
    }
  }
}

export default data