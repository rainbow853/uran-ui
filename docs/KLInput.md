<script setup>
import Input from '../src/views/Input.vue'
</script>

# KLIcon
考拉输入框组件

## 效果
<Input />
```vue
<script setup lang="ts">
import { ref } from 'vue';
const textValue = ref('text');
const submitRecord = ref('Submit event');
function submit(value: string) {
  submitRecord.value = '输入框当前值 : ' + value;
}
</script>
<template>
  <div class="mb10">
    <KLInput v-model="textValue" @submit="submit" />
    <div>{{ submitRecord }}</div>
  </div>
  <div class="w-full">
    <KLInput class="mr20" v-model="textValue" :width="80" height="40px" />
    <KLInput class="mr20" v-model="textValue" width="120px" disabled />
    <KLInput class="mr20" v-model="textValue" width="10%" password shadow />
  </div>
</template>

```

## Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|modelValue |输入框绑定的值 |`string` |-|
|width |图标颜色 |`number\|string` |父容器的100%|
|height |字体大小fontSize |`number\|string` |30px|
|disabled |禁用 |`boolean` |false|
|shadow |阴影边框 |`boolean` |false|
|password |是否是密码输入框 |`boolean` |false|

## 事件
> 用户按下Enter键会触发输入框blur事件

|事件名|参数|说明|
|---|:---:|---|
|submit |输入框当前值 |输入框失焦\|用户按下Enter键|
