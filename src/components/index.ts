import { createApp } from 'vue';
import type { App } from 'vue'
import '../assets/styles/element/index.scss'
import '../assets/styles/common.ellipsis.scss'
import '../assets/styles/common.flex.scss'
import '../assets/styles/common.margin-padding.scss'
import '../assets/styles/common.size.scss'
import '../assets/styles/common.scss'
import '../assets/styles/kl-style.scss'
// 此包不打包，各项目内部加载
// import '../assets/styles/iconfont/iconfont.js'
import TransformDom from 'vue3-transform-dom';
import ElementPlus, { ElMessage, messageTypes } from "element-plus";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { setConfig, KLConfig, config } from './config';
import KLTransform from '../components/KLTransform.vue';
import KLInput from '../components/KLInput.vue';
import KLButton from '../components/KLButton.vue';
import KLDialog from '../components/KLDialog.vue';
import KLIcon from '../components/KLIcon.vue';
import KLImageAnnotation from '../components/KLImageAnnotation.vue';
import KLNavBar from '../components/KLNavBar.vue';
import KLPagination from '../components/KLPagination.vue';
import KLCrosshair from "../components/KLCrosshair.vue";
import KLROI from '../components/KLROI.vue';
import KLCameraImage from "../components/KLCameraImage/index.vue";
import KLPopoverList from "./KLPopoverList.vue";
import KLMotionController from "./KLMotionController.vue";
import KLDetectOp from "./KLDetectOp.vue";
import KLDetectStatChip from "./KLDetectStatChip.vue";
import KLDetectStatMat from "./KLDetectStatMat.vue";

function useComponent(app: App) {
  app.use(ElementPlus, { locale: zhCn }).use(TransformDom);

  // 注册KL-component
  app.component("KLButton", KLButton);
  app.component("KLIcon", KLIcon);
  app.component("KLInput", KLInput);
  app.component('KLNavBar', KLNavBar)
  app.component("KLPagination", KLPagination);
  app.component('KLTransform', KLTransform);
  app.component('KLCrosshair', KLCrosshair)
  app.component('KLROI', KLROI)
  app.component('KLCameraImage', KLCameraImage)
  app.component('KLImageAnnotation', KLImageAnnotation)
  app.component("KLPopoverList", KLPopoverList);
  app.component("KLMotionController", KLMotionController);
  app.component("KLDetectOp", KLDetectOp);
  app.component("KLDetectStatChip", KLDetectStatChip);
  app.component("KLDetectStatMat", KLDetectStatMat);

  app.component("KLDialog", KLDialog);
  app.provide('klDialog', (Component: Element, props: any) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const app = createApp(Component, props);
    useComponent(app);
    app.mount(container);

    app.config.globalProperties.$remove = function () {
      app.unmount();
      container.parentNode && document.body.removeChild(container);
    }
  })
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  config.install && config.install(app);
}

export default {
  install: (app: App, config?: Partial<KLConfig>) => {
    config && setConfig(config);

    useComponent(app);

    messageTypes.forEach((type) => {
      ElMessage[type] = (options) => {
        if (typeof options === "string") {
          options = { message: options };
        }

        return ElMessage(
          Object.assign({ type, showClose: true, offset: 420 }, options)
        );
      };
    });

    return app;
  },
};