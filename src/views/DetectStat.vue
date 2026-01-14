<script setup lang="ts">
import { ref, onMounted } from 'vue';
const totalCount = ref(0);
const okCount = ref(0);
const totalChipCount = ref(0);
const okChipCount = ref(0);
const time = ref(0);
function clearCB() {
  totalCount.value = 0
  okCount.value = 0
  totalChipCount.value = 0
  okChipCount.value = 0
}

let lastTime = Date.now();
// 因为`setInterval`活跃，直接写入最顶层`npm run docs:build`进程不能退出`
onMounted(() => {
  setInterval(() => {
    totalCount.value++;
    okCount.value += Math.random() > 0.1 ? 1 : 0;
    totalChipCount.value += 1024;
    okChipCount.value += 1000 + ~~(Math.random() * 24);
    time.value = (Date.now() - lastTime) / 1000
    lastTime = Date.now()
  }, 1000)
})
</script>
<template>
  <div style="width: 1290px; height:196px;">
    <KLDetectStatChip :totalCount="totalCount" :totalChipCount="totalChipCount" :okChipCount="okChipCount"
      :clearCB="clearCB" />
  </div>
  <div class="mt30" style="width: 1290px; height:196px;">
    <KLDetectStatMat :totalCount="totalCount" :okCount="okCount" :time="time" :clearCB="clearCB" />
  </div>
</template>
