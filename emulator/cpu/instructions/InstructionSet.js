/* eslint newline-per-chained-call: 0 */
import instructions from './resources/instructions.js';
import ExtendedInstructionSet from './ExtendedInstructionSet.js';
import Instruction from './Instruction.js';

export default class InstructionSet {
  constructor() {
    this.instructions = {};

    this.initExtendedSet();
    this.initInstructions();
  }

  initExtendedSet() {
    this.instructions[0xCB] = new ExtendedInstructionSet();
  }

  initInstructions() {
    instructions.forEach((spec) => {
      this.instructions[spec.opcode] = new Instruction(spec);
    });
  }

  find(opcode) {
    return this.instructions[opcode];
  }
}
