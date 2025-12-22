<script setup lang="ts">
defineEmits(['update:current']);
interface nav {
  label: string;
  value: string;
}
defineProps<{
  navs: nav[],
  current: string,
  fullWidth?: boolean,
}>()

</script>
<template>
  <nav class="navigation-bar flex" :class="{ 'item-full': fullWidth }">
    <div v-for="item in navs" :key="item.value" class="nav-item flex-center fw-b"
      :class="{ 'hl-color': current == item.value }" @click="$emit('update:current', item.value)">
      {{ item.label }}
    </div>
  </nav>
</template>
<style scoped>
.navigation-bar {
  height: 40px;
}

.nav-item {
  height: 100%;
  min-width: 100px;
  padding: 0 2em;
  background: #ebf2f8;
  box-shadow: inset -1px -1px 0px #9c9c9c, inset -2px -2px 0px #a8a8a8,
    inset 1px 1px 0px #ffffff;
  cursor: pointer;
  font-size: 18px;
}

.navigation-bar.item-full .nav-item {
  flex: 1;
}

.navigation-bar:last-child {
  box-shadow: none;
}
</style>