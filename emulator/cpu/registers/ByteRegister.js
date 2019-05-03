export default class ByteRegister {
  read() {
    return this.value;
  }

  write(value) {
    this.value = value & 0xFF;
  }
}
