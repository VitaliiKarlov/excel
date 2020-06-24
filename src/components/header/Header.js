import ExcelComponent from '../../core/ExcelComponent';
import { changeTitle } from '../../redux/actions';
import { $ } from '../../core/dom';
import { ActiveRoute } from '../../core/router/ActiveRoute';

export default class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options,
      listeners: ['input', 'click'],
    });
  }

  toHTML() {
    const { title } = this.store.getState();
    return /* html */ `
      <input type="text" class="input" value="${title}">
      <div>
        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>
        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
      </div>
    `;
  }

  onInput(event) {
    this.$dispatch(changeTitle($(event.target).val()));
  }

  onClick(event) {
    const $target = $(event.target);
    const data = $target.data.button;

    if (data === 'remove') {
      const decision = window.confirm('Удалить таблицу?');

      if (decision) {
        window.localStorage.removeItem(`excel:${ActiveRoute.param}`);
        ActiveRoute.navigate('');
      }
    } else if (data === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
