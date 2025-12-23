<script setup lang="ts">
import { ref } from 'vue';
const height = 400;
const point = ref({ x: 100, y: height / 2 });
const lock = ref(false);
</script>

<template>
  <div class="relative" :style="{ height: height + 'px', background: '#ccc', }">
    <KLCrosshair :coor="point" color="#f00" :scale="1" :lock="lock" />
    <KLButton :content="lock ? '解锁辅助线' : '固定辅助线'" @click="lock = !lock" />
  </div>
</template>
