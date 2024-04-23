// import a from '@/utils/axios'
// import router from '@/router/index.js'

const games = {
  namespaced: true,
  state: () => ({
    news_buttons: [
      { text: 'Pesäpallo', feedUrl: 'https://rss.app/feeds/tW9pCSuLUwRZmZEn.xml', tooltip: 'Miesten superpesis' },
      { text: 'Superpesis.fi', feedUrl: 'https://rss.app/feeds/5Ok6rt2WUIihsKHk.xml' },
      { text: 'Supervuoro', feedUrl: 'https://rss.app/feeds/v6cXCAKIEK415n40.xml' },
      { text: 'Elmo', feedUrl: 'https://rss.app/feeds/yr0132QvZb0aRigg.xml' },
      { text: '#pesis', feedUrl: 'https://rss.app/feeds/gNCz0sOCgNPCbGux.xml', icon: 'mdi-twitter', icon_color: 'blue', twitter: true },
      { text: 'YouTube', icon: 'mdi-youtube', icon_color: 'red', dropdown: true, youtube: true, children: [
          {
            text: 'Superpesis',
            feedUrl: 'https://rss.app/feeds/GkDFQhsm8PyYN26e.xml'
          }
        ] 
      },
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