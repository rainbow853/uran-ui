# uran-ui

## 安装
```
npm i @koala123/ui
```

## 使用
```typescript
import UranUI from '@koala123/ui'

import { createApp } from "vue";
const app = createApp(App);
app.use(pinia)
  .use(UranUI, {
    // 全局配置项
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
#### 全局配置项
<<< ../src/components/config.ts#snippet
