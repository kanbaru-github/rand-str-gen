/**
 * setTimeoutをPromiseに変換するヘルパー関数
 * @param ms - 遅延させるミリ秒
 * @returns Promise
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
