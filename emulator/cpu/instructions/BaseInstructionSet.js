import specs from './specs/base-instructions.js';
import ExtendedInstructionSet from './ExtendedInstructionSet.js';
import Instruction from './Instruction.js';

export default class BaseInstructionSet {
  constructor() {
    this.instructions = {};

    this.initExtendedSet();
    this.initInstructions();
  }

  initExtendedSet() {
    this.instructions[0xCB] = new ExtendedInstructionSet();
  }

  initInstructions() {
    specs.forEach((spec) => {
      this.instructions[spec.opcode] = new Instruction(spec);
    });
  }

  find(opcode) {
    return this.instructions[opcode];
  }
}
