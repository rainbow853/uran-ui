<script setup lang="ts">
import { ref } from 'vue';
import { ElMessageBox } from "element-plus";
const navs = [
  { label: '相机模块', value: 'camera' },
  { label: '运动轴', value: 'axis' },
]
const current = ref(navs[0].value);

async function beforeChange(item: { label: string, value: string }) {
  try {
    await ElMessageBox.confirm(
      `是否切换到${item.label}`,
      '导航切换');
    return true;
  } catch {
    return false;
  }
}
</script>
<template>
  <KLNavBar :navs="navs" v-model:current="current" fullWidth />
  <KLNavBar class="mt20" :navs="navs" v-model:current="current" :beforeChange="beforeChange" />
</template>