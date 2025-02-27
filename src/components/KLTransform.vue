<template>
  <div ref="currentDom" class="tranform-warp" @wheel="wheel" @mousedown="mousedown">

    <div class="inner tranform-div" :style="style">
      <slot name="inner" :scale="scale"></slot>
    </div>
    <slot name="outer" :scale="scale"></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeMount, nextTick } from 'vue';
interface Point {
  x: number;
  y: number;
}

const minScale = 0.05;
const maxScale = 100;
const scaleStep = 0.1;

const currentDom = ref();
const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const center = ref({ x: 0, y: 0 });
const _minScale = ref(minScale);
const _maxScale = ref(maxScale);
const isDown = ref(false);
const pos = ref({ x: 0, y: 0 });
const emit = defineEmits(['scaleChange']);
const props = defineProps<{
  width: number,
  height: number,
  backgroundCorlor?: string,
  disableMove?: boolean,
  disableSacle?: boolean,
  disableContextMove?: boolean,
}>()
const style = computed(() => {
  return {
    width: `${props.width}px`,
    height: `${props.height}px`,
    background: props.backgroundCorlor || 'none',
  }
})
/**
 * 滚动到矩形框；尽可能将矩形框放置在正中间
 */
function scrollToRect(position: [number, number, number, number]) {
  const { width: warpWidth, height: warpHeight } =
    currentDom.value.getBoundingClientRect()
  const [x, y, width, height] = position;

  transform(
    warpWidth / 2 - x - width / 2,
    warpHeight / 2 - y - height / 2,
    1
  )

  const scale = Math.min(
    warpWidth / (width + 100),
    warpHeight / (height + 100),
    _maxScale.value
  )
  transfromByPositionAndScale(
    { x: warpWidth / 2, y: warpHeight / 2 },
    scale
  )
}
/**
 * 按照指定中心，与比例进行缩放，返回新的点
 * @param {Object} p - 被缩放的点
 * @param {Object} center  - 缩放中心
 * @param {Object} ratio  - 缩放比例
 * @return {Object}
 */
function zoom(p:Point, center:Point, ratio: number) {
  return {
    x: (p.x - center.x) * ratio + center.x,
    y: (p.y - center.y) * ratio + center.y
  }
}
/**
 * 获取鼠标相对于currentDom.value的坐标
 * */
function getPosition(e: MouseEvent) {
  let rect = currentDom.value.getBoundingClientRect()
  return { x: e.pageX - rect.left, y: e.pageY - rect.top }
}
/**
 * 获取鼠标相对于this.$tranformDIV的坐标
 * */
function getImagePosition(e: MouseEvent) {
  const { left, right, top, bottom } = currentDom.value.firstChild.getBoundingClientRect()
  let x = e.pageX
  let y = e.pageY
  if (x < left || x > right || y < top || y > bottom) return
  return {
    x: parseInt(((x - left) / scale.value).toString()),
    y: parseInt(((y - top) / scale.value).toString())
  }
}
/**
 * 放大缩小
 * @param {boolean} zoomOut 
 * @param {coor} [position]
 */
function zoomByPosition(zoomOut: boolean, position: Point) {
  if (zoomOut && scale.value >= _maxScale.value) return // 放大
  if (!zoomOut && scale.value <= _minScale.value) return // 缩小

  let _scale = scale.value * (zoomOut ? 1 + scaleStep : 1 - scaleStep)
  _scale = Math.min(Math.max(_minScale.value, _scale), _maxScale.value)
  let ratio = _scale / scale.value;

  if (!position) {
    let rect = currentDom.value.getBoundingClientRect();
    position = { x: rect.width / 2, y: rect.height / 2 };
  }
  let _centre = zoom(center.value, position, ratio)
  transform(
    _centre.x - props.width / 2,
    _centre.y - props.height / 2,
    _scale
  )
}
/**
 * 鼠标滚动事件，缩放this.$tranformDIV
 * */
function wheel(e: WheelEvent) {
  if (props.disableSacle) return;
  e.preventDefault()
  zoomByPosition(e.deltaY < 0, getPosition(e));
}
/**
 * 鼠标按下事件，平移this.$tranformDIV
 * */
function mousedown(e: MouseEvent) {
  if (props.disableMove) return;
  if (props.disableContextMove && e.button === 2) return;
  isDown.value = true
  pos.value = getPosition(e)
  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseup)
}
/**
 * 鼠标按下移动事件，平移this.$tranformDIV
 * 鼠标未按下移动事件，获取当前鼠标位置对应图像的灰度值
 * */
function mousemove(e: MouseEvent) {
  if (!isDown.value) return;
  let curPos = getPosition(e)
  transform(
    translateX.value + curPos.x - pos.value.x,
    translateY.value + curPos.y - pos.value.y,
    scale.value
  )
  pos.value = curPos;
}
/**
 * 鼠标抬起事件，平移this.$tranformDIV
 * */
function mouseup() {
  isDown.value = false
  document.removeEventListener('mousemove', mousemove)
  document.removeEventListener('mouseup', mouseup)
}
/**
 * 根据窗口大小重新计算this.$tranformDIV刚好铺完currentDom.value的transform值
 * */
function resize() {
  const { width, height } = currentDom.value.getBoundingClientRect()
  let scale = 1
  if (width / height > props.width / props.height) {
    //按宽屏处理
    scale = height / props.height
  } else {
    scale = width / props.width
  }
  transform(
    (width - props.width) / 2,
    (height - props.height) / 2,
    scale
  )

  _maxScale.value = Math.max(maxScale, scale)
  _minScale.value = Math.min(minScale, scale)

}
/**
 * 键盘keyup事件,监听Escape键resize
 * */
function keyup(e: any) {
  if (!currentDom.value?.parentNode) return
  if (e.target.nodeName === 'INPUT') return
  if (e.key === 'Escape' || e.key === ' ') resize()
}
/**
 * 根据currentDom.value的相应坐标this.$tranformDIV缩放scale计算其相应的transfrom参数
 */
function transfromByPositionAndScale(position: Point, scale: number) {
  let posCenter = zoom(center.value, position, scale)
  transform(
    posCenter.x - props.width / 2,
    posCenter.y - props.height / 2,
    
    scale
  )
}
/**
 * 更新this.$tranformDIV的transform值 this.$tranformDIV.style.tranform = tranform(_dx, _dy) scale.value(_scale)
 * @param {number} _dx
 * @param {number} _dy
 * @param {number} _scale
 * */
function transform(_dx: number, _dy: number, _scale: number) {
  const scaleChanged = _scale !== scale.value;
  translateX.value = _dx
  translateY.value = _dy
  scale.value = _scale < minScale ? minScale : _scale

  center.value = {
    x: props.width / 2 + _dx,
    y: props.height / 2 + _dy
  }

  currentDom.value.firstChild.style.transform = `translate(${_dx}px, ${_dy}px) scale(${scale.value})`
  scaleChanged && emit('scaleChange', scale.value);
}
onMounted(() => {
  document.addEventListener('keyup', keyup)
  nextTick(() => {
    resize()
  })
})
onBeforeMount(() => {
  document.removeEventListener('keyup', keyup)
})

defineExpose({
  scrollToRect,
  getImagePosition,
  resize,
  transfromByPositionAndScale,
  transform,
  zoomByPosition,
  getPosition
});
</script>

<style scoped>
.tranform-warp {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #d3d3d3;
  position: relative;
}

.tranform-warp .inner {
  position: relative;
  transform-origin: center center 0;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  padding: 10px;
}
</style>
