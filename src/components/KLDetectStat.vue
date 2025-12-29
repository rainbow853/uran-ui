<script setup lang="ts">
import SRC_OK from '../assets/img/OK.png';
import SRC_NG from '../assets/img/NG.png';
import SRC_TOTAL from '../assets/img/total.png';

defineProps<{
  // 类型
  type: string;
  // 单位
  unit: string;
  // 总
  totalText: string;
  // OK
  okText: string;
  // NG
  ngText: string;
  // 良率
  qualityText: string;
  // 补充
  note: string;
  // 清空回调
  clearCB: () => void;
}>();
</script>

<template>
  <div class="shadow-block flex-between p20 relative">
    <div class="flex-between wh-full">
      <div class="card-box split-line split-right">
        <img class="icon" :src="SRC_TOTAL" />
        <div class="count chip">{{ totalText }}</div>
        <div class="summary">总计检测数量/{{ unit }}</div>
        <div class="extend">{{ note }}</div>
      </div>
      <div class="card-box split-line split-right">
        <img class="icon" :src="SRC_OK" />
        <div class="count chip">{{ okText }}</div>
        <div class="summary">总计OK数量/{{ unit }}</div>
        <div class="extend" style="color: #0ca62e">良率{{ qualityText }}</div>
      </div>
      <div class="card-box">
        <img class="icon" :src="SRC_NG" />
        <div class="count chip">{{ ngText }}</div>
        <div class="summary">总计NG数量/{{ unit }}</div>
        <div class="extend" style="color: #9fa8bb">{{ type }} /{{ unit }}</div>
      </div>
    </div>
    <KLButton class="clean-box" :width=70 :height=30 content="清零" @click="clearCB" />
  </div>
</template>

<style scoped lang="scss">
.card-box {
  position: relative;
  flex: 1;
  height: 100%;
  padding: 14px 0 20px 170px;
  box-sizing: border-box;

  .icon {
    position: absolute;
    width: 96px;
    height: 96px;
    left: 40px;
    top: 20px;
    box-sizing: border-box;
    border-radius: 50%;
  }

  .count {
    font-style: normal;
    font-weight: 700;
    font-size: 42px;
    color: #3a4e63;
  }

  .count.chip {
    font-size: 30px;
    margin: 4px 0 4px;
  }

  .summary {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 44px;
    letter-spacing: 0.1em;
    color: #9fa8bb;
  }

  .extend {
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #477ae0;
    white-space: nowrap;
  }

  .ng-count {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    letter-spacing: 0.1em;
    color: #666;

    >span {
      color: var(--kl-error-color);
      margin: 0 10px;
    }
  }
}

.clean-box {
  position: absolute;
  top: 20px;
  left: 1200px;
}

.shadow-block .clean-box {
  display: none;
}

.shadow-block:hover .clean-box {
  display: inline-flex;
}
</style>
