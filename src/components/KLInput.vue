<script setup lang="ts">
import { computed, ref } from "vue";
const emit = defineEmits(["update:modelValue", 'submit']);

const props = defineProps<{
  prefixIcon?: string;
  suffixText?: string;
  inputValidator?: (text: string) => string;
  modelValue: string;
  width?: number | string;
  height?: number | string;
  placeholder?: string;
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

const errorText = computed(() => {
  return props.inputValidator && props.inputValidator(props.modelValue.trim());
})

function handleInput(e: any) {
  emit('update:modelValue', e.target.value);
}

const isFocus = ref(false);
function focus() {
  isFocus.value = true;
}

function blur() {
  isFocus.value = false;
  emit('submit', props.modelValue);
}

function enter(e: any) {
  e.target.blur();
}
</script>
<template>
  <div class="kl-input-warpper flex-center relative flex-inline"
    :class="{ 'shadow-inline': shadow, 'error-input': errorText, 'focus': isFocus }" :style="style">
    <slot name='prefix'>
      <KLIcon v-if="prefixIcon" :name="prefixIcon" class="mr5" />
    </slot>
    <input class="kl-input" :type="password ? 'password' : 'text'" :value="modelValue" :disabled="disabled"
      :placeholder="placeholder" @input="handleInput" @keyup.enter="enter" @blur="blur" @focus="focus" />
    <slot name='suffix'>
      <div class="ml5 bold suffix">{{ suffixText }}</div>
    </slot>
    <div v-if="errorText" class="error-msg flex-vertical nowrap">{{ errorText }}</div>
  </div>
</template>

<style scoped>
.kl-input-warpper {
  display: inline-flex;
  width: 100%;
  height: 32px;
  padding: 0 10px;
  border: 1px solid var(--kl-border-color);
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
}

.kl-input-warpper.shadow-inline {
  background: #fff;
}

.kl-input-warpper.focus {
  box-shadow: 0 0 0 1px #409eff inset;
}

.kl-input-warpper.error-input,
.kl-input-warpper.error-input .error-msg {
  color: var(--kl-error-color);
  border-color: var(--kl-error-color);
}

.kl-input-warpper.error-input .error-msg::after {
  border-color: var(--kl-error-color);
}

.kl-input-warpper .kl-icon {
  font-size: 24px;
}

.kl-input-warpper .suffix {
  font-size: 16px;
}

.kl-input-warpper .error-msg {
  position: absolute;
  top: 100%;
  right: 0;
  height: 30px;
  padding: 0 6px;
  margin-top: 10px;
  background: var(--kl-bg-color);
  border: 1px solid var(--kl-border-color);
  border-radius: 4px;
  z-index: 10;
}

.kl-input-warpper .error-msg::after {
  content: "";
  display: block;
  position: absolute;
  bottom: 100%;
  right: 10px;
  width: 10px;
  height: 10px;
  transform: translate(-50%, 5px) rotate(45deg);
  background: var(--kl-bg-color);
  border-width: 1px 0 0 1px;
  border-style: solid;
  border-color: var(--kl-border-color);
}

.kl-input {
  outline: none;
  border: none;
  background: none;
  border-radius: 0;
  padding: 0;
  min-width: 10px;
  height: 100%;
  flex: 1;
}
</style>