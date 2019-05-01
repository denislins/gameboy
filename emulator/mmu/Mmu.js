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
    const mappedAddress = this.mapAddress(address);

    return page[mappedAddress];
  }

  write(address, value) {
    const page = this.getPage(address);
    const mappedAddress = this.mapAddress(address);

    page[mappedAddress] = value & 0xFF;
  }

  getPage(address) {
    if (address < 0x100 && !this.registers.read('disablerom')) {
      return this.bootrom;
    }

    return this.ram;
  }

  mapAddress(address) {
    if (address >= 0xE000 && address < 0xFE00) {
      return (address - 0x2000) & 0xFFFF;
    }

    return address & 0xFFFF;
  }
}
