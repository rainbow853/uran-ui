<script setup lang="ts">
import { computed } from "vue"; 

const props = defineProps<{
  content?: string;
  name?: string;
  height?: number | string;
  width?: number | string;
  warn?: boolean;
  large?: boolean;
  highlight?: boolean;
  current?: boolean;
  disabled?: boolean;
  canRemove?: boolean;
}>();

const style = computed(() => {
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
    height: typeof props.height === 'number' ? `${props.height}px` : props.height,
  };
});
</script>
<template>
  <div class="kl-btn shadow-inline"
    :class="{ highlight, current, warn, large, disabled, 'flex-between': canRemove, 'flex-center': !canRemove }"
    :style="style">
    <slot name='icon'><KLIcon v-if="name" :name="name" /></slot> <span>{{ content }}</span>
    <el-icon v-if="canRemove" @click.stop="$emit('remove')">
      <CloseBold />
    </el-icon>
  </div>
</template>

<style scoped>
.kl-btn {
  display: inline-flex;
  cursor: pointer;
  font-weight: 400;
  font-size: 14px;
  color: #000;
  background: #ebf2f8;
  height: 40px;
  padding: 0 10px;
  padding-bottom: 1px;
  transition: box-shadow 0.3s;
}

/** 防止按钮重复点击 https://juejin.cn/post/7165828047520661534?searchId=20231207143441CFC059E251EAB3826714 */
.kl-btn {
  animation: throttle 0.5s step-end forwards;
}

.kl-btn:active {
  animation: none;
}

@keyframes throttle {
  from {
    pointer-events: none;
  }

  to {
    pointer-events: all;
  }
}

.kl-btn.large {
  font-size: 16px;
  color: var(--kl-font-color);
}

.kl-btn:hover {
  font-weight: 600;
  box-shadow: 2px 2px 0px 0px #FFF inset, -3px -3px 0px 0px #FFF inset, -2px -2px 0px 0px #9C9C9C inset;
}

.kl-btn .remove,
.kl-btn:active,
.kl-btn.highlight,
.kl-btn.current {
  color: #0c41ab;
  font-weight: 600;
}


.kl-btn:active,
.kl-btn.highlight {
  background: linear-gradient(138deg, #EBF2F8 0%, #F8FCFF 100%);
  box-shadow: 3px 3px 2px 0px #A6BAD5 inset, -3px -3px 2px 0px #D5DCE4 inset;
}

.kl-btn.warn {
  color: #f00;
}

.kl-btn:active.warn,
.kl-btn.highlight.warn {
  color: #f00;
  box-shadow: 3px 3px 2px 0px #d5a6a6 inset, -3px -3px 2px 0px #e4d5d5 inset;
}

.kl-btn>*+* {
  margin-left: 6px;
}
</style>
