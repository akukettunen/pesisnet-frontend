<template>
  <div style="position: relative; display: flex; flex-direction: column;" v-for="btn in stats_buttons" :key="btn.text + 'news_button'">
    <v-chip variant="text" size="x-small" style="bottom: -16px; left: calc(50% - 53px); position: absolute; text-align: center;" v-if="btn.coming_soon">
      Tulossa toukokuussa!
    </v-chip>
    <v-chip variant="text" size="x-small" style="bottom: -16px; left: calc(50% - 25px); position: absolute; text-align: center;" v-if="btn.closed">
      Suljettu
    </v-chip>
    <v-btn
      style="align-self: center;"
      :disabled="btn.coming_soon || btn.closed"
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
</template>

<script>
export default {
  data: () => ({
    stats_buttons: [
      { text: 'Pelaajakortit', path: '/player-cards', active: false, dropdown: false },
      { text: 'Sarjataulukot', path: '/standings', active: false, dropdown: false },
      { text: 'Lyödyt', path: '/scores', active: false, dropdown: false },
      { text: 'Tuodut', path: '/runs', active: false, dropdown: false },
      { text: 'Kärkilyönnit', path: '/karkilyonnit', active: false, dropdown: false },
      { text: 'KL pesänväleittäin', path: '/hps-by-base', active: false, dropdown: false, tooltip: "Kärkilyönnit pesänväleittäin" },
      { closed: true, text: 'TOP Etenijät', path: '/top-runners', active: false, dropdown: false, closed: false },
      // { text: 'Otteluohjelmat', path: '/programmes', active: false, dropdown: false },
      { closed: true, text: 'Lukkarivertailu', path: '/pitchers', active: false, dropdown: false, closed: false },
      { closed: true, text: 'Ulkopelitilastot', path: '/outfield', active: false, dropdown: false, coming_soon: false },
      { closed: true, text: 'UP-Suoritusajat', path: '/performance-times', active: false, dropdown: false, coming_soon: true },
    ],
  })
}
</script>