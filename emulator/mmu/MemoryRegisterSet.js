export default class MemoryRegisterSet {
  constructor(mmu) {
    this.mmu = mmu;
    this.registers = {};

    this.initSystemRegisters();
    this.initVideoRegisters();
  }

  initSystemRegisters() {
    this.registers.disablerom = 0xFF50;
  }

  initVideoRegisters() {
    this.registers.lcdc = 0xFF40;
    this.registers.stat = 0xFF41;
    this.registers.scy = 0xFF42;
    this.registers.scx = 0xFF43;
    this.registers.ly = 0xFF44;
    this.registers.lyc = 0xFF45;
    this.registers.dma = 0xFF46;
    this.registers.bgp = 0xFF47;
    this.registers.obp0 = 0xFF48;
    this.registers.obp1 = 0xFF49;
    this.registers.wy = 0xFF4A;
    this.registers.wx = 0xFF4B;
  }

  read(register) {
    return this.mmu.read(this.registers[register]);
  }

  write(register, value) {
    return this.mmu.write(this.registers[register], value);
  }
}
