class Memory {
  constructor() {
    this.memory = [];
  }

  set(address, value) {
    this.memory[address & 0xFFFF] = value & 0xFF;
  }

  get(address) {
    return this.memory[address & 0xFFFF];
  }
}

export default new Memory();
