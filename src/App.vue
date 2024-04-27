<template>
  <v-container fluid :style="`padding: 0; padding-bottom: ${$vuetify.display.mobile ? '80' : '0'}px;`">
    <v-layout>
      <v-app-bar v-if="!$vuetify.display.mobile" color="primary-darken-1" name="app-bar" :elevation="$route.meta.show_news_bar ? '0' : '2'">
        <v-app-bar-title class="d-flex" v-if="!$vuetify.display.mobile" style="flex-shrink: 1; flex-direction: column;">
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
            <span v-if="!$vuetify.display.mobile">
              {{ btn.text }}
            </span>
            <span v-else>
              {{ btn.text_mobile }}
            </span>
          </v-btn>
          <v-btn @click="toggleTheme()" class="mx-2" icon>
            <v-tooltip activator="parent">
              {{ $vuetify.theme.name == 'dark' ? 'Vaalea tila' : 'Tumma tila' }}
            </v-tooltip>
            <v-icon v-if="$vuetify.theme.name == 'dark'">
              mdi-weather-sunny
            </v-icon>
            <v-icon v-else>
              mdi-weather-night
            </v-icon>
          </v-btn>
        </v-sheet>
      </v-app-bar>
      <v-app-bar
        style="overflow-x: scroll;" 
        height="70" 
        v-if="$route.meta.show_news_bar"
      >
        <v-btn
          v-for="btn in news_buttons" 
          :active="current_url === btn.feedUrl"
          @click="btn.children ? '' : SET_CHOSEN_NEWS_BUTTON(btn); $vuetify.goTo(0);"
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
          <v-menu activator="parent" v-if="btn.children">
            <v-list dense>
              <v-list-item
                @click="SET_CHOSEN_NEWS_BUTTON(item)"
                v-for="item in btn.children"
                :key="item.text"
                :active="current_url === item.feedUrl"
              >
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-app-bar>


      <!-- STATS -->
      <v-app-bar 
        height="60"
        class="pl-2 d-flex" 
        style="flex-wrap: wrap; overflow-x: scroll;" 
        v-if="$route.meta.show_data_bar"
      >
        <stats-buttons></stats-buttons>
      </v-app-bar>

      <v-snackbar 
        max-width="4000"
        style="max-width: 4000px !important;"
        v-model="$vuetify.display.mobile"
        id="snack"
        :timeout="-1"
      >
        <v-bottom-navigation
          v-if="$vuetify.display.mobile"
          key="main-bottom-navigation"
        >
          <v-btn
            @click="$router.push(btn.route)"
            :stacked="$vuetify.display.mobile"
            v-for="btn in app_bar_buttons"
            :key="btn.icon + 'main'"
            style="height: 100%;"
            :active="$route.path.includes(btn.route)"
            class="mr-3"
            :class="{ 'px-4' : !$vuetify.display.mobile }"
            :size="$vuetify.display.mobile ? 'x-small' : ''"
          >
            <v-icon :class="{'mr-3': !$vuetify.display.mobile}">{{ btn.icon }}</v-icon>
            <span v-if="!$vuetify.display.mobile">
              {{ btn.text }}
            </span>
            <span v-else>
              {{ btn.text_mobile }}
            </span>
          </v-btn>
        </v-bottom-navigation>
      </v-snackbar>
      
      <router-view />
    </v-layout>
  </v-container>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { onMounted } from 'vue';

const theme = useTheme()

function toggleTheme () {
  const val = theme.global.current._value.dark ? 'light' : 'dark'
  theme.global.name.value = val
  localStorage.setItem('pesisnet-theme', val);
}

onMounted(() => {
  const savedTheme = localStorage.getItem('pesisnet-theme');
  theme.global.name.value = savedTheme || 'dark';
});
</script>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import StatsButtons from './components/navigation/StatsButtons.vue';

export default {
  components: { StatsButtons },
  name: "App",
  inject: ['mixpanel'],
  mounted() {
    this.$router.beforeEach((to, from, next) => {
      this.mixpanel.track('Page View', {
        path: to.path,
        fullPath: to.fullPath,
        query: to.query
      });
      next();
    });
  },
  created() {
    this.initMaps()
  },
  data: () => ({
    app_bar_buttons: [
      { text: 'Pelit', text_mobile: "Pelit", icon: 'mdi-play-box-outline', route: '/games' },
      { text: 'Uutiset & Some', text_mobile: "Uutiset", icon: 'mdi-newspaper-variant-outline', route: '/news' },
      { text: 'Data & Tilastot', text_mobile: "Data", icon: 'mdi-database-outline', route: '/stats' },
    ]
  }),
  methods: {
    ...mapActions('data', [
      'initMaps'
    ]),
    ...mapMutations('news', [
      'SET_CHOSEN_NEWS_BUTTON'
    ])
  },
  computed: {
    ...mapGetters('news', [
      'news_buttons',
      'current_url',
    ])
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

.vs__dropdown-menu {
  z-index: 999 !important;
}

.sport-font {
  font-family: graduate;
}


</style>