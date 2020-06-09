const CODES = {
  A: 65,
  Z: 90,
};

function createCell(el, index) {
  return /* html */ `
    <div class="cell" contenteditable data-col=${index}>
      ${el}
    </div>
  `;
}

function createCol(el, index) {
  return /* html */ `
    <div class="column" data-type="resizable" data-col=${index}>
      ${el}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(content, index = '') {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : '';
  return /* html */ `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(createCol)
    .join('');

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(createCell).join('');
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
