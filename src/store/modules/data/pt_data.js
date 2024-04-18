import a from '@/utils/axios'
import axios from 'axios'

const standings = {
  namespaced: true,
  state: () => ({
    boards: null,
    loading_boards: false,
    data: null
  }),
  mutations: {
    SET_BOARD(state, val) {
      state.boards = val
    },
    SET_LOADING_BOARD(state, val) {
      state.loading_boards = val
    },
    SET_DATA(state, val) {
      state.data = val
    }
  },
  actions: {
    getData({ commit }, { season_id, series_id, phase_id, specifier }) {
      commit('SET_LOADING_BOARD', true)
      const url = `https://www.pesistulokset.fi/api/v1/stats-tool/players?sum=1&season=${season_id}&seasonSeries=${series_id}&phase=${phase_id}&statfilter=${specifier}`

      axios(url)
        .then(e => {
          commit('SET_DATA', e.data)
        })
        .finally(() => {
          commit('SET_LOADING_BOARD', false)
        })
    }
  },
  getters: {
    boards: state => state.boards,
    loading_boards: state => state.loading_boards,
    data: state => state.data
  }
}

export default standings