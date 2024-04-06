<template>
  <v-sheet fluid>
    <v-layout>
      <v-app-bar color="primary-darken-1" name="app-bar" :elevation="$route.meta.show_news_bar ? '0' : '2'">
        <v-app-bar-title v-if="!$vuetify.display.mobile" style="flex-shrink: 1;">
            <v-img
              @click="$router.push('/')"
              height="50"
              width="50"
              cover
              style="border-radius: 50%; cursor: pointer;"
              src="./assets/images/logo.png"
            >
              <v-tooltip
                activator="parent"
                location="end"
              >Peleihin</v-tooltip>
            </v-img>
        </v-app-bar-title>
        <v-sheet color="primary-darken-1" height="90%" class="mx-auto">
          <v-btn
            @click="$router.push(btn.route)"
            :stacked="$vuetify.display.mobile"
            v-for="btn in app_bar_buttons"
            :key="btn.icon"
            style="height: 100%;"
            :active="$route.path.includes(btn.route)"
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
      <v-app-bar 
        style="overflow-x: scroll;" 
        :height="$vuetify.display.mobile ? '50' : '60'" 
        v-if="$route.meta.show_news_bar"
      >
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
      <v-app-bar 
        :height="$vuetify.display.mobile ? '50' : '60'" 
        class="pl-2 d-flex" 
        style="flex-wrap: wrap; overflow-x: scroll;" 
        v-if="$route.meta.show_data_bar"
      >
        <div style="position: relative; display: flex; flex-direction: column;" v-for="btn in stats_buttons" :key="btn.text + 'news_button'">
          <v-chip variant="text" size="x-small" style="bottom: -16px; left: calc(50% - 53px); position: absolute; text-align: center;" v-if="btn.coming_soon">
            Tulossa toukokuussa!
          </v-chip>
          <v-btn
            style="align-self: center;"
            :disabled="btn.coming_soon"
            :variant="$route.path.includes(btn.path) ? 'outlined' : 'text'"
            @click="$router.push({ path: `/stats${btn.path}` })"
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
        </div>
      </v-app-bar>
      <router-view />
    </v-layout>
  </v-sheet>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  created() {
    this.initMaps()
  },
  data: () => ({
    app_bar_buttons: [
      { text: 'Pelit', icon: 'mdi-play-box-outline', route: '/games' },
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
    ],
    stats_buttons: [
      { text: 'Pelaajakortit', path: '/player-cards', active: false, dropdown: false },
      { text: 'Sarjataulukot', path: '/standings', active: false, dropdown: false },
      { text: 'Lyödyt', path: '/scores', active: false, dropdown: false },
      { text: 'Tuodut', path: '/runs', active: false, dropdown: false },
      { text: 'Kärkilyönnit', path: '/hitpoints', active: false, dropdown: false },
      { text: 'KL pesänväleittäin', path: '/hps-by-base', active: false, dropdown: false, tooltip: "Kärkilyönnit pesänväleittäin" },
      { text: 'Etenemisajat', path: '/runtimes', active: false, dropdown: false },
      { text: 'Otteluohjelmat', path: '/programmes', active: false, dropdown: false },
      { text: 'Lukkarivertailu', path: '/pitchers', active: false, dropdown: false, coming_soon: true },
      { text: 'Ulkopelitilastot', path: '/outfield', active: false, dropdown: false, coming_soon: true },
      { text: 'UP-Suoritusajat', path: '/performance-times', active: false, dropdown: false, coming_soon: true },
    ],
  }),
  methods: {
    ...mapActions('data', [
      'initMaps'
    ])
  }
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