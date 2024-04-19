import axios from 'axios';
import xml2js from 'xml2js';

const rssModule = {
  namespaced: true,
  state: () => ({
    feed: [],
    loading_feed: false
  }),
  mutations: {
    SET_FEED(state, items) {
      state.feedItems = items;
    },
    SET_LOADING_FEED(state, val) {
      state.loading_feed = val
    }
  },
  actions: {
    async fetchRSSFeed({ commit }, url) {

      try {
        commit('SET_FEED', []);
        commit('SET_LOADING_FEED', true);
        const response = await axios.get(url, {
          headers: { 'Content-Type': 'application/rss+xml' }
        });
        const result = await xml2js.parseStringPromise(response.data, { explicitArray: false });
        const items = result.rss.channel.item;
        commit('SET_FEED', items);
        commit('SET_LOADING_FEED', false);
      } catch (error) {
        console.error('Error fetching RSS feed:', error);
        commit('SET_FEED', []); // Reset the feed items on error
        commit('SET_LOADING_FEED', false);
      }
    }
  },
  getters: {
    feed: state => state.feedItems,
    loading_feed: state => state.loading_feed,
  }
};

export default rssModule;