<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';
import { ElMessage } from 'element-plus';
const emit = defineEmits(['submit', 'contextmenuImage', 'keydownEvent']);
interface rect {
  id: number;
  position: number[];
  [key: string]: any;
}
interface RectChangeEvent {
  from: any, rect: null | rect, silent?: boolean
}
const props = defineProps<{
  // 标注信息列表，显示在右上角；[{title,content}]
  annotations: { title: string; content: string }[];
  imgSrc: string;
  preImgSrc?: string;
  imgMaskSrc?: string;
  imgSourceRrc?: string;
  width: number;
  height: number;
  rects: rect[];
  customField?: string;
  // rect被选中时的边框颜色
  rectSelectedColor?: string;
  // 确认按钮提示
  submitBtn?: string;
  // 禁止右键移动画布
  disableContextMove?: boolean;
  // 鼠标事件
  mousedownImageEvent?: Function;
}>();
const _imgSrc = useImgsLoadCache(computed(() => props.imgSrc));
const _preImgSrc = ref<string | undefined>('')
const transform = ref();
// 只看原图
const onlyViewSourceImg = ref(false);
const showMask = ref(false);
// 当前被选中的rect
const curRectChange = ref<RectChangeEvent>({ from: null, rect: null, silent: false });
// 当前被选中的rect的索引
const curSelectIndex = computed(() => curRectChange.value.rect ? props.rects.indexOf(curRectChange.value.rect) : -1);
const coor = ref({ x: 0, y: 0 })//鼠标位置
watch(() => _imgSrc, () => {
  _preImgSrc.value = _imgSrc.value ? props.preImgSrc : ''
})
watch(curRectChange, (_curRectChange) => {
  if (_curRectChange.silent || _curRectChange.from === transform.value || !_curRectChange.rect) return
  transform.value?.scrollToRect(_curRectChange.rect[props.customField || 'position'])
})

onMounted(async () => {
  document.addEventListener('keydown', keydown);
})
onUnmounted(async () => {
  document.removeEventListener('keydown', keydown);
  /**
   * 使用图片加载缓存
   *
   * @param imgSrcWanted 所需的图片地址，可以是计算属性或响应式引用
   * @returns 返回响应式引用，表示已加载的图片地址
   */
})
function useImgsLoadCache(imgSrcWanted: ComputedRef<string> | Ref<string>): Ref<string> {
  const imgSrc = ref<string>('');

  watch(imgSrcWanted, (src) => {
    loadImg(src);
  }, { immediate: true })

  function loadImg(src: string) {
    imgSrc.value = '';
    if (!src) return;
    const img = new Image();
    img.src = src;
    img.decode().finally(() => {
      if (imgSrcWanted.value === src) imgSrc.value = src;
    })
  }

  return imgSrc;
}
/**
 * 重置curRectChange与curSelectIndex，resize
 */
function reset() {
  curRectChange.value = { from: null, rect: null, silent: false }
  transform.value?.resize()
}
/**
 * 根据索引选中rect
 * @param {number} index 索引
 * @param {boolean} [silent] 是否不需要将图像和rect列表滚动到当前缺陷；默认为false
 */
function selectByIndex(index: number, silent?: boolean) {
  if (!props.rects[index]) return
  selectByRect({ from: null, rect: props.rects[index], silent })
}
/**
 * 选中rect
 */
function selectByRect({ rect, from, silent = false }: RectChangeEvent) {
  curRectChange.value = { from, rect: rect, silent }
}
/**
 * 拷贝图像地址
 */
function copyImageSrc() {
  navigator.clipboard.writeText(props.imgSrc);
  ElMessage.success('图片地址拷贝成功！');
}
/**
 * 点击确定按钮
 */
function submit() {
  emit('submit');
}
/**
 * 鼠标右键
 */
function contextmenu(e: MouseEvent) {
  const position = transform.value.getImagePosition(e)
  emit('contextmenuImage', { e, position });
}
/**
 * 选中rect
 */
function select(rect: rect) {
  curRectChange.value = {
    from: transform.value,
    rect,
    silent: false
  }
}
/**
 * 添加键盘事件，上下左右可以选择缺陷，ESC重置
 */
function keydown(e: any) {
  if (e.target.nodeName === 'INPUT') return

  emit('keydownEvent', e)

  const _curSelectIndex = curSelectIndex.value;
  if (e.key === 'ArrowUp') {
    if (_curSelectIndex < 0) return;
    selectByIndex(_curSelectIndex - 1);
    return e.preventDefault();
  }

  if (e.key === 'ArrowDown') {
    if (_curSelectIndex > props.rects.length) return;
    selectByIndex(_curSelectIndex + 1);
    return e.preventDefault();
  }
}
function mousedown(e: MouseEvent) {
  props.mousedownImageEvent && props.mousedownImageEvent(e);
}
function onMouseMove(e: MouseEvent) {
  coor.value = transform.value?.getImagePosition(e);
}

defineExpose({
  curRectChange,
  reset,
  selectByIndex,
  selectByRect,
})
</script>

