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

    this.add(0xe0, 'LDH (n), A').rr('a').sda(0xff00);
    this.add(0xf0, 'LDH A, (n)').rb(0xff00).sr('a');
  }
}

export default new Opcodes();
