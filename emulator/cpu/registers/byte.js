export default class ByteRegister {
  constructor() {
    this.reset();
  }

  reset() {
    this.value = 0;
  }

  setValue(value) {
    this.value = value & 0xFF;
  }

  getValue() {
    return this.value;
  }
}
