import ByteRegister from './ByteRegister.js';

export default class FlagsRegister extends ByteRegister {
  constructor() {
    super();

    this.masks = {
      z: 1 << 7,
      n: 1 << 6,
      h: 1 << 5,
      c: 1 << 4,
    };
  }

  get(flag) {
    return (this.read() & this.masks[flag]) > 0;
  }

  set(flag, value) {
    let newValue;

    if (value) {
      newValue = this.read() | this.masks[flag];
    } else {
      newValue = this.read() & ~this.masks[flag];
    }

    this.write(newValue);
  }
}
