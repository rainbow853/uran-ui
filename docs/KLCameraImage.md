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
|属性|说明|类型|默认值|
|---|---|---|:---:|
|name |相机实例 |[Camera](https://github.com/fengqing1101/kl-camera-frontend) |-|
|showCrosshair |鼠标位置显示十字线 |`boolean` |false|
|showItemInFolder |采集图像后打开图像所在目录的回调函 |`(imgPath: string) => void` |false|

## slot
|插槽名|说明|
|---|---|
|default |图像区域内部 |
|camera-outer |图像所在画布 |
|footer |右下角 |

## 方法
|方法名|参数|说明|
|---|:---:|---|
|getPosition |`(e: MouseEvent, limitInWindow?: boolean) => number[]` |获取鼠标在图像中的坐标|
