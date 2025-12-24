<script lang="ts" setup>
import { ref } from 'vue';
import type { roi, coor } from '../type';
import { useMousedownEvent, MouseDownEleInfo } from '../composables/useMousedownEvent';
const minSize = 10;

const props = defineProps<{
  roi: roi,
  disableKeyboardEvent?: boolean,
  disableResize?: boolean,
}>();


let updateROIFn: (downPos: coor, curPos: coor) => void;
function getUpdateROIFn(hlElement: string, downROI: roi, canvasWidth: number, canvasHeight: number) {
  const { x, y, width, height } = downROI;
  function up(dy: number) {
    const _height = Math.max(minSize, Math.min(height - dy, height + y));
    props.roi.y = y + height - _height;
    props.roi.height = _height;
  }
  function right(dx: number) {
    props.roi.width = Math.max(minSize, Math.min(width + dx, canvasWidth - x));
  }
  function down(dy: number) {
    props.roi.height = Math.max(minSize, Math.min(height + dy, canvasHeight - y));
  }
  function left(dx: number) {
    const _width = Math.max(minSize, Math.min(width - dx, width + x));
    props.roi.x = x + width - _width;
    props.roi.width = _width;
  }
  function move(dx: number, dy: number) {
    props.roi.x = Math.max(0, Math.min(x + dx, canvasWidth - width));
    props.roi.y = Math.max(0, Math.min(y + dy, canvasHeight - height));
  }

  return function updateROIFn(downPos: coor, curPos: coor) {
    const dx = curPos.x - downPos.x;
    const dy = curPos.y - downPos.y;
    switch (hlElement) {
      case 'n-resize':
        up(dy);
        break;
      case 'ne-resize':
        up(dy);
        right(dx);
        break;
      case 'e-resize':
        right(dx);
        break;
      case 'se-resize':
        down(dy);
        right(dx);
        break;
      case 's-resize':
        down(dy);
        break;
      case 'sw-resize':
        down(dy);
        left(dx);
        break;
      case 'w-resize':
        left(dx);
        break;
      case 'nw-resize':
        up(dy);
        left(dx);
        break;
      default:
        move(dx, dy);
    }
  }
}

const { mousedown } = useMousedownEvent({
  // @ts-ignore
  getDOM: (e: MouseEvent) => e.currentTarget.parentNode.parentNode,
  mousedown(_downPos: coor, eleInfo: MouseDownEleInfo, e: MouseEvent) {
    const targetNode = e.target as HTMLElement;
    updateROIFn = getUpdateROIFn(
      targetNode.className,
      props.roi,
      eleInfo.clientWidth,
      eleInfo.clientHeight,
    );
  },
  mousemove(downPos: coor, curPos: coor) {
    updateROIFn(downPos, curPos);
  },
  mouseup(downPos: coor, curPos: coor) {
    updateROIFn(downPos, curPos);
  },
});
const highlight = ref(false);
function focus() {
  highlight.value = true;
}
function blur() {
  highlight.value = false;
}
function keyup(e: KeyboardEvent) {
  if (props.disableKeyboardEvent) return;
  const key = e.key;
  switch (key) {
    case 'ArrowUp':
      props.roi.y > 0 && props.roi.y--;
      break;
    case 'ArrowRight':
      props.roi.x++;
      break;
    case 'ArrowDown':
      props.roi.y++;
      break;
    case 'ArrowLeft':
      props.roi.x > 0 && props.roi.x--;
      break;
    default:
      break;
  }
}

</script>
<template>
  <div tabindex="101" class="roi-wrapper" :class="{ highlight: highlight, 'disable-resize': disableResize }" :style="{
    'width': roi.width + 'px',
    'height': roi.height + 'px',
    'left': roi.x + 'px',
    'top': roi.y + 'px',
  }" @focus="focus" @blur="blur" @keyup="keyup">
    <slot></slot>
    <div v-if="highlight" class="resize-wrapper" @mousedown="mousedown">
      <div class="cx"></div>
      <div class="cy"></div>
      <div class="n-resize"></div>
      <div class="ne-resize"></div>
      <div class="e-resize"></div>
      <div class="se-resize"></div>
      <div class="s-resize"></div>
      <div class="sw-resize"></div>
      <div class="w-resize"></div>
      <div class="nw-resize"></div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.roi-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  border: var(--kl-stroke-size) solid var(--kl-stroke-color);
  color: var(--kl-stroke-color);
  outline: 0;
  white-space: nowrap;
  cursor: move;
  pointer-events: all;
  user-select: none;

  &.highlight {
    border-color: var(--kl-hl-stroke-color);
    color: var(--kl-hl-stroke-color);
    border-style: dashed;
    z-index: 1;
  }

  .resize-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .cx {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 50%;
    height: 100%;
    width: var(--kl-stroke-size);
    transform: translateX(var(--kl-stroke-1-2));
    background: var(--kl-hl-stroke-color);
  }

  .cy {
    position: absolute;
    bottom: 50%;
    left: 0;
    right: 0;
    width: 100%;
    height: var(--kl-stroke-size);
    transform: translateY(var(--kl-stroke-1-2));
    background: var(--kl-hl-stroke-color);
  }

  &.disable-resize .n-resize,
  &.disable-resize .ne-resize,
  &.disable-resize .e-resize,
  &.disable-resize .se-resize,
  &.disable-resize .s-resize,
  &.disable-resize .sw-resize,
  &.disable-resize .w-resize,
  &.disable-resize .nw-resize {
    display: none;
  }

  .n-resize,
  .ne-resize,
  .e-resize,
  .se-resize,
  .s-resize,
  .sw-resize,
  .w-resize,
  .nw-resize {
    position: absolute;
    width: var(--kl-thumb-size);
    height: var(--kl-thumb-size);
    transform: translate(-50%, -50%);
    background: var(--kl-hl-stroke-color);
  }

  .n-resize {
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    cursor: s-resize;
  }

  .ne-resize {
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    cursor: ne-resize;
  }

  .e-resize {
    top: 50%;
    right: 0;
    transform: translate(50%, -50%);
    cursor: e-resize;
  }

  .se-resize {
    right: 0;
    bottom: 0;
    transform: translate(50%, 50%);
    cursor: se-resize;
  }

  .s-resize {
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 50%);
    cursor: s-resize;
  }

  .sw-resize {
    left: 0;
    bottom: 0;
    transform: translate(-50%, 50%);
    cursor: sw-resize;
  }

  .w-resize {
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    cursor: e-resize;
  }

  .nw-resize {
    left: 0;
    top: 0;
    transform: translate(-50%, -50%);
    cursor: nw-resize;
  }
}
</style>
