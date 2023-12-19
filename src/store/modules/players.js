import a from '@/utils/axios'

const games = {
  namespaced: true,
  state: () => ({
    players: [],
    player: null,
    loading_player: false,
    loading_players: false,
    chosen_player: null,
    events: [],
    run_data: null
  }),
  mutations: {
    SET_PLAYERS(state, val) {
      state.players = val
    },
    SET_PLAYER(state, val) {
      state.player = val
    },
    SET_RUN_DATA(state, val) {
      state.run_data = val
    },
    SET_LOADING_PLAYERS(state, val) {
      state.loading_players = val
    },
    SET_LOADING_PLAYER(state, val) {
      state.loading_player = val
    },
    SET_EVENTS(state, events) {
      state.events = events
    }
  },
  actions: {
    initAllPlayers({ commit }) {
      commit('SET_LOADING_PLAYERS', true)
      a('/players')
        .then(e => {
          commit('SET_PLAYERS', e.data?.players)
        })
        .finally(() => {
          commit('SET_LOADING_PLAYERS', false)
        })
    },
    getPlayerData({ commit }, player_id, season) {
      commit('SET_LOADING_PLAYER', true)
      commit('SET_PLAYER', null)

      return new Promise((resolve, reject) => {
        a(`/players/${player_id}?season=${season}`)
          .then(e => {
            commit('SET_PLAYER', e.data.player)
            commit('SET_EVENTS', e.data.events_grouped_by_tilanne)
            commit('SET_RUN_DATA', e.data.averages)
            resolve(e)
          })
          .catch(e => {
            reject(e)
          })
          .finally(() => {
            commit('SET_LOADING_PLAYER', false)
          })
      })
    }
  },
  getters: {
    players: state => state.players,
    player: state => state.player,
    loading_players: state => state.loading_players,
    run_data: (state) => {
      if(!state.run_data) return null
      var enumerated = { 3: '3 -> K', 2: '2 -> 3', 1: '1 -> 2' }
      return state.run_data.map(r => {
        console.log(r.base)
        return {
          ...r,
          base: enumerated[r.base]
        }
      })

    },
    loading_player: state => state.loading_player,
    parsePlayerIdFromName: () => (name) => {
      if(!name) return
      return Number(name.split('(')[1].split(')')[0])
    },
    playerInitials: (_, getters) => {
      if(!getters.player) return ''
      const { first_name, last_name } = getters.player
      return first_name[0] + last_name[0]
    },
    playerName: (_, getters) => {
      if(!getters.player) return ''
      const { name } = getters.player
      return name
    },
    events: state => state.events
  }
}

export default games