export default class WordRegister {
  constructor() {
    this.reset();
  }

  reset() {
    this.value = 0;
  }

  setValue(value) {
    this.value = value & 0xFFFF;
  }

  getValue() {
    return this.value;
  }
}
