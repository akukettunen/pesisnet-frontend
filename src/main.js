import store from './store/index.js';
import './assets/sass/style.scss'
import iframeResize from 'iframe-resizer/js/iframeResizer'
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const resize = {
  mounted(el, binding) {
      const options = binding.value || {}

      el.addEventListener('load', () => iframeResize(options, el))
  },
  unmounted(el) {
      const resizableEl = el

      if (resizableEl.iFrameResizer) {
          resizableEl.iFrameResizer.removeListeners()
      }
  },
}

// Plugins
import { registerPlugins } from '@/plugins'

// Composables
import { createApp } from 'vue'

// Components
import App from './App.vue';

const app = createApp(App)
  .component("b-select", VueSelect)
  .directive('res', resize)

registerPlugins(app)

app.use(store)

app.mount('#app')
