import a from '@/utils/axios'
// import router from '@/router/index.js'

const game = {
  namespaced: true,
  state: () => ({
    game: {},
    game_data: {},
    events: [],
    loading_game: false,
    loading_game_id: null // this is always the latest fetched game id and only initially null
  }),
  mutations: {
    SET_GAME(state, val) {
      state.game = val
    },
    SET_EVENTS(state, val) {
      state.events = val
    },
    SET_GAME_DATA(state, val) {
      state.game_data = val
    },
    SET_LOADING_GAME(state, val) {
      state.loading_game = val
    },
    SET_LOADING_GAME_ID(state, val) {
      state.loading_game_id = val
    }
  },
  actions: {
    getGameData({ commit, getters }, id) {
      commit('SET_LOADING_GAME_ID', id)
      commit('SET_LOADING_GAME', true)

      a(`/games/${id}`)
        .then(e => {
          if(getters.loading_game_id != id) return

          commit('SET_GAME', e.data.game)
          commit('SET_EVENTS', e.data.events)
          commit('SET_GAME_DATA', e.data.gameData)
        })
        .finally(() => {
          if(getters.loading_game_id != id) return

          commit('SET_LOADING_GAME', false)
        })
    }
  },
  getters: {
    game: state => state.game, 
    game_data: state => state.game_data, 
    loading_game: state => state.loading_game,
    loading_game_id: state => state.loading_game_id,
    events: state => state.events,
    stat_type_events: (_, getters) => {
      // Lyönti
      if(!getters.events) return []

      return getters.events.filter(e => e.groupType == 'o')
    },
    happening_type_events: (_, getters) => {
      // Jaksojen alut ja loput
      if(!getters.events) return null

      return getters.events.filter(e => e.groupType == 'm')
    },
    stat_events: (_, getters) => {
      if(!getters.stat_type_events) return []

      return getters.stat_type_events.map(e => {
        return e.events.filter(a => a.type == 'stat')
      }).flat() 
    },
    stat_points: (_, getters) => {
      const evs = getters.stat_type_events.map(e => {
        const stat = e.events.map(event => {
          return event.texts.filter( t => t.type == 'stat' )
        }).flat()

        return { stats: stat, batter: e.batter }
      }).filter(s => s.stats.length).flat()

      return evs
    },
    stats_by_hitter: (_, getters) => {
      let batters = {}

      getters.stat_points.forEach(s => {
        if(!batters[s.batter]) batters[s.batter] = {
          pointhits: 0,
          pointhitf: 0,
          pointhitf0: 0,
          pointhitf1: 0,
          pointhitf2: 0,
          pointhitf3: 0,
          pointhits0: 0,
          pointhits1: 0,
          pointhits2: 0,
          pointhits3: 0,
          pmv: 0, // palot mailan varressa ( out )
          score: 0, // lyödyt juoksut
          runner_at_3: 0,
          homeruns: 0
        }

        s.stats?.forEach(b => {
          if(b.pointhitf || b.pointhitf == 0) {
            batters[s.batter]['pointhitf' + b.pointhitf]++
            batters[s.batter]['pointhitf']++
          }
          if(b.pointhits || b.pointhits == 0) {
            batters[s.batter]['pointhits' + b.pointhits]++
            batters[s.batter]['pointhits']++
          }
          if(b['runner-at-3']) {
            batters[s.batter]['runner_at_3']++
          }
          if(b['out']) {
            batters[s.batter]['pmv'] = batters[s.batter]['pmv'] + b['out']
          }
          if(b['out']) {
            batters[s.batter]['pmv'] = batters[s.batter]['pmv'] + b['out']
          }
          if(b['score']) {
            batters[s.batter]['score']++
          }
          if(b['homerun']) {
            batters[s.batter]['homeruns']++
          }
        })
      })

      return batters
    },
    stats_table: (_, getters) => side => {
      if(!getters.game?.id) return { headers: [], data: [] }

      return {
        title: '',
        headers: [
          { text: 'Pelaaja', key: 'player', lock: true, left: true },
          { text: 'UP', key: 'outfield_pos', long_text: 'Ulkopelipaikka' },
          { text: 'K', key: 'homeruns', long_text: 'Kunnarit' },
          { text: 'L', key: 'score', long_text: 'Lyödyt' },
          { text: 'KL', key: 'pointhits', long_text: 'Kärkilyönnit' },
          { text: 'Y', key: 'pointhitstries', long_text: 'Kärkilyöntiyritykset' },
          { text: '1%', key: 'pointhits0', long_text: 'Kärkilyönnit 0-til' },
          { text: '2%', key: 'pointhits1', long_text: 'Kärkilyönnit 1-til' },
          { text: '3%', key: 'pointhits2', long_text: 'Kärkilyönnit 2-til' },
          { text: 'K%', key: 'pointhits3', long_text: 'Kärkilyönnit kotiin' },
        ],
        data: getters.game[side].players.map(player => {
          return {
            player: `${player.number}. ${player.first_name} ${player.last_name}`,
            outfield_pos: player.defensive_position.short_name || '-',
            homeruns: getters.stats_by_hitter[player.id]?.homeruns || '-',
            score: getters.stats_by_hitter[player.id]?.score || '-',
            pointhits: getters.stats_by_hitter[player.id]?.pointhits || '-',
            pointhitstries: getters.stats_by_hitter[player.id]?.pointhits + getters.stats_by_hitter[player.id]?.pointhitf || '-',
            pointhits0: getters.get_point_hits_string(player.id, 0),
            pointhits1: getters.get_point_hits_string(player.id, 1),
            pointhits2: getters.get_point_hits_string(player.id, 2),
            pointhits3: getters.get_point_hits_string(player.id, 3),
            // player
          }
        })
      }
    },
    get_point_hits_string: (_, getters) => (player_id, base) => {
      if(!getters.stats_by_hitter[player_id]) return '-'

      const s = getters.stats_by_hitter[player_id]['pointhits' + base]
      const f = getters.stats_by_hitter[player_id]['pointhitf' + base]

      if(s + f == 0) return '-'

      return `${s}/${s + f}`
    }
  }
}

export default game