import RegisterSet from './registers/RegisterSet.js';
import BaseInstructionSet from './instructions/BaseInstructionSet.js';
import ExtendedInstructionSet from './instructions/ExtendedInstructionSet.js';
import InstructionResolver from './instructions/InstructionResolver.js';

export default class Cpu {
  constructor(mmu) {
    this.mmu = mmu;
    this.cycles = 0;

    this.registers = new RegisterSet();
    this.instructions = new BaseInstructionSet();

    this.resolver = new InstructionResolver(this.registers, this.mmu);
  }

  reset() {
    this.registers.reset();
  }

  tick() {
    const instruction = this.getNextInstruction();

    if (!instruction) {
      throw new Error('No instructions to execute');
    }

    const cycles = this.resolver.resolve(instruction);
    this.cycles += cycles;

    return cycles;
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

    if (address >= 0x100) {
      throw new Error('finished bootrom');
    }

    return this.mmu.read(address);
  }
}
