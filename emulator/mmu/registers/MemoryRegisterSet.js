import MemoryRegister from './MemoryRegister.js';
import LcdControllerRegister from './LcdControllerRegister.js';

export default class MemoryRegisterSet {
  constructor(mmu) {
    this.mmu = mmu;
    this.registers = {};

    this.initSystemRegisters();
    this.initVideoRegisters();
  }

  initSystemRegisters() {
    this.add('disablerom', 0xFF50);
  }

  initVideoRegisters() {
    this.registers.lcdc = new LcdControllerRegister(this.mmu, 0xFF40);

    this.add('stat', 0xFF41);
    this.add('scy', 0xFF42);
    this.add('scx', 0xFF43);
    this.add('ly', 0xFF44);
    this.add('lyc', 0xFF45);
    this.add('dma', 0xFF46);
    this.add('bgp', 0xFF47);
    this.add('obp0', 0xFF48);
    this.add('obp1', 0xFF49);
    this.add('wy', 0xFF4A);
    this.add('wx', 0xFF4B);
  }

  add(register, address, value) {
    this.registers[register] = new MemoryRegister(this.mmu, address, value);
  }

  get(register) {
    return this.registers[register];
  }

  read(register) {
    return this.get(register).read();
  }

  write(register, value) {
    return this.get(register).write(value);
  }
}
