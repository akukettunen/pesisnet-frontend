import a from '@/utils/axios'

const data = {
  namespaced: true,
  state: () => ({
    season_id: null,
    maps: null,
    season_series_id: null,
    phase_id: null,
    loading_maps: false
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
    }
  },
  getters: {
    season_id: state => state.season_id,
    season_series_id: state => state.season_series_id,
    phase_id: state => state.phase_id,
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