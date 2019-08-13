class Observer {
  constructor() {
    this.handlers = {};
  }

  on(event, callback) {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }

    this.handlers[event].push(callback);
  }

  trigger(event, params) {
    if (this.handlers[event]) {
      this.handlers[event].forEach(callback => callback(params));
    }
  }
}

export default new Observer();
