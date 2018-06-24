import bootrom from './bootrom.js';

export default class Mmu {
  constructor() {
    this.bootrom = bootrom;
    this.ram = [];
  }

  async loadCartridge(cartridge) {
    this.ram = await cartridge.read();
  }

  read(address) {
    const page = this.getPage(address);
    return page[address & 0xFFFF];
  }

  write(address, value) {
    const page = this.getPage(address);
    page[address & 0xFFFF] = value & 0xFF;
  }

  getPage(address) {
    if (address < 0x100 && !this.ram[0xFF50]) {
      return this.bootrom;
    }

    return this.ram;
  }
}
