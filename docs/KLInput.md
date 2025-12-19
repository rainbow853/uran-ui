<script setup>
import Input from '../src/views/Input.vue'
</script>

# KLInput
考拉输入框组件

## 效果
<Input />
<<< ../src/views/Input.vue

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
