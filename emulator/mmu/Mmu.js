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

    this.memoryBankingMode = 'rom';

    this.currentRomBank = 1;
    this.currentRamBank = 0;

    this.romBankingEnabled = false;
    this.ramBankingEnabled = false;
  }

  read(address) {
    const register = this.registers.findByAddress(address);

    if (register) {
      return register.readFromBus();
    }

    return this.forceRead(address);
  }

  forceRead(address) {
    const page = this.getPage(address);
    const mappedAddress = this.mapAddress(address);

    return page[mappedAddress];
  }

  write(address, value) {
    if (address < 0x8000) {
      return this.handleBankSwitching(address, value);
    } else if (address === 0xFF46) {
      return this.startDmaTransfer(value);
    }

    if (address >= 0xA000 && address <= 0xBFFF && !this.ramBankingEnabled) {
      return;
    }

    const register = this.registers.findByAddress(address);

    if (register) {
      register.writeFromBus(value);
    } else {
      this.forceWrite(address, value);
    }
  }

  forceWrite(address, value) {
    const page = this.getPage(address);
    const mappedAddress = this.mapAddress(address);

    if (mappedAddress >= 0xFEA0 && mappedAddress < 0xFF00) {
      return;
    }

    page[mappedAddress] = value & 0xFF;
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
    if (this.bankingMode === 'none') {
      return;
    }

    if (address < 0x2000) {
      this.enableRamBanking(address, value);
    } else if (address < 0x4000) {
      this.changeCurrentRomBankLowerBits(value);
    } else if (address < 0x6000) {
      this.handleRamBankSwitching(value);
    } else {
      this.switchMemoryBankingMode(value);
    }
  }

  enableRamBanking(address, value) {
    // bit 4 must be 0 to enable/disable banking in MBC2 mode
    if (this.bankingMode === 'MBC2' && (address & 0x10) !== 0) {
      return;
    }

    if ((value & 0xF) === 0xA) {
      this.ramBankingEnabled = true;
    } else {
      this.ramBankingEnabled = false;
    }
  }

  changeCurrentRomBankLowerBits(value) {
    if (this.bankingMode === 'MBC1') {
      this.currentRomBank &= 0xE0;
      this.currentRomBank |= value & 0x1F;
    } else {
      this.currentRomBank = value & 0xF;
    }

    if (this.currentRomBank === 0) {
      this.currentRomBank = 1;
    }
  }

  // changes either ram bank or upper bits of rom bank
  handleRamBankSwitching(value) {
    if (this.bankingMode !== 'MBC1') {
      return;
    }

    if (this.memoryBankingMode === 'rom') {
      this.currentRomBank &= 0x1F;
      this.currentRomBank |= value & 0xE0;
    } else {
      this.currentRamBank = value & 0x3;
    }
  }

  switchMemoryBankingMode(value) {
    if (value & 1) {
      this.memoryBankingMode = 'ram';
    } else {
      this.memoryBankingMode = 'rom';
      this.currentRamBank = 0;
    }
  }

  startDmaTransfer(startAddress) {
    const baseAddress = startAddress << 8;

    for (let i = 0; i < 0xA0; i++) {
      const address = 0xFE00 + i;
      const value = this.read(baseAddress + i);

      this.forceWrite(address, value);
    }
  }

  get bankingMode() {
    return this.registers.get('cartridgeType').getBankingMode();
  }
}
