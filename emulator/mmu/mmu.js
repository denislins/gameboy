export default class Mmu {
  constructor() {
    this.memory = [];
  }

  async loadCartridge(cartridge) {
    this.memory = await cartridge.read();
    debugger;
  }

  read(address) {
    return this.memory[address & 0xFFFF];
  }

  write(address, value) {
    this.memory[address & 0xFFFF] = value & 0xFF;
  }
}
