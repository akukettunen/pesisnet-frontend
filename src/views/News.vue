<template>
  <v-container style="height: 99vh; padding-top: 164px;">
    <v-sheet max-width="600">
      <v-row>
        <v-col
          cols="12"
          v-for="(item, i) in feed"
          :key="'article' + i"
        >
          <Article 
            :item="item"
            :twitter="chosen_button_or_first.twitter"
            :youtube="chosen_button_or_first.youtube"
          ></Article>
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
    }
  },
  computed: {
    ...mapGetters('news', [
      'chosen_button_or_first',
      'chosen_button',
      'current_url'
    ]),
    ...mapGetters('rss', [
      'feed'
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