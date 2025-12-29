/**
 * 睡眠time毫秒
 */
export async function sleep(time: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(time);
    }, time)
  })
}

/**
 * 将数字转化为千单位；123456789->123,456,789
 */
export function toThousandNum(num: number): string {
  return num.toString().replace(/(?<=[\d])(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 返回百分比
 * @param numerator 分子
 * @param denominator 分母
 * @param toFixed 保留小数位数
 */
export function formatPercent(
  numerator: number,
  denominator: number,
  toFixed?: number
): number {
  if (!numerator || !denominator) return 0;
  return parseFloat(((numerator / denominator) * 100).toFixed(toFixed ?? 2));
}