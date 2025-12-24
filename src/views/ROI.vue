<script setup lang="ts">
import { ref } from 'vue';
const height = 400;

const roi1 = ref({ x: 0, y: 0, width: 100, height: 100 })
const roi2 = ref({ x: 0, y: 200, width: 100, height: 100 })
</script>

<template>
  <div class="relative" :style="{ height: height + 'px', background: '#ccc', }">
    <KLROI :roi="roi1" />
    <KLROI :roi="roi2" disableResize />
  </div>
</template>