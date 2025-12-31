<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useLoading } from '../composables/useLoading';
const emit = defineEmits(['update:recipeId']);

const props = defineProps<{
  recipeId: number;
  recipes: { id: number, name: string }[];
  started: boolean;
  preStartCB?: () => Promise<void>;
  startCB: () => Promise<void>;
  stopCB: () => Promise<void>;
}>();

const _recipeId = ref(1);
watchEffect(() => _recipeId.value = props.recipeId)

function change() {
  emit('update:recipeId');
}

const { loading, loadingText, setLoading } = useLoading();
async function start() {
  if (!props.recipeId || loading.value) return;
  if (props.started) return stop();
  try {
    if (props.preStartCB) await props.preStartCB();
  } catch {
    return;
  }

  try {
    setLoading(true, '开始检测中......');
    await props.startCB();
  } catch (e) {
    ElMessage.error('开始检测失败：' + e);
  }
  setLoading(false);
}

async function stop() {
  if (loading.value) return;
  if (!props.started) return;

  await ElMessageBox.confirm('正在检测中，是否停止检测？', '停止检测', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })

  try {
    setLoading(true, '停止检测中......');
    await props.stopCB();
  } catch (e) {
    ElMessage.error('停止检测失败：' + e);
  }
  setLoading(false);

}
</script>

<template>
  <div class="operation-card shadow-block" v-loading.fullscreen.lock="loading" :element-loading-text="loadingText">
    <div class="flex-center">
      <span class="state-title flex-center">当前状态</span>
      <span class="state-summary flex-center">
        <KLIcon name="light" class="icon"></KLIcon>正常
      </span>
    </div>
    <el-select class="select-recipe" v-model="_recipeId" filterable :disabled="started" placeholder="请选择"
      @change="change">
      <template #prefix>
        <span style="font-size:16px">配方</span>
      </template>
      <el-option v-for="recipe in recipes" :key="recipe.id" :label="recipe.name" :value="recipe.id">
      </el-option>
    </el-select>
    <div class="start-btn flex-center cursor" @click="start">
      <KLIcon :name="started ? 'stop' : 'start'" size="20px" class="icon" />{{ started ? '暂停' : '开始' }}
    </div>
    <div class="stop-btn flex-center cursor" @click="stop">
      <KLIcon name="alarm" size="20px" class="icon" />急停
    </div>
  </div>
</template>

<style scoped lang="scss">
.operation-card {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 20px;
  display: grid;
  grid-template: 62px 70px / 1fr 1fr;
  grid-gap: 24px 20px;
}

.operation-card>* {
  width: 100%;
  height: 100%;
  color: #333;
  font-weight: 600;
  font-size: 18px;
}

.state-title,
.state-summary {
  width: 100px;
  height: 100%;
  flex: 1;
}

.state-title {
  background: #F5FBFF;
  border: 1px solid #dddddd;
}

.state-summary {
  background: #00b23d;
  color: white;
}

.icon {
  margin-right: 8px;
}

:deep(.select-recipe .el-select__wrapper) {
  line-height: 54px;
}

.start-btn,
.stop-btn {
  width: 100%;
  height: 100%;
  color: white;
  font-weight: 600;
  font-size: 20px;
}

.start-btn {
  background: #477ae0;
  box-shadow: 2px 2px 0px 0px #D3E0FF inset, -3px -3px 0px 0px #A8A8A8 inset, -2px -2px 0px 0px #9C9C9C inset;

  &:hover {
    background: #3368d2;
    box-shadow: inset -2px -2px 0px #9c9c9c, inset -4px -4px 0px #ffffff,
      inset 2px 2px 0px #ffffff;
  }
}

.stop-btn {
  background: #d64949;
  box-shadow: 2px 2px 0px 0px #FFD9D9 inset, -3px -3px 0px 0px #A8A8A8 inset, -2px -2px 0px 0px #9C9C9C inset;

  &:hover {
    background: #c43232;
    box-shadow: inset -2px -2px 0px #9c9c9c, inset -4px -4px 0px #ffffff,
      inset 2px 2px 0px #ffffff;
  }
}
</style>
