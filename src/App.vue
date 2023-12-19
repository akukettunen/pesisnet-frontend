<template>
  <v-sheet fluid>
    <v-layout>
      <v-app-bar color="primary" name="app-bar" :elevation="$route.meta.show_news_bar ? '0' : '2'">
        <v-app-bar-title v-if="!$vuetify.display.mobile" style="flex-shrink: 1;">
          PesisNet
        </v-app-bar-title>
        <v-sheet color="primary" height="90%" class="mx-auto">
          <v-btn
            @click="$router.push(btn.route)"
            :stacked="$vuetify.display.mobile"
            v-for="btn in app_bar_buttons"
            :key="btn.icon"
            style="height: 100%;"
            :active="$route.path == btn.route"
            color="white"
            class="mr-3"
            :class="{ 'px-4' : !$vuetify.display.mobile }"
            :size="$vuetify.display.mobile ? 'x-small' : ''"
          >
            <v-icon :class="{'mr-3': !$vuetify.display.mobile}">{{ btn.icon }}</v-icon>
            {{ btn.text }}
          </v-btn>
        </v-sheet>
      </v-app-bar>
      <v-app-bar style="overflow-x: scroll;" :height="$vuetify.display.mobile ? '30' : '60'" v-if="$route.meta.show_news_bar">
        <v-btn 
          v-for="btn in news_buttons" 
          :active="btn.active"
          :key="btn.text + 'news_button'"
          :size="$vuetify.display.mobile ? 'x-small' : 'small'"
        >
          <v-icon v-if="btn.dropdown">mdi-chevron-down</v-icon>
          <v-icon :color="btn.icon_color" v-if="btn.icon" class="mr-1">{{ btn.icon }}</v-icon>
          {{ btn.text }}
          <v-tooltip
            v-if="btn.tooltip"
            activator="parent"
            location="bottom"
          >
            {{ btn.tooltip }}
          </v-tooltip>
        </v-btn>
      </v-app-bar>
      <router-view />
    </v-layout>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    app_bar_buttons: [
      { text: 'Pelit', icon: 'mdi-play-box-outline', route: '/' },
      { text: 'Uutiset & Some', icon: 'mdi-newspaper-variant-outline', route: '/news' },
      { text: 'Data & Tilastot', icon: 'mdi-database-outline', route: '/stats' },
    ],
    news_buttons: [
      { text: 'MSU', feedUrl: 'google.fi', active: false, tooltip: 'Miesten superpesis' },
      { text: 'NSU', feedUrl: 'google.fi', active: true, tooltip: 'Naisten superpesis' },
      { text: 'MYP', feedUrl: 'google.fi', active: false, tooltip: 'Miesten ykköspesis' },
      { text: 'NYP', feedUrl: 'google.fi', active: false, tooltip: 'Naisten ykköspesis' },
      { text: 'Yleiset', feedUrl: 'google.fi', active: false },
      { text: 'Superpesis.fi', feedUrl: 'google.fi', active: false },
      { text: 'Lehdet', feedUrl: 'google.fi', active: false },
      { text: 'Twitter', feedUrl: 'google.fi', active: false, icon: 'mdi-twitter', icon_color: 'blue' },
      { text: 'YouTube', feedUrl: 'google.fi', active: false, icon: 'mdi-youtube', icon_color: 'red', dropdown: true },
      { text: 'Joukkueet', feedUrl: 'google.fi', active: false, dropdown: true },
    ]
  })
}
</script>

<style>
.vs__dropdown-menu {
  z-index: 999 !important;
}

.sport-font {
  font-family: graduate;
}

</style>