<script setup lang="ts">
import { ref } from 'vue'
defineEmits(['to']);

export interface Props {
  label?: string,
  value?: string,
  trigger?: string, //click/focus/hover/contextmenu
  menus: any[],
}
withDefaults(defineProps<Props>(), {
  label: 'label',
  value: 'value',
  trigger: 'click'
})

const visible = ref(false);

</script>
<template>
  <el-popover :visible="visible" placement="right" trigger="contextmenu">
    <template #reference>
      <span @[trigger]="visible = !visible">
        <slot name="reference" />
      </span>
    </template>
    <div class="kl-popover" @click="visible = false">
      <div class="flex-center" v-if="!menus.length">无</div>
      <div class="ellipsis split-line" v-for="menu in menus" :key="menu[value]" @click="$emit('to', menu)">
        {{ menu[label] }}
      </div>
    </div>
  </el-popover>
</template>
<style scoped>
.kl-popover {
  position: relative;
  max-height: 300px;
  padding: 4px 0;
  overflow: auto;
  color: #333;
  font-size: 12px;
  line-height: 30px;
  font-style: normal;
  font-weight: 400;
}

.kl-popover::before {
  content: "";
  display: block;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
}

.kl-popover>div {
  padding: 0 10px;
}

.kl-popover>.split-line:last-child::after {
  box-shadow: none;
  background: none;
}
</style>
