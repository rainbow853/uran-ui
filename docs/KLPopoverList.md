<script setup>
import PopoverList from '../src/views/PopoverList.vue'
</script>

# KLPopoverList
考拉弹出框组件

## 效果
<PopoverList />
<<< ../src/views/PopoverList.vue

## Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|menus |列表 |`any[]` |-|
|label |列表项显示字段 |`string` |label|
|value |列表项值字段 |`string` |value|
|trigger |popover 触发方式 |`click\|focus\|hover\|contextmenu` |click|


## 事件
|事件名|参数|说明|
|---|:---:|---|
|to |menus数组中的某项 |选中弹出框某项值|