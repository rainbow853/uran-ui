// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import uranUI from '../../../lib/uran-ui'
import '../../../lib/style.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // uran-ui样式document.body.style.overflow=hidden；滚动条失效
    document.body.style.overflow = 'auto';
    app.use(uranUI)
  }
}