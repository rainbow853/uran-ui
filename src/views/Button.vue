<script setup lang="ts">
import { ref } from 'vue';
const removeRecord = ref('Remove event');
function remove() {
  removeRecord.value = 'Remove event triggered : ' + new Date().toLocaleString();
}
</script>
<template>
  <div class="buttons flex-vertical flex-wrap mb20">
    <KLButton content="content" />
    <KLButton content="icon" name="start" />
    <KLButton content="wh-200-30" :width="200" :height="30" />
    <KLButton content="warn" warn />
    <KLButton content="large" large />
    <KLButton content="highlight" highlight />
    <KLButton content="current" current />
    <KLButton content="disabled" disabled />
    <KLButton content="canRemove" canRemove @remove="remove" />
    <KLButton content="slot">
      <template #icon>
        <KLIcon name="koutu" size="20px" />
      </template>
    </KLButton>
  </div>
  <div>{{ removeRecord }}</div>
</template>
<style scoped>
.buttons :deep(.kl-btn) {
  margin: 20px 20px 0 0;
}
</style>
