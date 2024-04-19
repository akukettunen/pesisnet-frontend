<template>
  <v-container :key="current_url" style="height: 99vh; padding-top: 164px;">
    <v-sheet class="pa-10" max-width="600" v-if="loading_feed">
      <v-skeleton-loader 
        class="my-4"
        v-for="(_, i) in  new Array(30)" 
        :key="i + 'news-loader'" 
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
    <v-sheet v-else max-width="600">
      <v-row>
        <v-col
          cols="12"
          v-for="(item, i) in feed"
          :key="'article' + i"
        >
          <v-lazy
            :options="{'threshold': 0}"
            transition="fade-transition"
          >
            <Article 
              :index="i"
              :item="item"
              :twitter="chosen_button_or_first.twitter"
              :youtube="chosen_button_or_first.youtube"
            ></Article>
          </v-lazy>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Article from '@/components/news/Article.vue'

export default {
  data: () => ({
    visibility: 'hidden'
  }),
  components: {
    Article
  },
  async created() {
    this.getFeed()
  },
  methods: {
    onload() {
      this.visibility = 'visible'
    },
    ...mapActions('rss', [
      'fetchRSSFeed'
    ]),
    async getFeed() {
      await this.fetchRSSFeed(this.current_url)

      this.$nextTick(() => {
        if (window.twttr && window.twttr.widgets) {
          console.log(this.index, 'moro')
          // This processes all elements with class 'twitter-tweet' to render the embedded tweet
          window.twttr.widgets.load();
        }
      })
    }
  },
  computed: {
    ...mapGetters('news', [
      'chosen_button_or_first',
      'chosen_button',
      'current_url'
    ]),
    ...mapGetters('rss', [
      'feed',
      'loading_feed'
    ])
  },
  watch: {
    'current_url': {
      handler() {
        this.getFeed()
      }
    }
  }
}
</script>