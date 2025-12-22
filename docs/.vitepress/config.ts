import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/uran-ui/",
  title: "uran-ui",
  description: "UI module for Uran",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
    ],

    sidebar: [
      {
        text: '全局CSS',
        items: [
          { text: '全局CSS', link: '/CSS' },
        ]
      },
      {
        text: '基础组件',
        items: [
          { text: 'KLIcon 图标', link: '/KLIcon' },
          { text: 'KLButton 按钮', link: '/KLButton' },
          { text: 'KLInput 输入框', link: '/KLInput' },
          { text: 'KLPopoverList 弹出框', link: '/KLPopoverList' },
          { text: 'KLCameraImage 相机实时画面', link: '/KLCameraImage' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/uran-ui' }
    ]
  }
})
