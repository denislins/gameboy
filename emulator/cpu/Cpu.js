import Observer from '../Observer.js';
import RegisterSet from './registers/RegisterSet.js';
import BaseInstructionSet from './instructions/BaseInstructionSet.js';
import ExtendedInstructionSet from './instructions/ExtendedInstructionSet.js';
import InstructionResolver from './instructions/InstructionResolver.js';
import InterruptHandler from './InterruptHandler.js';

export default class Cpu {
  constructor(mmu) {
    this.mmu = mmu;
    this.cycles = 0;

    this.registers = new RegisterSet();
    this.instructions = new BaseInstructionSet();
    this.interrupts = new InterruptHandler(this.mmu);
    this.resolver = new InstructionResolver(this.registers, this.mmu);

    this.initEventHandlers();
  }

  initEventHandlers() {
    Observer.on('cpu.halted', () => {
      this.halt();
    });

    Observer.on('interrupts.serviced', () => {
      this.halted = false;
    });
  }

  reset() {
    this.registers.reset();
  }

  tick() {
    let instruction;

    if (this.halted) {
      instruction = this.instructions.find(0x76);
    } else {
      instruction = this.getNextInstruction();
    }

    if (window.isDebuggerActive) {
      console.log(instruction.repr);
      debugger;
    }

    const cycles = this.resolver.resolve(instruction);
    this.cycles += cycles;

    return cycles;
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
    this.interrupts.service((address) => {
      this.resolver.serviceInterrupt(address);

      this.halted = false;
      this.cycles += 12;
    });
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

    if (window.breakpoints.indexOf(address) !== -1) {
      window.isDebuggerActive = true;
    }

    if (window.isDebuggerActive) {
      console.log(`PC at 0x${address.toString(16).toUpperCase()}`);
    }

    return this.mmu.read(address);
  }
}
