import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class InterruptRequestRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF0F;
    this.types = ['vblank', 'lcd', 'timer', 'serial', 'joypad'];
  }

  request(type) {
    const bit = this.types.indexOf(type);
    const mask = 1 << bit;

    this.write(this.read() | mask);
  }
}
