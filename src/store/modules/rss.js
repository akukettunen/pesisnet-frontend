import axios from 'axios';
import xml2js from 'xml2js';

const rssModule = {
  namespaced: true,
  state: () => ({
    feed: []
  }),
  mutations: {
    SET_FEED(state, items) {
      state.feedItems = items;
    }
  },
  actions: {
    async fetchRSSFeed({ commit }, url) {
      try {
        const response = await axios.get(url, {
          headers: { 'Content-Type': 'application/rss+xml' }
        });
        const result = await xml2js.parseStringPromise(response.data, { explicitArray: false });
        const items = result.rss.channel.item;
        commit('SET_FEED', items);
      } catch (error) {
        console.error('Error fetching RSS feed:', error);
        commit('SET_FEED', []); // Reset the feed items on error
      }
    }
  },
  getters: {
    feed: state => state.feedItems
  }
};

export default rssModule;