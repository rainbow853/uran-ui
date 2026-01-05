

import type { coor } from '../type';


export interface movedownResult {
  mousedown: (e: MouseEvent) => void;
}

export interface MouseDownEleInfo {
  left: number;
  top: number;
  width: number;
  height: number;
  clientWidth: number;
  clientHeight: number;
  scaleX: number;
  scaleY: number;
}

export interface mousedownParam {
  getDOM: (e: MouseEvent) => HTMLElement,
  mousedown?: (downPos: coor, eleInfo: MouseDownEleInfo, e: MouseEvent) => void,
  mousemove?: (downPos: coor, curPos: coor, e: MouseEvent) => void,
  mouseup?: (downPos: coor, curPos: coor, e: MouseEvent) => void,
}

/**
 * 获取相对坐标
 */
function getRelativePos(eleInfo: MouseDownEleInfo, event: MouseEvent) {
  const x = (event.clientX - eleInfo.left) / eleInfo.scaleX;
  const y = (event.clientY - eleInfo.top) / eleInfo.scaleY;
  return { x: ~~x, y: ~~y };
}

export function useMousedownEvent(param: mousedownParam): movedownResult {
  let downPos: coor;
  let eleInfo: MouseDownEleInfo;

  function mousedown(e: MouseEvent) {
    e.stopPropagation();
    const dom = param.getDOM(e);
    const domRect = dom.getBoundingClientRect().toJSON();
    const { clientWidth, clientHeight } = dom;
    eleInfo = {
      ...domRect, clientWidth, clientHeight,
      scaleX: domRect.width / clientWidth,
      scaleY: domRect.height / clientHeight,
    }
    downPos = getRelativePos(eleInfo, e);
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
    param.mousedown && param.mousedown(downPos, eleInfo, e);
  }

  function mousemove(e: MouseEvent) {
    e.stopPropagation();
    param.mousemove && param.mousemove(downPos, getRelativePos(eleInfo, e), e);
  }

  function mouseup(e: MouseEvent) {
    e.stopPropagation();
    document.removeEventListener('mousemove', mousemove);
    document.removeEventListener('mouseup', mouseup);
    param.mouseup && param.mouseup(downPos, getRelativePos(eleInfo, e), e);
  }

  return { mousedown };
}
