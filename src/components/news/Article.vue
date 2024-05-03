<template>
  <v-sheet class="my-2" style="border-radius: 2px;">
    <div v-if="!twitter && !youtube">
      <div @click="openLink()" style="cursor: pointer; min-height: 100px;">
        <v-img
          max-height="400"
          v-if="item['media:content'] && item['media:content'].$.medium == 'image'"
          width="100%"
          max-width="100%"
          style="border-radius: 0px;"
          :src="item['media:content'].$.url"
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              ></v-progress-circular>
            </div>
          </template>    
        </v-img>
      </div>
      <div class="pa-3">
        <v-sheet @click="openLink()" class="text-h5" style="font-size: 20px; cursor: pointer;">
          {{  item.title }}
        </v-sheet>
        <div class="sport-font" :style="`color: ${$vuetify.theme.name == 'dark' ? 'lightgrey' : 'grey'}; font-size: 12px;`">
          {{ parseAndFormatDate(item.pubDate) }}
        </div>
        <v-chip label size="small" class="mt-1">
          {{ item['dc:creator'] }}
        </v-chip>
        <div :style="`color: ${$vuetify.theme.name == 'dark' ? 'lightgrey' : 'grey'};`">
          {{ extractTextFromHtml(item.description) }}
        </div>
      </div>
    </div>
    <v-sheet v-else @click="openLink()" style="font-size: 20px; cursor: pointer;">
      <div v-if="youtube">
        {{  item.title }}
      </div>
      <v-sheet v-html="blockquote" frameborder="0"></v-sheet>
    </v-sheet>
  </v-sheet>
</template>

<script>
export default {
  props: ['item', 'twitter', 'youtube', 'index'],
  created() {
    this.$nextTick(() => {
      if (window.twttr && window.twttr.widgets) {
        // This processes all elements with class 'twitter-tweet' to render the embedded tweet
        window.twttr.widgets.load();
      }
    })
  },
  methods: {
    openLink() {
      window.open(this.item.link)
    },
    parseAndFormatDate(dateStr) {
      if(!dateStr) return
      const options = { day: '2-digit', month: '2-digit' };
      const date = new Date(dateStr);
      const formatter = new Intl.DateTimeFormat('en-GB', options);
      return `${formatter.format(date).replace('/', '.')}.`
    },
    extractTextFromHtml(htmlString) {
      // Creating a new DOMParser instance
      const parser = new DOMParser();
      // Parsing the HTML string to a new document
      const doc = parser.parseFromString(htmlString, "text/html");
      // Extracting and returning the text content of the parsed document
      return doc.body.textContent || "";
    }
  },
  computed: {
    blockquote() {
      let mod = this.item.description

      return this.$vuetify.theme.name == 'dark' ? mod.replace(/<blockquote([^>]*)>/, '<blockquote$1 data-theme="dark">') : mod;
    }
   }
}
</script>