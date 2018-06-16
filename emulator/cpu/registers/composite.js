export default class CompositeRegister {
  constructor(registerA, registerB) {
    this.registerA = registerA;
    this.registerB = registerB;

    this.reset();
  }

  reset() {
    this.value = 0;
  }

  setValue(value) {
    this.registerA.setValue(value >> 8);
    this.registerB.setValue(value & 0xFF);
  }

  getValue() {
    const valueA = this.registerA.getValue();
    const valueB = this.registerB.getValue();

    return (valueA << 8) | valueB;
  }
}
