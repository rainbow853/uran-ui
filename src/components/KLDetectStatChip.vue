<script setup lang="ts">
import { computed } from "vue";
import { toThousandNum, formatPercent } from "../utils";
import KLDetectStat from './KLDetectStat.vue'
const type = '晶粒';
const unit = '颗';

const props = defineProps<{
  // 物料总片数
  totalCount: number;
  // 晶粒总颗数
  totalChipCount: number;
  // OK晶粒颗数
  okChipCount: number;
  // 清空回调
  clearCB: () => void;
}>();

const qualityChip = computed(() => formatPercent(props.okChipCount, props.totalChipCount, 4) + '%');
const totalChipText = computed(() => toThousandNum(props.totalChipCount / 1000) + 'K')
const okChipText = computed(() => toThousandNum(props.okChipCount / 1000) + 'K')
const ngChipText = computed(() => toThousandNum((props.totalChipCount - props.okChipCount) / 1000) + 'K')
const note = computed(() => props.totalCount + '片')
</script>

<template>
  <KLDetectStat :type="type" :unit="unit" :totalText="totalChipText" :okText="okChipText" :ngText="ngChipText"
    :qualityText="qualityChip" :note="note" :clearCB="clearCB" />
</template>
