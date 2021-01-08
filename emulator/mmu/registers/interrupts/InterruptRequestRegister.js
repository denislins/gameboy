import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class InterruptRequestRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF0F;
  }

  read() {
    return this.mmu.forceRead(this.address) | 0xE0;
  }
}
