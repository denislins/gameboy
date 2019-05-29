/* eslint newline-per-chained-call: 0 */
import Instruction from './Instruction.js';

export default class ExtendedInstructionSet {
  constructor() {
    this.instructions = {};
    // this.initInstructions();
  }

  initInstructions() {
    this.add(0x37, 8, 'SWAP A').rr('a').swap().sr('a');
    this.add(0x30, 8, 'SWAP B').rr('b').swap().sr('b');
    this.add(0x31, 8, 'SWAP C').rr('c').swap().sr('c');
    this.add(0x32, 8, 'SWAP D').rr('d').swap().sr('d');
    this.add(0x33, 8, 'SWAP E').rr('e').swap().sr('e');
    this.add(0x34, 8, 'SWAP H').rr('h').swap().sr('h');
    this.add(0x35, 8, 'SWAP L').rr('l').swap().sr('l');

    this.add(0x36, 16, 'SWAP (HL)').rr('hl').rm().swap().sra('hl');

    this.add(0x07, 8, 'RLC A').rr('a').rtl().sr('a');
    this.add(0x00, 8, 'RLC B').rr('b').rtl().sr('b');
    this.add(0x01, 8, 'RLC C').rr('c').rtl().sr('c');
    this.add(0x02, 8, 'RLC D').rr('d').rtl().sr('d');
    this.add(0x03, 8, 'RLC E').rr('e').rtl().sr('e');
    this.add(0x04, 8, 'RLC H').rr('h').rtl().sr('h');
    this.add(0x05, 8, 'RLC L').rr('l').rtl().sr('l');

    this.add(0x06, 16, 'RLC (HL)').rr('hl').rm().rtl().sra('hl');

    this.add(0x17, 8, 'RL A').rr('a').rtlc().sr('a');
    this.add(0x10, 8, 'RL B').rr('b').rtlc().sr('b');
    this.add(0x11, 8, 'RL C').rr('c').rtlc().sr('c');
    this.add(0x12, 8, 'RL D').rr('d').rtlc().sr('d');
    this.add(0x13, 8, 'RL E').rr('e').rtlc().sr('e');
    this.add(0x14, 8, 'RL H').rr('h').rtlc().sr('h');
    this.add(0x15, 8, 'RL L').rr('l').rtlc().sr('l');

    this.add(0x16, 16, 'RL (HL)').rr('hl').rm().rtlc().sra('hl');

    this.add(0x0F, 8, 'RRC A').rr('a').rtr().sr('a');
    this.add(0x08, 8, 'RRC B').rr('b').rtr().sr('b');
    this.add(0x09, 8, 'RRC C').rr('c').rtr().sr('c');
    this.add(0x0A, 8, 'RRC D').rr('d').rtr().sr('d');
    this.add(0x0B, 8, 'RRC E').rr('e').rtr().sr('e');
    this.add(0x0C, 8, 'RRC H').rr('h').rtr().sr('h');
    this.add(0x0D, 8, 'RRC L').rr('l').rtr().sr('l');

    this.add(0x0E, 16, 'RRC (HL)').rr('hl').rm().rtr().sra('hl');

    this.add(0x1F, 8, 'RR A').rr('a').rtrc().sr('a');
    this.add(0x18, 8, 'RR B').rr('b').rtrc().sr('b');
    this.add(0x19, 8, 'RR C').rr('c').rtrc().sr('c');
    this.add(0x1A, 8, 'RR D').rr('d').rtrc().sr('d');
    this.add(0x1B, 8, 'RR E').rr('e').rtrc().sr('e');
    this.add(0x1C, 8, 'RR H').rr('h').rtrc().sr('h');
    this.add(0x1D, 8, 'RR L').rr('l').rtrc().sr('l');

    this.add(0x1E, 16, 'RR (HL)').rr('hl').rm().rtrc().sra('hl');

    this.add(0x27, 8, 'SLA A').rr('a').shl().sr('a');
    this.add(0x20, 8, 'SLA B').rr('b').shl().sr('b');
    this.add(0x21, 8, 'SLA C').rr('c').shl().sr('c');
    this.add(0x22, 8, 'SLA D').rr('d').shl().sr('d');
    this.add(0x23, 8, 'SLA E').rr('e').shl().sr('e');
    this.add(0x24, 8, 'SLA H').rr('h').shl().sr('h');
    this.add(0x25, 8, 'SLA L').rr('l').shl().sr('l');

    this.add(0x26, 16, 'SLA (HL)').rr('hl').rm().shl().sra('hl');

    this.add(0x2F, 8, 'SRA A').rr('a').shra().sr('a');
    this.add(0x28, 8, 'SRA B').rr('b').shra().sr('b');
    this.add(0x29, 8, 'SRA C').rr('c').shra().sr('c');
    this.add(0x2A, 8, 'SRA D').rr('d').shra().sr('d');
    this.add(0x2B, 8, 'SRA E').rr('e').shra().sr('e');
    this.add(0x2C, 8, 'SRA H').rr('h').shra().sr('h');
    this.add(0x2D, 8, 'SRA L').rr('l').shra().sr('l');

    this.add(0x2E, 16, 'SRA (HL)').rr('hl').rm().shra().sra('hl');

    this.add(0x3F, 8, 'SRL A').rr('a').shrl().sr('a');
    this.add(0x38, 8, 'SRL B').rr('b').shrl().sr('b');
    this.add(0x39, 8, 'SRL C').rr('c').shrl().sr('c');
    this.add(0x3A, 8, 'SRL D').rr('d').shrl().sr('d');
    this.add(0x3B, 8, 'SRL E').rr('e').shrl().sr('e');
    this.add(0x3C, 8, 'SRL H').rr('h').shrl().sr('h');
    this.add(0x3D, 8, 'SRL L').rr('l').shrl().sr('l');

    this.add(0x3E, 16, 'SRL (HL)').rr('hl').rm().shrl().sra('hl');

    for (let i = 0; i < 8; i++) {
      this.add(0x47 + 0x08 * i, 8, `BIT ${i}, A`).rr('a').bit(i);
      this.add(0x40 + 0x08 * i, 8, `BIT ${i}, B`).rr('b').bit(i);
      this.add(0x41 + 0x08 * i, 8, `BIT ${i}, C`).rr('c').bit(i);
      this.add(0x42 + 0x08 * i, 8, `BIT ${i}, D`).rr('d').bit(i);
      this.add(0x43 + 0x08 * i, 8, `BIT ${i}, E`).rr('e').bit(i);
      this.add(0x44 + 0x08 * i, 8, `BIT ${i}, H`).rr('h').bit(i);
      this.add(0x45 + 0x08 * i, 8, `BIT ${i}, L`).rr('l').bit(i);

      this.add(0x46 + 0x08 * i, 16, `BIT ${i}, (HL)`).rr('hl').rm().bit(i);

      this.add(0xC7 + 0x08 * i, 8, `SET ${i}, A`).rr('a').setb(i).sr('a');
      this.add(0xC0 + 0x08 * i, 8, `SET ${i}, B`).rr('b').setb(i).sr('b');
      this.add(0xC1 + 0x08 * i, 8, `SET ${i}, C`).rr('c').setb(i).sr('c');
      this.add(0xC2 + 0x08 * i, 8, `SET ${i}, D`).rr('d').setb(i).sr('d');
      this.add(0xC3 + 0x08 * i, 8, `SET ${i}, E`).rr('e').setb(i).sr('e');
      this.add(0xC4 + 0x08 * i, 8, `SET ${i}, H`).rr('h').setb(i).sr('h');
      this.add(0xC5 + 0x08 * i, 8, `SET ${i}, L`).rr('l').setb(i).sr('l');

      this.add(0xC6 + 0x08 * i, 16, `SET ${i}, (HL)`).rr('hl').rm().setb(i).sra('hl');

      this.add(0x87 + 0x08 * i, 8, `RES ${i}, A`).rr('a').resb(i).sr('a');
      this.add(0x80 + 0x08 * i, 8, `RES ${i}, B`).rr('b').resb(i).sr('b');
      this.add(0x81 + 0x08 * i, 8, `RES ${i}, C`).rr('c').resb(i).sr('c');
      this.add(0x82 + 0x08 * i, 8, `RES ${i}, D`).rr('d').resb(i).sr('d');
      this.add(0x83 + 0x08 * i, 8, `RES ${i}, E`).rr('e').resb(i).sr('e');
      this.add(0x84 + 0x08 * i, 8, `RES ${i}, H`).rr('h').resb(i).sr('h');
      this.add(0x85 + 0x08 * i, 8, `RES ${i}, L`).rr('l').resb(i).sr('l');

      this.add(0x86 + 0x08 * i, 16, `RES ${i}, (HL)`).rr('hl').rm().resb(i).sra('hl');
    }
  }

  find(opcode) {
    return this.instructions[opcode];
  }

  add(opcode, cycles, repr) {
    const instruction = new Instruction(cycles, repr);
    this.instructions[opcode] = instruction;

    return instruction;
  }
}
