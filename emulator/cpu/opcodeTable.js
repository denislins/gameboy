import Operation from './operation.js';

export default class OpcodeTable {
  constructor() {
    this.opcodes = {};
  }

  add(opcode, repr) {
    return this.opcodes[opcode] = new Operation(repr);
  }

  get(opcode) {
    return this.opcodes[opcode];
  }
}
