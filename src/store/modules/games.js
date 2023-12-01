import a from '@/utils/axios'
import router from '@/router/index.js'

const games = {
  namespaced: true,
  state: () => ({
    date_games: [],
    loading_games: false,
    date: null,
    game_dates: null
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
      commit('SET_LOADING_GAMES', true)
      if(!date) date = getters.date
      a(`/games?date=${date}`)
        .then(e => {
          commit('SET_DATE_GAMES', e.data)
        })
        .catch(e => {
          alert(e)
        })
        .finally(() => {
          commit('SET_LOADING_GAMES', false)
        })
    },
    initDate({ commit }) {
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
      let tomorrow = getters.date_formal
      tomorrow.setDate(tomorrow.getDate()+1);

      dispatch('setDateFormal', tomorrow)
    },
    previousDay({ getters, dispatch }) {
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
    game_dates: state => state.game_dates,
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
      const [ c_year, c_month, c_day ] = getters.date
      console.log([ c_year, c_month, c_day ])
      
      getters.game_dates?.forEach(d => {
        const [ year, month, day ] = d.split('-')

        if(!next && year >= c_year && month >= c_month && day > c_day) {
          next = d
        }
      })

      return next
    }
  }
}

export default games