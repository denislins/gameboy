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
    this.resolver = new InstructionResolver(this.registers, this.mmu, this.interrupts);
  }

  reset() {
    this.registers.reset();
  }

  tick() {
    const instruction = this.getNextInstruction();

    if (window.isDebuggerActive) {
      console.log(instruction.repr);
      debugger;
    }

    const cycles = this.resolver.resolve(instruction);
    this.cycles += cycles;

    return cycles;
  }

  serviceInterrupts() {
    this.interrupts.service((address) => {
      this.resolver.serviceInterrupt(address);
      this.cycles += 16;
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
    this.registers.write('pc', address + 1);

    if (window.breakpoints.indexOf(address) !== -1) {
      window.isDebuggerActive = true;
    }

    if (window.isDebuggerActive) {
      console.log(`PC at 0x${address.toString(16).toUpperCase()}`);
    }

    return this.mmu.read(address);
  }
}
