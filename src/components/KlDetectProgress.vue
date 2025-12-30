<script setup lang="ts">
const STATE_SUMMARY: { [key: string]: string } = {
  wait: '等待',
  ongoing: '进行中',
  end: '已完成',
  error: '出错'
}

export interface DetectState {
  // 事件名称
  name: string,
  // 事件状态 wait|ongoing|end|error
  state: string,
  // 事件进度 0-100
  progress: number,
  // 事件说明
  info: string,
}

defineProps<{
  detectStates: DetectState[];
}>()
</script>

<template>
  <el-table :data="detectStates" border>
    <el-table-column prop="name" label="工序" align="center" width="100" />
    <el-table-column prop="detail" label="工序状态" align="center">
      <template #default="scope">
        <div class="flex-center" :class="scope.row.state" :style="{ '--progress': scope.row.progress + '%' }">
          <KLIcon :name="scope.row.state" />
          <span class="ml10 ellipsis nowrap">{{ STATE_SUMMARY[scope.row.state] }} {{ scope.row.info }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.error {
  color: var(--kl-error-color);
}

.ongoing {
  position: relative;
}

.ongoing::before {
  content: "";
  position: absolute;
  inset: 0 -12px;
  z-index: -1;
  background: linear-gradient(to right, #e78d0800, #e78d08 var(--progress), rgba(0, 0, 0, 0) var(--progress));
}
</style>