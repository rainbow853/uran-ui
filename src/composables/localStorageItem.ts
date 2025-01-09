import { ref, watch } from "vue";
import type { Ref } from "vue";

export interface localStorageItem<T> {
  value: Ref<any>;
  save: (n?: T) => void;
}

export function useLocalStorageItem<T>(key: string, initValue: T, autoSave?: boolean): localStorageItem<T> {
  const needParse: boolean = typeof initValue !== 'string';
  const item = localStorage.getItem(key);
  const value = ref<T>(item ? (needParse ? JSON.parse(item) : item) : initValue);


  function save(n?: T): void {
    const item = needParse ? JSON.stringify(n || value.value) : (n || value.value) as string;
    localStorage.setItem(key, item);
  }

  autoSave && watch(value, () => {
    save();
  }, { deep: true })

  return { value, save };
}
