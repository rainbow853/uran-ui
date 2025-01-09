import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "uran-ui",
  description: "UI module for Uran",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: '基础组件',
        items: [
          { text: 'KLIcon', link: '/KLIcon' },
          { text: 'KLButton', link: '/KLButton' },
          { text: 'KLCameraImage', link: '/KLCameraImage' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/uran-ui' }
    ]
  }
})
