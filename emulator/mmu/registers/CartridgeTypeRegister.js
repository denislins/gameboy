import MemoryRegister from './MemoryRegister.js';

export default class CartridgeTypeRegister extends MemoryRegister {
  constructor(mmu) {
    super(mmu, 0x147);
  }

  getBankingMode() {
    const value = this.read();

    if (value === 1 || value === 2 || value === 3) {
      return 'MBC1';
    } else if (value === 5 || value === 6) {
      return 'MBC2';
    }

    return 'none';
  }
}
