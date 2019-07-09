import MemoryRegister from './MemoryRegister.js';

export default class CartridgeTypeRegister extends MemoryRegister {
  constructor(mmu) {
    super(mmu, 0x147);
  }

  getBankingMode() {
    if (!this.bankingMode) {
      this.bankingMode = this.calculateBankingMode();
    }

    return this.bankingMode;
  }

  calculateBankingMode() {
    const value = this.read();

    if (value === 1 || value === 2 || value === 3) {
      return 'MBC1';
    } else if (value === 5 || value === 6) {
      return 'MBC2';
    }

    return 'none';
  }
}
