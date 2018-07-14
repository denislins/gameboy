export default class ByteRegister {
  constructor(defaultValue) {
    this.defaultValue = defaultValue;
  }

  reset() {
    this.write(this.defaultValue);
  }

  read() {
    return this.value;
  }

  write(value) {
    this.value = value & 0xFF;
  }
}
