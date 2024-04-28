import a from '@/utils/axios'
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
    event_polling_interval: null,
    latest_runner_data: {
      season: null,
      base: null,
      times: null,
      player_name: null,
      player_id: null
    },
    latest_hitter: null,
    show_field: false
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
    },
    SET_LATEST_RUNNER_DATA(state, val) {
      state.latest_runner_data = val
    },
    RESET_LATEST_RUNNER_DATA(state) {
      state.latest_runner_data = {
        season: null,
        base: null,
        times: null,
        player_name: null,
        player_id: null
      }
    },
    SET_LATEST_HITTER(state, val) {
      state.latest_hitter = val
    },
    SET_SHOW_FIELD(state, val) {
      state.show_field = val
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
            const simulate = false
          if(simulate) {
            commit('SET_EVENTS_TO_BE_SIMULATED', e.data.events)
            dispatch('startEventSimulation')
          } else if(e.data.events.length > getters.events.length) {
            commit('SET_EVENTS', e.data.events)
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
    eventRefresh({ getters, commit, dispatch }, new_event) {
      if(!(["Superpesis", "Talvisuper"]).includes(getters.game.series.level) && ( getters.game.series.level != "Ykköspesis" || getters.game.series.name != "Miehet")) {
        commit('RESET_LATEST_RUNNER_DATA')
        return
      }

      const event = new_event.events[0]
      const team_id = new_event.team
      const bases = event.runnersAtBases
      let furthest_runner_id = null
      let base_index = 0

      bases.forEach((r, i) => {
        if(i == 0 && r) {
          dispatch('handleHitter', { player_id: r, team_id })
        } else if(i == 0) {
          commit('SET_LATEST_HITTER', null)
        }

        if(r && i != 0 && i != 4) {
          furthest_runner_id = r
          base_index = i
        }
      })

      if(!furthest_runner_id) {
        commit('RESET_LATEST_RUNNER_DATA')
        return
      }

      if(getters.latest_runner_data.player_id == furthest_runner_id) {
        commit('SET_LATEST_RUNNER_DATA', { ...getters.latest_runner_data, current_base: base_index })
      } else {
        commit('RESET_LATEST_RUNNER_DATA')
      }

      const runner = getters.player_by_team_id_and_player_id({ team_id, player_id: furthest_runner_id })

      if(!runner || !runner.name) return

      const d = new Date();
      let season = d.getFullYear();

      a(`/players/time?base=${base_index}&player_name=${runner.name}&season=${season}`)
        .then(e => {
          commit('SET_LATEST_RUNNER_DATA', { ...e.data, player: runner, player_id: furthest_runner_id })
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleHitter({ commit, getters }, { player_id, team_id }) {
      const hitter = getters.player_by_team_id_and_player_id({ team_id, player_id })

      if(!hitter) return

      commit('SET_LATEST_HITTER', hitter)
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
    show_field: state => state.show_field,
    latest_hitter: state => state.latest_hitter,
    latest_runner_data: state => state.latest_runner_data,
    event_polling_interval: state => state.event_polling_interval,
    reversed_events: (_, getters) => {
      return [...getters.events].reverse()
    },
    event_text: (_, getters) =>  (event, a, index) => {
      let ret = {}

      const text = a.texts.map(t => {
        if(typeof t == 'string') return t
        else if (t.type == "stat" && t.out) ret['outs'] = getters.outsUpToEvent(event, index)
        else if (t.type == 'player') {
          const side = getters.game.home?.id == t.team ? 'home' : 'away'
          return getters.game[side]?.players.find(p => (p.id == t.id && t.id) || (p.number == t.number && t.number))?.name
        } else if(t.type == 'team') {
          const side = getters.game.home?.id == t.team ? 'home' : 'away'
          return getters.game[side].name
        } else if(t.type == "substitution") {
          const side = getters.game.home?.id == t.team ? 'home' : 'away'
          if(!side) return

          const lineup = t.as?.newLineUp || t.newLineUp
          const names = lineup.map((id, i) => {
            let val = (i + 1) + '. ' + getters.game[side].players.find(p => p.id == id || p.number == id).name + ( i + 1 == t.as?.newLineUp.length ? '' : ',' )
            return val
          })

          return names.join('\n')
        }
        else return t.text
      })
      .filter(e => !!e).join(' ')

      return { text, ...ret }
    },
    player_by_team_id_and_player_id: (_, getters) => ({ team_id, player_id }) => {
      const side = getters.game.home?.id == team_id ? 'home' : 'away'
      return getters.game[side].players.find(p => p.id == player_id || p.number == player_id)
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
          let player = event.texts.find(p => p.type == 'player' && p.role != 'batter')

          if(event.texts.map(t => t.score || t.walkscore || t.wtscore).includes(1)) {
            conc = {
              ran_run: 1,
              type: 'stat',
              player_id: player['number'] || player['id']
            }
          } else if(event.texts.map(t => t.score || t.walkscore || t.wtscore).includes(3)) {
            conc = [{
              ran_run: 1,
              type: 'stat',
              player_id: player['id'] || player['number']
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
    hits_by_player: (_, getters) => ({ player_id, player_number, side }) => {
      const hits = getters.events.filter(ev => {
        // ev.events[0].texts?.find(t => t.type == 'hit')?.hit
        const event_side = getters.game.home.id == ev.team ? 'home' : 'away'

        if(player_id == 'total') return event_side == side && !!ev.hit
        return (ev.batter == player_id || (ev.batter == player_number && event_side == side)) && !!ev.hit
      })

      if(!hits || !hits.length) return []

      const hits_mapped = hits.map(h => {
        const is_fail = h.events.some(e => e.texts.some(t => !!t.pointhitf || t.pointhitf == 0))
        const is_haava = h.events.some(e => e.texts.some(t => (!!t.pointhitf || t.pointhitf == 0) && h.hit.caught))
        const is_success = h.events.some(e => e.texts.some(t => !!t.pointhits || t.pointhits == 0))

        return {
          ...h,
          is_fail,
          is_success,
          is_haava
        }
      })

      return hits_mapped
    },
    stats_table: (_, getters) => side => {
      if(!getters.game?.id) return { headers: [], data: [] }

      const headers = [
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
      ]

      var total_pointhits = {
        tot: [0, 0],
        0: [0, 0],
        1: [0, 0],
        2: [0, 0],
        3: [0, 0],
      }

      let last_row = {
        player: 'Yhteensä',
        player_id: 'total',
        outfield_pos: '-',
        homeruns: 0,
        score: 0,
        ran_runs: 0,
        kl_percentage: 0,
        pmv: 0,
        side
      }

      for (let player of getters.game[side].players) {
        let player_identifier = `${player.id}_${side}`
        let player_stats = getters.stats_by_hitter[side][player_identifier]
        if(!player_stats) {
          player_identifier = `${player.number}_${side}`
          player_stats = getters.stats_by_hitter[side][player_identifier]
        }

        for (let base = 0; base < 4; base++) {
          let s, f;
          if(!getters.stats_by_hitter[side][player_identifier]) s = 0
          else s = getters.stats_by_hitter[side][player_identifier]['pointhits' + base] || 0

          if(!getters.stats_by_hitter[side][player_identifier]) f = 0
          else f = getters.stats_by_hitter[side][player_identifier]['pointhitf' + base] || 0

          total_pointhits[base] = [
            total_pointhits[base][0] + s, total_pointhits[base][1] + s + f
          ]
          total_pointhits['tot'] = [
            total_pointhits['tot'][0] + s, total_pointhits['tot'][1] + s + f
          ]
        }
      }

      let data = getters.game[side].players.map(player => {
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
        
        last_row.homeruns += player_stats?.homeruns
        last_row.score += player_stats?.score
        last_row.ran_runs += player_stats?.ran_runs
        last_row.pmv += player_stats?.pmv

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
          player_id: player.id || player.number,
          player_number: player.number
          // player
        }
      })

      last_row['pointhits'] = `${total_pointhits.tot[0]}/${total_pointhits.tot[1]}`
      last_row['pointhits0'] = `${total_pointhits[0][0]}/${total_pointhits[0][1]}`
      last_row['pointhits1'] = `${total_pointhits[1][0]}/${total_pointhits[1][1]}`
      last_row['pointhits2'] = `${total_pointhits[2][0]}/${total_pointhits[2][1]}`
      last_row['pointhits3'] = `${total_pointhits[3][0]}/${total_pointhits[3][1]}`
      last_row['kl_percentage'] = total_pointhits.tot[1] ? `${parseInt(((total_pointhits.tot[0] / total_pointhits.tot[1]) * 100).toFixed(0))}%` : '-'

      return {
        title: '',
        headers,
        data: data.concat(last_row)
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