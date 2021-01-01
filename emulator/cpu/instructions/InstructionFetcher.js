import Observer from '../../common/Observer.js';
import Phaser from '../../common/Phaser.js';
import BaseInstructionSet from './BaseInstructionSet.js';
import ExtendedInstructionSet from './ExtendedInstructionSet.js';
import InstructionResolver from './InstructionResolver.js';

export default class InstructionFetcher {
  constructor(registers, mmu) {
    this.registers = registers;
    this.mmu = mmu;

    this.halted = false;
    this.haltBugTriggered = false;
    this.currentInstruction = undefined;

    this.instructions = new BaseInstructionSet();
    this.resolver = new InstructionResolver(registers, mmu);
    this.phaser = new Phaser(0);
  }

  tick() {
    if (!this.currentInstruction) {
      this.mountInstruction();
    }

    this.phaser.tick();
  }

  halt() {
    this.halted = true;
  }

  resume() {
    this.halted = false;
  }

  triggerHaltBug() {
    this.haltBugTriggered = true;
  }

  // private

  mountInstruction() {
    if (this.halted) {
      // loop no-ops when halted
      this.currentInstruction = this.instructions.find(0x76);
    } else {
      this.currentInstruction = this.getNextInstruction();
    }

    if (this.currentInstruction.requirements) {
      this.phaser.setLimit(this.currentInstruction.baseCycles);
      this.phaser.whenFinished(() => this.validateCurrentInstruction());
    } else {
      this.phaser.setLimit(this.currentInstruction.cycles);
      this.phaser.whenFinished(() => this.executeCurrentInstruction());
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

    if (this.haltBugTriggered) {
      this.haltBugTriggered = false;
    } else {
      this.registers.write('pc', address + 1);
    }

    return this.mmu.read(address);
  }

  validateCurrentInstruction() {
    const isInstructionValid = this.resolver.validateInstruction(this.currentInstruction);

    if (isInstructionValid) {
      const remainingCycles = this.currentInstruction.cycles - this.currentInstruction.baseCycles;

      this.phaser.setLimit(remainingCycles);
      this.phaser.whenFinished(() => this.executeCurrentInstruction());
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

  serviceInterrupts() {
    Observer.trigger('cpu.interrupts.startServicing');
  }
}
