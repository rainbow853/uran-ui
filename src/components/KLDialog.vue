<template>
  <div class="dialog flex-center" :class="{ move: canMove }">
    <div class="dialog-box flex-col" :class="{ full }" :style="boxStyle">
      <slot name="header">
        <div class="dialog-header flex-between" @mousedown="mousedown" :style="{ height: headHeight + 'px' }">
          <KLIcon v-if="titleIcon" :name="titleIcon" />
          <span class="flex-ellipsis">
            <slot name="header-text">{{ title }}</slot>
          </span>
          <el-icon class="mr10 cursor" :style="{color:'#fff'}"  @click="dialogClose" >
            <CloseBold />
          </el-icon>
        </div>
      </slot>
      <div class="dialog-main">
        <slot name="main">
          默认弹窗
        </slot>
      </div>
      <slot name="footer" v-if="footer" :close="dialogClose">
        <div class="dialog-footer flex-center">
          <KLButton :width="80" :height="30" content="确定" @click="dialogSure" />
          <KLButton :width="80" :height="30" content="取消" @click="dialogCancel" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    canMove: {
      type: Boolean,
      default: false,
    },
    close: {
      type: Function
    },
    sure: {
      type: Function
    },
    cancel: {
      type: Function
    },
    headHeight: {
      type: [Number, String],
      default: 50
    },
    width: {
      type: [Number, String],
    },
    height: {
      type: [Number, String],
    },
    full: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '恢复出厂设置'
    },
    titleIcon: {
      type: String,
    },
    footer: {
      default: true
    },
  },
  data() {
    return {
      left: null,
      top: null,
    }
  },
  computed: {
    boxStyle() {
      return {
        left: this.left === null ? '' : (this.left + 'px'),
        top: this.top === null ? '' : (this.top + 'px'),
        width: (typeof this.width === 'string') ? this.width : (this.width + 'px'),
        height: (typeof this.height === 'string') ? this.height : (this.height + 'px')
      }
    },
  },
  methods: {
    dialogClose() {
      if (!this.close) return this.$remove();
      const preventClose = this.close(this);
      preventClose || this.$remove();
    },
    dialogSure(value) {
      if (!this.sure) return this.$remove();
      const preventClose = this.sure(this);
      preventClose || this.$remove();
    },
    dialogCancel() {
      if (!this.cancel) return this.$remove();
      const preventClose = this.cancel(this);
      preventClose || this.$remove();
    },
    mousedown(e) {
      this.downBoundingClientRect = this.$el.firstChild.getBoundingClientRect();
      this.downBoundingClientRect.downX = e.pageX;
      this.downBoundingClientRect.downY = e.pageY;
      document.addEventListener('mousemove', this.mousemove);
      document.addEventListener('mouseup', this.mouseup);
    },
    mousemove(e) {
      const { downX, downY, left, top } = this.downBoundingClientRect;
      const { pageX, pageY } = e;
      this.left = pageX - downX + left;
      this.top = pageY - downY + top;
    },
    mouseup() {
      document.removeEventListener('mousemove', this.mousemove);
      document.removeEventListener('mouseup', this.mouseup);
    },
  },
  mounted() {
    this.mousemove = this.mousemove.bind(this);
    this.mouseup = this.mouseup.bind(this);
  },
}
</script>

<style scoped>
.dialog {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 10;
}

.dialog.move {
  background: none;
  pointer-events: none;
}

.dialog.move .dialog-box {
  position: absolute;
}

.dialog-box {
  pointer-events: all;
  background: #ebf2f8;
  box-shadow: 0px 4px 14px rgba(92, 92, 92, 0.4), inset -2px -2px 0px #ffffff,
    inset 1px 1px 0px #ffffff;
}

.dialog-box.full {
  width: calc(100% - 60px);
  height: calc(100% - 60px);
}

.dialog-main {
  width: 100%;
  height: 100px;
  flex: 1;
}

.full .dialog-main {
  padding: 20px;
}

.dialog-header {
  height: 50px;
  width: 100%;
  padding: 0 10px 0 20px;
  background: #132f66;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 16px;
}

.dialog.move .dialog-header {
  cursor: move;
}

.dialog-header>img {
  margin-right: 6px;
  height: 16px;
}

.dialog-footer {
  height: 70px;
  width: 100%;
}

.dialog-footer>div {
  margin: 0 10px;
}
</style>
