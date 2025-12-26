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