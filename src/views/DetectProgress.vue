<script setup lang="ts">
import { ref } from 'vue';
const detectStates = ref([
  { name: '来料', state: 'end', progress: 0, info: '' },
  { name: '定位', state: 'end', progress: 0, info: '' },
  { name: '图像', state: 'ongoing', progress: 0, info: '' },
  { name: '外观', state: 'error', progress: 0, info: '图像异常' },
  { name: '下料', state: 'wait', progress: 0, info: '' },
]);

const timer = setInterval(() => {
  detectStates.value[2].progress += 1;
  if (detectStates.value[2].progress < 100)  return;

  clearInterval(timer);
  detectStates.value[2].state = 'end';
}, 500)
</script>
<template>
  <div class="m20" style="width: 500px;">
    <KlDetectProgress :detectStates="detectStates" />
  </div>
</template>
