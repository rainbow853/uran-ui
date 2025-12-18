# @koala123/ui 组件说明

> 将固定成形的公共组件提取到 @koala123/ui 组件库中，并发布到 npm,解决代码冗余问题

# 1.下载公共组件

```Bash
npm install @koala123/ui --save
```

# 2.在 src/main.js 中引入

```js
import uranUI from "@koala123/ui";
import "uran-ui/lib/style.css";
Vue.use(uranUI);
```

# 3.包含的组件
 
KLLocationDiv 定位框
KLTransform 图片缩放组件
KLImageAnnotation 物料回溯外层组件
KLButton 按钮
KLDialog 弹窗
KLNavBar 导航按钮
KLPagination 

# 4.组件文档
>[https://kaolayouran.feishu.cn/docx/QZzxdBRJgo4xzVxCUmwcxuyPnnc](https://kaolayouran.feishu.cn/docx/QZzxdBRJgo4xzVxCUmwcxuyPnnc)

# 5 图标
> 注意：此项目未加载图标库，需要各项目自行加载   
> 
KLIcon依赖图标（Symbol）：https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=3938294