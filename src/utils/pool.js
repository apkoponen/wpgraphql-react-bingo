import random from 'lodash/random';

export function createPool(options) {
  const originalOptions = options.slice();
  let pool = options.slice();
  return function pickFromPool() {
    if (pool.length === 0) {
      pool = originalOptions.slice();
    }
    const selectedIndex = random(0, pool.length - 1);
    const selectedItem = pool[selectedIndex];
    pool.splice(selectedIndex, 1);
    return selectedItem;
  };
}
