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

/* Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 * https://davidwalsh.name/function-debounce
 */
export function debounce(
  func: Function,
  wait_ms: number,
  immediate: boolean = false
) {
  let timeout: any;
  return function(this: any) {
    const context: any = this,
      args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait_ms);
    if (callNow) func.apply(context, args);
  };
}

export function last<T>(array: T[]): T | null {
  if (array.length === 0) return null;
  return array[array.length - 1];
}
