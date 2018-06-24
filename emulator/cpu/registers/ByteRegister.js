export default class ByteRegister {
  constructor() {
    this.reset();
  }

  reset() {
    this.value = 0;
  }

  write(value) {
    this.value = value & 0xFF;
  }

  read() {
    return this.value;
  }
}
