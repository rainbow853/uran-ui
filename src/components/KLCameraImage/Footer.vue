<script setup lang="ts">
import type { Camera } from 'kl-camera-frontend';
import type { coor, rgb } from './index.vue';

defineProps<{
  camera?: Camera;
  width: number;
  height: number;
  count: number;
  coor: coor;
  rgb: rgb;
}>()
</script>

<template>
  <div class="camera-footer flex-vertical">
    <div>{{ width }}*{{ height }}</div>
    <div>位置：{{ coor.x }},{{ coor.y }}</div>
    <div>RGB：{{ rgb.r }},{{ rgb.g }},{{ rgb.b }}</div>
    <div>图片计数：{{ count }}</div>
    <div class=flex-full></div>
    <slot>
      <div style="padding-right: 0;text-align: right">{{ camera ? camera.desc : '---' }}</div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.camera-footer {
  margin-top: 10px;
  line-height: 1;
  font-weight: 600;
}

.camera-footer>*:not(.kl-btn) {
  min-width: 100px;
  padding-right: 20px;
}

.camera-footer>.kl-btn {
  margin-left: 20px;
}
</style>
@/stores/camera