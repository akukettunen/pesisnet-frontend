import a from '@/utils/axios'
import axios from 'axios'
import router from '@/router/index.js'
import { handleGamesData } from '../../utils/games.js'

const games = {
  namespaced: true,
  state: () => ({
    date_games: [],
    loading_games: false,
    date: null,
    game_dates: null,
    getting_games_for_date: null
  }),
  mutations: {
    SET_DATE_GAMES(state, games) {
      state.date_games = games
    },
    SET_DATE(state, date) {
      state.date = date
    },
    SET_LOADING_GAMES(state, val) {
      state.loading_games = val
    },
    SET_GAME_DATES(state, val) {
      state.game_dates = val
    },
    SET_GETTING_GAMES_FOR_DATE(state, val) {
      state.getting_games_for_date = val
    }
  },
  actions: {
    setDateFormal({ commit, dispatch }, date) {
      const new_date = new Date(date)
      const year = new_date.getFullYear()
      const month = new_date.getMonth() + 1 > 9 ? new_date.getMonth() + 1 : `0${new_date.getMonth() + 1}`
      const day = new_date.getDate() > 9 ? new_date.getDate() : `0${new_date.getDate()}`
      const ugly_date = `${year}-${month}-${day}`
      commit('SET_DATE', ugly_date)

      router.replace({ query: { date: ugly_date }})

      dispatch('getDateGames', ugly_date)
    },
    getDateGames({ commit, getters }, date) {
      if(!date) date = getters.date

      commit('SET_LOADING_GAMES', true)
      commit('SET_GETTING_GAMES_FOR_DATE', date)

      const url = `https://www.pesistulokset.fi/api/v1/matches-per-date?date=${date}`
      axios(url)
        .then(e => {
          if(date != getters.getting_games_for_date) return
          const games = handleGamesData({ games: e.data.data, maps: e.data.maps })
          commit('SET_DATE_GAMES', { organizers: games })
        })
        .catch(e => {
          alert(e)
        })
        .finally(() => {
          if(date != getters.getting_games_for_date) return
          commit('SET_LOADING_GAMES', false)
        })
    },
    initDate({ commit, getters }) {
      if(getters.date) return
      const date = router.currentRoute._value.query.date
      if(date) {
        commit('SET_DATE', date)
        return
      }
      const date_now = new Date()
      const formatted_date_now = date_now.toISOString().split('T')[0]

      commit('SET_DATE', formatted_date_now)
    },
    nextDay({ getters, dispatch }) {
      if(getters.next_games) {
        let next = new Date(getters.next_games)
        dispatch('setDateFormal', next)
        return
      }

      let tomorrow = getters.date_formal
      tomorrow.setDate(tomorrow.getDate() + 1);

      dispatch('setDateFormal', tomorrow)
    },
    previousDay({ getters, dispatch }) {
      if(getters.previous_games) {
        let next = new Date(getters.previous_games)
        dispatch('setDateFormal', next)
        return
      }

      let yesterday = getters.date_formal
      yesterday.setDate(yesterday.getDate() - 1);

      dispatch('setDateFormal', yesterday)
    },
    initGameDates({ getters, commit }) {
      let { year, month } = getters
      if(month > 10) year++

      a(`/games/dates?season=${year}`)
        .then(e => {
          commit('SET_GAME_DATES', e.data)
        })
        .catch(e => {
          alert(e)
        })
    }
  },
  getters: {
    date_games: state => state.date_games,
    date: state => state.date,
    loading_games: state => state.loading_games,
    getting_games_for_date: state => state.getting_games_for_date,
    game_dates: state => state.game_dates,
    game_dates_formal: state => state.game_dates.map(d => {
      const date = new Date(d)
      return date
    }),
    year: (state, getters) => {
      if(!getters.date) return null
      return getters.date.split('-')[0]
    },
    month: (state, getters) => {
      if(!getters.date) return null
      return getters.date.split('-')[1]
    },
    month_index: (state, getters) => {
      if(!getters.date) return null
      return getters.date.split('-')[1] - 1
    },
    day: (state, getters) => {
      if(!getters.date) return null
      return getters.date.split('-')[2]
    },
    date_formal: (state, getters) => {
      if(!getters.date) return null
      return new Date(getters.year, getters.month_index, getters.day)
    },
    pretty_date: (_, getters) => {
      return `${getters.day}.${getters.month}.${getters.year}`
    },
    next_games: (_, getters) => {
      let next = null
      const [ c_year, c_month, c_day ] = getters.date.split('-')
      
      getters.game_dates?.forEach(d => {
        const [ year, month, day ] = d.split('-')
        if(next) return
        if(year > c_year) next = d
        if(month > c_month && year == c_year) next = d
        if(day > c_day && month == c_month && year == c_year) next = d
      })

      return next
    },
    previous_games: (_, getters) => {
      if(!getters.game_dates) return

      let next = null
      const [ c_year, c_month, c_day ] = getters.date.split('-')
      
      const dates = [ ...getters.game_dates ]
      dates.reverse().forEach(d => {
        const [ year, month, day ] = d.split('-')
        if(next) return
        if(year < c_year) next = d
        if(month < c_month && year == c_year) next = d
        if(day < c_day && month == c_month && year == c_year) next = d
      })

      return next
    },
    pretty_day_from_date: () => (date) => {
      const pretty = new Date(date)
      const hours = pretty.getHours() > 9 ? pretty.getHours() : '0' + pretty.getHours()
      const minutes = pretty.getMinutes() > 9 ? pretty.getMinutes() : '0' + pretty.getMinutes()
      return hours + ':' + minutes
    },
    get_runs: () => (ru) => {
      if(ru[0] == null) return 0
      return ru.reduce((a, b) => (a ? parseInt(a) : 0) + (b ? parseInt(b) : 0), 0)
    }
  }
}

export default games