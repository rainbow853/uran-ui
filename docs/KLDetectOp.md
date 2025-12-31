<script setup>
import DetectOp from '../src/views/DetectOp.vue'
</script>

# KLDetectOp
考拉开始/停止检测组件

## 效果
<DetectOp />
<<< ../src/views/DetectOp.vue

## Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|recipeId |当前配方 |`number` |-|
|recipes |配方列表 |`{ id: number, name: string }[]` |-|
|started |当前检测状态 |`boolean` |-|
|prestartCB |startCB执行之前的回调函数，可以为空 |`() => void` |-|
|startCB |开始检测的回调函数 |`() => void` |-|
|stopCB |停止检测的回调函数 |`() => void` |-|
