


import type { App } from 'vue'

// #region snippet
export interface KLConfig {
  /** 成功采集图像的回调函数 */
  grabImageSuccessCB: (image: any) => void;
  /** 其它全局组件注册 */
  install: (app: App) => void,
}
// #endregion snippet

export const config: Partial<KLConfig> = {

}

export function setConfig(_config: Partial<KLConfig>) {
  return Object.assign(config, _config);
}