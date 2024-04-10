import store from './store/index.js';
import './assets/sass/style.scss'
// import iframeResize from 'iframe-resizer/js/iframeResizer'
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import VueMixpanel from 'vue-mixpanel'

// Plugins
import { registerPlugins } from '@/plugins'

// Composables
import { createApp } from 'vue'

// Components
import App from './App.vue';

const app = createApp(App)
  .component("b-select", VueSelect)

registerPlugins(app)

app.use(VueMixpanel, {
  token: '197aec2dc9e2a86065831204f7f29d7f',
  config: {
    debug: true
  }
})

app.use(store)

app.mount('#app')