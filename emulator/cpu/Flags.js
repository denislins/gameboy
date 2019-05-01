export default class Flags {
  constructor(registers) {
    this.register = registers.get('f');

    this.masks = {
      z: 1 << 7,
      n: 1 << 6,
      h: 1 << 5,
      c: 1 << 4,
    };
  }

  get(flag) {
    return (this.register.read() & this.masks[flag]) > 0;
  }

  set(flag, value) {
    let newValue;

    if (value) {
      newValue = this.register.read() | this.masks[flag];
    } else {
      newValue = this.register.read() & ~this.masks[flag];
    }

    this.register.write(newValue);
  }
}
