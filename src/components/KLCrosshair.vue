<script setup lang="ts">
interface coor {
  x: number;
  y: number;
}
const props = defineProps<{
  coor: coor;
  color: string;
  width?: number;
  height?: number;
  scale: number;
}>()

let downCoorX = 0;
let downCoorY = 0;
let downPageX = 0;
let downPageY = 0;
let enabledRow = true;
let enabledCol = true;
function downRow(e: MouseEvent) {
  enabledRow = true;
  enabledCol = false;
  mousedown(e);
}
function downCol(e: MouseEvent) {
  enabledRow = false;
  enabledCol = true;
  mousedown(e);
}
function downRowCol(e: MouseEvent) {
  enabledRow = true;
  enabledCol = true;
  mousedown(e);
}
let maxWidth: number;
let maxHeight: number;
function mousedown(e: MouseEvent) {
  e.stopPropagation();
  downCoorX = props.coor.x;
  downCoorY = props.coor.y;
  downPageX = e.pageX;
  downPageY = e.pageY;
  maxWidth = props.width || (e.currentTarget as any).parentNode.clientWidth;
  maxHeight = props.height || (e.currentTarget as any).parentNode.clientHeight;
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}
function mousemove(e: MouseEvent) {
  e.stopPropagation();
  if (enabledCol) props.coor.x = Math.min(
    maxWidth,
    Math.max(0, ~~((e.pageX - downPageX) / props.scale) + downCoorX)
  );
  if (enabledRow) props.coor.y =
    Math.min(
      maxHeight,
      ~~((e.pageY - downPageY) / props.scale) + downCoorY
    );
}
function mouseup(e: MouseEvent) {
  document.removeEventListener('mousemove', mousemove)
  document.removeEventListener('mouseup', mouseup)
  mousemove(e);
}
</script>

<template>
  <div class="cross-warpper" :style="{ 'font-size': 2 / scale + 'px', '--bg': color }">
    <div class="row-cross" @mousedown="downRow" :style="{ top: coor.y + 'px' }"></div>
    <div class="col-cross" @mousedown="downCol" :style="{ left: coor.x + 'px' }"></div>
    <div class="thumb" @mousedown="downRowCol" :style="{ left: coor.x + 'px', top: coor.y + 'px' }"></div>
  </div>
</template>

<style scoped>
.cross-warpper {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.row-cross {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1em;
  transform: translateY(-50%);
  cursor: n-resize;
  background: var(--bg);
  pointer-events: all;
}

.row-cross::before {
  content: "";
  display: block;
  width: 100%;
  height: 10em;
  top: 50%;
  transform: translateY(-50%);
  cursor: n-resize;
}

.col-cross {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1em;
  transform: translateX(-50%);
  cursor: e-resize;
  background: var(--bg);
  pointer-events: all;
}

.col-cross::before {
  content: "";
  display: block;
  height: 100%;
  width: 10em;
  left: 50%;
  transform: translateX(-50%);
  cursor: e-resize;
}

.thumb {
  position: absolute;
  width: 10em;
  height: 10em;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
  cursor: move;
  pointer-events: all;
}
</style>
