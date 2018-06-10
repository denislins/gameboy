import Operation from './operation.js';

class Opcodes {
  constructor() {
    this.opcodes = {};
    this.initOpcodes();
  }

  get(opcode) {
    return this.opcodes[opcode];
  }

  add(opcode, repr) {
    return this.opcodes[opcode] = new Operation(repr);
  }

  initOpcodes() {
    this.add(0x06, 'LD B, byte').rb().sr('b');
    this.add(0x0e, 'LD C, byte').rb().sr('c');
    this.add(0x16, 'LD D, byte').rb().sr('d');
    this.add(0x1e, 'LD E, byte').rb().sr('e');
    this.add(0x26, 'LD H, byte').rb().sr('h');
    this.add(0x2e, 'LD L, byte').rb().sr('l');

    this.add(0x7f, 'LD A, A').rr('a').sr('a');
    this.add(0x78, 'LD A, B').rr('b').sr('a');
    this.add(0x79, 'LD A, C').rr('c').sr('a');
    this.add(0x7a, 'LD A, D').rr('d').sr('a');
    this.add(0x7b, 'LD A, E').rr('e').sr('a');
    this.add(0x7c, 'LD A, H').rr('h').sr('a');
    this.add(0x7d, 'LD A, L').rr('l').sr('a');

    this.add(0x47, 'LD B, A').rr('a').sr('b');
    this.add(0x40, 'LD B, B').rr('b').sr('b');
    this.add(0x41, 'LD B, C').rr('c').sr('b');
    this.add(0x42, 'LD B, D').rr('d').sr('b');
    this.add(0x43, 'LD B, E').rr('e').sr('b');
    this.add(0x44, 'LD B, H').rr('h').sr('b');
    this.add(0x45, 'LD B, L').rr('l').sr('b');

    this.add(0x4f, 'LD C, A').rr('a').sr('c');
    this.add(0x48, 'LD C, B').rr('b').sr('c');
    this.add(0x49, 'LD C, C').rr('c').sr('c');
    this.add(0x4a, 'LD C, D').rr('d').sr('c');
    this.add(0x4b, 'LD C, E').rr('e').sr('c');
    this.add(0x4c, 'LD C, H').rr('h').sr('c');
    this.add(0x4d, 'LD C, L').rr('l').sr('c');

    this.add(0x57, 'LD D, A').rr('a').sr('d');
    this.add(0x50, 'LD D, B').rr('b').sr('d');
    this.add(0x51, 'LD D, C').rr('c').sr('d');
    this.add(0x52, 'LD D, D').rr('d').sr('d');
    this.add(0x53, 'LD D, E').rr('e').sr('d');
    this.add(0x54, 'LD D, H').rr('h').sr('d');
    this.add(0x55, 'LD D, L').rr('l').sr('d');

    this.add(0x5f, 'LD E, A').rr('a').sr('e');
    this.add(0x58, 'LD E, B').rr('b').sr('e');
    this.add(0x59, 'LD E, C').rr('c').sr('e');
    this.add(0x5a, 'LD E, D').rr('d').sr('e');
    this.add(0x5b, 'LD E, E').rr('e').sr('e');
    this.add(0x5c, 'LD E, H').rr('h').sr('e');
    this.add(0x5d, 'LD E, L').rr('l').sr('e');

    this.add(0x67, 'LD H, A').rr('a').sr('h');
    this.add(0x60, 'LD H, B').rr('b').sr('h');
    this.add(0x61, 'LD H, C').rr('c').sr('h');
    this.add(0x62, 'LD H, D').rr('d').sr('h');
    this.add(0x63, 'LD H, E').rr('e').sr('h');
    this.add(0x64, 'LD H, H').rr('h').sr('h');
    this.add(0x65, 'LD H, L').rr('l').sr('h');

    this.add(0x6f, 'LD L, A').rr('a').sr('l');
    this.add(0x68, 'LD L, B').rr('b').sr('l');
    this.add(0x69, 'LD L, C').rr('c').sr('l');
    this.add(0x6a, 'LD L, D').rr('d').sr('l');
    this.add(0x6b, 'LD L, E').rr('e').sr('l');
    this.add(0x6c, 'LD L, H').rr('h').sr('l');
    this.add(0x6d, 'LD L, L').rr('l').sr('l');

    this.add(0x7e, 'LD A, (HL)').rr('hl').rm().sr('a');
    this.add(0x46, 'LD B, (HL)').rr('hl').rm().sr('b');
    this.add(0x4e, 'LD C, (HL)').rr('hl').rm().sr('c');
    this.add(0x56, 'LD D, (HL)').rr('hl').rm().sr('d');
    this.add(0x5e, 'LD E, (HL)').rr('hl').rm().sr('e');
    this.add(0x66, 'LD H, (HL)').rr('hl').rm().sr('h');
    this.add(0x6e, 'LD L, (HL)').rr('hl').rm().sr('l');

    this.add(0x70, 'LD (HL), B').rr('b').sra('hl');
    this.add(0x71, 'LD (HL), C').rr('c').sra('hl');
    this.add(0x72, 'LD (HL), D').rr('d').sra('hl');
    this.add(0x73, 'LD (HL), E').rr('e').sra('hl');
    this.add(0x74, 'LD (HL), H').rr('h').sra('hl');
    this.add(0x75, 'LD (HL), L').rr('l').sra('hl');

    this.add(0x36, 'LD (HL), byte').rb().sra('hl');

    this.add(0x0a, 'LD A, (BC)').rra('bc').sr('a');
    this.add(0x1a, 'LD A, (DE)').rra('de').sr('a');
    this.add(0x7e, 'LD A, (HL)').rra('hl').sr('a');

    this.add(0x02, 'LD (BC), A').rr('a').sra('bc');
    this.add(0x12, 'LD (DE), A').rr('a').sra('de');
    this.add(0x77, 'LD (HL), A').rr('a').sra('hl');

    this.add(0xfa, 'LD A, (word)').rw().rm().sr('a');
    this.add(0xea, 'LD (word), A').rr('a').sda();

    this.add(0x3e, 'LD A, byte').rb().sr('a');

    this.add(0xf2, 'LD A, (C)').rr('c').rm(0xff00).sr('a');
    this.add(0xe2, 'LD (C), A').rr('a').sra('c', 0xff00);

    this.add(0x3a, 'LD A, (HL-)').dec('hl').rm().sr('a');
    this.add(0x32, 'LD (HL-), A').rr('a').sra('hl').dec('hl');

    this.add(0x2a, 'LD A, (HL+)').inc('hl').rm().sr('a');
    this.add(0x22, 'LD (HL+), A').rr('a').sra('hl').inc('hl');

    this.add(0xe0, 'LDH (byte), A').rr('a').sda(0xff00);
    this.add(0xf0, 'LDH A, (byte)').rb(0xff00).sr('a');

    this.add(0x01, 'LD BC, word').rw().sr('bc');
    this.add(0x11, 'LD DE, word').rw().sr('de');
    this.add(0x21, 'LD HL, word').rw().sr('hl');
    this.add(0x31, 'LD SP, word').rw().sr('sp');

    this.add(0xf9, 'LD SP, HL').rr('hl').sr('sp');
    this.add(0xf8, 'LD HL, SP + byte').rr('sp').sumb().sr('hl');

    this.add(0x08, 'LD (word), SP').rr('sp').sda();

    this.add(0xf5, 'PUSH AF').dec('sp').rr('a').sra('sp').dec('sp').rr('f').sra('sp');
    this.add(0xc5, 'PUSH BC').dec('sp').rr('b').sra('sp').dec('sp').rr('c').sra('sp');
    this.add(0xd5, 'PUSH DE').dec('sp').rr('d').sra('sp').dec('sp').rr('e').sra('sp');
    this.add(0xe5, 'PUSH HL').dec('sp').rr('h').sra('sp').dec('sp').rr('l').sra('sp');

    this.add(0xf1, 'POP AF').rra('sp').sr('f').inc('sp').rra('sp').sr('a').inc('sp');
    this.add(0xc1, 'POP BC').rra('sp').sr('c').inc('sp').rra('sp').sr('b').inc('sp');
    this.add(0xd1, 'POP DE').rra('sp').sr('e').inc('sp').rra('sp').sr('d').inc('sp');
    this.add(0xe1, 'POP HL').rra('sp').sr('l').inc('sp').rra('sp').sr('h').inc('sp');

    this.add(0x87, 'ADD A, A').rr('a').sumr('a').sr('a');
    this.add(0x80, 'ADD A, B').rr('b').sumr('a').sr('a');
    this.add(0x81, 'ADD A, C').rr('c').sumr('a').sr('a');
    this.add(0x82, 'ADD A, D').rr('d').sumr('a').sr('a');
    this.add(0x83, 'ADD A, E').rr('e').sumr('a').sr('a');
    this.add(0x84, 'ADD A, H').rr('h').sumr('a').sr('a');
    this.add(0x85, 'ADD A, L').rr('l').sumr('a').sr('a');

    this.add(0x86, 'ADD A, (HL)').rr('hl').rm().sumr('a').sr('a');
    this.add(0xc6, 'ADD A, byte').rb().sumr('a').sr('a');

    this.add(0x8f, 'ADC A, A').rr('a').sumrc('a').sr('a');
    this.add(0x88, 'ADC A, B').rr('b').sumrc('a').sr('a');
    this.add(0x89, 'ADC A, C').rr('c').sumrc('a').sr('a');
    this.add(0x8a, 'ADC A, D').rr('d').sumrc('a').sr('a');
    this.add(0x8b, 'ADC A, E').rr('e').sumrc('a').sr('a');
    this.add(0x8c, 'ADC A, H').rr('h').sumrc('a').sr('a');
    this.add(0x8d, 'ADC A, L').rr('l').sumrc('a').sr('a');

    this.add(0x8e, 'ADC A, (HL)').rr('hl').rm().sumrc('a').sr('a');
    this.add(0xce, 'ADC A, byte').rb().sumrc('a').sr('a');

    this.add(0x97, 'SUB A, A').rr('a').subr('a').sr('a');
    this.add(0x90, 'SUB A, B').rr('b').subr('a').sr('a');
    this.add(0x91, 'SUB A, C').rr('c').subr('a').sr('a');
    this.add(0x92, 'SUB A, D').rr('d').subr('a').sr('a');
    this.add(0x93, 'SUB A, E').rr('e').subr('a').sr('a');
    this.add(0x94, 'SUB A, H').rr('h').subr('a').sr('a');
    this.add(0x95, 'SUB A, L').rr('l').subr('a').sr('a');

    this.add(0x96, 'SUB A, (HL)').rr('hl').rm().subr('a').sr('a');
    this.add(0xd6, 'SUB A, byte').rb().subr('a').sr('a');

    this.add(0x9f, 'SBC A, A').rr('a').subrc('a').sr('a');
    this.add(0x98, 'SBC A, B').rr('b').subrc('a').sr('a');
    this.add(0x99, 'SBC A, C').rr('c').subrc('a').sr('a');
    this.add(0x9a, 'SBC A, D').rr('d').subrc('a').sr('a');
    this.add(0x9b, 'SBC A, E').rr('e').subrc('a').sr('a');
    this.add(0x9c, 'SBC A, H').rr('h').subrc('a').sr('a');
    this.add(0x9d, 'SBC A, L').rr('l').subrc('a').sr('a');

    this.add(0x9e, 'SBC A, (HL)').rr('hl').rm().subrc('a').sr('a');

    this.add(0xa7, 'AND A, A').rr('a').and('a').sr('a');
    this.add(0xa0, 'AND A, B').rr('b').and('a').sr('a');
    this.add(0xa1, 'AND A, C').rr('c').and('a').sr('a');
    this.add(0xa2, 'AND A, D').rr('d').and('a').sr('a');
    this.add(0xa3, 'AND A, E').rr('e').and('a').sr('a');
    this.add(0xa4, 'AND A, H').rr('h').and('a').sr('a');
    this.add(0xa5, 'AND A, L').rr('l').and('a').sr('a');

    this.add(0xa6, 'AND A, (HL)').rr('hl').rm().and('a').sr('a');
    this.add(0xe6, 'AND A, byte').rb().and('a').sr('a');

    this.add(0xb7, 'OR A, A').rr('a').or('a').sr('a');
    this.add(0xb0, 'OR A, B').rr('b').or('a').sr('a');
    this.add(0xb1, 'OR A, C').rr('c').or('a').sr('a');
    this.add(0xb2, 'OR A, D').rr('d').or('a').sr('a');
    this.add(0xb3, 'OR A, E').rr('e').or('a').sr('a');
    this.add(0xb4, 'OR A, H').rr('h').or('a').sr('a');
    this.add(0xb5, 'OR A, L').rr('l').or('a').sr('a');

    this.add(0xb6, 'OR A, (HL)').rr('hl').rm().or('a').sr('a');
    this.add(0xf6, 'OR A, byte').rb().or('a').sr('a');

    this.add(0xaf, 'XOR A, A').rr('a').xor('a').sr('a');
    this.add(0xa8, 'XOR A, B').rr('b').xor('a').sr('a');
    this.add(0xa9, 'XOR A, C').rr('c').xor('a').sr('a');
    this.add(0xaa, 'XOR A, D').rr('d').xor('a').sr('a');
    this.add(0xab, 'XOR A, E').rr('e').xor('a').sr('a');
    this.add(0xac, 'XOR A, H').rr('h').xor('a').sr('a');
    this.add(0xad, 'XOR A, L').rr('l').xor('a').sr('a');

    this.add(0xae, 'XOR A, (HL)').rr('hl').rm().xor('a').sr('a');
    this.add(0xee, 'XOR A, byte').rb().xor('a').sr('a');

    this.add(0xbf, 'CP A, A').rr('a').subr('a');
    this.add(0xb8, 'CP A, B').rr('b').subr('a');
    this.add(0xb9, 'CP A, C').rr('c').subr('a');
    this.add(0xba, 'CP A, D').rr('d').subr('a');
    this.add(0xbb, 'CP A, E').rr('e').subr('a');
    this.add(0xbc, 'CP A, H').rr('h').subr('a');
    this.add(0xbd, 'CP A, L').rr('l').subr('a');

    this.add(0xbe, 'CP A, (HL)').rr('hl').rm().subr('a');
    this.add(0xfe, 'CP A, byte').rb().subr('a');

    this.add(0xbf, 'INC A')
  }
}

export default new Opcodes();

// do I need to mask results?
