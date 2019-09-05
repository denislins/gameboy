import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class SoundPowerControlRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF26;
  }

  writeFromBus(value) {
    return this.write(value & 0x80);
  }
}
