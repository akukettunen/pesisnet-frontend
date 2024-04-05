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
    run_data: null,
    last_search: '',
    latest_loading_player_id: null
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
    },
    SET_LAST_SEARCH(state, event) {
      state.last_search = event
    },
    SET_LATEST_LOADING_PLAYER_ID(state, val) {
      state.latest_loading_player_id = val
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
    getPlayers({ commit, getters }, search) {
      if(!search) return
      
      if(getters.last_search.split(' ')[0] === search.split(' ')[0]) {
        return
      }

      if(search.length < 2) return
      commit('SET_LAST_SEARCH', search)
      
      search = search.split(' ')[0]
      a(`/players/query/${search}`)
        .then(e => {
          if(e.data.search_string !== getters.last_search) return
          commit('SET_PLAYERS', e.data?.players)
        })
        .finally(() => {
          commit('SET_LOADING_PLAYERS', false)
        })
    },
    getPlayerData({ commit, getters }, player_id, season) {
      commit('SET_LOADING_PLAYER', true)
      commit('SET_LATEST_LOADING_PLAYER_ID', player_id)
      commit('SET_PLAYER', null)
      commit('SET_EVENTS', null)
      commit('SET_RUN_DATA', null)

      return new Promise((resolve, reject) => {
        a(`/players/${player_id}?season=${season}`)
          .then(e => {
            if(e.data.player.id !== getters.latest_loading_player_id) return
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
    latest_loading_player_id: state => state.latest_loading_player_id,
    last_search: state => state.last_search,
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