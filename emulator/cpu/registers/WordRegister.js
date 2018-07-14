export default class WordRegister {
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
    this.value = value & 0xFFFF;
  }
}
