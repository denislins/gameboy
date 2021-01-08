import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class InterruptEnabledRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFFFF;
  }

  read() {
    return this.mmu.forceRead(this.address) | 0xE0;
  }
}
