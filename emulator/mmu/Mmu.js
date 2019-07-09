import bootrom from './bootrom.js';
import MemoryRegisterSet from './registers/MemoryRegisterSet.js';

export default class Mmu {
  constructor() {
    this.bootrom = bootrom;
    this.registers = new MemoryRegisterSet(this);
  }

  async loadCartridge(cartridge) {
    this.rom = await cartridge.read();

    this.ram = Array(0x8000).fill(0);
    this.addressSpace = Array(0x10000).fill(0);

    this.currentRomBank = 1;
    this.currentRamBank = 0;

    this.romBankingEnabled = false;
    this.ramBankingEnabled = false;
  }

  async loadMemoryDump(cartridge) {
    this.addressSpace = await cartridge.read();
  }

  read(address) {
    const page = this.getPage(address);
    const mappedAddress = this.mapAddress(address);

    return page[mappedAddress];
  }

  write(address, value) {
    if (address < 0x8000) {
      return this.handleBankSwitching(address, value);
    }

    if (address >= 0xA000 && address <= 0xBFFF && !this.ramBankingEnabled) {
      console.debug('skipping write to disabled RAM');
      return false;
    }

    const page = this.getPage(address);
    const mappedAddress = this.mapAddress(address);

    if (mappedAddress >= 0xFEA0 && mappedAddress < 0xFF00) {
      console.debug('skipping write to unused space');
    } else {
      page[mappedAddress] = value & 0xFF;
    }
  }

  getPage(address) {
    if (address < 0x100 && !this.registers.read('disableBootrom')) {
      return this.bootrom;
    } else if (address < 0x8000) {
      return this.rom;
    } else if (address >= 0xA000 && address <= 0xBFFF) {
      return this.ram;
    }

    return this.addressSpace;
  }

  mapAddress(address) {
    if (address >= 0x4000 && address <= 0x7FFF) {
      const baseBankAddress = this.currentRomBank * 0x4000;
      const correctedAddress = address - 0x4000;

      return baseBankAddress + correctedAddress;
    }

    if (address >= 0xA000 && address <= 0xBFFF) {
      const baseBankAddress = this.currentRamBank * 0x2000;
      const correctedAddress = address - 0xA000;

      return baseBankAddress + correctedAddress;
    }

    if (address >= 0xE000 && address < 0xFE00) {
      return address - 0x2000;
    }

    return address & 0xFFFF;
  }

  handleBankSwitching(address, value) {
    if (address < 0x2000 && this.bankingMode !== 'none') {
      this.enableRamBanking(address, value);
    }
  }

  enableRamBanking(address, value) {
    // bit 4 must be 0 to enable/disable banking in MBC2 mode
    if (this.bankingMode === 'MBC2' && (address & 0x10) !== 0) {
      return false;
    }

    if ((value & 0xF) === 0xA) {
      this.ramBankingEnabled = true;
    } else {
      this.ramBankingEnabled = false;
    }
  }

  get bankingMode() {
    return this.registers.get('cartridgeType').getBankingMode();
  }
}
