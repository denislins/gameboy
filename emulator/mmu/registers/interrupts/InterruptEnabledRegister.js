import MemoryRegister from '../MemoryRegister.js';

export default class InterruptEnabledRegister extends MemoryRegister {
  constructor(mmu) {
    super(mmu, 0xFFFF);
  }
}
