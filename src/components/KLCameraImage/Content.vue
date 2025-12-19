<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import type { Camera, Subscribe } from 'kl-camera-frontend';
import type { coor, roi } from '../../type';
import { useDrawRect } from '../../composables/drawRect';
import type { grid, rgb, crosshair } from './index.vue';
const emit = defineEmits(['update:subscribe', 'update:imageScale', 'update:count', 'update:coor'])

const props = defineProps<{
  camera?: Camera;
  subscribe?: Subscribe;
  width: number;
  height: number;
  imageScale: number;
  grid: grid;
  crosshair: crosshair;
  count: number;
  coor: coor;
  rgb: rgb;
  stopGrab?: boolean;
  showCrosshair?: boolean;
  rectCallback?: (roi: roi) => boolean;
}>()


const klTransform = ref();
let currentImageData: ImageData;
function mousemove(e: MouseEvent) {
  emit('update:coor', klTransform.value.getPosition(e));
  if (!currentImageData) return;
  const rect = canvasEl.value.getBoundingClientRect()
  const dx = e.pageX - rect.left;
  const dy = e.pageY - rect.top;
  const startIndex = (dx + dy * currentImageData.width) * 4;
  props.rgb.r = currentImageData.data[startIndex];
  props.rgb.g = currentImageData.data[startIndex + 1];
  props.rgb.b = currentImageData.data[startIndex + 2];
}
// 右键框选
const { mousedown, rectPath } = useDrawRect({
  getPositionFn(e: MouseEvent) {
    return klTransform.value.getPosition(e, true);
  },
  rectCallback: props.rectCallback,
  button: 2,
  enable: true,
})


const listener = (imageData: ImageData) => {
  if (props.stopGrab) return;
  emit('update:count', props.count + 1);
  ctx.putImageData(imageData, 0, 0);
  currentImageData = imageData;
}

const canvasEl = ref();
let ctx: CanvasRenderingContext2D;
let subscribeParam: number[] = [100, 100, 1, 0, 0];
onMounted(() => {
  canvasEl.value.width = canvasEl.value.parentNode.clientWidth;
  canvasEl.value.height = canvasEl.value.parentNode.clientHeight;
  ctx = canvasEl.value.getContext("2d");
})
onUnmounted(() => {
  props.subscribe?.destorySubscribe();
})

watch(() => props.camera, (currentCamera) => {
  emit('update:count', 0);
  props.subscribe?.stopSubscribe();
  if (currentCamera) {
    const s = currentCamera.createSubscribe(listener);
    s.updateParam(subscribeParam);
    emit('update:subscribe', s);
  } else {
    emit('update:subscribe', undefined);
  }
}, {
  immediate: true,
})

function transform(matrix: number[]) {
  emit('update:imageScale', parseFloat((matrix[2] * 100).toFixed(3)));
  subscribeParam = matrix;
  props.subscribe?.updateParam(subscribeParam);
}

function zoomByCenter(zoomOut: boolean) {
  klTransform.value?.zoomByCenter(zoomOut);
}
function restoreImage() {
  klTransform.value?.forceFresh();
}
defineExpose({
  klTransform,
  zoomByCenter,
  restoreImage,
});
</script>

<template>
  <div ref="cameraContent" class="camera-content-warpper">
    <canvas ref="canvasEl"></canvas>
    <transform-dom ref="klTransform" @transform="transform" :width="width" :height="height" limitInWindow
      class="camera-content" :class="{ 'grid-line': grid.show }"
      :style="{ '--grid-color': grid.color, '--grid-step': grid.step + 'px' }">
      <template v-slot="{ scale }">
        <div class="wh-full" @mousemove="mousemove" @mousedown="mousedown" @contextmenu.stop.prevent
          :style="{ '--stroke-size': Math.ceil(1 / scale) }">
          <KLCrosshair v-if="crosshair.show && crosshair.inner" :coor="crosshair.coor" :color="crosshair.color"
            :width="width" :height="height" :scale="scale" />
          <KLCrosshair v-if="showCrosshair" :coor="coor" :color="crosshair.color" :width="width" :height="height"
            :scale="scale" />
          <slot :scale="scale" :width="width" :height="height"></slot>
          <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#ff0000" stroke-opacity="1" :stroke-width="4" fill="none">
              <path :d="rectPath" />
            </g>
          </svg>
        </div>
      </template>
    </transform-dom>
    <KLCrosshair v-if="crosshair.show && !crosshair.inner" :coor="crosshair.coor" :color="crosshair.color" :scale="1" />
    <slot name="camera-outer"></slot>
  </div>
</template>

<style lang="scss" scoped>
.camera-content-warpper {
  position: relative;
  height: 400px;
  flex: 1;
  overflow: hidden;
  background: #000;

  >canvas {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
}

.camera-content * {
  image-rendering: pixelated;
}

.camera-content svg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.camera-content .axis-img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 200px;
  pointer-events: none;
}

.camera-content.grid-line::after {
  display: block;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
  background-image: linear-gradient(to right, var(--grid-color) 1px, transparent 1px, transparent var(--grid-step)),
    linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px, transparent var(--grid-step));
  background-size: var(--grid-step) var(--grid-step);
  pointer-events: none;
}
</style>
@/stores/camera