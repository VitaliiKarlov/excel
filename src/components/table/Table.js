import ExcelComponent from '../../core/ExcelComponent';
import { createTable } from './table.template';
import { resizeHandler } from './table.resize';
import { shouldResize } from './table.functions';

export default class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root);
    this.name = 'Table';
    this.listeners = ['mousedown'];
  }

  toHTML() {
    return createTable(50);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
