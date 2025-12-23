<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';
import { ElMessage } from "element-plus";
import type { Camera, Subscribe, grabType } from 'kl-camera-frontend';
import type { grid, crosshair } from './index.vue';

const props = defineProps<{
  camera?: Camera;
  subscribe?: Subscribe;
  imageScale: number;
  grid: grid;
  crosshair: crosshair;
  crosshairCenter: () => void;
  zoomByCenter: (zoomOut: boolean) => void;
  restoreImage: () => void;
  grabImageSuccessCB: (image: any) => void;
  helpVideo?: string;
}>()
const isSubscribed = computed(() => {
  return !!props.subscribe?.isSubscribed;
});
const disabledSubscribe = ref(false)
async function switchGrab() {
  disabledSubscribe.value = true;
  try {
    if (isSubscribed.value) {
      await props.subscribe?.stopSubscribe();
    } else {
      await props.subscribe?.startSubscribe();
    }
  } catch (e) {
    ElMessage.error('切换失败：' + e);
  }
  disabledSubscribe.value = false;
}

const disabledGrabImage = ref(false)
async function grabImage() {
  if (!props.subscribe) return;
  disabledGrabImage.value = true;
  const image = await props.subscribe.grabImage(true);
  disabledGrabImage.value = false;
  if (!image) return ElMessage.error('采集图像失败');
  props.grabImageSuccessCB(image);
}

const predefineColors = ref(['#ff0000', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', '#ff00ff']);
function switchCrosshair() {
  crosshairCenter();
}

function crosshairCenter() {
  props.crosshairCenter();
}

const GrabInt = 'grabInternal';
const GrabExt = 'grabExternal'
const grabTrigger = computed(() => {
  return props.camera?.grabType;
});
function swicthGrabType(toGrabType: grabType) {
  if (!props.camera || grabTrigger.value === toGrabType) return;
  props.camera?.swicthGrabType(toGrabType);
}

const expTime = ref(0);
function setExposureTime() {
  props.camera?.setExposureTime(expTime.value);
}
async function freshExposureTime() {
  if (!props.camera) return;
  expTime.value = await props.camera.getExposureTime() || 0;
}
watchEffect(() => isSubscribed.value && freshExposureTime());

function zoomByCenter(zoomOut: boolean) {
  props.zoomByCenter(zoomOut);
}
function restoreImage() {
  props.restoreImage();
}

const videoVisible = ref(false);
function showVideo() {
  videoVisible.value = true;
}
function hiddenVideo() {
  videoVisible.value = false;
  return true;
}
</script>

<template>
  <div class="camera-header flex-between">
    <div class="flex-vertical">
      <KLIcon title="开始/停止采集" shadow :name="isSubscribed ? 'stop' : 'start'" :disabled="!subscribe"
        @click="switchGrab" />
      <KLIcon title="采集一帧图像" shadow name="camera" :disabled="disabledGrabImage" @click="grabImage" />
      <el-popover placement="right" trigger="contextmenu" :width="240">
        <template #reference>
          <KLIcon title="参考线" shadow name="table" :class="{ current: crosshair.show }"
            @click="crosshair.show = !crosshair.show" />
        </template>
        <div class="p20">
          <div>
            <el-radio-group v-model="crosshair.inner" class="flex-between" style="width:100%" @change="switchCrosshair">
              <el-radio :label="false" size="large">窗口坐标</el-radio>
              <el-radio :label="true" size="large">图像坐标</el-radio>
            </el-radio-group>
          </div>
          <div class="flex-between" style="margin-top: 10px;">
            <span>
              x<el-input-number v-model="crosshair.coor.x" :min="0" :controls="false"
                style="margin: 0 0 0 10px;width:60px;" />
            </span>
            <span>
              y<el-input-number v-model="crosshair.coor.y" :min="0" :controls="false"
                style="margin: 0 0 0 10px;width:60px;" />
            </span>
          </div>
          <div class="flex-between" style="margin-top: 10px;">
            <span>
              <span style="margin: 0 10px 0 0;">颜色</span>
              <el-color-picker v-model="crosshair.color" :predefine="predefineColors" />
            </span>
            <span>
              <span style="margin: 0 10px 0 0;">显示</span>
              <KLButton content="居中" :height="30" @click="crosshairCenter" />
            </span>
          </div>
        </div>
      </el-popover>
      <el-popover placement="right" trigger="contextmenu" :width="220">
        <template #reference>
          <KLIcon title="网格线" shadow name="grid" :class="{ current: grid.show }" @click="grid.show = !grid.show" />
        </template>
        <div style="padding:20px;">
          <div>
            间距<el-input-number v-model="grid.step" :step="10" :min="0" style="margin: 0 0 0 10px;width:130px;" />
          </div>
          <div style="margin-top: 10px;">
            <span style="margin: 0 10px 0 0;">颜色</span>
            <el-color-picker v-model="grid.color" :predefine="predefineColors" />
          </div>
        </div>
      </el-popover>
      <div class="split-line split-left"></div>
      <KLIcon title="外触发" shadow name="light-trigger" :class="{ current: grabTrigger === GrabExt }"
        @click="swicthGrabType(GrabExt)" />
      <KLIcon title="内触发" shadow name="camera-trigger" :class="{ current: grabTrigger === GrabInt }"
        @click="swicthGrabType(GrabInt)" />
      <div class="split-line split-left"></div>
      <KLIcon title="曝光时间" name="exp-time" />(ms)
      <el-input-number v-model="expTime" :min="0" :controls="false" style="width:100px;" @change="setExposureTime">
      </el-input-number>
      <div class="split-line split-left"></div>
      <KLIcon v-if="helpVideo" title="视频讲解" class="ml10" name="help-video" shadow @click="showVideo" />
    </div>
    <div class="flex-vertical">
      <span class="flex-vertical ratio-input">
        <el-icon @click="zoomByCenter(false)">
          <Minus />
        </el-icon>
        <span class="flex-center flex-full" style="font-size:12px;">{{ imageScale }}%</span>
        <el-icon @click="zoomByCenter(true)">
          <Plus />
        </el-icon>
      </span>
      <KLIcon shadow name="fullscreen" @click="restoreImage" />
    </div>
    <KLDialog v-if="videoVisible" title="视频讲解" canMove :footer="false" :close="hiddenVideo">
      <template #main>
        <div style="border-top: 1px solid #b0b0ae">
          <video controls :src="helpVideo" width="640"></video>
        </div>
      </template>
    </KLDialog>
  </div>
</template>

<style lang="scss" scoped>
.camera-header {
  height: 30px;
  margin-bottom: 10px;
  font-weight: 600;
}

.camera-header :deep(.kl-icon) {
  width: 30px;
  height: 30px;
  font-size: 22px;
}

.camera-header :deep(.kl-icon).current {
  color: #0c41ab;
}

.camera-header .flex-vertical>*+* {
  margin-left: 10px;
}

.camera-header .split-line {
  height: 30px;
  width: 1px;
  margin: 0 6px 0 20px;
}

.camera-header .ratio-input {
  height: 30px;
  width: 150px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
}

.camera-header .ratio-input i {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.camera-header .ratio-input i:hover {
  color: var(--el-color-primary);
}

.camera-header .ratio-input i:first-child {
  border-right: var(--el-border);
}

.camera-header .ratio-input i:last-child {
  border-left: var(--el-border);
}
</style>
@/stores/camera