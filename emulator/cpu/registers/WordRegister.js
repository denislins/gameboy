export default class WordRegister {
  constructor() {
    this.value = 0;
  }

  reset() {
    this.write(0);
  }

  read() {
    return this.value;
  }

  write(value) {
    this.value = value & 0xFFFF;
  }
}
