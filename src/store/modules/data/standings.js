import a from '@/utils/axios'

const standings = {
  namespaced: true,
  state: () => ({
    boards: null,
    loading_boards: false,
    matches: null
  }),
  mutations: {
    SET_BOARD(state, val) {
      state.boards = val
    },
    SET_LOADING_BOARD(state, val) {
      state.loading_boards = val
    },
    SET_MATCHES(state, val) {
      state.matches = val
    }
  },
  actions: {
    getBoard({ commit }, { season_id, series_id, phase_id }) {
      commit('SET_LOADING_BOARD', true)
      a(`/data/standings?seasonId=${season_id}&seasonSeriesId=${series_id}&seasonSeriesPhaseId=${phase_id}`)
        .then(e => {
          commit('SET_BOARD', e.data.result_boards)
          commit('SET_MATCHES', e.data.matchSeries)
        })
        .finally(() => {
          commit('SET_LOADING_BOARD', false)
        })
    }
  },
  getters: {
    boards: state => state.boards,
    matches: state => state.matches,
    loading_boards: state => state.loading_boards
  }
}

export default standings