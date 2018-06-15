import memory from '../memory/memory.js';
import opcodes from './opcodes.js';
import registers from './registers/set.js';
import rom from '../rom.js';

class CPU {
  constructor() {
    this.memory = memory;
    this.opcodes = opcodes;
    this.registers = registers;
  }

  testRun() {
    let byte;

    while (byte = rom.shift()) {
      if (byte === 0xCB) {
        byte = rom.shift();
        this.opcodes.getCbInstruction(byte).execute();
      } else {
        this.opcodes.getInstruction(byte).execute();
      }
    }
  }

  run() {
    while (true) {
      if (!this.readInstruction()) {
        break;
      }
    }
  }

  readInstruction() {
    let pc = this.registers.get('pc');
    let opcode = this.memory.get(pc++);

    let instruction;

    // TODO: this is UGLY
    if (opcode === 0xCB) {
      opcode = this.memory.get(pc++);
      instruction = this.opcodes.getCbInstruction(opcode);
    } else {
      instruction = this.opcodes.getInstruction(opcode);
    }

    if (!instruction) {
      return false;
    }

    this.registers.set('pc', pc);
    instruction.execute();
  }
}

export default new CPU();
