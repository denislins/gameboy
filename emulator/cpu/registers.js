class Registers {
  constructor() {
    this.registers = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'l', 'pc', 'sp'];
    this.resetValues();
  }

  resetValues() {
    this.values = {};
    this.registers.forEach(r => { this.values[r] = 0 });
  }

  set(register, value) {
    this.registers[register] = value;
  }
}

export default new Registers();
