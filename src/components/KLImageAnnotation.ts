
import type { coor } from '../type';

// #region basic
/** 文字标注信息项 */
export interface annotation {
  title: string;
  content: string
}

/** 图像标注区域 */
export interface rect {
  id: number;
  /** [x, y, width, height] */
  position: number[];
  color?: string;
  measureDesc?: string;
}

/** 选中标注项触发源 */
export enum RectChangeEventFrom {
  /** 图像区域 */
  IMAGE = 'IMAGE',
  /** 键盘 */
  KEYBOARD = 'KEYBOARD',
  /** 列表 */
  TABLE = 'TABLE',
}

/** 当前被选中的标注项及其触发源 */
export interface RectChangeEvent {
  /** 触发源；接受事件端可根据此字段决定要不要做出反馈，如标注列表滚动到当前标注项 */
  from: string | null,
  /** 当前被选中的标注项 */
  rect: rect | null,
  /** 是否静默触发；silent为true时各接受事件端禁止响应rect变化 */
  silent: boolean,
}
// #endregion basic

// #region ImageAnnotationProps
export interface ImageAnnotationProps {
  /** 图像地址 */
  imgSrc: string;
  /** 图像对应掩膜地址 */
  imgMaskSrc: string;
  /** 图像宽 */
  width: number;
  /** 图像高 */
  height: number;
  /** 标注信息列表 */
  annotations: annotation[];
  /** 标注框列表 */
  rects: rect[];
  /** 鼠标事件 */
  mousedownImageEvent?: (e: MouseEvent) => void;
  /** 鼠标右键事件 */
  contextmenuImageEvent?: (e: MouseEvent) => void;
  /** 点击确认按钮事件 */
  submitEvent: () => void;
}
// #endregion ImageAnnotationProps

/**
 * 判断坐标是否位于矩阵框内
 */
export function coorInRect(coor: coor, rect: number[]) {
  return coor.x > rect[0] && coor.y > rect[1] && coor.x < (rect[0] + rect[2]) && coor.y < (rect[1] + rect[3]);
}

/**
 * 返回数组指定项target的后一位，未找到或者target位于最后一位ie，则返回数组首项数据
 */
export function findNextByTarget<T>(array: T[], target?: T): T {
  const index = target ? (array.indexOf(target) + 1) % array.length : 0;
  return array[index];
}