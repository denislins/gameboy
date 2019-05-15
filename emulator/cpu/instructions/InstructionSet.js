/* eslint newline-per-chained-call: 0 */
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

  find(opcode) {
    return this.instructions[opcode];
  }

  add(opcode, cycles, repr) {
    const instruction = new Instruction(cycles, repr);
    this.instructions[opcode] = instruction;

    return instruction;
  }

  initInstructions() {
    this.add(0x3E, 8, 'LD A, byte').rb().sr('a');
    this.add(0x06, 8, 'LD B, byte').rb().sr('b');
    this.add(0x0E, 8, 'LD C, byte').rb().sr('c');
    this.add(0x16, 8, 'LD D, byte').rb().sr('d');
    this.add(0x1E, 8, 'LD E, byte').rb().sr('e');
    this.add(0x26, 8, 'LD H, byte').rb().sr('h');
    this.add(0x2E, 8, 'LD L, byte').rb().sr('l');

    this.add(0x7F, 4, 'LD A, A').rr('a').sr('a');
    this.add(0x78, 4, 'LD A, B').rr('b').sr('a');
    this.add(0x79, 4, 'LD A, C').rr('c').sr('a');
    this.add(0x7A, 4, 'LD A, D').rr('d').sr('a');
    this.add(0x7B, 4, 'LD A, E').rr('e').sr('a');
    this.add(0x7C, 4, 'LD A, H').rr('h').sr('a');
    this.add(0x7D, 4, 'LD A, L').rr('l').sr('a');

    this.add(0x47, 4, 'LD B, A').rr('a').sr('b');
    this.add(0x40, 4, 'LD B, B').rr('b').sr('b');
    this.add(0x41, 4, 'LD B, C').rr('c').sr('b');
    this.add(0x42, 4, 'LD B, D').rr('d').sr('b');
    this.add(0x43, 4, 'LD B, E').rr('e').sr('b');
    this.add(0x44, 4, 'LD B, H').rr('h').sr('b');
    this.add(0x45, 4, 'LD B, L').rr('l').sr('b');

    this.add(0x4F, 4, 'LD C, A').rr('a').sr('c');
    this.add(0x48, 4, 'LD C, B').rr('b').sr('c');
    this.add(0x49, 4, 'LD C, C').rr('c').sr('c');
    this.add(0x4A, 4, 'LD C, D').rr('d').sr('c');
    this.add(0x4B, 4, 'LD C, E').rr('e').sr('c');
    this.add(0x4C, 4, 'LD C, H').rr('h').sr('c');
    this.add(0x4D, 4, 'LD C, L').rr('l').sr('c');

    this.add(0x57, 4, 'LD D, A').rr('a').sr('d');
    this.add(0x50, 4, 'LD D, B').rr('b').sr('d');
    this.add(0x51, 4, 'LD D, C').rr('c').sr('d');
    this.add(0x52, 4, 'LD D, D').rr('d').sr('d');
    this.add(0x53, 4, 'LD D, E').rr('e').sr('d');
    this.add(0x54, 4, 'LD D, H').rr('h').sr('d');
    this.add(0x55, 4, 'LD D, L').rr('l').sr('d');

    this.add(0x5F, 4, 'LD E, A').rr('a').sr('e');
    this.add(0x58, 4, 'LD E, B').rr('b').sr('e');
    this.add(0x59, 4, 'LD E, C').rr('c').sr('e');
    this.add(0x5A, 4, 'LD E, D').rr('d').sr('e');
    this.add(0x5B, 4, 'LD E, E').rr('e').sr('e');
    this.add(0x5C, 4, 'LD E, H').rr('h').sr('e');
    this.add(0x5D, 4, 'LD E, L').rr('l').sr('e');

    this.add(0x67, 4, 'LD H, A').rr('a').sr('h');
    this.add(0x60, 4, 'LD H, B').rr('b').sr('h');
    this.add(0x61, 4, 'LD H, C').rr('c').sr('h');
    this.add(0x62, 4, 'LD H, D').rr('d').sr('h');
    this.add(0x63, 4, 'LD H, E').rr('e').sr('h');
    this.add(0x64, 4, 'LD H, H').rr('h').sr('h');
    this.add(0x65, 4, 'LD H, L').rr('l').sr('h');

    this.add(0x6F, 4, 'LD L, A').rr('a').sr('l');
    this.add(0x68, 4, 'LD L, B').rr('b').sr('l');
    this.add(0x69, 4, 'LD L, C').rr('c').sr('l');
    this.add(0x6A, 4, 'LD L, D').rr('d').sr('l');
    this.add(0x6B, 4, 'LD L, E').rr('e').sr('l');
    this.add(0x6C, 4, 'LD L, H').rr('h').sr('l');
    this.add(0x6D, 4, 'LD L, L').rr('l').sr('l');

    this.add(0x7E, 8, 'LD A, (HL)').rr('hl').rm().sr('a');
    this.add(0x46, 8, 'LD B, (HL)').rr('hl').rm().sr('b');
    this.add(0x4E, 8, 'LD C, (HL)').rr('hl').rm().sr('c');
    this.add(0x56, 8, 'LD D, (HL)').rr('hl').rm().sr('d');
    this.add(0x5E, 8, 'LD E, (HL)').rr('hl').rm().sr('e');
    this.add(0x66, 8, 'LD H, (HL)').rr('hl').rm().sr('h');
    this.add(0x6E, 8, 'LD L, (HL)').rr('hl').rm().sr('l');

    this.add(0x70, 8, 'LD (HL), B').rr('b').sra('hl');
    this.add(0x71, 8, 'LD (HL), C').rr('c').sra('hl');
    this.add(0x72, 8, 'LD (HL), D').rr('d').sra('hl');
    this.add(0x73, 8, 'LD (HL), E').rr('e').sra('hl');
    this.add(0x74, 8, 'LD (HL), H').rr('h').sra('hl');
    this.add(0x75, 8, 'LD (HL), L').rr('l').sra('hl');

    this.add(0x36, 12, 'LD (HL), byte').rb().sra('hl');

    this.add(0x0A, 8, 'LD A, (BC)').rra('bc').sr('a');
    this.add(0x1A, 8, 'LD A, (DE)').rra('de').sr('a');
    this.add(0x7E, 8, 'LD A, (HL)').rra('hl').sr('a');

    this.add(0x02, 8, 'LD (BC), A').rr('a').sra('bc');
    this.add(0x12, 8, 'LD (DE), A').rr('a').sra('de');
    this.add(0x77, 8, 'LD (HL), A').rr('a').sra('hl');

    this.add(0xFA, 16, 'LD A, (word)').rw().rm().sr('a');
    this.add(0xEA, 16, 'LD (word), A').rr('a').sbda();

    this.add(0xF2, 8, 'LD A, (C)').rr('c').sumw(0xFF00).rm().sr('a');
    this.add(0xE2, 8, 'LD (C), A').rr('a').sra('c', 0xFF00);

    this.add(0x3A, 8, 'LD A, (HL-)').decr('hl', false).rm().sr('a');
    this.add(0x32, 8, 'LD (HL-), A').rr('a').sra('hl').decr('hl', false);

    this.add(0x2A, 8, 'LD A, (HL+)').incr('hl', false).rm().sr('a');
    this.add(0x22, 8, 'LD (HL+), A').rr('a').sra('hl').incr('hl', false);

    this.add(0xE0, 12, 'LDH (byte), A').rr('a').sbda(0xFF00);
    this.add(0xF0, 12, 'LDH A, (byte)').rb().sumw(0xFF00).rm().sr('a');

    this.add(0x01, 12, 'LD BC, word').rw().sr('bc');
    this.add(0x11, 12, 'LD DE, word').rw().sr('de');
    this.add(0x21, 12, 'LD HL, word').rw().sr('hl');
    this.add(0x31, 12, 'LD SP, word').rw().sr('sp');

    this.add(0xF9, 8, 'LD SP, HL').rr('hl').sr('sp');

    this.add(0xF8, 12, 'LD HL, SP + sbyte').rr('sp').sumsb().sr('hl');

    this.add(0x08, 20, 'LD (word), SP').rr('sp').swda();

    this.add(0xF5, 16, 'PUSH AF').rr('af').push();
    this.add(0xC5, 16, 'PUSH BC').rr('bc').push();
    this.add(0xD5, 16, 'PUSH DE').rr('de').push();
    this.add(0xE5, 16, 'PUSH HL').rr('hl').push();

    this.add(0xF1, 12, 'POP AF').pop().sr('af');
    this.add(0xC1, 12, 'POP BC').pop().sr('bc');
    this.add(0xD1, 12, 'POP DE').pop().sr('de');
    this.add(0xE1, 12, 'POP HL').pop().sr('hl');

    this.add(0x87, 4, 'ADD A, A').rr('a').sumr('a').sr('a');
    this.add(0x80, 4, 'ADD A, B').rr('b').sumr('a').sr('a');
    this.add(0x81, 4, 'ADD A, C').rr('c').sumr('a').sr('a');
    this.add(0x82, 4, 'ADD A, D').rr('d').sumr('a').sr('a');
    this.add(0x83, 4, 'ADD A, E').rr('e').sumr('a').sr('a');
    this.add(0x84, 4, 'ADD A, H').rr('h').sumr('a').sr('a');
    this.add(0x85, 4, 'ADD A, L').rr('l').sumr('a').sr('a');

    this.add(0x86, 8, 'ADD A, (HL)').rr('hl').rm().sumr('a').sr('a');
    this.add(0xC6, 8, 'ADD A, byte').rb().sumr('a').sr('a');

    this.add(0x8F, 4, 'ADC A, A').rr('a').sumrc('a').sr('a');
    this.add(0x88, 4, 'ADC A, B').rr('b').sumrc('a').sr('a');
    this.add(0x89, 4, 'ADC A, C').rr('c').sumrc('a').sr('a');
    this.add(0x8A, 4, 'ADC A, D').rr('d').sumrc('a').sr('a');
    this.add(0x8B, 4, 'ADC A, E').rr('e').sumrc('a').sr('a');
    this.add(0x8C, 4, 'ADC A, H').rr('h').sumrc('a').sr('a');
    this.add(0x8D, 4, 'ADC A, L').rr('l').sumrc('a').sr('a');

    this.add(0x8E, 8, 'ADC A, (HL)').rr('hl').rm().sumrc('a').sr('a');
    this.add(0xCE, 8, 'ADC A, byte').rb().sumrc('a').sr('a');

    this.add(0x97, 4, 'SUB A, A').rr('a').subr('a').sr('a');
    this.add(0x90, 4, 'SUB A, B').rr('b').subr('a').sr('a');
    this.add(0x91, 4, 'SUB A, C').rr('c').subr('a').sr('a');
    this.add(0x92, 4, 'SUB A, D').rr('d').subr('a').sr('a');
    this.add(0x93, 4, 'SUB A, E').rr('e').subr('a').sr('a');
    this.add(0x94, 4, 'SUB A, H').rr('h').subr('a').sr('a');
    this.add(0x95, 4, 'SUB A, L').rr('l').subr('a').sr('a');

    this.add(0x96, 8, 'SUB A, (HL)').rr('hl').rm().subr('a').sr('a');
    this.add(0xD6, 8, 'SUB A, byte').rb().subr('a').sr('a');

    this.add(0x9F, 4, 'SBC A, A').rr('a').subrc('a').sr('a');
    this.add(0x98, 4, 'SBC A, B').rr('b').subrc('a').sr('a');
    this.add(0x99, 4, 'SBC A, C').rr('c').subrc('a').sr('a');
    this.add(0x9A, 4, 'SBC A, D').rr('d').subrc('a').sr('a');
    this.add(0x9B, 4, 'SBC A, E').rr('e').subrc('a').sr('a');
    this.add(0x9C, 4, 'SBC A, H').rr('h').subrc('a').sr('a');
    this.add(0x9D, 4, 'SBC A, L').rr('l').subrc('a').sr('a');

    this.add(0x9E, 8, 'SBC A, (HL)').rr('hl').rm().subrc('a').sr('a');

    this.add(0xA7, 4, 'AND A, A').rr('a').and('a').sr('a');
    this.add(0xA0, 4, 'AND A, B').rr('b').and('a').sr('a');
    this.add(0xA1, 4, 'AND A, C').rr('c').and('a').sr('a');
    this.add(0xA2, 4, 'AND A, D').rr('d').and('a').sr('a');
    this.add(0xA3, 4, 'AND A, E').rr('e').and('a').sr('a');
    this.add(0xA4, 4, 'AND A, H').rr('h').and('a').sr('a');
    this.add(0xA5, 4, 'AND A, L').rr('l').and('a').sr('a');

    this.add(0xA6, 8, 'AND A, (HL)').rr('hl').rm().and('a').sr('a');
    this.add(0xE6, 8, 'AND A, byte').rb().and('a').sr('a');

    this.add(0xB7, 4, 'OR A, A').rr('a').or('a').sr('a');
    this.add(0xB0, 4, 'OR A, B').rr('b').or('a').sr('a');
    this.add(0xB1, 4, 'OR A, C').rr('c').or('a').sr('a');
    this.add(0xB2, 4, 'OR A, D').rr('d').or('a').sr('a');
    this.add(0xB3, 4, 'OR A, E').rr('e').or('a').sr('a');
    this.add(0xB4, 4, 'OR A, H').rr('h').or('a').sr('a');
    this.add(0xB5, 4, 'OR A, L').rr('l').or('a').sr('a');

    this.add(0xB6, 8, 'OR A, (HL)').rr('hl').rm().or('a').sr('a');
    this.add(0xF6, 8, 'OR A, byte').rb().or('a').sr('a');

    this.add(0xAF, 4, 'XOR A, A').rr('a').xor('a').sr('a');
    this.add(0xA8, 4, 'XOR A, B').rr('b').xor('a').sr('a');
    this.add(0xA9, 4, 'XOR A, C').rr('c').xor('a').sr('a');
    this.add(0xAA, 4, 'XOR A, D').rr('d').xor('a').sr('a');
    this.add(0xAB, 4, 'XOR A, E').rr('e').xor('a').sr('a');
    this.add(0xAC, 4, 'XOR A, H').rr('h').xor('a').sr('a');
    this.add(0xAD, 4, 'XOR A, L').rr('l').xor('a').sr('a');

    this.add(0xAE, 8, 'XOR A, (HL)').rr('hl').rm().xor('a').sr('a');
    this.add(0xEE, 8, 'XOR A, byte').rb().xor('a').sr('a');

    this.add(0xBF, 4, 'CP A, A').rr('a').subr('a');
    this.add(0xB8, 4, 'CP A, B').rr('b').subr('a');
    this.add(0xB9, 4, 'CP A, C').rr('c').subr('a');
    this.add(0xBA, 4, 'CP A, D').rr('d').subr('a');
    this.add(0xBB, 4, 'CP A, E').rr('e').subr('a');
    this.add(0xBC, 4, 'CP A, H').rr('h').subr('a');
    this.add(0xBD, 4, 'CP A, L').rr('l').subr('a');

    this.add(0xBE, 8, 'CP A, (HL)').rr('hl').rm().subr('a');
    this.add(0xFE, 8, 'CP A, byte').rb().subr('a');

    this.add(0x3C, 4, 'INC A').incr('a');
    this.add(0x04, 4, 'INC B').incr('b');
    this.add(0x0C, 4, 'INC C').incr('c');
    this.add(0x14, 4, 'INC D').incr('d');
    this.add(0x1C, 4, 'INC E').incr('e');
    this.add(0x24, 4, 'INC H').incr('h');
    this.add(0x2C, 4, 'INC L').incr('l');

    this.add(0x34, 12, 'INC (HL)').rr('hl').rm().inc(true).sra('hl');

    this.add(0x3D, 4, 'DEC A').decr('a');
    this.add(0x05, 4, 'DEC B').decr('b');
    this.add(0x0D, 4, 'DEC C').decr('c');
    this.add(0x15, 4, 'DEC D').decr('d');
    this.add(0x1D, 4, 'DEC E').decr('e');
    this.add(0x25, 4, 'DEC H').decr('h');
    this.add(0x2D, 4, 'DEC L').decr('l');

    this.add(0x35, 12, 'DEC (HL)').rr('hl').rm().dec(true).sra('hl');

    this.add(0x09, 8, 'ADD HL, BC').rr('bc').sumwr('hl').sr('hl');
    this.add(0x19, 8, 'ADD HL, DE').rr('de').sumwr('hl').sr('hl');
    this.add(0x29, 8, 'ADD HL, HL').rr('hl').sumwr('hl').sr('hl');
    this.add(0x39, 8, 'ADD HL, SP').rr('sp').sumwr('hl').sr('hl');

    this.add(0xE8, 16, 'ADD SP, sbyte').rr('sp').sumsb().sr('sp');

    this.add(0x03, 8, 'INC BC').rr('bc').inc().sr('bc');
    this.add(0x13, 8, 'INC DE').rr('de').inc().sr('de');
    this.add(0x23, 8, 'INC HL').rr('hl').inc().sr('hl');
    this.add(0x33, 8, 'INC SP').rr('sp').inc().sr('sp');

    this.add(0x0B, 8, 'DEC BC').rr('bc').dec().sr('bc');
    this.add(0x1B, 8, 'DEC DE').rr('de').dec().sr('de');
    this.add(0x2B, 8, 'DEC HL').rr('hl').dec().sr('hl');
    this.add(0x3B, 8, 'DEC SP').rr('sp').dec().sr('sp');

    this.add(0x27, 4, 'DAA').rr('a').da().sr('a');
    this.add(0x2F, 4, 'CPL').rr('a').cpl().sr('a');

    this.add(0x3F, 4, 'CCF').ccf();
    this.add(0x37, 4, 'SCF').scf();

    this.add(0x00, 4, 'NOP').nop();

    this.add(0x76, 4, 'HALT').halt();
    this.add(0x10, 4, 'STOP').stop();

    this.add(0xF3, 4, 'DI').ti(false);
    this.add(0xFB, 4, 'EI').ti(true);

    this.add(0x07, 4, 'RLCA').rr('a').rtl().sr('a');
    this.add(0x17, 4, 'RLA').rr('a').rtlc().sr('a');

    this.add(0x0F, 4, 'RRCA').rr('a').rtr().sr('a');
    this.add(0x1F, 4, 'RRA').rr('a').rtrc().sr('a');

    this.add(0xC3, 12, 'JP word').rw().sr('pc');

    this.add(0xC2, 12, 'JP NZ, word').cfl('z', false, 2).rw().sr('pc');
    this.add(0xCA, 12, 'JP Z, word').cfl('z', true, 2).rw().sr('pc');

    this.add(0xD2, 12, 'JP NC, word').cfl('c', false, 2).rw().sr('pc');
    this.add(0xDA, 12, 'JP C, word').cfl('c', true, 2).rw().sr('pc');

    this.add(0xE9, 4, 'JP (HL)').rr('hl').rm().sr('pc');

    this.add(0x18, 8, 'JR sbyte').rsb().ar('pc');

    this.add(0x20, 8, 'JR NZ, sbyte').cfl('z', false, 1).rsb().ar('pc');
    this.add(0x28, 8, 'JR Z, sbyte').cfl('z', true, 1).rsb().ar('pc');

    this.add(0x30, 8, 'JR NC, sbyte').cfl('c', false, 1).rsb().ar('pc');
    this.add(0x38, 8, 'JR C, sbyte').cfl('c', true, 1).rsb().ar('pc');

    this.add(0xCD, 12, 'CALL word').nia().push().rw().sr('pc');

    this.add(0xC4, 12, 'CALL NZ, word').cfl('z', false, 2).nia().push().rw().sr('pc');
    this.add(0xCC, 12, 'CALL Z, word').cfl('z', true, 2).nia().push().rw().sr('pc');

    this.add(0xD4, 12, 'CALL NC, word').cfl('c', false, 2).nia().push().rw().sr('pc');
    this.add(0xDC, 12, 'CALL C, word').cfl('c', true, 2).nia().push().rw().sr('pc');

    this.add(0xC7, 32, 'RST 00H').rr('pc').push().sva('pc', 0x00);
    this.add(0xCF, 32, 'RST 08H').rr('pc').push().sva('pc', 0x08);
    this.add(0xD7, 32, 'RST 10H').rr('pc').push().sva('pc', 0x10);
    this.add(0xDF, 32, 'RST 18H').rr('pc').push().sva('pc', 0x18);
    this.add(0xE7, 32, 'RST 20H').rr('pc').push().sva('pc', 0x20);
    this.add(0xEF, 32, 'RST 28H').rr('pc').push().sva('pc', 0x28);
    this.add(0xF7, 32, 'RST 30H').rr('pc').push().sva('pc', 0x30);
    this.add(0xFF, 32, 'RST 38H').rr('pc').push().sva('pc', 0x38);

    this.add(0xC9, 8, 'RET').pop().sr('pc');

    this.add(0xC0, 8, 'RET NZ').cfl('z', false).pop().sr('pc');
    this.add(0xC8, 8, 'RET Z').cfl('z', true).pop().sr('pc');

    this.add(0xD0, 8, 'RET NC').cfl('c', false).pop().sr('pc');
    this.add(0xD8, 8, 'RET C').cfl('c', true).pop().sr('pc');

    this.add(0xD9, 8, 'RETI').pop().sr('pc').ti(true);
  }
}
