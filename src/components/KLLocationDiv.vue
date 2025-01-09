<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue';
const minSize = 10; //当前块的最小高度与宽度
const isMoveMode = ref(false)
const target = ref('')
const isDown = ref(false)
const mouseDownInfo = ref()
const resizeDOM = ref()
const parentNode = ref()
const emit = defineEmits(['update:selectLocationCoor'])
const currentDom = ref()
const props = defineProps<{
  scale: number,
  // 定位坐标数组
  locationCoors: any[],
  // 当前选中的定位核
  selectLocationCoor: any,
  disableKeyboardEvent?: boolean,
  bgColor?: string
}>();
function selectFrameMove(event: MouseEvent) {
  if (!isDown.value) return;

  const { downX, downY, x, y, width, height } = mouseDownInfo.value;
  const { pageX, pageY } = event;
  const dx = parseInt(String((pageX - downX) / props.scale));
  const dy = parseInt(String((pageY - downY) / props.scale));
  const { clientWidth, clientHeight } = parentNode.value;

  if (target.value.indexOf('resize') === -1) {
    // 整体移动当前块
    props.selectLocationCoor.y = Math.max(
      0,
      Math.min(y + dy, clientHeight - height)
    );
    props.selectLocationCoor.x = Math.max(
      0,
      Math.min(x + dx, clientWidth - width)
    );
    return;
  }

  // const indy = height / 2 - minSize;
  // const outdy = Math.min(clientHeight - y - height, y);
  // const indx = width / 2 - minSize;
  // const outdx = Math.min(clientWidth - x - width, x);
  // 向上拖拽更改高度
  if (['n-resize', 'ne-resize', 'nw-resize'].indexOf(target.value) !== -1) {
    let _height = Math.max(minSize, Math.min(height - dy, height + y));
    props.selectLocationCoor.y = y + height - _height;
    props.selectLocationCoor.height = _height;
    // console.log(_height)
  }

  // 向右拖拽更改宽度
  if (['e-resize', 'ne-resize', 'se-resize'].indexOf(target.value) !== -1) {
    let _width = Math.max(minSize, Math.min(width + dx, clientWidth - x));
    props.selectLocationCoor.width = _width;
  }

  // 向下拖拽更改高度
  if (['s-resize', 'sw-resize', 'se-resize'].indexOf(target.value) !== -1) {
    let _height = Math.max(minSize, Math.min(height + dy, clientHeight - y));
    props.selectLocationCoor.height = _height;
  }

  // 向左拖拽更改高度
  if (['w-resize', 'sw-resize', 'nw-resize'].indexOf(target.value) !== -1) {
    let _width = Math.max(minSize, Math.min(width - dx, width + x));
    props.selectLocationCoor.x = x + width - _width;
    props.selectLocationCoor.width = _width;
  }

}
function selectMouseDown(event: MouseEvent) {
  const targetNode = event.target as HTMLElement;
  const targetP = targetNode.parentNode?.parentNode as HTMLElement;
  let index: number = Number(targetNode.dataset.index || targetP?.dataset.index);
  if (!index) return;

  event.stopPropagation();
  index = index - 1;
  isDown.value = true;
  emit('update:selectLocationCoor', props.locationCoors[index]);
  mouseDownInfo.value = Object.assign({ downX: event.pageX, downY: event.pageY }, props.locationCoors[index]);
  target.value = targetNode.className;
  if (targetNode.parentNode !== parentNode.value) return;
  targetNode.appendChild(resizeDOM.value);
}
// 鼠标抬起处理
function bodyMouseUp(event: MouseEvent) {
  selectFrameMove(event);
  isDown.value = false;
}
/**
    * 键盘keydown事件
    * */
function keydown(e: KeyboardEvent) {
  if (props.disableKeyboardEvent) return
  const key = e.key;
  switch (key) {
    case 'ArrowUp':
      props.selectLocationCoor.y > 0 && props.selectLocationCoor.y--;
      break;
    case 'ArrowRight':
      props.selectLocationCoor.x++;
      break;
    case 'ArrowDown':
      props.selectLocationCoor.y++;
      break;
    case 'ArrowLeft':
      props.selectLocationCoor.x > 0 && props.selectLocationCoor.x--;
      break;
    default:
      break;
  }
}
// 创建拖拽组件
function createReziseDOM(className: string) {
  const $resizeDOM = document.createElement("div");
  $resizeDOM.className = className;
  const array = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
  $resizeDOM.innerHTML = array.map(e => `<div class="${e}-resize"></div>`).join('');
  return $resizeDOM;
}
onMounted(() => {
  if (currentDom.value) {
    parentNode.value = currentDom.value;
  }
  document.addEventListener("mouseup", bodyMouseUp);
  document.addEventListener("mousemove", selectFrameMove);
  document.addEventListener('keydown', keydown);
  resizeDOM.value = createReziseDOM("resize-wrapper");
})
onUnmounted(() => {
  document.removeEventListener("mouseup", bodyMouseUp);
  document.removeEventListener("mousemove", selectFrameMove);
  document.removeEventListener('keydown', keydown);
}) 
</script>
<template>
  <div ref="currentDom" @contextmenu="isMoveMode = !isMoveMode" @mousedown="selectMouseDown" class="locations-wrapper"
    :class="{ move: isMoveMode }" :style="{ '--border-width': Math.ceil(2 / scale) + 'px' }">
    <div v-for="(locationCoor, index) in   locationCoors  " :key="index" :data-index="index + 1"
      class="flex-center location-wrapper" :class="{ highlight: selectLocationCoor === locationCoor }" :style="{
      'width': locationCoor.width + 'px',
      'height': locationCoor.height + 'px',
      'left': locationCoor.x + 'px',
      'top': locationCoor.y + 'px',
      '--bgColor': bgColor || '#f00'
    }">{{ locationCoor.name }}<slot></slot>
    </div>
  </div>
</template>
<style scoped>
.locations-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.location-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  border: var(--border-width, 1px) solid var(--bgColor);
  color: var(--bgColor);
  white-space: nowrap;
  cursor: move;
  --size: calc(var(--border-width) * 4);
  pointer-events: all;
}

.location-wrapper.highlight {
  border-color: orange;
  color: orange;
  z-index: 1;
}

.location-wrapper>.resize-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.location-wrapper :deep(.n-resize),
.location-wrapper :deep(.ne-resize),
.location-wrapper :deep(.e-resize),
.location-wrapper :deep(.se-resize),
.location-wrapper :deep(.s-resize),
.location-wrapper :deep(.sw-resize),
.location-wrapper :deep(.w-resize),
.location-wrapper :deep(.nw-resize) {
  position: absolute;
  width: var(--size);
  height: var(--size);
  transform: translate(-50%, -50%);
  background: orange;
}

.location-wrapper :deep(.n-resize) {
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
  cursor: s-resize;
}

.location-wrapper :deep(.ne-resize) {
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  cursor: ne-resize;
}

.location-wrapper :deep(.e-resize) {
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  cursor: e-resize;
}

.location-wrapper :deep(.se-resize) {
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
  cursor: se-resize;
}

.location-wrapper :deep(.s-resize) {
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  cursor: s-resize;
}

.location-wrapper :deep(.sw-resize) {
  left: 0;
  bottom: 0;
  transform: translate(-50%, 50%);
  cursor: sw-resize;
}

.location-wrapper :deep(.w-resize) {
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  cursor: e-resize;
}

.location-wrapper :deep(.nw-resize) {
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
  cursor: nw-resize;
}
</style>
