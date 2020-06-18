import { toInlineStyles } from '../../core/utils';
import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';

const CODES = {
  A: 65,
  Z: 90,
};

function createCell(row, state) {
  return function a(_, col) {
    const id = `${row}:${col}`;
    const width = state.colState[col] ? `${state.colState[col]}px` : '';
    const data = state.dataState[id] || '';

    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id],
    });

    return /* html */ `
    <div
      class="cell"
      contenteditable
      style="width: ${width}; ${styles}"
      data-col=${col}
      data-type="cell"
      data-value="${data}"
      data-id=${id}
      ${width}
    >
    ${parse(data)}
    </div>
  `;
  };
}

function createCol(state) {
  return function a(el, col) {
    const width = state.colState[col]
      ? `style='width:${state.colState[col]}px'`
      : '';
    return /* html */ `
    <div class="column" data-type="resizable" data-col=${col} ${width}>
      ${el}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
  };
}

function createRow(content, index, state) {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  const height = state.rowState[index - 1]
    ? `style='height:${state.rowState[index - 1]}px'`
    : '';
  return /* html */ `
    <div class="row" data-type="resizable" data-row=${index - 1} ${height}>
      <div class="row-info">
        ${index || ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 20, colsCount = 26, state) {
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCol(state))
    .join('');

  rows.push(createRow(cols, 0, state));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(row, state))
      .join('');
    rows.push(createRow(cells, row + 1, state));
  }

  return rows.join('');
}
