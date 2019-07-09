import MemoryRegister from './MemoryRegister.js';
import CartridgeTypeRegister from './CartridgeTypeRegister.js';
import LcdControllerRegister from './LcdControllerRegister.js';
import LcdStatusRegister from './LcdStatusRegister.js';
import TimerControllerRegister from './TimerControllerRegister.js';

export default class MemoryRegisterSet {
  constructor(mmu) {
    this.mmu = mmu;
    this.registers = {};

    this.initSystemRegisters();
    this.initVideoRegisters();
    this.initTimerRegisters();
    this.initInterruputRegisters();
  }

  initSystemRegisters() {
    this.registers.cartridgeType = new CartridgeTypeRegister(this.mmu);

    this.add('disableBootrom', 0xFF50);
  }

  initVideoRegisters() {
    this.registers.lcdController = new LcdControllerRegister(this.mmu);
    this.registers.lcdStatus = new LcdStatusRegister(this.mmu);

    this.add('scrollY', 0xFF42);
    this.add('scrollX', 0xFF43);
    this.add('scanline', 0xFF44);
    this.add('scanlineCompare', 0xFF45);
    this.add('dmaTransfer', 0xFF46);
    this.add('backgroundPallete', 0xFF47);
    this.add('objectPallete0', 0xFF48);
    this.add('objectPallete1', 0xFF49);
    this.add('windowY', 0xFF4A);
    this.add('windowX', 0xFF4B);
  }

  initTimerRegisters() {
    this.registers.tmc = new TimerControllerRegister(this.mmu);

    this.add('timerCounter', 0xFF05);
    this.add('timerModulo', 0xFF06);
  }

  initInterruputRegisters() {

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
