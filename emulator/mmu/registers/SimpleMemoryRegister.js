import AbstractMemoryRegister from './AbstractMemoryRegister.js';

export default class SimpleMemoryRegister extends AbstractMemoryRegister {
  constructor(mmu, address) {
    super(mmu);
    this.address = address;
  }
}
