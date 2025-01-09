<script setup lang="ts">
import { ref } from 'vue';
import KLButton from '@/components/KLButton.vue';
const menus = [
  { id: 1, name: 'white' },
  { id: 2, name: 'black' },
  { id: 3, name: 'red' },
  { id: 4, name: 'green' },
  { id: 5, name: 'blue' },
  { id: 6, name: 'purple' },
]
const content = ref('选择pattern');
function to(menu: { id: number, name: string }) {
  content.value = menu.name;
}

const tableData = [
  {
    prop: 'menus',
    summary: '列表',
    type: 'any[]',
    defaultValue: '-',
  },
  {
    prop: 'label',
    summary: '列表项显示字段',
    type: 'string',
    defaultValue: 'label',
  },
  {
    prop: 'value',
    summary: '列表项值字段',
    type: 'string',
    defaultValue: 'value',
  },
  {
    prop: 'trigger',
    summary: '触发方式：click/focus/hover/contextmenu',
    type: 'string',
    defaultValue: 'click',
  },
]
</script>
<template>
  <div class="h-100 icons flex-vertical">
    <KLPopoverList :menus="menus" label="name" value="id" @to="to">
      <template #reference>
        <KLButton :content="content" />
      </template>
    </KLPopoverList>
  </div>
  <el-table :data="tableData" class="summary-table">
    <el-table-column prop="prop" label="属性" width="180" />
    <el-table-column prop="summary" label="说明" />
    <el-table-column prop="type" label="类型" width="180" />
    <el-table-column prop="defaultValue" label="默认值" width="180" />
  </el-table>
</template>
<style scoped>
.icons {
  font-size: 30px;
}
</style>
