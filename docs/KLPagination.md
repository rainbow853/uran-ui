<script setup>
import Pagination from '../src/views/Pagination.vue'
</script>

# KLPagination
考拉分页组件

## 效果
<Pagination />
<<< ../src/views/Pagination.vue

## Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|page-size |每页显示条目个数 |`number` |-|
|total |总条目数 |`number` |-|
|current-page/v-model:current-page |当前页数 |`number` |-|

## 事件
|事件名|参数|说明|
|---|:---:|---|
|current-change |`(currentPage: number) => void` |`current-page`改变时触发|
|change  |`(currentPage: number, pageSize: number) => void` |`current-page`或`page-size`改变时触发|
