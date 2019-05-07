export default class ByteRegister {
  constructor() {
    this.value = 0;
  }

  read() {
    return this.value;
  }

  write(value) {
    this.value = value & 0xFF;
  }
}
