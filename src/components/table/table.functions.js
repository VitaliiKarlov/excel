import { range } from '../../core/utils';

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type === 'cell';
}

export function matrix($target, $current, $root) {
  const target = $target.id(true);
  const current = $current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);
  const group = [];

  cols.forEach((col) => {
    rows.forEach((row) => {
      const $el = $root.find(`[data-id="${row}:${col}"]`);
      group.push($el);
    });
  });

  return group;
}

export function nextSelector(key, id, maxRowsCount, maxColsCount) {
  let { row, col } = id;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowUp':
      row--;
      break;
    case 'ArrowLeft':
      col--;
      break;
    default:
      break;
  }

  row = Math.min(Math.max(row, 0), maxRowsCount - 1);
  col = Math.min(Math.max(col, 0), maxColsCount - 1);

  return `[data-id="${row}:${col}"]`;
}
