<script setup lang="ts">
import { ref } from 'vue';
const recipeId = ref(1);
const recipes = ref([
  { id: 1, name: 'KL-001' },
  { id: 2, name: 'KL-002' },
  { id: 3, name: 'KL-003' },
]);
const started = ref(false);
function startCB() {
  started.value = true
}
function stopCB() {
  started.value = false
}

</script>
<template>
  <div style="width: 600px; height:196px;">
    <KLDetectOp :recipeId="recipeId" :recipes="recipes" :started="started" :startCB="startCB" :stopCB="stopCB" />
  </div>
</template>
