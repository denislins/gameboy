export default [
  {
    opcode: 0x3E,
    repr: 'LD A, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x06,
    repr: 'LD B, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x0E,
    repr: 'LD C, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x16,
    repr: 'LD D, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x1E,
    repr: 'LD E, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x26,
    repr: 'LD H, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x2E,
    repr: 'LD L, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x7F,
    repr: 'LD A, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x78,
    repr: 'LD A, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x79,
    repr: 'LD A, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x7A,
    repr: 'LD A, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x7B,
    repr: 'LD A, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x7C,
    repr: 'LD A, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x7D,
    repr: 'LD A, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x47,
    repr: 'LD B, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x40,
    repr: 'LD B, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x41,
    repr: 'LD B, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x42,
    repr: 'LD B, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x43,
    repr: 'LD B, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x44,
    repr: 'LD B, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x45,
    repr: 'LD B, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x4F,
    repr: 'LD C, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x48,
    repr: 'LD C, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x49,
    repr: 'LD C, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x4A,
    repr: 'LD C, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x4B,
    repr: 'LD C, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x4C,
    repr: 'LD C, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x4D,
    repr: 'LD C, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x57,
    repr: 'LD D, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x50,
    repr: 'LD D, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x51,
    repr: 'LD D, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x52,
    repr: 'LD D, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x53,
    repr: 'LD D, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x54,
    repr: 'LD D, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x55,
    repr: 'LD D, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x5F,
    repr: 'LD E, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x58,
    repr: 'LD E, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x59,
    repr: 'LD E, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x5A,
    repr: 'LD E, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x5B,
    repr: 'LD E, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x5C,
    repr: 'LD E, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x5D,
    repr: 'LD E, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x67,
    repr: 'LD H, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x60,
    repr: 'LD H, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x61,
    repr: 'LD H, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x62,
    repr: 'LD H, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x63,
    repr: 'LD H, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x64,
    repr: 'LD H, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x65,
    repr: 'LD H, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x6F,
    repr: 'LD L, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x68,
    repr: 'LD L, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x69,
    repr: 'LD L, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x6A,
    repr: 'LD L, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x6B,
    repr: 'LD L, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x6C,
    repr: 'LD L, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x6D,
    repr: 'LD L, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x46,
    repr: 'LD B, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x4E,
    repr: 'LD C, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x56,
    repr: 'LD D, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x5E,
    repr: 'LD E, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x66,
    repr: 'LD H, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x6E,
    repr: 'LD L, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x70,
    repr: 'LD (HL), B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x71,
    repr: 'LD (HL), C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x72,
    repr: 'LD (HL), D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x73,
    repr: 'LD (HL), E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x74,
    repr: 'LD (HL), H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x75,
    repr: 'LD (HL), L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x36,
    repr: 'LD (HL), byte',
    cycles: 12,
    chain: [
      ['readByte'],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x0A,
    repr: 'LD A, (BC)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'bc' }],
      ['readMemory'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x1A,
    repr: 'LD A, (DE)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'de' }],
      ['readMemory'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x7E,
    repr: 'LD A, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x02,
    repr: 'LD (BC), A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeToAddressAtRegister', { register: 'bc' }],
    ],
  },
  {
    opcode: 0x12,
    repr: 'LD (DE), A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeToAddressAtRegister', { register: 'de' }],
    ],
  },
  {
    opcode: 0x77,
    repr: 'LD (HL), A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0xFA,
    repr: 'LD A, (word)',
    cycles: 16,
    chain: [
      ['readWord'],
      ['readMemory'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xEA,
    repr: 'LD (word), A',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeByteToAddress'],
    ],
  },
  {
    opcode: 0xF2,
    repr: 'LD A, (C)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['sumWord', { register: 'a', offset: 0xFF00 }],
      ['readMemory'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xE2,
    repr: 'LD (C), A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeToAddressAtRegister', { register: 'c', offset: 0xFF00 }],
    ],
  },
  {
    opcode: 0x3A,
    repr: 'LD A, (HL-)',
    cycles: 8,
    chain: [
      ['decrementRegister', { register: 'hl' }],
      ['readMemory'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x32,
    repr: 'LD (HL-), A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeToAddressAtRegister', { register: 'hl' }],
      ['decrementRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x2A,
    repr: 'LD A, (HL+)',
    cycles: 8,
    chain: [
      ['incrementRegister', { register: 'hl' }],
      ['readMemory'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x22,
    repr: 'LD (HL+), A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeToAddressAtRegister', { register: 'hl' }],
      ['incrementRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0xE0,
    repr: 'LDH (byte), A',
    cycles: 12,
    chain: [
      ['readRegister', { register: 'a' }],
      ['writeByteToAddress', { offset: 0xFF00 }],
    ],
  },
  {
    opcode: 0xF0,
    repr: 'LDH A, (byte)',
    cycles: 12,
    chain: [
      ['readByte'],
      ['sumWord', { register: 'a', offset: 0xFF00 }],
      ['readMemory'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x01,
    repr: 'LD BC, word',
    cycles: 12,
    chain: [
      ['readWord'],
      ['writeRegister', { register: 'bc' }],
    ],
  },
  {
    opcode: 0x11,
    repr: 'LD DE, word',
    cycles: 12,
    chain: [
      ['readWord'],
      ['writeRegister', { register: 'de' }],
    ],
  },
  {
    opcode: 0x21,
    repr: 'LD HL, word',
    cycles: 12,
    chain: [
      ['readWord'],
      ['writeRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x31,
    repr: 'LD SP, word',
    cycles: 12,
    chain: [
      ['readWord'],
      ['writeRegister', { register: 'sp' }],
    ],
  },
  {
    opcode: 0xF9,
    repr: 'LD SP, HL',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['writeRegister', { register: 'sp' }],
    ],
  },
  {
    opcode: 0xF8,
    repr: 'LD HL, SP + sbyte',
    cycles: 12,
    chain: [
      ['readRegister', { register: 'sp' }],
      ['sumSignedByte'],
      ['writeRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x08,
    repr: 'LD (word), SP',
    cycles: 20,
    chain: [
      ['readRegister', { register: 'sp' }],
      ['writeWordToAddress'],
    ],
  },
  {
    opcode: 0xF5,
    repr: 'PUSH AF',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'af' }],
      ['push'],
    ],
  },
  {
    opcode: 0xC5,
    repr: 'PUSH BC',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'bc' }],
      ['push'],
    ],
  },
  {
    opcode: 0xD5,
    repr: 'PUSH DE',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'de' }],
      ['push'],
    ],
  },
  {
    opcode: 0xE5,
    repr: 'PUSH HL',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['push'],
    ],
  },
  {
    opcode: 0xF1,
    repr: 'POP AF',
    cycles: 12,
    chain: [
      ['pop'],
      ['writeRegister', { register: 'af' }],
    ],
  },
  {
    opcode: 0xC1,
    repr: 'POP BC',
    cycles: 12,
    chain: [
      ['pop'],
      ['writeRegister', { register: 'bc' }],
    ],
  },
  {
    opcode: 0xD1,
    repr: 'POP DE',
    cycles: 12,
    chain: [
      ['pop'],
      ['writeRegister', { register: 'de' }],
    ],
  },
  {
    opcode: 0xE1,
    repr: 'POP HL',
    cycles: 12,
    chain: [
      ['pop'],
      ['writeRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x87,
    repr: 'ADD A, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['sumToRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x80,
    repr: 'ADD A, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['sumToRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x81,
    repr: 'ADD A, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['sumToRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x82,
    repr: 'ADD A, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['sumToRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x83,
    repr: 'ADD A, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['sumToRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x84,
    repr: 'ADD A, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['sumToRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x85,
    repr: 'ADD A, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['sumToRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x86,
    repr: 'ADD A, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['sumToRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xC6,
    repr: 'ADD A, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['sumToRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x8F,
    repr: 'ADC A, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['sumToRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x88,
    repr: 'ADC A, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['sumToRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x89,
    repr: 'ADC A, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['sumToRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x8A,
    repr: 'ADC A, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['sumToRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x8B,
    repr: 'ADC A, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['sumToRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x8C,
    repr: 'ADC A, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['sumToRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x8D,
    repr: 'ADC A, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['sumToRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x8E,
    repr: 'ADC A, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['sumToRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xCE,
    repr: 'ADC A, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['sumToRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x97,
    repr: 'SUB A, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['subtractFromRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x90,
    repr: 'SUB A, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['subtractFromRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x91,
    repr: 'SUB A, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['subtractFromRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x92,
    repr: 'SUB A, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['subtractFromRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x93,
    repr: 'SUB A, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['subtractFromRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x94,
    repr: 'SUB A, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['subtractFromRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x95,
    repr: 'SUB A, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['subtractFromRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x96,
    repr: 'SUB A, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['subtractFromRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xD6,
    repr: 'SUB A, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['subtractFromRegisterValue', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x9F,
    repr: 'SBC A, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['subtractFromRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x98,
    repr: 'SBC A, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['subtractFromRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x99,
    repr: 'SBC A, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['subtractFromRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x9A,
    repr: 'SBC A, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['subtractFromRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x9B,
    repr: 'SBC A, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['subtractFromRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x9C,
    repr: 'SBC A, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['subtractFromRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x9D,
    repr: 'SBC A, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['subtractFromRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x9E,
    repr: 'SBC A, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['subtractFromRegisterValueWithCarry', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xA7,
    repr: 'AND A, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['logicalAnd', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xA0,
    repr: 'AND A, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['logicalAnd', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xA1,
    repr: 'AND A, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['logicalAnd', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xA2,
    repr: 'AND A, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['logicalAnd', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xA3,
    repr: 'AND A, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['logicalAnd', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xA4,
    repr: 'AND A, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['logicalAnd', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xA5,
    repr: 'AND A, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['logicalAnd', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xA6,
    repr: 'AND A, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['logicalAnd', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xE6,
    repr: 'AND A, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['logicalAnd', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xB7,
    repr: 'OR A, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['logicalOr', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xB0,
    repr: 'OR A, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['logicalOr', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xB1,
    repr: 'OR A, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['logicalOr', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xB2,
    repr: 'OR A, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['logicalOr', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xB3,
    repr: 'OR A, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['logicalOr', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xB4,
    repr: 'OR A, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['logicalOr', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xB5,
    repr: 'OR A, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['logicalOr', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xB6,
    repr: 'OR A, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['logicalOr', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xF6,
    repr: 'OR A, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['logicalOr', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xAF,
    repr: 'XOR A, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['logicalXor', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xA8,
    repr: 'XOR A, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['logicalXor', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xA9,
    repr: 'XOR A, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['logicalXor', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xAA,
    repr: 'XOR A, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['logicalXor', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xAB,
    repr: 'XOR A, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['logicalXor', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xAC,
    repr: 'XOR A, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['logicalXor', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xAD,
    repr: 'XOR A, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['logicalXor', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xAE,
    repr: 'XOR A, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['logicalXor', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xEE,
    repr: 'XOR A, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['logicalXor', { register: 'a' }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xBF,
    repr: 'CP A, A',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['subtractFromRegisterValue', { register: 'a' }],
    ],
  },
  {
    opcode: 0xB8,
    repr: 'CP A, B',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'b' }],
      ['subtractFromRegisterValue', { register: 'a' }],
    ],
  },
  {
    opcode: 0xB9,
    repr: 'CP A, C',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'c' }],
      ['subtractFromRegisterValue', { register: 'a' }],
    ],
  },
  {
    opcode: 0xBA,
    repr: 'CP A, D',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'd' }],
      ['subtractFromRegisterValue', { register: 'a' }],
    ],
  },
  {
    opcode: 0xBB,
    repr: 'CP A, E',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'e' }],
      ['subtractFromRegisterValue', { register: 'a' }],
    ],
  },
  {
    opcode: 0xBC,
    repr: 'CP A, H',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'h' }],
      ['subtractFromRegisterValue', { register: 'a' }],
    ],
  },
  {
    opcode: 0xBD,
    repr: 'CP A, L',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'l' }],
      ['subtractFromRegisterValue', { register: 'a' }],
    ],
  },
  {
    opcode: 0xBE,
    repr: 'CP A, (HL)',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['subtractFromRegisterValue', { register: 'a' }],
    ],
  },
  {
    opcode: 0xFE,
    repr: 'CP A, byte',
    cycles: 8,
    chain: [
      ['readByte'],
      ['subtractFromRegisterValue', { register: 'a' }],
    ],
  },
  {
    opcode: 0x3C,
    repr: 'INC A',
    cycles: 4,
    chain: [
      ['incrementRegister', { register: 'a', setFlags: true }],
    ],
  },
  {
    opcode: 0x04,
    repr: 'INC B',
    cycles: 4,
    chain: [
      ['incrementRegister', { register: 'b', setFlags: true }],
    ],
  },
  {
    opcode: 0x0C,
    repr: 'INC C',
    cycles: 4,
    chain: [
      ['incrementRegister', { register: 'c', setFlags: true }],
    ],
  },
  {
    opcode: 0x14,
    repr: 'INC D',
    cycles: 4,
    chain: [
      ['incrementRegister', { register: 'd', setFlags: true }],
    ],
  },
  {
    opcode: 0x1C,
    repr: 'INC E',
    cycles: 4,
    chain: [
      ['incrementRegister', { register: 'e', setFlags: true }],
    ],
  },
  {
    opcode: 0x24,
    repr: 'INC H',
    cycles: 4,
    chain: [
      ['incrementRegister', { register: 'h', setFlags: true }],
    ],
  },
  {
    opcode: 0x2C,
    repr: 'INC L',
    cycles: 4,
    chain: [
      ['incrementRegister', { register: 'l', setFlags: true }],
    ],
  },
  {
    opcode: 0x34,
    repr: 'INC (HL)',
    cycles: 12,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['incrementValue', { setFlags: true }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x3D,
    repr: 'DEC A',
    cycles: 4,
    chain: [
      ['decrementRegister', { register: 'a', setFlags: true }],
    ],
  },
  {
    opcode: 0x05,
    repr: 'DEC B',
    cycles: 4,
    chain: [
      ['decrementRegister', { register: 'b', setFlags: true }],
    ],
  },
  {
    opcode: 0x0D,
    repr: 'DEC C',
    cycles: 4,
    chain: [
      ['decrementRegister', { register: 'c', setFlags: true }],
    ],
  },
  {
    opcode: 0x15,
    repr: 'DEC D',
    cycles: 4,
    chain: [
      ['decrementRegister', { register: 'd', setFlags: true }],
    ],
  },
  {
    opcode: 0x1D,
    repr: 'DEC E',
    cycles: 4,
    chain: [
      ['decrementRegister', { register: 'e', setFlags: true }],
    ],
  },
  {
    opcode: 0x25,
    repr: 'DEC H',
    cycles: 4,
    chain: [
      ['decrementRegister', { register: 'h', setFlags: true }],
    ],
  },
  {
    opcode: 0x2D,
    repr: 'DEC L',
    cycles: 4,
    chain: [
      ['decrementRegister', { register: 'l', setFlags: true }],
    ],
  },
  {
    opcode: 0x35,
    repr: 'DEC (HL)',
    cycles: 12,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['decrementValue', { setFlags: true }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x09,
    repr: 'ADD HL, BC',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'bc' }],
      ['sumWordToRegisterValue', { register: 'hl' }],
      ['writeRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x19,
    repr: 'ADD HL, DE',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'de' }],
      ['sumWordToRegisterValue', { register: 'hl' }],
      ['writeRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x29,
    repr: 'ADD HL, HL',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['sumWordToRegisterValue', { register: 'hl' }],
      ['writeRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x39,
    repr: 'ADD HL, SP',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'sp' }],
      ['sumWordToRegisterValue', { register: 'hl' }],
      ['writeRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0xE8,
    repr: 'ADD SP, sbyte',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'sp' }],
      ['sumSignedByte'],
      ['writeRegister', { register: 'sp' }],
    ],
  },
  {
    opcode: 0x03,
    repr: 'INC BC',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'bc' }],
      ['incrementValue'],
      ['writeRegister', { register: 'bc' }],
    ],
  },
  {
    opcode: 0x13,
    repr: 'INC DE',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'de' }],
      ['incrementValue'],
      ['writeRegister', { register: 'de' }],
    ],
  },
  {
    opcode: 0x23,
    repr: 'INC HL',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['incrementValue'],
      ['writeRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x33,
    repr: 'INC SP',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'sp' }],
      ['incrementValue'],
      ['writeRegister', { register: 'sp' }],
    ],
  },
  {
    opcode: 0x0B,
    repr: 'DEC BC',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'bc' }],
      ['decrementValue'],
      ['writeRegister', { register: 'bc' }],
    ],
  },
  {
    opcode: 0x1B,
    repr: 'DEC DE',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'de' }],
      ['decrementValue'],
      ['writeRegister', { register: 'de' }],
    ],
  },
  {
    opcode: 0x2B,
    repr: 'DEC HL',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['decrementValue'],
      ['writeRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x3B,
    repr: 'DEC SP',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'sp' }],
      ['decrementValue'],
      ['writeRegister', { register: 'sp' }],
    ],
  },
  {
    opcode: 0x27,
    repr: 'DAA',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['decimalAdjust'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x2F,
    repr: 'CPL',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['complementValue'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x3F,
    repr: 'CCF',
    cycles: 4,
    chain: [
      ['complementCarryFlag'],
    ],
  },
  {
    opcode: 0x37,
    repr: 'SCF',
    cycles: 4,
    chain: [
      ['setCarryFlag'],
    ],
  },
  {
    opcode: 0x00,
    repr: 'NOP',
    cycles: 4,
    chain: [
      ['noOperation'],
    ],
  },
  {
    opcode: 0x76,
    repr: 'HALT',
    cycles: 4,
    chain: [
      ['halt'],
    ],
  },
  {
    opcode: 0x10,
    repr: 'STOP',
    cycles: 4,
    chain: [
      ['stop'],
    ],
  },
  {
    opcode: 0xF3,
    repr: 'DI',
    cycles: 4,
    chain: [
      ['toggleInterrupts', { flag: false }],
    ],
  },
  {
    opcode: 0xFB,
    repr: 'EI',
    cycles: 4,
    chain: [
      ['toggleInterrupts', { flag: true }],
    ],
  },
  {
    opcode: 0x07,
    repr: 'RLCA',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['rotateLeft'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x17,
    repr: 'RLA',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['rotateLeftUsingCarry'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x0F,
    repr: 'RRCA',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['rotateRight'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x1F,
    repr: 'RRA',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'a' }],
      ['rotateRightUsingCarry'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xC3,
    repr: 'JP word',
    cycles: 16,
    chain: [
      ['readWord'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xC2,
    repr: 'JP NZ, word',
    cycles: 12,
    chain: [
      ['checkFlag', { flag: 'z', value: false, jump: 2 }],
      ['readWord'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xCA,
    repr: 'JP Z, word',
    cycles: 12,
    chain: [
      ['checkFlag', { flag: 'z', value: true, jump: 2 }],
      ['readWord'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xD2,
    repr: 'JP NC, word',
    cycles: 12,
    chain: [
      ['checkFlag', { flag: 'c', value: false, jump: 2 }],
      ['readWord'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xDA,
    repr: 'JP C, word',
    cycles: 12,
    chain: [
      ['checkFlag', { flag: 'c', value: true, jump: 2 }],
      ['readWord'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xE9,
    repr: 'JP (HL)',
    cycles: 4,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0x18,
    repr: 'JR sbyte',
    cycles: 8,
    chain: [
      ['readSignedByte'],
      ['addToRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0x20,
    repr: 'JR NZ, sbyte',
    cycles: 8,
    chain: [
      ['checkFlag', { flag: 'z', value: false, jump: 1 }],
      ['readSignedByte'],
      ['addToRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0x28,
    repr: 'JR Z, sbyte',
    cycles: 8,
    chain: [
      ['checkFlag', { flag: 'z', value: true, jump: 1 }],
      ['readSignedByte'],
      ['addToRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0x30,
    repr: 'JR NC, sbyte',
    cycles: 8,
    chain: [
      ['checkFlag', { flag: 'c', value: false, jump: 1 }],
      ['readSignedByte'],
      ['addToRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0x38,
    repr: 'JR C, sbyte',
    cycles: 8,
    chain: [
      ['checkFlag', { flag: 'c', value: true, jump: 1 }],
      ['readSignedByte'],
      ['addToRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xCD,
    repr: 'CALL word',
    cycles: 12,
    chain: [
      ['nextInstructionAddress'],
      ['push'],
      ['readWord'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xC4,
    repr: 'CALL NZ, word',
    cycles: 12,
    chain: [
      ['checkFlag', { flag: 'z', value: false, jump: 2 }],
      ['nextInstructionAddress'],
      ['push'],
      ['readWord'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xCC,
    repr: 'CALL Z, word',
    cycles: 12,
    chain: [
      ['checkFlag', { flag: 'z', value: true, jump: 2 }],
      ['nextInstructionAddress'],
      ['push'],
      ['readWord'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xD4,
    repr: 'CALL NC, word',
    cycles: 12,
    chain: [
      ['checkFlag', { flag: 'c', value: false, jump: 2 }],
      ['nextInstructionAddress'],
      ['push'],
      ['readWord'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xDC,
    repr: 'CALL C, word',
    cycles: 12,
    chain: [
      ['checkFlag', { flag: 'c', value: true, jump: 2 }],
      ['nextInstructionAddress'],
      ['push'],
      ['readWord'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xC7,
    repr: 'RST 00H',
    cycles: 32,
    chain: [
      ['readRegister', { register: 'pc' }],
      ['push'],
      ['writeValueToRegister', { register: 'pc', value: 0x00 }],
    ],
  },
  {
    opcode: 0xCF,
    repr: 'RST 08H',
    cycles: 32,
    chain: [
      ['readRegister', { register: 'pc' }],
      ['push'],
      ['writeValueToRegister', { register: 'pc', value: 0x08 }],
    ],
  },
  {
    opcode: 0xD7,
    repr: 'RST 10H',
    cycles: 32,
    chain: [
      ['readRegister', { register: 'pc' }],
      ['push'],
      ['writeValueToRegister', { register: 'pc', value: 0x10 }],
    ],
  },
  {
    opcode: 0xDF,
    repr: 'RST 18H',
    cycles: 32,
    chain: [
      ['readRegister', { register: 'pc' }],
      ['push'],
      ['writeValueToRegister', { register: 'pc', value: 0x18 }],
    ],
  },
  {
    opcode: 0xE7,
    repr: 'RST 20H',
    cycles: 32,
    chain: [
      ['readRegister', { register: 'pc' }],
      ['push'],
      ['writeValueToRegister', { register: 'pc', value: 0x20 }],
    ],
  },
  {
    opcode: 0xEF,
    repr: 'RST 28H',
    cycles: 32,
    chain: [
      ['readRegister', { register: 'pc' }],
      ['push'],
      ['writeValueToRegister', { register: 'pc', value: 0x28 }],
    ],
  },
  {
    opcode: 0xF7,
    repr: 'RST 30H',
    cycles: 32,
    chain: [
      ['readRegister', { register: 'pc' }],
      ['push'],
      ['writeValueToRegister', { register: 'pc', value: 0x30 }],
    ],
  },
  {
    opcode: 0xFF,
    repr: 'RST 38H',
    cycles: 32,
    chain: [
      ['readRegister', { register: 'pc' }],
      ['push'],
      ['writeValueToRegister', { register: 'pc', value: 0x38 }],
    ],
  },
  {
    opcode: 0xC9,
    repr: 'RET',
    cycles: 8,
    chain: [
      ['pop'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xC0,
    repr: 'RET NZ',
    cycles: 8,
    chain: [
      ['checkFlag', { flag: 'z', value: false }],
      ['pop'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xC8,
    repr: 'RET Z',
    cycles: 8,
    chain: [
      ['checkFlag', { flag: 'z', value: true }],
      ['pop'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xD0,
    repr: 'RET NC',
    cycles: 8,
    chain: [
      ['checkFlag', { flag: 'c', value: false }],
      ['pop'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xD8,
    repr: 'RET C',
    cycles: 8,
    chain: [
      ['checkFlag', { flag: 'c', value: true }],
      ['pop'],
      ['writeRegister', { register: 'pc' }],
    ],
  },
  {
    opcode: 0xD9,
    repr: 'RETI',
    cycles: 8,
    chain: [
      ['pop'],
      ['writeRegister', { register: 'pc' }],
      ['toggleInterrupts', { flag: true }],
    ],
  },
];
