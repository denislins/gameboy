class Registers {
  constructor() {
    this.registers = ['a', 'b', 'c', 'd', 'e', 'f', 'h', 'l', 'pc', 'sp'];
    this.reset();
  }

  reset() {
    this.values = {};
    this.registers.forEach(r => { this.values[r] = 0 });
  }

  set(register, value) {
    this.registers[register] = value;
  }

  get(register) {
    return this.registers[register];
  }
}

export default new Registers();
