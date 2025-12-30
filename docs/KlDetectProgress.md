<script setup>
import DetectProgress from '../src/views/DetectProgress.vue'
</script>

# KlDetectProgress
考拉检测进度组件

## 效果
<DetectProgress />
<<< ../src/views/DetectProgress.vue

## Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|detectStates |检测进度项列表 |`DetectState[]` |-|
```typescript
interface DetectState {
  // 事件名称
  name: string,
  // 事件状态 wait|ongoing|end|error
  state: string,
  // 事件进度 0-100
  progress: number,
  // 事件说明
  info: string,
}
```
