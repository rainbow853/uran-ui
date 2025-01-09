import { createApp } from 'vue'
import App from './App.vue'
// import uranUI from '../lib/uran-ui.js'
// import '../lib/style.css'
import components from "./components"; //自定义组件
const app = createApp(App)
// app.use(uranUI)
app.use(components)
app.mount('#app') 