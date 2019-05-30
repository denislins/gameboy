import RegisterSet from './registers/RegisterSet.js';
import InstructionSet from './instructions/InstructionSet.js';
import ExtendedInstructionSet from './instructions/ExtendedInstructionSet.js';
import InstructionResolver from './instructions/InstructionResolver.js';

export default class Cpu {
  constructor(mmu) {
    this.mmu = mmu;
    this.cycles = 0;

    this.registers = new RegisterSet();
    this.instructions = new InstructionSet();

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

    this.cycles += this.resolver.resolve(instruction);
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

    return this.mmu.read(address);
  }
}
