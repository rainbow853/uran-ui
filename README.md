# @koala123/uran-ui 组件说明

> 将固定成形的公共组件提取到 @koala123/uran-ui 组件库中，并发布到 npm,解决代码冗余问题
> 组件预览：[uran-ui](https://rainbow853.github.io/uran-ui)

# 1.下载公共组件

```Bash
npm install @koala123/uran-ui --save
```

# 2.在 src/main.js 中引入

```typescript
import uranUI from '@koala123/uran-ui';
import "@koala123/uran-ui/css";

import { createApp } from "vue";
const app = createApp(App);
app.use(pinia)
  .use(uranUI, {
    // 全局配置项
    // 是否加载字体图标
    loadIconfont: true,
    // imageData为相机对象grabImage的返回值（自定义，这里假定为imageData）
    grabImageSuccessCB(imageData: ImageData) {
      ElMessageBox.confirm(
        `图像采集完成，是否下载？`,
        '图像下载',
      ).then(() => {
        downloadImageData(imageData);
      })
    },
  })
  .mount("#app");
```

# 3.包含的组件
`npm run docs:dev` 查看或者预览网站[uran-ui](https://rainbow853.github.io/uran-ui)

# 4.组件文档
>[https://kaolayouran.feishu.cn/docx/QZzxdBRJgo4xzVxCUmwcxuyPnnc](https://kaolayouran.feishu.cn/docx/QZzxdBRJgo4xzVxCUmwcxuyPnnc)

# 5 图标
> 注意：此项目未加载图标库，需要各项目自行加载   
> 
KLIcon依赖图标（Symbol）：https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=3938294