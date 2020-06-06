import { capitalize } from './utils';

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}

export default class DOMListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('no $root provided for DOMListener');
    }

    this.$root = $root;
    this.listeners = listeners;
    this.addedListeners = [];
  }

  initDomListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        const error = `Method ${method} is not implemented in ${
          this.name || 'unknow'
        } Component`;
        throw new Error(error);
      }

      const fn = this[method].bind(this);
      this.addedListeners.push({ listener, fn });
      this.$root.on(listener, fn);
    });
  }

  removeDomListener() {
    this.addedListeners.forEach((addedListener) => {
      const { listener, fn } = addedListener;
      this.$root.off(listener, fn);
    });
  }
}
