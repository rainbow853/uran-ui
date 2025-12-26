---
hello: world
---

<script setup>
import CameraImage from '../src/views/CameraImage.vue'
</script>

# KLIcon
考拉实时相机组件

## 效果
<CameraImage />

## Attributes
> ```typescript
> type roi = { x: number, y: number, width: number, height: number }
> ```
> image为Camera对象grabImage返回的数据

|属性|说明|类型|默认值|
|---|---|---|:---:|
|camera |相机实例 |[Camera](https://github.com/ranbow853/kl-camera-frontend) |-|
|showCrosshair |鼠标位置显示十字线 |`boolean` |false|
|grabImageSuccessCB |采集图像后回调函数 |`(image: image) => void` |-|
|helpVideo |帮助视频地址 |string |-|
|rectCallback |鼠标右键绘制矩阵框回调函数，返回值为是否继续显示绘制的矩形框 |`(roi: roi) => boolean` |-|

## slot
|插槽名|说明|数据|
|---|---|---|
|default |图像区域内部并返回画布缩放比例与宽高 |`{scale: number, width: number, height: number}`|
|camera-outer |图像所在画布 |-|

## 方法
|方法名|参数|说明|
|---|:---:|---|
|getPosition |`(e: MouseEvent, limitInWindow?: boolean) => number[]` |获取鼠标在图像中的坐标|
|restoreImage |`() => void` |重置图像区域|
