/**
 * Round a number to some number of decimal places.
 * Truncates trailing 0's unlike toFixed()
 *
 * @param num input number to round
 * @param places number of decimal places to round to
 */
export function round(num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
}

/**
 * Given an element, returns true if
 * that element is overflowing its
 * parent container.
 *
 * https://codepen.io/collincchoy/pen/NWqgYBx
 */
export function isOverflowing(el: HTMLElement) {
  const { offsetHeight, scrollHeight, offsetWidth, scrollWidth } = el;
  return offsetHeight < scrollHeight || offsetWidth < scrollWidth;
}
