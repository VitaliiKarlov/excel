import ExcelComponent from '../../core/ExcelComponent';
import { $ } from '../../core/dom';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, matrix, nextSelector } from './table.functions';
import { TableSelection } from './TableSelection';

export default class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    });

    this.rowsCount = 50;
    this.colsCount = 26;
  }

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();

    const $cell = this.$root.find('[data-id="0:0"]');
    this.emitSelect($cell);
    this.selection.select($cell);

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.emitSelect($cell);
    this.selection.select($cell);
  }

  toHTML() {
    return createTable(this.rowsCount, this.colsCount);
  }

  emitSelect($el) {
    this.$emit('table:select', $el.text());
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey) {
        const group = matrix($target, this.selection.current, this.$root);
        this.selection.selectGroup(group);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ];
    const { key } = event;

    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      const nextId = nextSelector(key, id, this.rowsCount, this.colsCount);
      const $next = this.$root.find(nextId);
      this.selectCell($next);
    }
  }

  onInput() {
    this.$emit('table:input', this.selection.current.text());
  }
}
