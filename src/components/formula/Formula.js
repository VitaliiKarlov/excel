import ExcelComponent from '../../core/ExcelComponent';

export default class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      ...options,
    });

    this.name = 'Formula';
    this.listeners = ['input', 'keydown'];
  }

  init() {
    super.init();

    const $formula = this.$root.find('.input');

    this.$on('table:select', (text) => {
      $formula.text(text);
    });

    this.$on('table:input', (text) => {
      $formula.text(text);
    });
  }

  toHTML() {
    return /* html */ `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `;
  }

  onInput(event) {
    const text = event.target.textContent.trim();
    this.$emit('formula:input', text);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    const { key } = event;

    if (keys.includes(key)) {
      event.preventDefault();
      this.$emit('formula:done', {});
    }
  }
}
