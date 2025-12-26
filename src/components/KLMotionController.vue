<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { sleep } from '../utils';
import { useLoading } from '../composables/useLoading';

// #region snippet
interface Axis {
  // 轴号
  id: number;
  // 轴名称
  name: number;
  // 轴位置
  position: number;
  // 轴运动最小速度
  minSpeed: number;
  // 轴运动最大速度
  maxSpeed: number;
  // 轴运动速度
  destSpeed: number;
  // 轴目标位置
  destPos: number;
  // 是否为绝对运动
  isAbsolute: boolean;
}

interface Props {
  // 轴列表
  axes: Axis[];
  // 刷新轴坐标
  freshPositions: () => Promise<void>;
  // 步进
  jogStart: (id: number, reverse: number) => Promise<void>;
  // 停止步进
  jogStop: (id: number) => Promise<void>;
  // 移动
  move: (id: number) => Promise<void>;
}
// #endregion snippet

const props = defineProps<Props>();
const { loading, loadingText, setLoading } = useLoading();
function executeFreshPositions(keep: boolean) {
  return async function execute(time?: number) {
    await sleep(time || 200);
    props.freshPositions().finally(() => keep && execute(time));
  }
}

// 运动
async function start(axis: Axis, reverse: number) {
  props.jogStart(axis.id, reverse)
    .then(() => executeFreshPositions(true)())
    .catch(e => ElMessage.error('运动失败：' + e));
}

// 暂停
async function stop(axis: Axis) {
  await props.jogStop(axis.id).catch(e => {
    ElMessage.error('暂停失败：' + e);
    // 暂停失败就再暂停一次
    props.jogStop(axis.id);
  });
  executeFreshPositions(false)();
}

//运动
async function move(axis: Axis) {
  setLoading(true, '正在移动轴...');
  try {
    await props.move(axis.id);
  } catch (error) {
    ElMessage.error('移动失败：' + error);
  }
  setLoading(false);
  executeFreshPositions(false)();
}
</script>
<template>
  <div class="table-h" v-loading="loading" :element-loading-text="loadingText">
    <el-table ref="tableData" class="nowrap" :data="axes">
      <el-table-column prop="index" label="轴" align="center" width="60">
        <template #default="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center" width="80">
        <template #default="scope" class="">
          <div class="disabled border row-input">{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="position" label="当前位置" align="center" width="120">
        <template #default="scope">
          <div class="disabled border row-input">{{ scope.row.position.toFixed(3) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="destSpeed" label="速度" align="center" width="200">
        <template #default="scope">
          <div class="flex-between">
            <el-button size="small" @mousedown="start(scope.row, 0)" @mouseup="stop(scope.row)">反</el-button>
            <el-input-number class="border mlr20" v-model="scope.row.destSpeed" :controls="false"
              :min="scope.row.minSpeed" :max="scope.row.maxSpeed" />
            <el-button size="small" @mousedown="start(scope.row, 1)" @mouseup="stop(scope.row)">正</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="destPos" label="目标位置" align="center" width="200">
        <template #default="scope">
          <el-input-number v-model="scope.row.destPos" class="border" :controls="false" />
        </template>
      </el-table-column>
      <el-table-column prop="isAbsolute" label="" align="center" width="160">
        <template #default="scope">
          <div class="input-box flex-between">
            <el-checkbox v-model="scope.row.isAbsolute">绝对</el-checkbox>
            <el-button plain @click="move(scope.row)">运动</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style scoped lang="scss">
:deep(.row-input) {
  height: 32px;
  line-height: 32px;
  padding: 0 4px;
  border-radius: 1px;
}
</style>