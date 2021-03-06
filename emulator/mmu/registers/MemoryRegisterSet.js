import SimpleMemoryRegister from './SimpleMemoryRegister.js';
import CartridgeTypeRegister from './system/CartridgeTypeRegister.js';
import JoypadRegister from './system/JoypadRegister.js';
import LcdControllerRegister from './lcd/LcdControllerRegister.js';
import LcdStatusRegister from './lcd/LcdStatusRegister.js';
import SoundPowerControlRegister from './sound/SoundPowerControlRegister.js';
import SoundChannelRegister from './sound/SoundChannelRegister.js';
import TimerControllerRegister from './timer/TimerControllerRegister.js';
import TimerDividerRegister from './timer/TimerDividerRegister.js';
import InterruptRequestRegister from './interrupts/InterruptRequestRegister.js';
import InterruptEnabledRegister from './interrupts/InterruptEnabledRegister.js';

export default class MemoryRegisterSet {
  constructor(mmu) {
    this.mmu = mmu;
    this.registers = {};

    this.initSystemRegisters();
    this.initVideoRegisters();
    this.initSoundRegisters();
    this.initTimerRegisters();
    this.initInterruptRegisters();
    this.compileAddressIndex();
  }

  initSystemRegisters() {
    this.registers.cartridgeType = new CartridgeTypeRegister(this.mmu);
    this.registers.joypad = new JoypadRegister(this.mmu);
    this.registers.disableBootrom = new SimpleMemoryRegister(this.mmu, 0xFF50);
  }

  initVideoRegisters() {
    this.registers.lcdController = new LcdControllerRegister(this.mmu);
    this.registers.lcdStatus = new LcdStatusRegister(this.mmu);
    this.registers.scrollY = new SimpleMemoryRegister(this.mmu, 0xFF42);
    this.registers.scrollX = new SimpleMemoryRegister(this.mmu, 0xFF43);
    this.registers.scanline = new SimpleMemoryRegister(this.mmu, 0xFF44);
    this.registers.scanlineCompare = new SimpleMemoryRegister(this.mmu, 0xFF45);
    this.registers.dmaTransfer = new SimpleMemoryRegister(this.mmu, 0xFF46);
    this.registers.backgroundPalette = new SimpleMemoryRegister(this.mmu, 0xFF47);
    this.registers.objectPalette0 = new SimpleMemoryRegister(this.mmu, 0xFF48);
    this.registers.objectPalette1 = new SimpleMemoryRegister(this.mmu, 0xFF49);
    this.registers.windowY = new SimpleMemoryRegister(this.mmu, 0xFF4A);
    this.registers.windowX = new SimpleMemoryRegister(this.mmu, 0xFF4B);
  }

  initSoundRegisters() {
    this.registers.soundPowerControl = new SoundPowerControlRegister(this.mmu);

    this.registers.nr11 = new SoundChannelRegister(this.mmu, 0xFF11, 'sweepSquare');
    this.registers.nr14 = new SoundChannelRegister(this.mmu, 0xFF14, 'sweepSquare');

    this.registers.nr24 = new SoundChannelRegister(this.mmu, 0xFF19, 'basicSquare');
    this.registers.nr34 = new SoundChannelRegister(this.mmu, 0xFF1E, 'wave');
  }

  initTimerRegisters() {
    this.registers.timerController = new TimerControllerRegister(this.mmu);
    this.registers.timerDivider = new TimerDividerRegister(this.mmu);
    this.registers.timerCounter = new SimpleMemoryRegister(this.mmu, 0xFF05);
    this.registers.timerModulator = new SimpleMemoryRegister(this.mmu, 0xFF06);
  }

  initInterruptRegisters() {
    this.registers.interruptRequest = new InterruptRequestRegister(this.mmu);
    this.registers.interruptEnabled = new InterruptEnabledRegister(this.mmu);
  }

  compileAddressIndex() {
    this.registerAddresses = {};

    Object.values(this.registers).forEach((register) => {
      this.registerAddresses[register.address] = register;
    });
  }

  get(register) {
    return this.registers[register];
  }

  findByAddress(address) {
    return this.registerAddresses[address];
  }

  read(register) {
    return this.get(register).read();
  }

  write(register, value) {
    return this.get(register).write(value);
  }
}
