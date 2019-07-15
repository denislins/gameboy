import MemoryRegister from '../MemoryRegister.js';

export default class InterruptRequestRegister extends MemoryRegister {
  constructor(mmu) {
    super(mmu, 0xFF0F);
    this.types = ['vblank', 'lcd', 'timer', 'serial', 'joypad'];
  }

  request(type) {
    const bit = this.types.indexOf(type);
    const mask = 1 << bit;

    this.write(this.read() | mask);
  }
}
