import { ref, computed, Ref } from 'vue';
import { coor, roi } from '../type'

export interface drawRectFn {
  /**
   * mousedown事件
   */
  mousedown: (e: MouseEvent) => void;
  /**
   * 矩阵框SVG路径
   */
  rectPath: Ref<string>;
  /**
   * 是否显示矩阵框
   */
  showRectPath: Ref<boolean>;
  /**
   * 矩形框对角线起点与终点
   */
  rectSE: Ref<coor[]>;
}

export interface drawRectParam {
  /**
   * 获取鼠标位置
   */
  getPositionFn: (e: MouseEvent) => coor | null,
  /**
   * @return 返回值为是否显示矩形框
   */
  rectCallback?: (roi: roi) => boolean,
  /**
   * 鼠标按键；2为右键
   */
  button?: number,
  /**
   * 是否启用
   */
  enable?: boolean,
}

export function useDrawRect(param: drawRectParam): drawRectFn {
  /** 是否显示矩形框 */
  const showRectPath = ref(false);
  /** 绘制起点与终点：[x1, y1, x2, y2] */
  const rectSE = ref<coor[]>([{ x: 0, y: 0 }, { x: 0, y: 0 }]);
  /** 绘制svg的path */
  const rectPath = computed(() => {
    if (!showRectPath.value) return '';
    const [{ x: sx, y: sy }, { x: ex, y: ey }] = rectSE.value;
    return `M ${sx} ${sy} H ${ex} V ${ey} H ${sx} Z`
  })

  function mousedown(e: MouseEvent) {
    if (!param.enable) return;
    if (param.button === undefined || e.button !== param.button) return;
    const coor: coor | null = param.getPositionFn(e);
    // 超出范围
    if (!coor) return;
    showRectPath.value = true;
    e.stopPropagation();
    e.preventDefault();
    rectSE.value = [coor, coor];
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  }

  function mousemove(e: MouseEvent) {
    const coor: coor | null = param.getPositionFn(e);
    if (!coor) return;
    rectSE.value[1] = coor;
  }

  function mouseup(e: MouseEvent) {
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
    mousemove(e);
    const [{ x: sx, y: sy }, { x: ex, y: ey }] = rectSE.value;
    const width = Math.abs(ex - sx) + 1;
    const height = Math.abs(ey - sy) + 1;
    const show: boolean | undefined = param.rectCallback && param.rectCallback({
      x: Math.min(sx, ex),
      y: Math.min(sy, ey),
      width,
      height,
    })
    showRectPath.value = !!show;
  }

  return { mousedown, rectPath, showRectPath, rectSE };
}
