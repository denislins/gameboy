import Instruction from './instruction.js';

export default class InstructionSet {
  constructor() {
    this.instructions = {};
  }

  add(opcode, cycles, repr) {
    return this.instructions[opcode] = new Instruction(cycles, repr);
  }

  get(opcode) {
    return this.instructions[opcode];
  }
}
