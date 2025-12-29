<script setup>
import DetectStat from '../src/views/DetectStat.vue'
</script>

# KLDetectStat
考拉检测统计组件

## 效果
<DetectStat />
<<< ../src/views/DetectStat.vue

## KLDetectStatMat
考拉物料检测统计组件

### Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|totalCount |物料总片数 |`number` |-|
|okCount |物料OK数 |`number` |-|
|time |每片物料耗时/s |`number` |-|
|clearCB |清空回调 |`() => void` |-|


## KLDetectStatChip
考拉晶粒检测统计组件

### Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|totalCount |物料总片数 |`number` |-|
|totalChipCount |晶粒总颗数 |`number` |-|
|okChipCount |OK晶粒颗数 |`number` |-|
|clearCB |清空回调 |`() => void` |-|
