class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text;
      return this;
    }
    return this.$el.textContent;
  }

  val(text) {
    if (typeof text !== 'undefined') {
      this.$el.value = text;
      return this;
    }
    return this.$el.value;
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    let newNode = node;
    if (node instanceof Dom) {
      newNode = node.$el;
    }
    this.$el.append(newNode);

    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  id(parse) {
    if (parse) {
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  css(styles = {}) {
    Object.keys(styles).forEach((style) => {
      this.$el.style[style] = styles[style];
    });
    return this;
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s];
      return res;
    }, {});
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  remove() {
    this.$el.remove();
  }

  get getStyle() {
    return window.getComputedStyle(this.$el);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
