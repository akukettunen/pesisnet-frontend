import { createStore } from 'vuex'

import games from './modules/games.js'
import players from './modules/players.js'

export default createStore({
  state() {
  },
  modules: {
    games,
    players
  }
})

