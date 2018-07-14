import bootrom from './bootrom.js';
import MemoryRegisterSet from './registers/MemoryRegisterSet.js';

export default class Mmu {
  constructor() {
    this.bootrom = bootrom;
    this.registers = new MemoryRegisterSet(this);
    this.ram = [];
  }

  async loadCartridge(cartridge) {
    const rom = await cartridge.read();
    const ram = Array(0x8000).fill(0);

    this.ram = [...rom, ...ram];
  }

  reset() {
    this.registers.reset();
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
