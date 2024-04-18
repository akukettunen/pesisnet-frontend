// import a from '@/utils/axios'
// import router from '@/router/index.js'

const games = {
  namespaced: true,
  state: () => ({
    news_buttons: [
      { text: 'Pesäpallo', feedUrl: 'https://rss.app/feeds/tW9pCSuLUwRZmZEn.xml', tooltip: 'Miesten superpesis' },
      { text: 'MSU', feedUrl: 'https://rss.app/embed/v1/wall/_lmbRwK8NSVM6TROs', tooltip: 'Miesten superpesis' },
      { text: 'NSU', feedUrl: 'google.fi', active: true, tooltip: 'Naisten superpesis' },
      { text: 'MYP', feedUrl: 'google.fi', tooltip: 'Miesten ykköspesis' },
      { text: 'NYP', feedUrl: 'google.fi', tooltip: 'Naisten ykköspesis' },
      { text: 'Yleiset', feedUrl: 'google.fi' },
      { text: 'Superpesis.fi', feedUrl: 'https://rss.app/feeds/5Ok6rt2WUIihsKHk.xml' },
      { text: 'Supervuoro', feedUrl: 'https://rss.app/feeds/v6cXCAKIEK415n40.xml' },
      { text: 'Twitter', feedUrl: 'https://rss.app/feeds/gNCz0sOCgNPCbGux.xml', icon: 'mdi-twitter', icon_color: 'blue', twitter: true },
      { text: 'YouTube', feedUrl: 'google.fi', icon: 'mdi-youtube', icon_color: 'red', dropdown: true },
      { text: 'Joukkueet', feedUrl: 'https://rss.app/embed/v1/wall/9vJjmyNTtovXSq8J', dropdown: true },
    ],
    chosen_button: null
  }),
  mutations: {
    SET_CHOSEN_NEWS_BUTTON(state, val) {
      state.chosen_button = val
    }
  },
  actions: {
    // router.replace({ query: { date: ugly_date }})
  },
  getters: {
    news_buttons: state => state.news_buttons,
    chosen_button_or_first: (_, getters) => {
      return getters.chosen_button || getters.news_buttons[0] 
    },
    chosen_button: state => {
      return state.chosen_button
    },
    current_url: (_, getters) => {
      return getters.chosen_button_or_first.feedUrl
    }
  }
}

export default games