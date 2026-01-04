<script setup lang="ts">
import { ref } from 'vue';
const textValue = ref('text');
const submitRecord = ref('Submit event');
function submit(value: string) {
  submitRecord.value = '输入框当前值 : ' + value;
}
function inputValidator(text: string) {
  if (!text) return '不能为空';
  const reg = new RegExp('[\\\\/:*?"<>|]');
  return reg.test(text) ? '不能包括 \\/:*?"<>| 等特殊字符！' : '';
}
</script>
<template>
  <div class="mb10">
    <KLInput v-model="textValue" prefixIcon="code" suffixText="code" :width="200" :inputValidator="inputValidator" @submit="submit" />
    <div>{{ submitRecord }}</div>
  </div>
  <div class="w-full">
    <KLInput class="mr20" v-model="textValue" :width="80" height="40px" />
    <KLInput class="mr20" v-model="textValue" width="120px" disabled />
    <KLInput class="mr20" v-model="textValue" width="10%" password shadow />
  </div>
</template>
