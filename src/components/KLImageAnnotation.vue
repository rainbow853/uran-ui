<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { coor } from '../type';
import type { RectChangeEvent, ImageAnnotationProps } from './KLImageAnnotation';
import { RectChangeEventFrom, coorInRect, findNextByTarget } from './KLImageAnnotation';
const props = defineProps<ImageAnnotationProps>();

const transform = ref();
// 只看原图
const onlyViewSourceImg = ref(false);
// 查看掩膜
const showMask = ref(false);
// 当前被选中的rect
const curRectChange = ref<RectChangeEvent>({ from: null, rect: null, silent: false });
// 当前被选中的rect的索引
const curSelectIndex = computed(() => curRectChange.value.rect ? props.rects.indexOf(curRectChange.value.rect) : -1);
watch(curRectChange, (_curRectChange) => {
  if (_curRectChange.silent || _curRectChange.from === RectChangeEventFrom.IMAGE || !_curRectChange.rect) return
  scrollToRect(_curRectChange.rect.position)
})

/**
 * 重置curRectChange与curSelectIndex，resize
 */
function reset() {
  curRectChange.value = { from: null, rect: null, silent: false }
  transform.value?.transfer2window.resize()
}

/**
 * 滚动导指定区域
 */
function scrollToRect(position: number[]) {
  transform.value?.transfer2window.scrollToRect(...position.slice(0, 4), 100);
}

/**
 * 根据索引选中rect
 */
function selectByIndex(index: number, from: RectChangeEventFrom, silent = false) {
  if (!props.rects[index]) return
  selectByRect({ from, rect: props.rects[index], silent })
}

/**
 * 选中rect
 */
function selectByRect({ rect, from, silent = false }: RectChangeEvent) {
  curRectChange.value = { from, rect: rect, silent }
}

/**
 * 获取鼠标相对图像的坐标
 */
function getPosition(e: MouseEvent): coor | null {
  return transform.value.getPosition(e, true);
}

/**
 * 选中rect
 */
function selectRect(e: MouseEvent) {
  const position = getPosition(e);
  if (!position) return;
  const rects = props.rects.filter(rect => coorInRect(position, rect.position));
  if (!rects.length) return;

  curRectChange.value = {
    from: RectChangeEventFrom.IMAGE,
    rect: findNextByTarget(rects, curRectChange.value.rect),
    silent: false
  }
}

/**
 * 添加键盘事件，上下左右可以选择缺陷，ESC重置
 */
function keydown(e: KeyboardEvent) {
  const _curSelectIndex = curSelectIndex.value;
  if (e.key === 'ArrowUp') {
    if (_curSelectIndex < 0) return;
    selectByIndex(_curSelectIndex - 1, RectChangeEventFrom.KEYBOARD);
    // 阻止el-scrollbar组件聚焦后键盘上下触发滚动事件
    return e.preventDefault();
  }

  if (e.key === 'ArrowDown') {
    if (_curSelectIndex > props.rects.length) return;
    selectByIndex(_curSelectIndex + 1, RectChangeEventFrom.KEYBOARD);
    // 阻止el-scrollbar组件聚焦后键盘上下触发滚动事件
    return e.preventDefault();
  }

  if (e.key === 'Escape' || e.key === ' ') reset()
}

