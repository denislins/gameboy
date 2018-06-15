class Memory {
  constructor() {
    this.memory = [];
  }

  set(address, value) {
    this.memory[address] = value;
  }

  get(address) {
    return this.memory[address];
  }
}

export default new Memory();
