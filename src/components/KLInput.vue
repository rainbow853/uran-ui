<script setup lang="ts">
import { computed } from "vue";
const emit = defineEmits(["update:modelValue", 'submit']);

const props = defineProps<{
  modelValue: string;
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
  shadow?: boolean;
  password?: boolean;
}>();

const style = computed(() => {
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  };
});

function handleInput(e: any) {
  emit('update:modelValue', e.target.value);
}

function blur() {
  emit('submit', props.modelValue);
}

function enter(e: any) {
  e.target.blur();
}
</script>
<template>
  <input class="kl-input" :type="password ? 'password' : 'text'" :class="shadow ? 'shadow-inline' : ''" :style="style"
    :value="modelValue" :disabled="disabled" @input="handleInput" @keyup.enter="enter" @blur="blur" />
</template>

<style scoped>
.kl-input {
  box-sizing: border-box;
  font-weight: 500;
  font-size: 14px;
}

.kl-input {
  outline: none;
  border: 1px solid #dbdbdb;
  background: none;
  border-radius: 0;
  padding: 0 6px;
  width: 100%;
  height: 30px;
}

.kl-input.shadow-inline {
  border: 0;
  background: #fff;
}
</style>