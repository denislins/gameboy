import rom from '../rom.js';

export default class Mmu {
  constructor() {
    this.memory = rom;
  }

  loadCartridge(cartridge) {

  }

  write(address, value) {
    this.memory[address & 0xFFFF] = value & 0xFF;
  }

  read(address) {
    return this.memory[address & 0xFFFF];
  }
}
