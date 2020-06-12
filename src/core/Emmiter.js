export class Emmiter {
  constructor() {
    this.listeners = {};
  }

  emit(event, ...args) {
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].forEach((callback) => callback(...args));
    }
  }

  subscribe(event, callback) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(callback);
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== callback
      );
    };
  }
}
