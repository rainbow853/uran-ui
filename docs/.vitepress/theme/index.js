// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'
typeof window !== 'undefined' && import('../../../src/assets/styles/iconfont/iconfont.js')

const loadUranUI = new Promise((resolve) => {
  typeof window === 'undefined' ?
    resolve() :
    import('../../../src/components').then(uranUI => resolve(uranUI.default))
})

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    return loadUranUI.then(uranUI => app.use(uranUI))
  }
}