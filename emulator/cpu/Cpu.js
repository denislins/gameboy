import Observer from '../Observer.js';
import Phaser from '../common/Phaser.js';
import RegisterSet from './registers/RegisterSet.js';
import InstructionFetcher from './instructions/InstructionFetcher.js';
import InterruptHandler from './InterruptHandler.js';

export default class Cpu {
  constructor(mmu) {
    this.mmu = mmu;

    this.serviceableInterrupts = [];
    this.currentInterruptAddress = undefined;

    this.registers = new RegisterSet();
    this.instructionFetcher = new InstructionFetcher(this.registers, this.mmu);
    this.interrupts = new InterruptHandler(this.mmu);

    this.initInterruptPhaser();
    this.initEventHandlers();
  }

  reset() {
    this.registers.reset();
  }

  tick() {
    if (this.currentInterruptAddress) {
      this.interruptPhaser.tick();
    } else {
      this.instructionFetcher.tick();
    }
  }

  // private

  initInterruptPhaser() {
    this.interruptPhaser = new Phaser(12);
    this.interruptPhaser.whenFinished(() => this.serviceCurrentInterrupt());
  }

  initEventHandlers() {
    Observer.on('cpu.halted', () => this.halt());
    Observer.on('cpu.interrupts.startServicing', () => this.serviceInterrupts());
  }

  halt() {
    const requested = this.interrupts.getRequestedInterrupts();

    if (this.interrupts.masterEnabled || requested === 0) {
      this.instructionFetcher.halt();
    } else {
      this.instructionFetcher.triggerHaltBug();
    }
  }

  serviceInterrupts() {
    this.serviceableInterrupts = this.interrupts.getServiceableInterrupts();
    this.updateCurrentInterrupt();
  }

  updateCurrentInterrupt() {
    const interrupt = this.serviceableInterrupts.shift();

    if (interrupt) {
      this.instructionFetcher.resume();
      this.currentInterruptAddress = this.interrupts.getInterruptAddress(interrupt);

      if (!this.currentInterruptAddress) {
        this.updateCurrentInterrupt();
      }
    } else {
      this.currentInterruptAddress = undefined;
    }
  }

  serviceCurrentInterrupt() {
    Observer.trigger('cpu.interrupts.service', { address: this.currentInterruptAddress });
    this.updateCurrentInterrupt();
  }
}
