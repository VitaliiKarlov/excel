export function capitalize(str) {
  if (typeof str !== 'string') {
    return '';
  }
  return str[0].toUpperCase() + str.slice(1);
}

export function range(start, end) {
  return new Array(Math.abs(end - start) + 1)
    .fill('')
    .map((_, index) => Math.min(start, end) + index);
}

export function storage(key, data = null) {
  if (data) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
  return JSON.parse(window.localStorage.getItem(key));
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelToDashCase(string) {
  return string.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
    .join('; ');
}

export function debounce(fn, wait) {
  let timer;
  return function a(...args) {
    const later = () => {
      clearInterval(timer);
      fn(...args);
    };
    clearInterval(timer);
    timer = setTimeout(later, wait);
  };
}
