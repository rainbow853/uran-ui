<script setup lang="ts">
import { ref } from 'vue';
const textValue = ref('text');
const submitRecord = ref('Submit event');
function submit(value: string) {
  submitRecord.value = '输入框当前值 : ' + value;
}
</script>
<template>
  <div class="mb10">
    <KLInput v-model="textValue" @submit="submit" />
    <div>{{ submitRecord }}</div>
  </div>
  <div class="w-full">
    <KLInput class="mr20" v-model="textValue" :width="80" height="40px" />
    <KLInput class="mr20" v-model="textValue" width="120px" disabled />
    <KLInput class="mr20" v-model="textValue" width="10%" password shadow />
  </div>
</template>
