<script setup lang="ts">
import type { Camera } from 'kl-camera-frontend';
import type { coor } from '../../type';
import type { rgb } from './index.vue';

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
  <div class="camera-footer flex-vertical nowrap relative">
    <div class="camera-wh">{{ width }}*{{ height }}</div>
    <div class="camera-coor">位置：{{ coor.x }},{{ coor.y }}</div>
    <div class="camera-rgb">RGB：{{ rgb.r }},{{ rgb.g }},{{ rgb.b }}</div>
    <div>图片计数：{{ count }}</div>
    <div class="poatr00">{{ camera?.desc }}</div>
  </div>
</template>

<style lang="scss" scoped>
.camera-footer {
  margin-top: 10px;
  line-height: 1;
  font-weight: 600;

  .camera-wh {
    width: 90px;
  }

  .camera-coor {
    width: 130px;
  }

  .camera-rgb {
    width: 150px;
  }
}
</style>
@/stores/camera