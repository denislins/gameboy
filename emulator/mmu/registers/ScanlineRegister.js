import MemoryRegister from './MemoryRegister.js';

export default class ScanlineRegister extends MemoryRegister {
  constructor(mmu) {
    super(mmu, 0xFF44);
  }

  write(value) {
    // bypass scanline reset when writing to the register
    this.mmu.ram[this.address] = value;
  }
}
