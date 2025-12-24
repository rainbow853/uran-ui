<script setup>
import ROI from '../src/views/ROI.vue'
</script>

# KLROI
考拉矩形定位框组件
::: danger
KLLocationDiv与KLLocationPoint已废弃，请使用KLROI替代
KLLocationPoint将KLROI的disableResize属性置为true即可
:::

## 效果
<ROI />
<<< ../src/views/ROI.vue

## Attributes
|属性|说明|类型|默认值|
|---|---|---|:---:|
|roi |矩阵框位置 |`roi` |-|
|disableKeyboardEvent |禁用键盘事件（默认组件聚焦后键盘的上下左右可以微调位置） |`boolean` |-|
|disableResize |是否禁止调整大小 |`boolean` |-|

```typescript
interface roi {
  x: number;
  y: number;
  width: number;
  height: number;
}
```

### 样式调整
```css
/** 调整线宽 */
--kl-stroke-size: 2px;
/** 调整线色 */
--kl-stroke-color: #f00;
/** 调整聚焦后的线色 */
--kl-hl-stroke-color: #ffa500;
```
