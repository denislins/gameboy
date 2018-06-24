import InstructionSet from './instructions/InstructionSet.js';
import ExtendedInstructionSet from './instructions/ExtendedInstructionSet.js';
import RegisterSet from './registers/RegisterSet.js';
import Flags from './Flags.js';

export default class Cpu {
  constructor(mmu) {
    this.mmu = mmu;
    this.cycles = 0;
    this.bla = 0;

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

    this.bla++;

    if (this.bla > 50) {
      throw new Error("bosta")
    }

    console.log(instruction.repr);

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
