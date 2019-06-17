import MemoryRegister from './MemoryRegister.js';

export default class TimerControllerRegister extends MemoryRegister {
  constructor(mmu) {
    super(mmu, 0xFF07);
  }

  isTimerEnabled() {
    return this.testBit(2);
  }

  testBit(bit) {
    return this.read() & (1 << bit);
  }
}
