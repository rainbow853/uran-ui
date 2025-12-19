import { createApp } from 'vue'
import App from './App.vue'
import components from "./components"; //自定义组件
import '../assets/styles/iconfont/iconfont.js'

createApp(App)
  .use(components)
  .mount('#app') 