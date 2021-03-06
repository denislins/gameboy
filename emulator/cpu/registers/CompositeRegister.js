export default class CompositeRegister {
  constructor(registerA, registerB) {
    this.registerA = registerA;
    this.registerB = registerB;
  }

  read() {
    const valueA = this.registerA.read();
    const valueB = this.registerB.read();

    return (valueA << 8) | valueB;
  }

  write(value) {
    this.registerA.write(value >> 8);
    this.registerB.write(value & 0xFF);
  }
}
