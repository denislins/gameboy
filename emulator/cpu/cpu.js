import InstructionSet from './instructions/set.js';
import ExtendedInstructionSet from './instructions/extendedSet.js';
import RegisterSet from './registers/set.js';
import Flags from './flags.js';

export default class Cpu {
  constructor(mmu) {
    this.mmu = mmu;
    this.cycles = 0;

    this.registers = new RegisterSet();
    this.flags = new Flags();

    this.instructions = new InstructionSet(this.registers, this.flags, this.mmu);
  }

  run() {
    while (true) {
      if (!this.executeNextInstruction()) {
        break;
      }
    }
  }

  executeNextInstruction() {
    const instruction = this.getNextInstruction();

    if (!instruction) {
      return false;
    }

    instruction.execute(this.registers, this.flags, this.mmu);

    this.cycles += instruction.cycles;

    return true;
  }

  getNextInstruction(instructionSet) {
    const address = this.registers.read('pc');
    const opcode = this.mmu.read(address);

    this.registers.write('pc', address + 1);

    const instruction = (instructionSet || this.instructions).find(opcode);

    if (instruction instanceof ExtendedInstructionSet) {
      return this.getNextInstruction(instruction);
    }

    return instruction;
  }
}
