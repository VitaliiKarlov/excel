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
