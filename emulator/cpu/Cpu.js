import InstructionSet from './instructions/InstructionSet.js';
import ExtendedInstructionSet from './instructions/ExtendedInstructionSet.js';
import InstructionResolver from './instructions/InstructionResolver.js';
import RegisterSet from './registers/RegisterSet.js';
import Flags from './Flags.js';

export default class Cpu {
  constructor(mmu) {
    this.mmu = mmu;
    this.cycles = 0;

    this.registers = new RegisterSet();
    this.instructions = new InstructionSet();

    const flagsRegister = this.registers.get('f');

    this.flags = new Flags(flagsRegister);
    this.resolver = new InstructionResolver(this.registers, this.flags, mmu);
  }

  reset() {
    this.registers.reset();
  }

  tick() {
    const instruction = this.getNextInstruction();

    if (!instruction) {
      throw new Error('No instructions to execute');
    }

    this.resolver.resolve(instruction);

    this.cycles += instruction.cycles;
  }

  getNextInstruction(instructionSet) {
    const address = this.registers.read('pc');

    if (address >= 0x100) {
      throw new Error('finished bootrom');
    }

    const opcode = this.mmu.read(address);
    this.registers.write('pc', address + 1);

    const instruction = (instructionSet || this.instructions).find(opcode);

    if (instruction instanceof ExtendedInstructionSet) {
      return this.getNextInstruction(instruction);
    }

    return instruction;
  }
}
