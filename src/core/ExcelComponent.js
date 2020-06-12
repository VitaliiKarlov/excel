import DOMListener from './DOMListener';

export default class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.unsubscribes = [];

    this.prepare();
  }

  prepare() {}

  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  $on(event, callback) {
    const unsub = this.emitter.subscribe(event, callback);
    this.unsubscribes.push(unsub);
  }

  toHTML() {
    return '';
  }

  init() {
    this.initDomListeners();
  }

  destroy() {
    this.removeDomListener();
    this.unsubscribes.forEach((unsub) => unsub());
  }
}