defineExpose({
  transform,
  curRectChange,
  reset,
  selectByIndex,
  selectByRect,
  scrollToRect,
  getPosition,
})
</script>
<template>
  <div class="image-annotatation flex-between" tabindex="101" @keydown="keydown">
    <div class="left-aside">
      <transform-dom class="bg-black" ref="transform" disableContextMove limitInWindow :width="width" :height="height">
        <template v-slot="{ scale }">
          <div class="image-rects-div" @mousedown="mousedownImageEvent" @contextmenu="contextmenuImageEvent"
            @click="selectRect">
            <img v-if="imgSrc" :src="imgSrc" draggable="false">
            <img v-if="showMask" :src="imgMaskSrc" class="mask-img" draggable="false">
            <div class="rect-div" v-if="!onlyViewSourceImg" :style="{ '--border-width': Math.ceil(2 / scale) + 'px' }">
              <div :style="{
                left: rect.position[0] + 'px',
                top: rect.position[1] + 'px',
                width: rect.position[2] + 'px',
                height: rect.position[3] + 'px',
                'border-color': rect.color || '',
                'border-style': index === curSelectIndex ? 'dashed' : 'solid'
              }" v-for="(rect, index) in rects" :key="rect.id">
                <div class="bottom-100">{{ rect.measureDesc }}</div>
              </div>
            </div>
          </div>
          <slot name="image" :scale="scale"></slot>
        </template>
      </transform-dom>
      <slot name="canvas"></slot>
    </div>
    <div class="right-aside flex-between">
      <div class="annotations-list shadow-block flex-between">
        <div class="info-item" v-for="(item, index) in annotations" :key="index">
          <span class="title">{{ item.title }}：</span>
          <span class="ellipsis">{{ item.content }}</span>
        </div>
        <slot name="text-detail"></slot>
      </div>
      <div class="rects-list shadow-block flex-between">
        <div class="rects-top split-line flex-between">
          <div class="image-select flex-between">
            <span class="flex-full">图片选择</span>
            <el-switch active-text="查看mask" inactive-text="查看mask" inline-prompt v-model="showMask"
              active-color="#477AE0" inactive-color="#999999" class="mr20" />
            <el-switch active-text="只看原图" inactive-text="只看原图" inline-prompt v-model="onlyViewSourceImg"
              active-color="#477AE0" inactive-color="#999999" />
          </div>
          <slot name="image-detail">
            <div class="select-image-file ellipsis cursor">{{ imgSrc }}</div>
          </slot>
        </div>
        <div class="flex-full w-full">
          <slot name="rects-detail" v-bind="{ selectByRect, selectByIndex, curSelectIndex, curRectChange }">RectList
          </slot>
        </div>
      </div>
      <slot name="submit">
        <div class="btn-div shadow-block flex-center">
          <KLButton :width="340" :height="60" content="确认" @click="submitEvent" />
        </div>
      </slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.image-annotatation {
  width: 100%;
  height: 100%;
  outline: 0;

  .left-aside {
    position: relative;
    flex: 1;
    margin-right: 20px;
    width: 100px;
    height: 100%;

    .image-rects-div {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .image-rects-div>img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }

    .image-rects-div>.mask-img {
      opacity: 0.5;
    }

    .image-rects-div>.rect-div {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }

    .rect-div>div {
      border: 1px solid #f00;
      color: #fff;
      position: absolute;
      border-width: var(--border-width, 1px);
    }
  }

  .right-aside {
    height: 100%;
    width: 400px;
    flex-direction: column;

    .annotations-list {
      width: 100%;
      padding: 20px;
      flex-direction: column;
      align-items: flex-start;

      .info-item {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
      }

      .info-item .ellipsis {
        width: 60px;
        flex: 1;
      }
    }

    .rects-list {
      width: 100%;
      height: 300px;
      margin: 20px 0;
      flex: 1;
      flex-direction: column;


      .image-select {
        width: 100%;
        margin-bottom: 6px;
      }

      .rects-top {
        padding: 20px;
        width: 100%;
        flex-direction: column;
      }

      .select-image-file {
        width: 100%;
        height: 30px;
        line-height: 30px;
        border: 1px solid #c4c4c4;
        padding: 0 4px;
        overflow: hidden;
        direction: rtl;
      }

      :deep(.list-wrapper) {
        width: 100%;
        height: 100%;
        padding: 2px 20px 20px;
        display: flex;
        flex-direction: column;
      }

      :deep(.list-head) {
        height: 44px;
      }

      :deep(.list-div) {
        height: 0;
        flex: 1;
        border: 1px solid #ccc;
      }

      :deep(.list-row) {
        line-height: 38px;
        height: 38px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        padding: 0 2px;
      }

      :deep(.list-row.list-header) {
        line-height: 34px;
        height: 34px;
        font-weight: 600;
        background-color: var(--el-bg-color);
      }

      :deep(.list-row.current) {
        background: rgba(194, 199, 208, 0.6);
        font-weight: 600;
      }

      :deep(.list-row.red) {
        color: #d64949 !important;
      }

      :deep(.list-row.green) {
        color: #0ca62e !important;
      }

      :deep(.list-row>div+div) {
        height: 100%;
        border-left: 1px solid #ccc;
      }
    }

    .btn-div {
      width: 100%;
      height: 92px;

      >.kl-btn {
        font-weight: 600;
        font-size: 26px;
      }
    }
  }

  .bottom-100 {
    position: absolute;
    bottom: 100%;
  }
}
</style>