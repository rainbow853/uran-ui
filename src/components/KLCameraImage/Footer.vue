<script setup lang="ts">
import type { Camera } from 'kl-camera-frontend';
import type { coor } from '../../type';
import type { rgb } from './index.vue';
import { computed } from 'vue';

const props = defineProps<{
  camera?: Camera;
  width: number;
  height: number;
  count: number;
  coor: coor;
  rgb: rgb;
}>()

const xy = computed(() => {
  return `${props.coor.x.toString().padStart(4, "0")},${props.coor.y.toString().padStart(4, "0")}`
})
const RGB = computed(() => {
  return `${props.rgb.r.toString().padStart(3, "0")},${props.rgb.g.toString().padStart(3, "0")},${props.rgb.b.toString().padStart(3, "0")}`
})
</script>

<template>
  <div class="camera-footer flex-vertical nowrap relative">
    <div class="mr20">{{ width }}*{{ height }}</div>
    <div class="mr20">位置：{{ xy }}</div>
    <div class="mr20">RGB：{{ RGB }}</div>
    <div>图片计数：{{ count }}</div>
    <div class="poatr00">{{ camera?.desc }}</div>
  </div>
</template>

<style lang="scss" scoped>
.camera-footer {
  margin-top: 10px;
  line-height: 1;
  font-weight: 600;
}
</style>
@/stores/camera