<template>
  <div @mousedown="selectMouseDown" class="locations-wrapper">
    <div v-for="(locationCoor, index) in locationCoors" :key="index" :data-index="index + 1"
      class="flex-center location-wrapper" :class="{ highlight: selectLocationCoor === locationCoor }" :style="{
    width: locationCoor.width + 'px',
    height: locationCoor.height + 'px',
    left: locationCoor.x + 'px',
    top: locationCoor.y + 'px',
  }"> </div>
  </div>
</template>

<script>
const minSize = 10; //当前块的最小高度与宽度

export default {
  props: {
    scale: {
      type: Number,
    },
    // 定位坐标数组
    locationCoors: {
      type: Array,
    },
    // 当前选中的定位核
    selectLocationCoor: {
      type: Object,
    },
    disableKeyboardEvent: {
      type: Boolean,
    },
  },
  data() {
    return {
      // 鼠标按下的目标div的className
      target: "",
      // 鼠标按下时的位置信息
      mouseDownInfo: null,
      // 鼠标是否按下
      isDown: false,
    };
  },
  methods: {
    // 四个框的移动处理
    selectFrameMove(event) {
      if (!this.isDown) return;

      const { downX, downY, x, y, width, height } = this.mouseDownInfo;
      const { pageX, pageY } = event;
      const dx = parseInt((pageX - downX) / this.scale);
      const dy = parseInt((pageY - downY) / this.scale);
      const { clientWidth, clientHeight } = this.$el.parentNode;

      const target = this.target;
      if (target.indexOf('resize') === -1) {
        // 整体移动当前块
        this.selectLocationCoor.y = Math.max(
          0,
          Math.min(y + dy, clientHeight - height)
        );
        this.selectLocationCoor.x = Math.max(
          0,
          Math.min(x + dx, clientWidth - width)
        );
        return;
      }

      // 向上拖拽更改高度
      if (['n-resize', 'ne-resize', 'nw-resize'].indexOf(target) !== -1) {
        let _height = Math.max(minSize, Math.min(height - dy, height + y));
        this.selectLocationCoor.y = y + height - _height;
        this.selectLocationCoor.height = _height;
      }

      // 向右拖拽更改宽度
      if (['e-resize', 'ne-resize', 'se-resize'].indexOf(target) !== -1) {
        let _width = Math.max(minSize, Math.min(width + dx, clientWidth - x));
        this.selectLocationCoor.width = _width;
      }

      // 向下拖拽更改高度
      if (['s-resize', 'sw-resize', 'se-resize'].indexOf(target) !== -1) {
        let _height = Math.max(minSize, Math.min(height + dy, clientHeight - y));
        this.selectLocationCoor.height = _height;
      }

      // 向左拖拽更改高度
      if (['w-resize', 'sw-resize', 'nw-resize'].indexOf(target) !== -1) {
        let _width = Math.max(minSize, Math.min(width - dx, width + x));
        this.selectLocationCoor.x = x + width - _width;
        this.selectLocationCoor.width = _width;
      }

    },
    // 选择框鼠标按下
    selectMouseDown(event) {
      let index = event.target.dataset.index || event.target.parentNode.parentNode.dataset.index;
      if (!index) return;

      event.stopPropagation();
      index = parseInt(index) - 1;
      this.isDown = true;
      this.$emit('update:selectLocationCoor', this.locationCoors[index]);
      // this.selectLocationCoor = this.locationCoors[index];
      this.mouseDownInfo = Object.assign({ downX: event.pageX, downY: event.pageY }, this.locationCoors[index]);
      this.target = event.target.className;
      if (event.target.parentNode !== this.$el) return;
      event.target.appendChild(this.$resizeDOM);
    },
    // 鼠标抬起处理
    bodyMouseUp(event) {
      this.selectFrameMove(event);
      this.isDown = false;
    },
    /**
     * 键盘keydown事件
     * */
    keydown(e) {
      if (this.disableKeyboardEvent) return
      const key = e.key;
      switch (key) {
        case 'ArrowUp':
          this.selectLocationCoor.y > 0 && this.selectLocationCoor.y--;
          break;
        case 'ArrowRight':
          this.selectLocationCoor.x++;
          break;
        case 'ArrowDown':
          this.selectLocationCoor.y++;
          break;
        case 'ArrowLeft':
          this.selectLocationCoor.x > 0 && this.selectLocationCoor.x--;
          break;
        default:
          break;
      }
    },
    // 创建拖拽组件
    createReziseDOM(className) {
      const $resizeDOM = document.createElement("div");
      $resizeDOM.className = className;
      const array = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw'];
      $resizeDOM.innerHTML = array.map(e => `<div class="${e}-resize"></div>`).join('');
      return $resizeDOM;
    },
  },
  mounted() {
    this.bodyMouseUp = this.bodyMouseUp.bind(this);
    this.selectFrameMove = this.selectFrameMove.bind(this);
    this.keydown = this.keydown.bind(this);
    document.addEventListener("mouseup", this.bodyMouseUp);
    document.addEventListener("mousemove", this.selectFrameMove);
    document.addEventListener('keydown', this.keydown);
    this.$resizeDOM = this.createReziseDOM("resize-wrapper");
  },
  beforeUnmount() {
    document.removeEventListener("mouseup", this.bodyMouseUp);
    document.removeEventListener("mousemove", this.selectFrameMove);
    document.removeEventListener('keydown', this.keydown);
  },
};
</script>

<style scoped lang="scss">
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
  cursor: move;
  pointer-events: all;
  width: 100px;
  height: 100px;
  background-color: rgba(255, 0, 0, 0.5);
  border-radius: 100%;
  overflow: hidden;
}

.location-wrapper::after {
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  height: 1px;
  top: 50%;
  background-color: rgba(0, 0, 0, 0.5);
}

.location-wrapper::before {
  position: absolute;
  content: '';
  top: 0;
  bottom: 0;
  width: 1px;
  left: 50%;
  background-color: rgba(0, 0, 0, 0.5);
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
