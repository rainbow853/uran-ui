<script setup lang="ts">
import type { coor } from '../type';
import { useMousedownEvent, MouseDownEleInfo } from '../composables/useMousedownEvent';

const props = defineProps<{
  coor: coor;
  color: string;
  lock?: boolean;
}>()


let updateFn: (curPos: coor) => void;
function getUpdateROIFn(hlElement: string, eleInfo: MouseDownEleInfo) {
  function updateY(y: number) {
    props.coor.y = Math.max(0, Math.min(eleInfo.clientHeight, y));
  }
  function updateX(x: number) {
    props.coor.x = Math.max(0, Math.min(eleInfo.clientWidth, x));
  }
  return function updateFn(curPos: coor) {
    if (hlElement === 'row-cross') return updateY(curPos.y);
    if (hlElement === 'col-cross') return updateX(curPos.x);
    if (hlElement === 'thumb') {
      updateX(curPos.x);
      updateY(curPos.y);
    }
  }
}

const { mousedown } = useMousedownEvent({
  getDOM: (e: MouseEvent) => e.currentTarget as any,
  mousedown(_downPos: coor, eleInfo: MouseDownEleInfo, e: MouseEvent) {
    const targetNode = e.target as HTMLElement;
    updateFn = getUpdateROIFn(targetNode.className, eleInfo);
  },
  mousemove(_downPos: coor, curPos: coor) {
    updateFn(curPos);
  },
  mouseup(_downPos: coor, curPos: coor) {
    updateFn(curPos);
  },
});
</script>

<template>
  <div ref="el" class="cross-warpper" :class="{ lock: lock }" :style="{ '--bg': color }" @mousedown="mousedown">
    <div class="row-cross" :style="{ top: coor.y + 'px' }"></div>
    <div class="col-cross" :style="{ left: coor.x + 'px' }"></div>
    <div class="thumb" :style="{ left: coor.x + 'px', top: coor.y + 'px' }"></div>
  </div>
</template>

<style scoped>
.cross-warpper {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.cross-warpper.lock .row-cross,
.cross-warpper.lock .col-cross,
.cross-warpper.lock .thumb {
  pointer-events: none;
}

.row-cross {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: var(--kl-stroke-size);
  transform: translateY(-50%);
  cursor: n-resize;
  background: var(--bg);
  pointer-events: all;
}

.row-cross::before {
  content: "";
  display: block;
  width: 100%;
  height: var(--kl-thumb-size);
  top: 50%;
  transform: translateY(-50%);
  cursor: n-resize;
}

.col-cross {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--kl-stroke-size);
  transform: translateX(-50%);
  cursor: e-resize;
  background: var(--bg);
  pointer-events: all;
}

.col-cross::before {
  content: "";
  display: block;
  height: 100%;
  width: var(--kl-thumb-size);
  left: 50%;
  transform: translateX(-50%);
  cursor: e-resize;
}

.thumb {
  position: absolute;
  width: var(--kl-thumb-size);
  height: var(--kl-thumb-size);
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
  cursor: move;
  pointer-events: all;
}
</style>
