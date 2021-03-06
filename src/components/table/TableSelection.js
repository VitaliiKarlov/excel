export class TableSelection {
  constructor() {
    this.className = 'selected';
    this.group = [];
    this.current = null;
  }

  get selectedIds() {
    return this.group.map(($el) => $el.id());
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(this.className));
    this.group = [];
  }

  select($el) {
    this.clear();
    this.group.push($el);
    this.current = $el;
    $el.focus().addClass(this.className);
  }

  selectGroup(group = []) {
    this.clear();
    group.forEach(($el) => {
      this.group.push($el);
      $el.addClass(this.className);
    });
  }

  applyStyle(style) {
    this.group.forEach(($el) => $el.css(style));
  }
}