<template>
  <div class="image-annotatation flex-between">
    <slot name="imageNav"></slot>
    <KLTransform ref="transform" class="left-aside" :disableContextMove="disableContextMove" :width="width"
      :height="height" @contextmenu="contextmenu"  @mousemove="onMouseMove">
      <template #inner="{ scale }">
        <div class="image-rects-div" @mousedown="mousedown">
          <img class="img-default" :class="{ 'img-active': _imgSrc != preImgSrc }" v-show="_imgSrc" :src="_imgSrc"
            draggable="false">
          <img class="img-default" :class="{ 'img-active': _imgSrc == preImgSrc }" v-show="preImgSrc" :src="preImgSrc"
            draggable="false">

          <img class="mask" v-if="showMask" :src="imgMaskSrc" draggable="false">
          <img class="source" v-if="onlyViewSourceImg" :src="imgSourceRrc" draggable="false">
          <div class="rect-div" v-if="!onlyViewSourceImg" :style="{ '--border-width': Math.ceil(1 / scale) + 'px' }">

            <div :style="{
      left: rect[customField || 'position'][0] + 'px',
      top: rect[customField || 'position'][1] + 'px',
      width: rect[customField || 'position'][2] + 'px',
      height: rect[customField || 'position'][3] + 'px',
      'border-color': (rect === curRectChange?.rect ? rectSelectedColor : rect.color) || rect.color || 'red',
      'border-style': rect === curRectChange?.rect ? 'dashed' : 'solid'
    }" v-for="rect in rects" :key="rect.id" @click="select(rect)">
            </div>

          </div>
        </div>
        <slot name="inner" :scale="scale"></slot>
      </template>
      <template #outer>
        <slot name="image" v-bind="{ coor }"></slot>
      </template>
    </KLTransform>
    <div class="right-aside flex-between">
      <div v-if="annotations.length" class="annotations-list shadow-block flex-between por">
        <div class="info-item" v-for="(item, index) in annotations" :key="index">
          <span class="title">{{ item.title }}：</span>
          <span class="ellipsis">{{ item.content }}</span>
        </div>
        <slot name="changeMaterial"></slot>
        <slot name="detail"></slot>
      </div>
      <div class="rects-list shadow-block flex-between">
        <div class="rects-top split-line flex-between">
          <slot name="selectWork"></slot>
          <div class="image-select">
            <div class="flex">
              <div class="flex-center mr5" v-if="imgMaskSrc">
                <span class="only-img-label">查看mask</span>
                <el-switch v-model="showMask" active-color="#477AE0" inactive-color="#999999" />
              </div>
              <div class="flex-center">
                <span class="only-img-label">查看原图</span>
                <el-switch v-model="onlyViewSourceImg" active-color="#477AE0" inactive-color="#999999" />
              </div>
              <slot name="other"></slot>
            </div>
            <div class="flex">
              <slot name="selectFun"></slot>
            </div>
          </div>
          <slot name="selectImage">
            <div class="w-full flex-between">
              <div>图片地址:</div>
              <div style="width: 260px;" class="select-image-file ellipsis cursor" @click="copyImageSrc">{{ _imgSrc }}
              </div>
            </div>
          </slot>
        </div>
        <div style="width: 100%;height: 200px;flex: 1;overflow: hidden;">
          <slot name="rectList" v-bind="{ selectByRect, curSelectIndex, curRectChange }"></slot>
        </div>
      </div>
      <div class="btn-div shadow-block">
        <slot name="submit">
          <div class="btn-div shadow-block flex-center">
            <KLButton :width="340" :height="60" :content="submitBtn || '确认'" @click="submit" />
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.image-annotatation {
  width: 100%;
  height: 100%;

  .left-aside {
    flex: 1;
    margin-right: 20px;

    .image-rects-div {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .image-rects-div>img {
      width: 100%;
      height: 100%;
    }

    .image-rects-div>.img-default {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 0;
    }

    .image-rects-div>.img-active {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }

    .image-rects-div>.mask {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.5;
      z-index: 2;
    }

    .image-rects-div>.source {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 1;
      z-index: 2;
    }

    .image-rects-div>.rect-div {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }

    .rect-div>div {
      border: 1px solid #f00;
      position: absolute;
      border-width: var(--border-width, 1px);
    }
  }

  .right-aside {
    height: 100%;
    width: 380px;
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
      }

      .rects-top {
        padding: 20px;
        width: 100%;
        // height: 110px;
        flex-direction: column;
      }

      .only-img-label {
        margin-right: 5px;
      }

      .select-image-file {
        // width: 100%;
        height: 30px;
        line-height: 30px;
        border: 1px solid #c4c4c4;
        margin-left: 10px;
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
        background: rgba(194, 199, 208, 0.3);
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
      min-height: 92px;

      >.kl-btn {
        font-weight: 600;
        font-size: 26px;
      }
    }
  }
}

.filter-button-NG,
.filter-button-OK {
  width: 100%;
  height: 60px;
  box-shadow: inset -2px -2px 0px #9c9c9c, inset -3px -3px 0px #a8a8a8,
    inset 2px 2px 0px #e9bcbc;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #d64949;
  font-weight: 600;
  font-size: 26px;
  color: #ffffff;
  cursor: pointer;
}

.filter-button-OK {
  background: #0ca62e;
}

.mb10 {
  margin-bottom: 10px;
}

.posInfo {
  position: absolute;
  z-index: 2;
  color: red;
  font-size: 20px;
}
</style>
