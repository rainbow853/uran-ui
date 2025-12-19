---
hello: world
---

<script setup>
import Button from '../src/views/Button.vue'
</script>

# KLButton
考拉按钮组件

## 效果
<Button />
```vue
<script setup lang="ts">
import { ref } from 'vue';
const removeRecord = ref('Remove event');
function remove() {
  removeRecord.value = 'Remove event triggered : ' + new Date().toLocaleString();
}
</script>
<template>
  <div class="buttons flex-vertical flex-wrap mb20">
    <KLButton content="content" />
    <KLButton content="icon" name="start" />
    <KLButton content="wh-200-30" :width="200" :height="30" />
    <KLButton content="warn" warn />
    <KLButton content="large" large />
    <KLButton content="highlight" highlight />
    <KLButton content="current" current />
    <KLButton content="disabled" disabled />
    <KLButton content="canRemove" canRemove @remove="remove" />
    <KLButton content="slot">
      <template #icon>
        <KLIcon name="koutu" size="20px" />
      </template>
    </KLButton>
  </div>
  <div>{{ removeRecord }}</div>
</template>
```

## Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|content |按钮内容 |`string` |-|
|name |图标class名：`kl-${name}` |`string` |-|
|width |宽 |`string|number` |-|
|height |高 |`string|number` |-|
|warn |warn类型按钮 |`boolean` |false|
|large |large类型按钮 |`boolean` |false|
|highlight |高亮 |`boolean` |false|
|current |当前按钮 |`boolean` |false|
|disabled |禁用 |`boolean` |false|
|canRemove |尾部是否有删除图标 |`boolean` |false|

## slot
|插槽名|说明|
|---|---|
|icon |图标 |

## 事件
|事件名|参数|说明|
|---|:---:|---|
|remove |- |只可当canRemove为true时使用|
