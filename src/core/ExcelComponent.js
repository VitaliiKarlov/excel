import DOMListener from './DOMListener';

export default class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name;
    this.emitter = options.emitter;
    this.store = options.store;
    this.unsubscribes = [];
    this.subscribe = options.subscribe || [];

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

  $dispatch(action) {
    this.store.dispatch(action);
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key);
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
