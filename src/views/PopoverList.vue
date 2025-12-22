<script setup lang="ts">
import { ref } from 'vue';
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
</script>
<template>
  <div class="h-100 icons flex-vertical">
    <KLPopoverList :menus="menus" label="name" value="id" @to="to">
      <template #reference>
        <KLButton :content="content" />
      </template>
    </KLPopoverList>
  </div>
</template>