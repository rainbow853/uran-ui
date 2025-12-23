<script setup lang="ts">
import { ref, inject } from 'vue';
import DialogCom from './DialogCom.vue';
const klDialog = inject<Function>('klDialog') as Function;

const showDialog = ref(false);
function openDialog() {
  klDialog(DialogCom, {
    title: '注入方式',
  });
}
</script>

<template>
  <div class="wh-full">
    <KLButton content="注入方式" class="mr30" @click="openDialog" />
    <KLButton content="显示/隐藏弹窗" @click="showDialog = !showDialog" />
    <KLDialog v-model:showDialog="showDialog" title="显示/隐藏弹窗" canMove>
      <template #main>
        <div class="flex-center hl-color" style="width: 500px;height:300px;font-size:100px;">
          <KLIcon name="plc-1" />
          <KLIcon name="plc" class="ml30" />
        </div>
      </template>
    </KLDialog>
  </div>
</template>
