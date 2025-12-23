<script setup>
import Dialog1 from '../src/views/Dialog.vue'
</script>

# KLDialog
考拉弹窗组件

## 效果
<Dialog1 />
<<< ../src/views/Dialog.vue
<<< ../src/views/DialogCom.vue

## Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|title |弹窗标题 |`string` |-|
|width |宽度 |`string\|number` |-|
|height |高度 |`string\|number` |-|
|full |是否全屏 |`boolean` |-|
|footer |是否显示页脚 |`boolean` |true|
|canMove |是否可以移动弹窗组件 |`boolean` |-|
|close |关闭按钮回调函数，返回值为是否阻止关闭弹窗 |`() => boolean` |-|
|sure |确认按钮回调函数，返回值为是否阻止关闭弹窗 |`() => boolean`` |-|
|cancel |取消按钮回调函数，返回值为是否阻止关闭弹窗 |`() => boolean`` |-|

## slot
|插槽名|说明|数据|
|---|---|---|
|header |头部 |-|
|main |主体 |-|
|footer |尾部 |`{hiddenDialog: () => void}`|
