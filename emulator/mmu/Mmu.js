import bootrom from './bootrom.js';
import MemoryRegisterSet from './MemoryRegisterSet.js';

export default class Mmu {
  constructor() {
    this.bootrom = bootrom;
    this.registers = new MemoryRegisterSet(this);
    this.ram = [...Array(0xFFFF)].fill(0);
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
    if (address < 0x100 && !this.registers.read('disablerom')) {
      return this.bootrom;
    }

    return this.ram;
  }
}
