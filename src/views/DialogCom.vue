<script setup lang="ts">
defineProps<{
  title: string;
}>()
</script>

<template>
  <KLDialog :title="title" canMove>
    <template #main>
      <div class="flex-center hl-color" style="width: 500px;height:300px;font-size:100px;">
        <KLIcon name="plc-1" />
        <KLIcon name="plc" class="ml30" />
      </div>
    </template>
  </KLDialog>
</template>
