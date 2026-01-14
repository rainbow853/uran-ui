<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Camera, Subscribe } from 'kl-camera-frontend';
import type { coor, roi } from '../../type';
import { useLocalStorageItem } from "../../composables/localStorageItem";
import Header from './Header.vue';
import Content from './Content.vue';
import Footer from './Footer.vue';

/** 网格线配置项 */
export interface grid {
  /** 是否显示网格线 */
  show: boolean;
  /** 网格线的颜色 */
  color: string;
  /** 网格线的间隔 */
  step: number;
}

export interface rgb {
  r: number;
  g: number;
  b: number;
}

/** 辅助线配置项 */
export interface crosshair {
  /** 是否显示辅助线 */
  show: boolean;
  /** 辅助线对齐于图像内还是画布内 */
  inner: boolean;
  /** 辅助线的颜色 */
  color: string;
  /** 辅助线所在位置 */
  coor: coor;
}

const props = defineProps<{
  camera?: Camera;
  stopGrab?: boolean;
  showCrosshair?: boolean;
  grabImageSuccessCB?: (image: any) => void;
  helpVideo?: string;
  rectCallback?: (roi: roi) => boolean;
}>()
const width = computed(() => {
  return props.camera?.width || 5120;
});
const height = computed(() => {
  return props.camera?.height || 5120;
});

/** 网格 */
const { value: grid } = useLocalStorageItem('camera-grid',
  { show: false, color: '#f00', step: 100 }, true);
/** 辅助线 */
const { value: crosshair } = useLocalStorageItem('camera-crosshair',
  { show: false, inner: true, color: '#4180FF', coor: { x: width.value / 2, y: height.value / 2 } }, true);
/** 鼠标所在位置 */
const coor = ref<coor>({ x: 0, y: 0 });
/** 鼠标所在位置的RGB像素 */
const rgb = ref<rgb>({ r: 0, g: 0, b: 0 });
/** 图像采集数量 */
const count = ref(0);
/** 图像缩放比例 */
const imageScale = ref(100);
/** 当前订阅实例 */
const subscribe = ref<Subscribe | undefined>();
/** 相机实时画面组件 */
const content = ref();

/**
 * 辅助线居中
 */
function crosshairCenter() {
  let w: number = width.value;
  let h: number = height.value;
  if (!crosshair.value.inner) {
    w = content.value.klTransform.transfer2window.outw;
    h = content.value.klTransform.transfer2window.outh;
  }
  crosshair.value.coor = { x: w / 2, y: h / 2 };
}

/**
 * 放大缩放图像
 */
function zoomByCenter(zoomOut: boolean) {
  content.value.zoomByCenter(zoomOut);
}

/**
 * 重置图像区域
 */
function restoreImage() {
  content.value.restoreImage();
}

defineExpose({
  getPosition(e: MouseEvent, limitInWindow?: boolean) {
    return content.value.klTransform.getPosition(e, limitInWindow);
  },
  restoreImage,
})
</script>

<template>
  <div class="camera-main flex-col" :class="{ disabled: !camera }">
    <Header :camera="camera" :subscribe="subscribe" :imageScale="imageScale" v-model:grid="grid"
      v-model:crosshair="crosshair" :crosshairCenter="crosshairCenter" :zoomByCenter="zoomByCenter"
      :restoreImage="restoreImage" :helpVideo="helpVideo" :grabImageSuccessCB="grabImageSuccessCB" />
    <Content ref="content" :camera="camera" v-model:subscribe="subscribe" :width="width" :height="height"
      v-model:imageScale="imageScale" :grid="grid" :crosshair="crosshair" v-model:count="count" v-model:coor="coor"
      v-model:rgb="rgb" :stopGrab="stopGrab" :showCrosshair="showCrosshair" :rectCallback="rectCallback">
      <template v-slot="{ scale, width, height }">
        <slot :scale="scale" :width="width" :height="height"></slot>
      </template>
      <template #camera-outer>
        <slot name="camera-outer"></slot>
      </template>
    </Content>
    <Footer :camera="camera" :width="width" :height="height" :count="count" :coor="coor" :rgb="rgb" />
  </div>
</template>

<style lang="scss" scoped>
.camera-main {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
@/stores/camera../../../packages/composables/localStorageItem