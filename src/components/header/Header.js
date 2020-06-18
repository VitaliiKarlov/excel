import ExcelComponent from '../../core/ExcelComponent';
import { changeTitle } from '../../redux/actions';
import { $ } from '../../core/dom';

export default class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
      listeners: ['input'],
    });
  }

  toHTML() {
    const { title } = this.store.getState();
    return /* html */ `
      <input type="text" class="input" value="${title}">
      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `;
  }

  onInput(event) {
    this.$dispatch(changeTitle($(event.target).val()));
  }
}
