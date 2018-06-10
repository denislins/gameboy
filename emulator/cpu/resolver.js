export default class Resolver {
  constructor() {
    this.chain = [];
  }

  add(operation, ...args) {
    let callback;

    if (args.length && typeof args[args.length - 1] === 'function') {
      callback = args.pop();
    } else {
      callback = null;
    }

    this.chain.push({ operation, args, callback });
  }

  resolve(value) {
    this.chain.forEach(piece => {
      value = this[piece.operation](value, ...piece.args);
    });

    return value;
  }
}
