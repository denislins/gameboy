import OpcodeTable from './opcodeTable.js';

class Opcodes {
  constructor() {
    this.table = new OpcodeTable();
    this.cbtable = new OpcodeTable();

    this.initOpcodeTable();
    this.initCbOpcodeTable();
  }

  get(opcode) {
    if (opcode === 0xcb) {
      return this.cbtable.get(opcode);
    }

    return this.table.get(opcode);
  }

  initOpcodeTable() {
    this.table.add(0x06, 'LD B, byte').rb().sr('b');
    this.table.add(0x0e, 'LD C, byte').rb().sr('c');
    this.table.add(0x16, 'LD D, byte').rb().sr('d');
    this.table.add(0x1e, 'LD E, byte').rb().sr('e');
    this.table.add(0x26, 'LD H, byte').rb().sr('h');
    this.table.add(0x2e, 'LD L, byte').rb().sr('l');

    this.table.add(0x7f, 'LD A, A').rr('a').sr('a');
    this.table.add(0x78, 'LD A, B').rr('b').sr('a');
    this.table.add(0x79, 'LD A, C').rr('c').sr('a');
    this.table.add(0x7a, 'LD A, D').rr('d').sr('a');
    this.table.add(0x7b, 'LD A, E').rr('e').sr('a');
    this.table.add(0x7c, 'LD A, H').rr('h').sr('a');
    this.table.add(0x7d, 'LD A, L').rr('l').sr('a');

    this.table.add(0x47, 'LD B, A').rr('a').sr('b');
    this.table.add(0x40, 'LD B, B').rr('b').sr('b');
    this.table.add(0x41, 'LD B, C').rr('c').sr('b');
    this.table.add(0x42, 'LD B, D').rr('d').sr('b');
    this.table.add(0x43, 'LD B, E').rr('e').sr('b');
    this.table.add(0x44, 'LD B, H').rr('h').sr('b');
    this.table.add(0x45, 'LD B, L').rr('l').sr('b');

    this.table.add(0x4f, 'LD C, A').rr('a').sr('c');
    this.table.add(0x48, 'LD C, B').rr('b').sr('c');
    this.table.add(0x49, 'LD C, C').rr('c').sr('c');
    this.table.add(0x4a, 'LD C, D').rr('d').sr('c');
    this.table.add(0x4b, 'LD C, E').rr('e').sr('c');
    this.table.add(0x4c, 'LD C, H').rr('h').sr('c');
    this.table.add(0x4d, 'LD C, L').rr('l').sr('c');

    this.table.add(0x57, 'LD D, A').rr('a').sr('d');
    this.table.add(0x50, 'LD D, B').rr('b').sr('d');
    this.table.add(0x51, 'LD D, C').rr('c').sr('d');
    this.table.add(0x52, 'LD D, D').rr('d').sr('d');
    this.table.add(0x53, 'LD D, E').rr('e').sr('d');
    this.table.add(0x54, 'LD D, H').rr('h').sr('d');
    this.table.add(0x55, 'LD D, L').rr('l').sr('d');

    this.table.add(0x5f, 'LD E, A').rr('a').sr('e');
    this.table.add(0x58, 'LD E, B').rr('b').sr('e');
    this.table.add(0x59, 'LD E, C').rr('c').sr('e');
    this.table.add(0x5a, 'LD E, D').rr('d').sr('e');
    this.table.add(0x5b, 'LD E, E').rr('e').sr('e');
    this.table.add(0x5c, 'LD E, H').rr('h').sr('e');
    this.table.add(0x5d, 'LD E, L').rr('l').sr('e');

    this.table.add(0x67, 'LD H, A').rr('a').sr('h');
    this.table.add(0x60, 'LD H, B').rr('b').sr('h');
    this.table.add(0x61, 'LD H, C').rr('c').sr('h');
    this.table.add(0x62, 'LD H, D').rr('d').sr('h');
    this.table.add(0x63, 'LD H, E').rr('e').sr('h');
    this.table.add(0x64, 'LD H, H').rr('h').sr('h');
    this.table.add(0x65, 'LD H, L').rr('l').sr('h');

    this.table.add(0x6f, 'LD L, A').rr('a').sr('l');
    this.table.add(0x68, 'LD L, B').rr('b').sr('l');
    this.table.add(0x69, 'LD L, C').rr('c').sr('l');
    this.table.add(0x6a, 'LD L, D').rr('d').sr('l');
    this.table.add(0x6b, 'LD L, E').rr('e').sr('l');
    this.table.add(0x6c, 'LD L, H').rr('h').sr('l');
    this.table.add(0x6d, 'LD L, L').rr('l').sr('l');

    this.table.add(0x7e, 'LD A, (HL)').rr('hl').rm().sr('a');
    this.table.add(0x46, 'LD B, (HL)').rr('hl').rm().sr('b');
    this.table.add(0x4e, 'LD C, (HL)').rr('hl').rm().sr('c');
    this.table.add(0x56, 'LD D, (HL)').rr('hl').rm().sr('d');
    this.table.add(0x5e, 'LD E, (HL)').rr('hl').rm().sr('e');
    this.table.add(0x66, 'LD H, (HL)').rr('hl').rm().sr('h');
    this.table.add(0x6e, 'LD L, (HL)').rr('hl').rm().sr('l');

    this.table.add(0x70, 'LD (HL), B').rr('b').sra('hl');
    this.table.add(0x71, 'LD (HL), C').rr('c').sra('hl');
    this.table.add(0x72, 'LD (HL), D').rr('d').sra('hl');
    this.table.add(0x73, 'LD (HL), E').rr('e').sra('hl');
    this.table.add(0x74, 'LD (HL), H').rr('h').sra('hl');
    this.table.add(0x75, 'LD (HL), L').rr('l').sra('hl');

    this.table.add(0x36, 'LD (HL), byte').rb().sra('hl');

    this.table.add(0x0a, 'LD A, (BC)').rra('bc').sr('a');
    this.table.add(0x1a, 'LD A, (DE)').rra('de').sr('a');
    this.table.add(0x7e, 'LD A, (HL)').rra('hl').sr('a');

    this.table.add(0x02, 'LD (BC), A').rr('a').sra('bc');
    this.table.add(0x12, 'LD (DE), A').rr('a').sra('de');
    this.table.add(0x77, 'LD (HL), A').rr('a').sra('hl');

    this.table.add(0xfa, 'LD A, (word)').rw().rm().sr('a');
    this.table.add(0xea, 'LD (word), A').rr('a').sda();

    this.table.add(0x3e, 'LD A, byte').rb().sr('a');

    this.table.add(0xf2, 'LD A, (C)').rr('c').rm(0xff00).sr('a');
    this.table.add(0xe2, 'LD (C), A').rr('a').sra('c', 0xff00);

    this.table.add(0x3a, 'LD A, (HL-)').decr('hl').rm().sr('a');
    this.table.add(0x32, 'LD (HL-), A').rr('a').sra('hl').decr('hl');

    this.table.add(0x2a, 'LD A, (HL+)').incr('hl').rm().sr('a');
    this.table.add(0x22, 'LD (HL+), A').rr('a').sra('hl').incr('hl');

    this.table.add(0xe0, 'LDH (byte), A').rr('a').sda(0xff00);
    this.table.add(0xf0, 'LDH A, (byte)').rb(0xff00).sr('a');

    this.table.add(0x01, 'LD BC, word').rw().sr('bc');
    this.table.add(0x11, 'LD DE, word').rw().sr('de');
    this.table.add(0x21, 'LD HL, word').rw().sr('hl');
    this.table.add(0x31, 'LD SP, word').rw().sr('sp');

    this.table.add(0xf9, 'LD SP, HL').rr('hl').sr('sp');
    this.table.add(0xf8, 'LD HL, SP + byte').rr('sp').sumsb().sr('hl');

    this.table.add(0x08, 'LD (word), SP').rr('sp').sda();

    this.table.add(0xf5, 'PUSH AF').decr('sp').rr('a').sra('sp').decr('sp').rr('f').sra('sp');
    this.table.add(0xc5, 'PUSH BC').decr('sp').rr('b').sra('sp').decr('sp').rr('c').sra('sp');
    this.table.add(0xd5, 'PUSH DE').decr('sp').rr('d').sra('sp').decr('sp').rr('e').sra('sp');
    this.table.add(0xe5, 'PUSH HL').decr('sp').rr('h').sra('sp').decr('sp').rr('l').sra('sp');

    this.table.add(0xf1, 'POP AF').rra('sp').sr('f').incr('sp').rra('sp').sr('a').incr('sp');
    this.table.add(0xc1, 'POP BC').rra('sp').sr('c').incr('sp').rra('sp').sr('b').incr('sp');
    this.table.add(0xd1, 'POP DE').rra('sp').sr('e').incr('sp').rra('sp').sr('d').incr('sp');
    this.table.add(0xe1, 'POP HL').rra('sp').sr('l').incr('sp').rra('sp').sr('h').incr('sp');

    this.table.add(0x87, 'ADD A, A').rr('a').sumr('a').sr('a');
    this.table.add(0x80, 'ADD A, B').rr('b').sumr('a').sr('a');
    this.table.add(0x81, 'ADD A, C').rr('c').sumr('a').sr('a');
    this.table.add(0x82, 'ADD A, D').rr('d').sumr('a').sr('a');
    this.table.add(0x83, 'ADD A, E').rr('e').sumr('a').sr('a');
    this.table.add(0x84, 'ADD A, H').rr('h').sumr('a').sr('a');
    this.table.add(0x85, 'ADD A, L').rr('l').sumr('a').sr('a');

    this.table.add(0x86, 'ADD A, (HL)').rr('hl').rm().sumr('a').sr('a');
    this.table.add(0xc6, 'ADD A, byte').rb().sumr('a').sr('a');

    this.table.add(0x8f, 'ADC A, A').rr('a').sumrc('a').sr('a');
    this.table.add(0x88, 'ADC A, B').rr('b').sumrc('a').sr('a');
    this.table.add(0x89, 'ADC A, C').rr('c').sumrc('a').sr('a');
    this.table.add(0x8a, 'ADC A, D').rr('d').sumrc('a').sr('a');
    this.table.add(0x8b, 'ADC A, E').rr('e').sumrc('a').sr('a');
    this.table.add(0x8c, 'ADC A, H').rr('h').sumrc('a').sr('a');
    this.table.add(0x8d, 'ADC A, L').rr('l').sumrc('a').sr('a');

    this.table.add(0x8e, 'ADC A, (HL)').rr('hl').rm().sumrc('a').sr('a');
    this.table.add(0xce, 'ADC A, byte').rb().sumrc('a').sr('a');

    this.table.add(0x97, 'SUB A, A').rr('a').subr('a').sr('a');
    this.table.add(0x90, 'SUB A, B').rr('b').subr('a').sr('a');
    this.table.add(0x91, 'SUB A, C').rr('c').subr('a').sr('a');
    this.table.add(0x92, 'SUB A, D').rr('d').subr('a').sr('a');
    this.table.add(0x93, 'SUB A, E').rr('e').subr('a').sr('a');
    this.table.add(0x94, 'SUB A, H').rr('h').subr('a').sr('a');
    this.table.add(0x95, 'SUB A, L').rr('l').subr('a').sr('a');

    this.table.add(0x96, 'SUB A, (HL)').rr('hl').rm().subr('a').sr('a');
    this.table.add(0xd6, 'SUB A, byte').rb().subr('a').sr('a');

    this.table.add(0x9f, 'SBC A, A').rr('a').subrc('a').sr('a');
    this.table.add(0x98, 'SBC A, B').rr('b').subrc('a').sr('a');
    this.table.add(0x99, 'SBC A, C').rr('c').subrc('a').sr('a');
    this.table.add(0x9a, 'SBC A, D').rr('d').subrc('a').sr('a');
    this.table.add(0x9b, 'SBC A, E').rr('e').subrc('a').sr('a');
    this.table.add(0x9c, 'SBC A, H').rr('h').subrc('a').sr('a');
    this.table.add(0x9d, 'SBC A, L').rr('l').subrc('a').sr('a');

    this.table.add(0x9e, 'SBC A, (HL)').rr('hl').rm().subrc('a').sr('a');

    this.table.add(0xa7, 'AND A, A').rr('a').and('a').sr('a');
    this.table.add(0xa0, 'AND A, B').rr('b').and('a').sr('a');
    this.table.add(0xa1, 'AND A, C').rr('c').and('a').sr('a');
    this.table.add(0xa2, 'AND A, D').rr('d').and('a').sr('a');
    this.table.add(0xa3, 'AND A, E').rr('e').and('a').sr('a');
    this.table.add(0xa4, 'AND A, H').rr('h').and('a').sr('a');
    this.table.add(0xa5, 'AND A, L').rr('l').and('a').sr('a');

    this.table.add(0xa6, 'AND A, (HL)').rr('hl').rm().and('a').sr('a');
    this.table.add(0xe6, 'AND A, byte').rb().and('a').sr('a');

    this.table.add(0xb7, 'OR A, A').rr('a').or('a').sr('a');
    this.table.add(0xb0, 'OR A, B').rr('b').or('a').sr('a');
    this.table.add(0xb1, 'OR A, C').rr('c').or('a').sr('a');
    this.table.add(0xb2, 'OR A, D').rr('d').or('a').sr('a');
    this.table.add(0xb3, 'OR A, E').rr('e').or('a').sr('a');
    this.table.add(0xb4, 'OR A, H').rr('h').or('a').sr('a');
    this.table.add(0xb5, 'OR A, L').rr('l').or('a').sr('a');

    this.table.add(0xb6, 'OR A, (HL)').rr('hl').rm().or('a').sr('a');
    this.table.add(0xf6, 'OR A, byte').rb().or('a').sr('a');

    this.table.add(0xaf, 'XOR A, A').rr('a').xor('a').sr('a');
    this.table.add(0xa8, 'XOR A, B').rr('b').xor('a').sr('a');
    this.table.add(0xa9, 'XOR A, C').rr('c').xor('a').sr('a');
    this.table.add(0xaa, 'XOR A, D').rr('d').xor('a').sr('a');
    this.table.add(0xab, 'XOR A, E').rr('e').xor('a').sr('a');
    this.table.add(0xac, 'XOR A, H').rr('h').xor('a').sr('a');
    this.table.add(0xad, 'XOR A, L').rr('l').xor('a').sr('a');

    this.table.add(0xae, 'XOR A, (HL)').rr('hl').rm().xor('a').sr('a');
    this.table.add(0xee, 'XOR A, byte').rb().xor('a').sr('a');

    this.table.add(0xbf, 'CP A, A').rr('a').subr('a');
    this.table.add(0xb8, 'CP A, B').rr('b').subr('a');
    this.table.add(0xb9, 'CP A, C').rr('c').subr('a');
    this.table.add(0xba, 'CP A, D').rr('d').subr('a');
    this.table.add(0xbb, 'CP A, E').rr('e').subr('a');
    this.table.add(0xbc, 'CP A, H').rr('h').subr('a');
    this.table.add(0xbd, 'CP A, L').rr('l').subr('a');

    this.table.add(0xbe, 'CP A, (HL)').rr('hl').rm().subr('a');
    this.table.add(0xfe, 'CP A, byte').rb().subr('a');

    this.table.add(0x3c, 'INC A').incr('a');
    this.table.add(0x04, 'INC B').incr('b');
    this.table.add(0x0c, 'INC C').incr('c');
    this.table.add(0x14, 'INC D').incr('d');
    this.table.add(0x1c, 'INC E').incr('e');
    this.table.add(0x24, 'INC H').incr('h');
    this.table.add(0x2c, 'INC L').incr('l');

    this.table.add(0x34, 'INC (HL)').rr('hl').rm().inc().sra('hl');

    this.table.add(0x3d, 'DEC A').decr('a');
    this.table.add(0x05, 'DEC B').decr('b');
    this.table.add(0x0d, 'DEC C').decr('c');
    this.table.add(0x15, 'DEC D').decr('d');
    this.table.add(0x1d, 'DEC E').decr('e');
    this.table.add(0x25, 'DEC H').decr('h');
    this.table.add(0x2d, 'DEC L').decr('l');

    this.table.add(0x35, 'DEC (HL)').rr('hl').rm().dec().sra('hl');

    this.table.add(0x09, 'ADD HL, BC').rr('bc').sumr('hl').sr('hl');
    this.table.add(0x19, 'ADD HL, DE').rr('de').sumr('hl').sr('hl');
    this.table.add(0x29, 'ADD HL, HL').rr('hl').sumr('hl').sr('hl');
    this.table.add(0x39, 'ADD HL, SP').rr('sp').sumr('hl').sr('hl');

    this.table.add(0xe8, 'ADD HL, byte').rsb().sumr('hl').sr('hl');

    this.table.add(0x03, 'INC BC').incr('bc');
    this.table.add(0x03, 'INC DE').incr('de');
    this.table.add(0x03, 'INC HL').incr('hl');
    this.table.add(0x03, 'INC SP').incr('sp');

    this.table.add(0x0b, 'DEC BC').decr('bc');
    this.table.add(0x1b, 'DEC DE').decr('de');
    this.table.add(0x2b, 'DEC HL').decr('hl');
    this.table.add(0x3b, 'DEC SP').decr('sp');

    this.table.add(0x27, 'DAA').rr('a').da().sr('a');

    this.table.add(0x2f, 'CPL').rr('a').cpl().sr('a');

    this.table.add(0x3f, 'CCF').ccf();
    this.table.add(0x37, 'SCF').scf();

    this.table.add(0x00, 'NOP').nop();

    this.table.add(0x76, 'HALT').halt();
    this.table.add(0x10, 'STOP').stop();

    this.table.add(0xf3, 'DI').ti(false);
    this.table.add(0xfb, 'EI').ti(true);

    this.table.add(0x07, 'RLCA').rr('a').rtl().sr('a');
    this.table.add(0x17, 'RLA').rr('a').rtlc().sr('a');

    this.table.add(0x0f, 'RRCA').rr('a').rtr().sr('a');
    this.table.add(0x1f, 'RRA').rr('a').rtrc().sr('a');

    this.table.add(0xc3, 'JP word').rw().sr('pc');

    this.table.add(0xc2, 'JP NZ, word').cf('z', false).rw().sr('pc');
    this.table.add(0xca, 'JP Z, word').cf('z', true).rw().sr('pc');

    this.table.add(0xd2, 'JP NC, word').cf('c', false).rw().sr('pc');
    this.table.add(0xda, 'JP C, word').cf('c', true).rw().sr('pc');

    this.table.add(0xe9, 'JP (HL)').rr('hl').rm().sr('pc');

    this.table.add(0x18, 'JR byte').rsb().ar('pc');

    this.table.add(0x20, 'JR NZ, word').cf('z', false).rsb().ar('pc');
    this.table.add(0x28, 'JR Z, word').cf('z', true).rsb().ar('pc');

    this.table.add(0x30, 'JR NC, word').cf('c', false).rsb().ar('pc');
    this.table.add(0x38, 'JR C, word').cf('c', true).rsb().ar('pc');
  }

