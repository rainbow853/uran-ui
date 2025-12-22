<script setup lang="ts">
import { ref } from 'vue';
const navs = [
  { label: '相机模块', value: 'camera' },
  { label: '运动轴', value: 'axis' },
]
const current = ref(navs[0].value);
</script>
<template>
  <KLNavBar :navs="navs" v-model:current="current" fullWidth />
  <KLNavBar class="mt20" :navs="navs" v-model:current="current" />
</template>