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
|prefixIcon |前缀图标 |`string` |-|
|suffixText |后缀文本 |`string` |-|
|placeholder |输入框占位文本 |`string` |-|
|inputValidator |输入框的校验函数；返回值会用于向用户展示错误消息 |`(text: string) => string` |-|

## slot
|插槽名|说明|
|---|---|
|prefix |自定义前缀图标 |
|suffix |自定义后缀文本 |

## 事件
> 用户按下Enter键会触发输入框blur事件

|事件名|参数|说明|
|---|:---:|---|
|submit |输入框当前值 |输入框失焦\|用户按下Enter键|
