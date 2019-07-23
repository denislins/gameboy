import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class InterruptEnabledRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFFFF;
  }

  read() {
    return super.read() | 0xE0;
  }
}
