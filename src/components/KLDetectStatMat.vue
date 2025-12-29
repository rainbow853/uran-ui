<script setup lang="ts">
import { computed } from "vue";
import { toThousandNum, formatPercent } from "../utils";
import KLDetectStat from './KLDetectStat.vue'
const type = '物料';
const unit = '片';

const props = defineProps<{
  // 物料总片数
  totalCount: number;
  //物料OK数
  okCount: number;
  // 每片物料耗时/s
  time: number;
  // 清空回调
  clearCB: () => void;
}>();

const qualityChip = computed(() => formatPercent(props.okCount, props.totalCount, 4) + '%');
const totalText = computed(() => toThousandNum(props.totalCount))
const okText = computed(() => toThousandNum(props.okCount))
const ngText = computed(() => toThousandNum((props.totalCount - props.okCount)))
const note = computed(() => props.time + 's/片')
</script>

<template>
  <KLDetectStat :type="type" :unit="unit" :totalText="totalText" :okText="okText" :ngText="ngText"
    :qualityText="qualityChip" :note="note" :clearCB="clearCB" />
</template>