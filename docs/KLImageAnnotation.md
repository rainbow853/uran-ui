<script setup>
import ImageAnnotation from '../src/views/ImageAnnotation.vue'
</script>

# KLImageAnnotation
考拉图像标注组件

## 效果
<ImageAnnotation />
<<< ../src/views/ImageAnnotation.vue#snippet

## 类型定义
<<< ../src/components/KLImageAnnotation.ts#basic

## 属性
<<< ../src/components/KLImageAnnotation.ts#ImageAnnotationProps

## slot
|插槽名|说明|数据|
|---|---|---|
|image |图像区域 |`{scale: number}`|
|canvas |画布区域 |-|
|text-detail |文字解说区域 |-|
|image-detail |图像地址详细说明区域 |-|
|rects-detail |标注矩形框列表详情区域 |`RectsListProps`|
|submit |确认按钮区域 |-|
```typescript
// 标注矩形框列表详情区域传递参数
type RectsListProps = {
  // 查看方法selectByRect
  selectByRect: (param: RectChangeEvent) => void,
  // 查看方法selectByIndex
  selectByIndex: (index: number, from: string, silent?: boolean) => void,
  // 当前被选中的标注项对应索引
  curSelectIndex: number,
  // 当前被选中的标注项及其触发源
  curRectChange: RectChangeEvent,
}
```

## 方法
#### getPosition 获取鼠标相对图像的坐标
``` typescript
getPosition(e: MouseEvent): coor | null
```

#### scrollToRect 图像视野移动到指定区域
``` typescript
// position [x,y,width,height]
scrollToRect(position: number[]): void
```

#### selectByRect 选择指定标注
``` typescript
selectByRect(param: RectChangeEvent): void
```

#### selectByRect 选择指定标注
``` typescript
selectByIndex(index: number, from: string, silent?: boolean): void
```

#### reset 重置画布区域
``` typescript
reset(): void
```
