import ExcelComponent from '../../core/ExcelComponent';
import { $ } from '../../core/dom';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize, isCell, matrix, nextSelector } from './table.functions';
import { TableSelection } from './TableSelection';
import * as actions from '../../redux/actions';
import { defaultStyles } from '../../constants';
import { parse } from '../../core/parse';

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
      this.selection.current.attr('data-value', text).text(parse(text));
      // this.selection.current.text(text);
      this.updateTextInStore(text);
    });

    this.$on('formula:done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:appStyle', (style) => {
      this.selection.applyStyle(style);
      this.$dispatch(
        actions.applyStyle({
          value: style,
          ids: this.selection.selectedIds,
        })
      );
    });
  }

  selectCell($cell) {
    this.emitSelect($cell);
    this.selection.select($cell);
    const styles = this.selection.current.getStyles(Object.keys(defaultStyles));
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      throw new Error('Warning, fatal error', e.message);
    }
  }

  toHTML() {
    return createTable(this.rowsCount, this.colsCount, this.store.getState());
  }

  updateTextInStore(text) {
    this.$dispatch(
      actions.changeText({ id: this.selection.current.id(), text })
    );
  }

  emitSelect($el) {
    this.$emit('table:select', $el);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
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
    // this.$emit('table:input', this.selection.current.text());
    this.updateTextInStore(this.selection.current.text());
  }
}
