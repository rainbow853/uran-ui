// #region snippet
<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useDrawRect } from '../composables/drawRect';
import type { annotation } from '../components/KLImageAnnotation.ts'

const imgSrc = 'img/test.png';
const imgMaskSrc = '';
const width = 5120;
const height = 5120;
const annotations = ref<annotation[]>([
  { title: '类型', content: '图像标注' },
  { title: '时间', content: new Date().toLocaleString() },
])
const rects = ref([
  { id: 1, name: '窗前明月光', position: [400, 3000, 300, 300] },
  { id: 2, name: '疑是地上霜', position: [500, 2800, 420, 320] },
  { id: 3, name: '举头望明月', position: [500, 3000, 380, 500] },
  { id: 4, name: '低头思故乡', position: [1200, 3000, 520, 500] },
])

const imageAnnotation = ref();
const { mousedown, rectPath } = useDrawRect({
  getPositionFn(e: MouseEvent) {
    return imageAnnotation.value.getPosition(e);
  },
  rectCallback: () => true,
  button: 2,
  enable: true,
})

function contextmenu(e: MouseEvent) {
  e.preventDefault();
  ElMessage.success('右键');
}

function submitEvent() {
  
}
</script>
<template>
  <div class="shadow-block p20" style="height: 600px">
    <KLImageAnnotation ref="imageAnnotation" :imgSrc="imgSrc" :imgMaskSrc="imgMaskSrc" :width="width" :height="height"
      :annotations="annotations" :rects="rects" :mousedownImageEvent="mousedown" :contextmenuImageEvent="contextmenu" :submitEvent="submitEvent">
      <template #image>
        <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
          <g stroke="#ff0000" stroke-opacity="1" :stroke-width="4" fill="none">
            <path :d="rectPath" />
          </g>
        </svg>
      </template>
      <template #rects-detail="{ curSelectIndex, selectByIndex }">
        <div class="list-table">
          <div class="list-row list-header flex-center">
            <div class="row-id">编号</div>
            <div class="row-name">详情</div>
          </div>
          <el-scrollbar height="calc(100% - 34px)">
            <div class="list-row flex-center" :class="{ current: curSelectIndex === index }"
              v-for="(rect, index) in rects" @click="selectByIndex(index)" :key="index">
              <div class="row-id">{{ index + 1 }}</div>
              <div class="row-name">{{ rect.name }}</div>
            </div>
          </el-scrollbar>
        </div>
      </template>
    </KLImageAnnotation>
  </div>
</template>
// #endregion snippet
<style scoped>
svg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.list-table {
  width: calc(100% - 40px);
  height: calc(100% - 30px);
  margin: 10px 0 0 20px;
  border: 1px solid #ccc;
}

.row {
  height: 30px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}

.row.current {
  height: 30px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}

.row-id {
  width: 100px;
}

.row-name {
  min-width: 100px;
  flex: 1;
}
</style>
