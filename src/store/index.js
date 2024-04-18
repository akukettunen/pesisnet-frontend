import { createStore } from 'vuex'

import games from './modules/games.js'
import game from './modules/game.js'
import players from './modules/players.js'
import data from './modules/data.js'
import news from './modules/news.js'
import pt_data from './modules/data/pt_data.js'

import standings from './modules/data/standings.js'

export default createStore({
  modules: {
    games,
    game,
    players,
    data,
    standings,
    news,
    pt_data
  }
})

