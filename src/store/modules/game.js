import a from '@/utils/axios'
import dayjs from 'dayjs'
import { nextTick } from 'vue';
// import router from '@/router/index.js'

const game = {
  namespaced: true,
  state: () => ({
    game: {},
    game_data: {},
    events: [],
    loading_game: false,
    loading_game_id: null, // this is always the latest fetched game id and only initially null
    finished: false,
    bases: [ 
      8612, // lyöjä
      8612, // ykköspesä
      8612, // kakkospesä
      8612, // kolmosella
    ],
    opened_event: null,
    events_to_be_simulated: [],
    event_polling_interval: null
  }),
  mutations: {
    RESET_GAME_DATA(state) {
      state.game = {}
      state.game_data = {}
      state.events = [],
      state.finished = false
    },
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
    },
    SET_FINISHED(state, val) {
      state.finished = val
    },
    SET_OPENED_EVENT(state, val) {
      state.opened_event = val
    },
    SET_EVENTS_TO_BE_SIMULATED(state, val) {
      state.events_to_be_simulated = val
    },
    ADD_EVENT(state, val) {
      state.events = [...state.events].concat(val)
    },
    SET_EVENT_POLLING_INTERVAL(state, val) {
      state.event_polling_interval = val
    }
  },
  actions: {
    getGameData({ commit, getters, dispatch }, { id, no_fefresh }) {
      if(!no_fefresh) {
        commit('SET_LOADING_GAME_ID', id)
        commit('SET_LOADING_GAME', true)
        commit('RESET_GAME_DATA')
      }

      a(`/games/${id}`)
        .then(e => {
          if(getters.loading_game_id != id) return

          console.log('got events')
            const simulate = false
          if(simulate) {
            commit('SET_EVENTS_TO_BE_SIMULATED', e.data.events)
            dispatch('startEventSimulation')
          } else if(e.data.events.length > getters.events.length) {
            commit('SET_EVENTS', e.data.events)
            console.log('set events')
          }

          commit('SET_GAME', e.data.game)
          commit('SET_FINISHED', e.data.finished)
          commit('SET_GAME_DATA', e.data.gameData)

          if(!no_fefresh) {
            nextTick(() => {
              if(!getters.finished && getters.game_data.liveResult) {
                dispatch('startEventPolling')
              }
            })
          }

        })
        .finally(() => {
          if(getters.loading_game_id != id) return

          commit('SET_LOADING_GAME', false)
        })
    },
    startEventPolling({ commit, dispatch }) {
      const interval = setInterval(() => {
        dispatch('pollGameEvents')
      }, 3000)

      commit('SET_EVENT_POLLING_INTERVAL', interval)
    },
    stopEventPollingInterval({ getters, commit }) {
      clearInterval(getters.event_polling_interval);
      commit('SET_EVENT_POLLING_INTERVAL', null)
    },
    pollGameEvents({ getters, dispatch }) {
      const id = getters.game?.id
      if(!id) return

      dispatch('getGameData', { id, no_fefresh: true })

      // const time = encodeURIComponent(dayjs().format('YYYY-MM-DDTHH:mm:ssZ'))

      // a(`/games/poll/${id}?after=${time}`)
      //   .then(e => {
      //     commit('SET_EVENTS', e.data.events)
      //   })
      //   .catch(e => {
      //     console.error(e)
      //   })

      
    },
    startEventSimulation({ dispatch }) {
      setInterval(() => {
        dispatch('addOneEventMore')
      }, 4000)
    },
    addOneEventMore({ getters, commit }) {
      const len = [...getters.events].length

      const new_event = [...getters.events_to_be_simulated][len + 1]

      commit('ADD_EVENT', new_event)
    },
    openEvent({ commit }, event) {
      commit('SET_OPENED_EVENT', event)
      return
    }
  },
  getters: {
    game: state => state.game, 
    game_data: state => state.game_data, 
    loading_game: state => state.loading_game,
    finished: state => state.finished,
    loading_game_id: state => state.loading_game_id,
    events_to_be_simulated: state => state.events_to_be_simulated,
    opened_event: state => state.opened_event,
    events: state => state.events,
    event_polling_interval: state => state.event_polling_interval,
    reversed_events: (_, getters) => {
      return [...getters.events].reverse()
    },
    happening_type_events: (_, getters) => {
      // Jaksojen alut ja loput
      if(!getters.events) return null

      return getters.events.filter(e => e.groupType == 'm')
    },
    stat_events: (_, getters) => {
      if(!getters.events) return []

      return getters.events.map(e => {
        return e.events.filter(a => a.type == 'stat')
      }).flat() 
    },
    stat_points: (_, getters) => (team_id) => {

      const evs = getters.events.filter(e => e.team == team_id).map((e, i) => {
        //  { "type": "stat", "pointhits": 3 }, { "type": "stat", "score": 3 }

        const stat = e.events.map(event => {
          let conc = []

          if(event.texts.map(t => t.score || t.walkscore || t.wtscore).includes(1)) {
            conc = {
              ran_run: 1,
              type: 'stat',
              player_id: event.texts.find(p => p.type == 'player' && p.role != 'batter')['number']
            }
          } else if(event.texts.map(t => t.score || t.walkscore || t.wtscore).includes(3)) {
            conc = [{
              ran_run: 1,
              type: 'stat',
              player_id: event.texts.find(p => p.type == 'player' && p.role != 'batter')['id']
            }]
          }

          return event.texts.filter( t => t.type == 'stat' ).concat(conc)
        }).flat()


        return { stats: stat, batter: e.batter, team_id }
      }).filter(s => s.stats.length).flat()

      return evs
    },
    form_stats: () => (points, side) => {
      let batters = {}

      points.forEach(s => {
        let key = `${s.batter}_${side}`

        const getEmptyStats = () => ({
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
          ran_runs: 0,
          homeruns: 0
        })

        if(!batters[key]) batters[key] = getEmptyStats()

        s.stats?.forEach(b => {

          if(b.pointhitf || b.pointhitf == 0) {
            batters[key]['pointhitf' + b.pointhitf]++
            batters[key]['pointhitf']++
          }
          if(b.pointhits || b.pointhits == 0) {
            batters[key]['pointhits' + b.pointhits]++
            batters[key]['pointhits']++
          }
          if(b['runner-at-3']) {
            batters[key]['runner_at_3']++
          }
          if(b['out']) {
            batters[key]['pmv'] = batters[key]['pmv'] + 1
          }
          if(b['score']) {
            batters[key]['score']++
          }
          if(b['homerun']) {
            batters[key]['homeruns']++
            batters[key]['ran_runs']++
          }
          if(b['ran_run']) {
            const new_key = `${b["player_id"]}_${side}`
            if(!batters[new_key]) batters[new_key] = getEmptyStats()
            batters[new_key]['ran_runs']++
          }
        })
      })
      return batters;
    },
    home_team_id: (_, getters) => {
      return getters.game.home?.id
    },
    away_team_id: (_, getters) => {
      return getters.game.away?.id
    },
    stats_by_hitter: (_, getters) => {
      const home = getters.stat_points(getters.game_data.home.id)
      const away = getters.stat_points(getters.game_data.away.id)

      // Tässä vituiksi
      const data = {
        home: getters.form_stats(home, 'home'),
        away: getters.form_stats(away, 'away')
      }

      return data
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
          { text: 'T', key: 'ran_runs', long_text: 'Tuodut' },
          { text: 'KL', key: 'pointhits', long_text: 'Kärkilyönnit / Kärkilyöntiyritykset' },
          { text: '1%', key: 'pointhits0', long_text: 'Kärkilyönnit 0-til' },
          { text: '2%', key: 'pointhits1', long_text: 'Kärkilyönnit 1-til' },
          { text: '3%', key: 'pointhits2', long_text: 'Kärkilyönnit 2-til' },
          { text: 'K%', key: 'pointhits3', long_text: 'Kärkilyönnit kotiin' },
          { text: 'KL%', key: 'kl_percentage', long_text: 'Kärkilyöntiprosentti' },
          { text: 'PMV', key: 'pmv', long_text: 'Palot mailan varressa' },
        ],
        data: getters.game[side].players.map(player => {
          let player_identifier = `${player.id}_${side}`
          let player_stats = getters.stats_by_hitter[side][player_identifier]
          if(!player_stats) {
            player_identifier = `${player.number}_${side}`
            player_stats = getters.stats_by_hitter[side][player_identifier]
          }

          const kl = player_stats?.pointhits || 0
          const yri = kl + player_stats?.pointhitf || 0
          const klperyrit = (kl == 0 && yri == 0) ? '-' : `${kl}/${yri}`
          let kl_per = yri ? `${parseInt(((kl / yri) * 100).toFixed(0))}%` : '-'
          
          return {
            player: `${player.number}. ${player.first_name} ${player.last_name}`,
            outfield_pos: player.defensive_position.short_name || '-',
            homeruns: player_stats?.homeruns || '-',
            score: player_stats?.score || '-',
            ran_runs: player_stats?.ran_runs || '-',
            pointhits: klperyrit,
            pointhits0: getters.get_point_hits_string(player_identifier, 0, side),
            pointhits1: getters.get_point_hits_string(player_identifier, 1, side),
            pointhits2: getters.get_point_hits_string(player_identifier, 2, side),
            pointhits3: getters.get_point_hits_string(player_identifier, 3, side),
            kl_percentage: kl_per,
            pmv: player_stats?.pmv || '-',
            side,
            player_id: player.id || player.number
            // player
          }
        })
      }
    },
    inning_events_by_event: (_, getters) => event => {
      if(!event) {
        return null
      }

      return [...getters.events].filter(e => {
        return e.period === event.period && e.inning === event.inning && e.batTurn === event.batTurn
      })
    },
    get_point_hits_string: (_, getters) => (player_id, base, side) => {
      if(!getters.stats_by_hitter[side][player_id]) return '-'

      const s = getters.stats_by_hitter[side][player_id]['pointhits' + base]
      const f = getters.stats_by_hitter[side][player_id]['pointhitf' + base]

      if(s + f == 0) return '-'

      return `${s}/${s + f}`
    },
    outsUpToEvent: (_, getters) => (event) => {
      const evs = getters.inning_events_by_event(event)

      let outs = 0

      for (const b in evs) {
        const ev = evs[b]

        ev.events.forEach((t, i) => {
          t.texts.forEach((text, i2) => {
            if(text.type == 'stat' && !!text.out) {
              outs++
            }
          })
        })

        if(ev.id == event.id) break
      }
      return outs
    }
  }
}

export default game