/* eslint newline-per-chained-call: 0 */
import instructionSpecs from './specs/extended-instructions.js';
import Instruction from './Instruction.js';

export default class ExtendedInstructionSet {
  constructor() {
    this.instructions = {};
    this.initInstructions();
  }

  initInstructions() {
    instructionSpecs.forEach((spec) => {
      this.instructions[spec.opcode] = new Instruction(spec);
    });
  }

  find(opcode) {
    return this.instructions[opcode];
  }
}
