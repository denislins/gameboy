import memory from '../memory/memory.js';
import opcodes from './opcodes.js';
import registers from './registers/set.js';

class CPU {
  constructor() {
    this.memory = memory;
    this.opcodes = opcodes;
    this.registers = registers;
    this.pc = this.registers.get('pc');
  }

  run() {
    while (true) {
      if (!this.readInstruction()) {
        break;
      }
    }
  }

  readInstruction() {
    this.address = this.pc.getValue();

    const instruction = this.getInstruction();

    this.pc.setValue(this.address);

    if (!instruction) {
      return false;
    }

    instruction.execute();

    return true;
  }

  getInstruction() {
    let opcode = this.memory.get(this.address++);

    // TODO: this is UGLY
    if (opcode === 0xCB) {
      opcode = this.memory.get(this.address++);
      return this.opcodes.getCbInstruction(opcode);
    }

    return this.opcodes.getInstruction(opcode);
  }
}

export default new CPU();
