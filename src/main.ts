import { createApp } from 'vue'
import App from './App.vue'
import components from "./components";

createApp(App)
  .use(components, { loadIconfont: true })
  .mount('#app') 