  initCbOpcodeTable() {
    this.cbtable.add(0x37, 'SWAP A').rr('a').swap().sr('a');
    this.cbtable.add(0x30, 'SWAP B').rr('b').swap().sr('b');
    this.cbtable.add(0x31, 'SWAP C').rr('c').swap().sr('c');
    this.cbtable.add(0x32, 'SWAP D').rr('d').swap().sr('d');
    this.cbtable.add(0x33, 'SWAP E').rr('e').swap().sr('e');
    this.cbtable.add(0x34, 'SWAP H').rr('h').swap().sr('h');
    this.cbtable.add(0x35, 'SWAP L').rr('l').swap().sr('l');

    this.cbtable.add(0x36, 'SWAP (HL)').rr('hl').rm().swap().sra('hl');

    this.cbtable.add(0x07, 'RLC A').rr('a').rtl().sr('a');
    this.cbtable.add(0x00, 'RLC B').rr('b').rtl().sr('b');
    this.cbtable.add(0x01, 'RLC C').rr('c').rtl().sr('c');
    this.cbtable.add(0x02, 'RLC D').rr('d').rtl().sr('d');
    this.cbtable.add(0x03, 'RLC E').rr('e').rtl().sr('e');
    this.cbtable.add(0x04, 'RLC H').rr('h').rtl().sr('h');
    this.cbtable.add(0x05, 'RLC L').rr('l').rtl().sr('l');

    this.cbtable.add(0x06, 'RLC (HL)').rr('hl').rm().rtl().sra('hl');

    this.cbtable.add(0x17, 'RL A').rr('a').rtlc().sr('a');
    this.cbtable.add(0x10, 'RL B').rr('b').rtlc().sr('b');
    this.cbtable.add(0x11, 'RL C').rr('c').rtlc().sr('c');
    this.cbtable.add(0x12, 'RL D').rr('d').rtlc().sr('d');
    this.cbtable.add(0x13, 'RL E').rr('e').rtlc().sr('e');
    this.cbtable.add(0x14, 'RL H').rr('h').rtlc().sr('h');
    this.cbtable.add(0x15, 'RL L').rr('l').rtlc().sr('l');

    this.cbtable.add(0x16, 'RL (HL)').rr('hl').rm().rtlc().sra('hl');

    this.cbtable.add(0x0f, 'RRC A').rr('a').rtr().sr('a');
    this.cbtable.add(0x08, 'RRC B').rr('b').rtr().sr('b');
    this.cbtable.add(0x09, 'RRC C').rr('c').rtr().sr('c');
    this.cbtable.add(0x0a, 'RRC D').rr('d').rtr().sr('d');
    this.cbtable.add(0x0b, 'RRC E').rr('e').rtr().sr('e');
    this.cbtable.add(0x0c, 'RRC H').rr('h').rtr().sr('h');
    this.cbtable.add(0x0d, 'RRC L').rr('l').rtr().sr('l');

    this.cbtable.add(0x0e, 'RRC (HL)').rr('hl').rm().rtr().sra('hl');

    this.cbtable.add(0x1f, 'RR A').rr('a').rtrc().sr('a');
    this.cbtable.add(0x18, 'RR B').rr('b').rtrc().sr('b');
    this.cbtable.add(0x19, 'RR C').rr('c').rtrc().sr('c');
    this.cbtable.add(0x1a, 'RR D').rr('d').rtrc().sr('d');
    this.cbtable.add(0x1b, 'RR E').rr('e').rtrc().sr('e');
    this.cbtable.add(0x1c, 'RR H').rr('h').rtrc().sr('h');
    this.cbtable.add(0x1d, 'RR L').rr('l').rtrc().sr('l');

    this.cbtable.add(0x1e, 'RR (HL)').rr('hl').rm().rtrc().sra('hl');

    this.cbtable.add(0x27, 'SLA A').rr('a').shl().sr('a');
    this.cbtable.add(0x20, 'SLA B').rr('b').shl().sr('b');
    this.cbtable.add(0x21, 'SLA C').rr('c').shl().sr('c');
    this.cbtable.add(0x22, 'SLA D').rr('d').shl().sr('d');
    this.cbtable.add(0x23, 'SLA E').rr('e').shl().sr('e');
    this.cbtable.add(0x24, 'SLA H').rr('h').shl().sr('h');
    this.cbtable.add(0x25, 'SLA L').rr('l').shl().sr('l');

    this.cbtable.add(0x26, 'SLA (HL)').rr('hl').rm().shl().sra('hl');

    this.cbtable.add(0x2f, 'SRA A').rr('a').shra().sr('a');
    this.cbtable.add(0x28, 'SRA B').rr('b').shra().sr('b');
    this.cbtable.add(0x29, 'SRA C').rr('c').shra().sr('c');
    this.cbtable.add(0x2a, 'SRA D').rr('d').shra().sr('d');
    this.cbtable.add(0x2b, 'SRA E').rr('e').shra().sr('e');
    this.cbtable.add(0x2c, 'SRA H').rr('h').shra().sr('h');
    this.cbtable.add(0x2d, 'SRA L').rr('l').shra().sr('l');

    this.cbtable.add(0x2e, 'SRA (HL)').rr('hl').rm().shra().sra('hl');

    this.cbtable.add(0x3f, 'SRL A').rr('a').shrl().sr('a');
    this.cbtable.add(0x38, 'SRL B').rr('b').shrl().sr('b');
    this.cbtable.add(0x39, 'SRL C').rr('c').shrl().sr('c');
    this.cbtable.add(0x3a, 'SRL D').rr('d').shrl().sr('d');
    this.cbtable.add(0x3b, 'SRL E').rr('e').shrl().sr('e');
    this.cbtable.add(0x3c, 'SRL H').rr('h').shrl().sr('h');
    this.cbtable.add(0x3d, 'SRL L').rr('l').shrl().sr('l');

    this.cbtable.add(0x3e, 'SRL (HL)').rr('hl').rm().shrl().sra('hl');

    for (let i = 0; i < 8; i++) {
      this.cbtable.add(0x47 + 0x08 * i, `BIT ${i}, A`).rr('a').bit(i);
      this.cbtable.add(0x40 + 0x08 * i, `BIT ${i}, B`).rr('b').bit(i);
      this.cbtable.add(0x41 + 0x08 * i, `BIT ${i}, C`).rr('c').bit(i);
      this.cbtable.add(0x42 + 0x08 * i, `BIT ${i}, D`).rr('d').bit(i);
      this.cbtable.add(0x43 + 0x08 * i, `BIT ${i}, E`).rr('e').bit(i);
      this.cbtable.add(0x44 + 0x08 * i, `BIT ${i}, H`).rr('h').bit(i);
      this.cbtable.add(0x45 + 0x08 * i, `BIT ${i}, L`).rr('l').bit(i);

      this.cbtable.add(0x46 + 0x08 * i, `BIT ${i}, (HL)`).rr('hl').rm().bit(i);

      this.cbtable.add(0xc7 + 0x08 * i, `SET ${i}, A`).rr('a').setb(i).sr('a');
      this.cbtable.add(0xc0 + 0x08 * i, `SET ${i}, B`).rr('b').setb(i).sr('b');
      this.cbtable.add(0xc1 + 0x08 * i, `SET ${i}, C`).rr('c').setb(i).sr('c');
      this.cbtable.add(0xc2 + 0x08 * i, `SET ${i}, D`).rr('d').setb(i).sr('d');
      this.cbtable.add(0xc3 + 0x08 * i, `SET ${i}, E`).rr('e').setb(i).sr('e');
      this.cbtable.add(0xc4 + 0x08 * i, `SET ${i}, H`).rr('h').setb(i).sr('h');
      this.cbtable.add(0xc5 + 0x08 * i, `SET ${i}, L`).rr('l').setb(i).sr('l');

      this.cbtable.add(0xc6 + 0x08 * i, `SET ${i}, (HL)`).rr('hl').rm().setb(i).sra('hl');

      this.cbtable.add(0x87 + 0x08 * i, `RES ${i}, A`).rr('a').resb(i).sr('a');
      this.cbtable.add(0x80 + 0x08 * i, `RES ${i}, B`).rr('b').resb(i).sr('b');
      this.cbtable.add(0x81 + 0x08 * i, `RES ${i}, C`).rr('c').resb(i).sr('c');
      this.cbtable.add(0x82 + 0x08 * i, `RES ${i}, D`).rr('d').resb(i).sr('d');
      this.cbtable.add(0x83 + 0x08 * i, `RES ${i}, E`).rr('e').resb(i).sr('e');
      this.cbtable.add(0x84 + 0x08 * i, `RES ${i}, H`).rr('h').resb(i).sr('h');
      this.cbtable.add(0x85 + 0x08 * i, `RES ${i}, L`).rr('l').resb(i).sr('l');

      this.cbtable.add(0x86 + 0x08 * i, `RES ${i}, (HL)`).rr('hl').rm().resb(i).sra('hl');
    }
  }
}

export default new Opcodes();
