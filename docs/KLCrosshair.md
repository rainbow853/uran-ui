<script setup>
import Crosshair from '../src/views/Crosshair.vue'
</script>

# KLCrosshair
考拉十字辅助线组件

## 效果
<Crosshair />
<<< ../src/views/Crosshair.vue

## Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|coor |辅助线坐标 |`{x: number, y: number}` |-|
|color |辅助线颜色 |`string` |-|
|scale |辅助线父元素缩放比例 |`number` |-|
|lock |是否固定辅助线（此时拖拽辅助线事件失效） |`boolean` |false|
