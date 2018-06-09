import registers from '../registers.js';

export default class CopyRegister {
  constructor(destination, location) {
    this.destination = destination;
    this.location = location;
  }

  execute() {
    registers.set(this.destination, registers.get(this.location));
  }

  toString() {
    return `LD ${this.destination}, ${this.location}`;
  }
}
