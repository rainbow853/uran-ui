<script setup lang="ts">
defineEmits(['update:current']);
interface nav {
  label: string;
  value: string;
}
defineProps<{
  navs: nav[],
  current: string
}>()

</script>
<template>
  <nav class="navigation-bar flex-center">
    <div v-for="item in navs" :key="item.value" :class="['nav-item', 'flex-center', { 'blue-font': current == item.value }]"
      @click="$emit('update:current', item.value)">
      {{ item.label }}
    </div>
  </nav>
</template>
<style scoped>
.navigation-bar {
  height: 40px;
  background: #ebf2f8;
}

.nav-item {
  height: 100%;
  width: 100%;
  box-shadow: inset -1px -1px 0px #9c9c9c, inset -2px -2px 0px #a8a8a8,
    inset 1px 1px 0px #ffffff;
  cursor: pointer;
  font-size: 18px;
}

.nav-item.blue-font {
  font-weight: bold;
}

.navigation-bar:last-child {
  box-shadow: none;
}
</style>
