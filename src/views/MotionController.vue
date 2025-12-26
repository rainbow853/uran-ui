<script setup lang="ts">
import { ref } from 'vue';
import { sleep } from '../utils';

const axes = ref([
  { id: 1, name: 'x轴', position: 0, destSpeed: 0, minSpeed: 0, maxSpeed: 10, destPos: 0, isAbsolute: false },
  { id: 2, name: 'y轴', position: 0, destSpeed: 0, minSpeed: 0, maxSpeed: 10, destPos: 0, isAbsolute: false },
])

let isJogging = false;
async function jogStart(id: number, reverse: number) {
  const axis = axes.value.find(e => e.id === id);
  const step = reverse ? 10 : -10;
  if (!axis) return;
  isJogging = true;
  while (isJogging) {
    await sleep(100);
    axis.position += step;
  }
}
async function jogStop() {
  isJogging = false;
}

async function move(id: number) {
  const axis = axes.value.find(e => e.id === id);
  if (!axis) return;
  await sleep(3000);
  axis.position = axis.isAbsolute ? axis.destPos : (axis.position + axis.destPos);
}


async function freshPositions() { }
</script>

<template>
  <div class="relative">
    <KLMotionController :axes="axes" :freshPositions="freshPositions" :jogStart="jogStart" :jogStop="jogStop"
      :move="move" />
  </div>
</template>

<style>
.vp-doc table {
  margin: 0;
}
</style>
