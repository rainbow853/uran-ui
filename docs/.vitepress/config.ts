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
        text: '开始',
        items: [
          { text: '快速上手', link: '/start' },
        ]
      },
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
          { text: 'KLNavBar 导航条', link: '/KLNavBar' },
          { text: 'KLPagination 分页', link: '/KLPagination' },
          { text: 'KLCrosshair 十字辅助线', link: '/KLCrosshair' },
          { text: 'KLROI 矩形定位框', link: '/KLROI' },
          { text: 'KLDialog 弹窗', link: '/KLDialog' },
          { text: 'KLCameraImage 相机实时画面', link: '/KLCameraImage' },
          { text: 'KLImageAnnotation 图像标注', link: '/KLImageAnnotation' },
          { text: 'KLMotionController 运动控制器', link: '/KLMotionController' },
          { text: 'KLDetectStat 检测统计', link: '/KLDetectStat' },
          { text: 'KLDetectOp 开始/停止检测', link: '/KLDetectOp' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/uran-ui' }
    ]
  }
})
