<script setup lang="ts">
</script>
<template>
  <div class="h-100 buttons flex-vertical">
    <KLButton content="content" />
    <KLButton content="icon" name="start" />
    <KLButton content="wh-200-30" :width="200" :height="30" />
    <KLButton content="warn" warn />
    <KLButton content="large" large />
    <KLButton content="highlight" highlight />
    <KLButton content="current" current />
    <KLButton content="disabled" disabled />
    <KLButton content="canRemove" canRemove />
  </div>
</template>
<style scoped>
.buttons {
  max-width: 800px;
  flex-wrap: wrap;
}
.buttons :deep(.kl-btn) {
  margin: 20px 20px 0 0;
}
</style>
