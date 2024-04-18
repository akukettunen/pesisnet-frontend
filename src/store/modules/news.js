// import a from '@/utils/axios'
// import router from '@/router/index.js'

const games = {
  namespaced: true,
  state: () => ({
    news_buttons: [
      { text: 'MSU', feedUrl: 'https://rss.app/embed/v1/wall/_lmbRwK8NSVM6TROs', active: false, tooltip: 'Miesten superpesis' },
      { text: 'NSU', feedUrl: 'google.fi', active: true, tooltip: 'Naisten superpesis' },
      { text: 'MYP', feedUrl: 'google.fi', active: false, tooltip: 'Miesten ykköspesis' },
      { text: 'NYP', feedUrl: 'google.fi', active: false, tooltip: 'Naisten ykköspesis' },
      { text: 'Yleiset', feedUrl: 'google.fi', active: false },
      { text: 'Superpesis.fi', feedUrl: 'https://rss.app/feeds/5Ok6rt2WUIihsKHk.xml', active: false },
      { text: 'Supervuoro', feedUrl: 'https://rss.app/feeds/v6cXCAKIEK415n40.xml', active: false },
      { text: 'Twitter', feedUrl: 'google.fi', active: false, icon: 'mdi-twitter', icon_color: 'blue' },
      { text: 'YouTube', feedUrl: 'google.fi', active: false, icon: 'mdi-youtube', icon_color: 'red', dropdown: true },
      { text: 'Joukkueet', feedUrl: 'https://rss.app/embed/v1/wall/9vJjmyNTtovXSq8J', active: false, dropdown: true },
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