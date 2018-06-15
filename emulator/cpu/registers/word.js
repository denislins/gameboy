export default class WordRegister {
  constructor() {
    this.reset();
  }

  reset() {
    this.value = 0;
  }

  setValue(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  sumValue(value) {
    this.value = (this.value + value) & 0xFFFF;
  }
}
