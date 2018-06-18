import rom from '../rom.js';

class Memory {
  constructor() {
    this.memory = rom;
  }

  set(address, value) {
    this.memory[address & 0xFFFF] = value & 0xFF;
  }

  get(address) {
    return this.memory[address & 0xFFFF];
  }
}

export default new Memory();
