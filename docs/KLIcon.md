<script setup>
import Icon from '../src/views/Icon.vue'
</script>

# KLIcon
考拉图标组件

## 效果
<Icon />
```vue
<template>
  <KLIcon name="wait" color="#999999" size="20px" />
  <KLIcon name="ready" color="#00b23d" />
  <KLIcon name="ongoing" color="#e78d08" />
  <KLIcon name="unrecognized" color="#f61c1c" size="36px" />
  <KLIcon name="ended" color="#00b23d" />
  <KLIcon name="error" color="#f61c1c" />
  <KLIcon name="copy" shadow color="#0e5af1" />
  <KLIcon name="edit" shadow disabled color="#0e5af1" />
  <KLIcon name="delete" shadow color="#f61c1c" />
</template>
```

## Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|name |图标class名：`kl-${name}` |`string` |-|
|color |图标颜色 |`string` |-|
|size |字体大小fontSize |`string` |-|
|disabled |禁用 |`boolean` |false|
|shadow |阴影边框 |`boolean` |false|
