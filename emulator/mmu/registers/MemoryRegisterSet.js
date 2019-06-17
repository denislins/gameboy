import MemoryRegister from './MemoryRegister.js';
import LcdControllerRegister from './LcdControllerRegister.js';
import LcdStatusRegister from './LcdStatusRegister.js';
import ScanlineRegister from './ScanlineRegister.js';
import TimerControllerRegister from './TimerControllerRegister.js';

export default class MemoryRegisterSet {
  constructor(mmu) {
    this.mmu = mmu;
    this.registers = {};

    this.initSystemRegisters();
    this.initVideoRegisters();
    this.initTimerRegisters();
  }

  initSystemRegisters() {
    this.add('disablerom', 0xFF50);
  }

  initVideoRegisters() {
    this.registers.lcdc = new LcdControllerRegister(this.mmu);
    this.registers.stat = new LcdStatusRegister(this.mmu);
    this.registers.ly = new ScanlineRegister(this.mmu);

    this.add('scy', 0xFF42);
    this.add('scx', 0xFF43);
    this.add('lyc', 0xFF45);
    this.add('dma', 0xFF46);
    this.add('bgp', 0xFF47);
    this.add('obp0', 0xFF48);
    this.add('obp1', 0xFF49);
    this.add('wy', 0xFF4A);
    this.add('wx', 0xFF4B);
  }

  initTimerRegisters() {
    this.registers.tmc = new TimerControllerRegister(this.mmu);

    this.add('tima', 0xFF05);
    this.add('tma', 0xFF06);
  }

  add(register, address) {
    this.registers[register] = new MemoryRegister(this.mmu, address);
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
