import a from '@/utils/axios'

const outfield = {
  namespaced: true,
  state: () => ({
    data: null,
    loading: false
  }),
  mutations: {
    SET_DATA(state, val) {
      state.data = val
    },
    SET_LOADING(state, val) {
      state.loading = val
    }
  },
  actions: {
    getData({ commit }) {
      commit('SET_LOADING', true)

      a('/outfield')
        .then(e => {
          commit('SET_DATA', e.data)
        })
        .finally(() => {
          commit('SET_LOADING', false)
        })
    }
  },
  getters: {
    data: state => state.data,
    loading: state => state.loading,
    table_data: (_, getters) => {
      return {
        headers: [
         { key: 'player', text: 'Pelaaja', long_text: 'Pelaaja', left: true},
         { key: 'total', text: 'Suoritukset', long_text: 'Suoritusten määrä'},
         { key: 'outs', text: 'Palot', long_text: 'Tehtyjen palojen määrä'},
         { key: 'errors', text: 'Virheet', long_text: 'Tehtyjen virheiden määrä'},
         { key: 'errorsPerOuts', text: 'V / P', long_text: 'Virheet / Palo'}
        ],
        data: getters.data
      }
    }
  }
}

export default outfield