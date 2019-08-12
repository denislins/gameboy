import Observer from '../Observer.js';
import Phaser from '../common/Phaser.js';
import RegisterSet from './registers/RegisterSet.js';
import BaseInstructionSet from './instructions/BaseInstructionSet.js';
import ExtendedInstructionSet from './instructions/ExtendedInstructionSet.js';
import InstructionResolver from './instructions/InstructionResolver.js';
import InterruptHandler from './InterruptHandler.js';

export default class Cpu {
  constructor(mmu) {
    this.mmu = mmu;

    this.instructionPhaser = new Phaser(0);
    this.serviceableInterrupts = [];

    this.registers = new RegisterSet();
    this.interrupts = new InterruptHandler(this.mmu);

    this.instructions = new BaseInstructionSet();
    this.resolver = new InstructionResolver(this.registers, this.mmu);

    this.initInterruptPhaser();
    this.initEventHandlers();
  }

  reset() {
    this.registers.reset();
  }

  tick() {
    if (this.currentInterruptAddress) {
      return this.interruptPhaser.tick();
    }

    if (!this.currentInstruction) {
      this.mountInstruction();
    }

    this.instructionPhaser.tick();
  }

  // private

  initInterruptPhaser() {
    this.interruptPhaser = new Phaser(12);
    this.interruptPhaser.whenFinished(() => this.serviceCurrentInterrupt());
  }

  initEventHandlers() {
    Observer.on('cpu.halted', () => {
      this.halt();
    });

    Observer.on('interrupts.serviced', () => {
      this.halted = false;
    });
  }

  mountInstruction() {
    if (this.halted) {
      // loops executing no-ops when halted
      this.currentInstruction = this.instructions.find(0x76);
    } else {
      this.currentInstruction = this.getNextInstruction();
    }

    if (this.currentInstruction.requirements) {
      this.instructionPhaser.setLimit(this.currentInstruction.baseCycles);
      this.instructionPhaser.whenFinished(() => this.validateCurrentInstruction());
    } else {
      this.instructionPhaser.setLimit(this.currentInstruction.cycles);
      this.instructionPhaser.whenFinished(() => this.executeCurrentInstruction());
    }
  }

  getNextInstruction(instructionSet) {
    const opcode = this.getNextOpcode();
    const instruction = (instructionSet || this.instructions).find(opcode);

    if (instruction instanceof ExtendedInstructionSet) {
      return this.getNextInstruction(instruction);
    }

    return instruction;
  }

  getNextOpcode() {
    const address = this.registers.read('pc');

    if (this.wasHalted) {
      this.wasHalted = false;
    } else {
      this.registers.write('pc', address + 1);
    }

    return this.mmu.read(address);
  }

  validateCurrentInstruction() {
    const isInstructionValid = this.resolver.validateInstruction(this.currentInstruction);

    if (isInstructionValid) {
      const remainingCycles = this.currentInstruction.cycles - this.currentInstruction.baseCycles;

      this.instructionPhaser.setLimit(remainingCycles);
      this.instructionPhaser.whenFinished(() => this.executeCurrentInstruction());
    } else {
      this.currentInstruction = undefined;
      this.serviceInterrupts();
    }
  }

  executeCurrentInstruction() {
    this.resolver.resolve(this.currentInstruction);
    this.currentInstruction = undefined;
    this.serviceInterrupts();
  }

  halt() {
    const requested = this.interrupts.getRequestedInterrupts();

    if (this.interrupts.masterEnabled || requested === 0) {
      this.halted = true;
    } else {
      this.wasHalted = true;
    }
  }

  serviceInterrupts() {
    this.serviceableInterrupts = this.interrupts.getServiceableInterrupts();
    this.updateCurrentInterrupt();
  }

  updateCurrentInterrupt() {
    const interrupt = this.serviceableInterrupts.shift();

    if (interrupt) {
      this.halted = false;
      this.currentInterruptAddress = this.interrupts.getInterruptAddress(interrupt);

      if (!this.currentInterruptAddress) {
        this.updateCurrentInterrupt();
      }
    }
  }

  serviceCurrentInterrupt() {
    this.resolver.serviceInterrupt(this.currentInterruptAddress);
    this.updateCurrentInterrupt();
  }
}
