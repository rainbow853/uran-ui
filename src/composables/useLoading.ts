import { ref, nextTick } from 'vue';
import type { Ref } from "vue";
import { ElMessage } from 'element-plus';

export interface loading {
  loading: Ref<boolean>,
  loadingText: Ref<string>,
  /**
   * 设置loading状态与loading文字
   * @param flag 是否显示loading
   * @param text flag为false时ElMessage.error显示text
   */
  setLoading: (flag: boolean, text?: string) => void;
}

export function useLoading(): loading {
  const loading = ref(false);
  const loadingText = ref('');
  let lastFlag = false;
  function setLoading(flag: boolean, text?: string) {
    loadingText.value = text || '';
    loading.value = false;
    lastFlag = flag;
    // loading为true的情况下，更新loadingText值不生效
    flag && nextTick(() => {
      loading.value = lastFlag;
    })
    flag || (text && ElMessage.error(text));
  }

  return { loading, loadingText, setLoading };
}
