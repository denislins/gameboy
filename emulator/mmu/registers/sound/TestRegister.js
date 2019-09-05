import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class TestRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF10;
  }

  writeFromBus(value) {
    return this.write(value);
  }
}
