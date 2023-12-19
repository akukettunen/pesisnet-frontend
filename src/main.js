import store from './store/index.js';
import './assets/sass/style.scss'

// Plugins
import { registerPlugins } from '@/plugins'

// Composables
import { createApp } from 'vue'

// Components
import App from './App.vue'
import VueSelect from "vue-select";

const app = createApp(App)
  .component("vue-select", VueSelect)

registerPlugins(app)

app.use(store)

app.mount('#app')
