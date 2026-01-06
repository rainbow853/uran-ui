<script setup>
import NavBar from '../src/views/NavBar.vue'
</script>

# KLNavBar
考拉导航条组件

## 效果
<NavBar />
<<< ../src/views/NavBar.vue

## Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|navs |列表 |`nav[]` |-|
|v-model:current |当前值 |`string` |-|
|fullWidth |导航条是否铺满容器 |`boolean` |-|
|beforeChange |切换之前的回调函数，返回值决定是否继续切换 |`(item: nav) => Promise<boolean>` |-|

```typescript
interface nav {
  label: string;
  value: string;
}
```