export default class WordRegister {
  constructor() {
    this.reset();
  }

  reset() {
    this.value = 0;
  }

  write(value) {
    this.value = value & 0xFFFF;
  }

  read() {
    return this.value;
  }
}
