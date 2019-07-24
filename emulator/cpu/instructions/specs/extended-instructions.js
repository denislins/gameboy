export default [
  {
    opcode: 0x37,
    repr: 'SWAP A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['swap'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x30,
    repr: 'SWAP B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['swap'],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x31,
    repr: 'SWAP C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['swap'],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x32,
    repr: 'SWAP D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['swap'],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x33,
    repr: 'SWAP E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['swap'],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x34,
    repr: 'SWAP H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['swap'],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x35,
    repr: 'SWAP L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['swap'],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x36,
    repr: 'SWAP (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['swap'],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x07,
    repr: 'RLC A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['rotateLeft'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x00,
    repr: 'RLC B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['rotateLeft'],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x01,
    repr: 'RLC C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['rotateLeft'],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x02,
    repr: 'RLC D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['rotateLeft'],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x03,
    repr: 'RLC E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['rotateLeft'],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x04,
    repr: 'RLC H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['rotateLeft'],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x05,
    repr: 'RLC L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['rotateLeft'],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x06,
    repr: 'RLC (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['rotateLeft'],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x17,
    repr: 'RL A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['rotateLeftUsingCarry'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x10,
    repr: 'RL B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['rotateLeftUsingCarry'],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x11,
    repr: 'RL C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['rotateLeftUsingCarry'],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x12,
    repr: 'RL D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['rotateLeftUsingCarry'],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x13,
    repr: 'RL E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['rotateLeftUsingCarry'],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x14,
    repr: 'RL H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['rotateLeftUsingCarry'],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x15,
    repr: 'RL L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['rotateLeftUsingCarry'],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x16,
    repr: 'RL (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['rotateLeftUsingCarry'],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x0F,
    repr: 'RRC A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['rotateRight'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x08,
    repr: 'RRC B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['rotateRight'],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x09,
    repr: 'RRC C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['rotateRight'],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x0A,
    repr: 'RRC D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['rotateRight'],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x0B,
    repr: 'RRC E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['rotateRight'],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x0C,
    repr: 'RRC H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['rotateRight'],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x0D,
    repr: 'RRC L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['rotateRight'],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x0E,
    repr: 'RRC (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['rotateRight'],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x1F,
    repr: 'RR A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['rotateRightUsingCarry'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x18,
    repr: 'RR B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['rotateRightUsingCarry'],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x19,
    repr: 'RR C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['rotateRightUsingCarry'],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x1A,
    repr: 'RR D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['rotateRightUsingCarry'],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x1B,
    repr: 'RR E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['rotateRightUsingCarry'],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x1C,
    repr: 'RR H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['rotateRightUsingCarry'],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x1D,
    repr: 'RR L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['rotateRightUsingCarry'],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x1E,
    repr: 'RR (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['rotateRightUsingCarry'],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x27,
    repr: 'SLA A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['shiftLeft'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x20,
    repr: 'SLA B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['shiftLeft'],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x21,
    repr: 'SLA C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['shiftLeft'],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x22,
    repr: 'SLA D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['shiftLeft'],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x23,
    repr: 'SLA E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['shiftLeft'],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x24,
    repr: 'SLA H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['shiftLeft'],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x25,
    repr: 'SLA L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['shiftLeft'],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x26,
    repr: 'SLA (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['shiftLeft'],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x2F,
    repr: 'SRA A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['arithmeticShiftRight'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x28,
    repr: 'SRA B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['arithmeticShiftRight'],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x29,
    repr: 'SRA C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['arithmeticShiftRight'],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x2A,
    repr: 'SRA D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['arithmeticShiftRight'],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x2B,
    repr: 'SRA E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['arithmeticShiftRight'],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x2C,
    repr: 'SRA H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['arithmeticShiftRight'],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x2D,
    repr: 'SRA L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['arithmeticShiftRight'],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x2E,
    repr: 'SRA (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['arithmeticShiftRight'],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x3F,
    repr: 'SRL A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['logicalShiftRight'],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x38,
    repr: 'SRL B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['logicalShiftRight'],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x39,
    repr: 'SRL C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['logicalShiftRight'],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x3A,
    repr: 'SRL D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['logicalShiftRight'],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x3B,
    repr: 'SRL E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['logicalShiftRight'],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x3C,
    repr: 'SRL H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['logicalShiftRight'],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x3D,
    repr: 'SRL L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['logicalShiftRight'],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x3E,
    repr: 'SRL (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['logicalShiftRight'],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x47,
    repr: 'BIT 0, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['testBit', { bit: 0 }],
    ],
  },
  {
    opcode: 0x40,
    repr: 'BIT 0, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['testBit', { bit: 0 }],
    ],
  },
  {
    opcode: 0x41,
    repr: 'BIT 0, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['testBit', { bit: 0 }],
    ],
  },
  {
    opcode: 0x42,
    repr: 'BIT 0, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['testBit', { bit: 0 }],
    ],
  },
  {
    opcode: 0x43,
    repr: 'BIT 0, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['testBit', { bit: 0 }],
    ],
  },
  {
    opcode: 0x44,
    repr: 'BIT 0, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['testBit', { bit: 0 }],
    ],
  },
  {
    opcode: 0x45,
    repr: 'BIT 0, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['testBit', { bit: 0 }],
    ],
  },
  {
    opcode: 0x46,
    repr: 'BIT 0, (HL)',
    cycles: 12,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['testBit', { bit: 0 }],
    ],
  },
  {
    opcode: 0xC7,
    repr: 'SET 0, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['setBit', { bit: 0 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xC0,
    repr: 'SET 0, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['setBit', { bit: 0 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0xC1,
    repr: 'SET 0, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['setBit', { bit: 0 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0xC2,
    repr: 'SET 0, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['setBit', { bit: 0 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0xC3,
    repr: 'SET 0, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['setBit', { bit: 0 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0xC4,
    repr: 'SET 0, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['setBit', { bit: 0 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0xC5,
    repr: 'SET 0, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['setBit', { bit: 0 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0xC6,
    repr: 'SET 0, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['setBit', { bit: 0 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x87,
    repr: 'RES 0, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['resetBit', { bit: 0 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x80,
    repr: 'RES 0, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['resetBit', { bit: 0 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x81,
    repr: 'RES 0, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['resetBit', { bit: 0 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x82,
    repr: 'RES 0, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['resetBit', { bit: 0 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x83,
    repr: 'RES 0, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['resetBit', { bit: 0 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x84,
    repr: 'RES 0, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['resetBit', { bit: 0 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x85,
    repr: 'RES 0, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['resetBit', { bit: 0 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x86,
    repr: 'RES 0, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['resetBit', { bit: 0 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x4F,
    repr: 'BIT 1, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['testBit', { bit: 1 }],
    ],
  },
  {
    opcode: 0x48,
    repr: 'BIT 1, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['testBit', { bit: 1 }],
    ],
  },
  {
    opcode: 0x49,
    repr: 'BIT 1, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['testBit', { bit: 1 }],
    ],
  },
  {
    opcode: 0x4A,
    repr: 'BIT 1, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['testBit', { bit: 1 }],
    ],
  },
  {
    opcode: 0x4B,
    repr: 'BIT 1, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['testBit', { bit: 1 }],
    ],
  },
  {
    opcode: 0x4C,
    repr: 'BIT 1, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['testBit', { bit: 1 }],
    ],
  },
  {
    opcode: 0x4D,
    repr: 'BIT 1, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['testBit', { bit: 1 }],
    ],
  },
  {
    opcode: 0x4E,
    repr: 'BIT 1, (HL)',
    cycles: 12,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['testBit', { bit: 1 }],
    ],
  },
  {
    opcode: 0xCF,
    repr: 'SET 1, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['setBit', { bit: 1 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xC8,
    repr: 'SET 1, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['setBit', { bit: 1 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0xC9,
    repr: 'SET 1, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['setBit', { bit: 1 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0xCA,
    repr: 'SET 1, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['setBit', { bit: 1 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0xCB,
    repr: 'SET 1, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['setBit', { bit: 1 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0xCC,
    repr: 'SET 1, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['setBit', { bit: 1 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0xCD,
    repr: 'SET 1, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['setBit', { bit: 1 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0xCE,
    repr: 'SET 1, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['setBit', { bit: 1 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x8F,
    repr: 'RES 1, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['resetBit', { bit: 1 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x88,
    repr: 'RES 1, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['resetBit', { bit: 1 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x89,
    repr: 'RES 1, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['resetBit', { bit: 1 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x8A,
    repr: 'RES 1, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['resetBit', { bit: 1 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x8B,
    repr: 'RES 1, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['resetBit', { bit: 1 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x8C,
    repr: 'RES 1, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['resetBit', { bit: 1 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x8D,
    repr: 'RES 1, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['resetBit', { bit: 1 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x8E,
    repr: 'RES 1, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['resetBit', { bit: 1 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x57,
    repr: 'BIT 2, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['testBit', { bit: 2 }],
    ],
  },
  {
    opcode: 0x50,
    repr: 'BIT 2, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['testBit', { bit: 2 }],
    ],
  },
  {
    opcode: 0x51,
    repr: 'BIT 2, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['testBit', { bit: 2 }],
    ],
  },
  {
    opcode: 0x52,
    repr: 'BIT 2, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['testBit', { bit: 2 }],
    ],
  },
  {
    opcode: 0x53,
    repr: 'BIT 2, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['testBit', { bit: 2 }],
    ],
  },
  {
    opcode: 0x54,
    repr: 'BIT 2, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['testBit', { bit: 2 }],
    ],
  },
  {
    opcode: 0x55,
    repr: 'BIT 2, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['testBit', { bit: 2 }],
    ],
  },
  {
    opcode: 0x56,
    repr: 'BIT 2, (HL)',
    cycles: 12,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['testBit', { bit: 2 }],
    ],
  },
  {
    opcode: 0xD7,
    repr: 'SET 2, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['setBit', { bit: 2 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xD0,
    repr: 'SET 2, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['setBit', { bit: 2 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0xD1,
    repr: 'SET 2, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['setBit', { bit: 2 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0xD2,
    repr: 'SET 2, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['setBit', { bit: 2 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0xD3,
    repr: 'SET 2, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['setBit', { bit: 2 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0xD4,
    repr: 'SET 2, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['setBit', { bit: 2 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0xD5,
    repr: 'SET 2, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['setBit', { bit: 2 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0xD6,
    repr: 'SET 2, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['setBit', { bit: 2 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x97,
    repr: 'RES 2, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['resetBit', { bit: 2 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x90,
    repr: 'RES 2, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['resetBit', { bit: 2 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x91,
    repr: 'RES 2, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['resetBit', { bit: 2 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x92,
    repr: 'RES 2, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['resetBit', { bit: 2 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x93,
    repr: 'RES 2, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['resetBit', { bit: 2 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x94,
    repr: 'RES 2, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['resetBit', { bit: 2 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x95,
    repr: 'RES 2, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['resetBit', { bit: 2 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x96,
    repr: 'RES 2, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['resetBit', { bit: 2 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x5F,
    repr: 'BIT 3, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['testBit', { bit: 3 }],
    ],
  },
  {
    opcode: 0x58,
    repr: 'BIT 3, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['testBit', { bit: 3 }],
    ],
  },
  {
    opcode: 0x59,
    repr: 'BIT 3, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['testBit', { bit: 3 }],
    ],
  },
  {
    opcode: 0x5A,
    repr: 'BIT 3, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['testBit', { bit: 3 }],
    ],
  },
  {
    opcode: 0x5B,
    repr: 'BIT 3, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['testBit', { bit: 3 }],
    ],
  },
  {
    opcode: 0x5C,
    repr: 'BIT 3, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['testBit', { bit: 3 }],
    ],
  },
  {
    opcode: 0x5D,
    repr: 'BIT 3, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['testBit', { bit: 3 }],
    ],
  },
  {
    opcode: 0x5E,
    repr: 'BIT 3, (HL)',
    cycles: 12,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['testBit', { bit: 3 }],
    ],
  },
  {
    opcode: 0xDF,
    repr: 'SET 3, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['setBit', { bit: 3 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xD8,
    repr: 'SET 3, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['setBit', { bit: 3 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0xD9,
    repr: 'SET 3, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['setBit', { bit: 3 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0xDA,
    repr: 'SET 3, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['setBit', { bit: 3 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0xDB,
    repr: 'SET 3, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['setBit', { bit: 3 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0xDC,
    repr: 'SET 3, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['setBit', { bit: 3 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0xDD,
    repr: 'SET 3, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['setBit', { bit: 3 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0xDE,
    repr: 'SET 3, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['setBit', { bit: 3 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x9F,
    repr: 'RES 3, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['resetBit', { bit: 3 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0x98,
    repr: 'RES 3, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['resetBit', { bit: 3 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0x99,
    repr: 'RES 3, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['resetBit', { bit: 3 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0x9A,
    repr: 'RES 3, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['resetBit', { bit: 3 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0x9B,
    repr: 'RES 3, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['resetBit', { bit: 3 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0x9C,
    repr: 'RES 3, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['resetBit', { bit: 3 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0x9D,
    repr: 'RES 3, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['resetBit', { bit: 3 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0x9E,
    repr: 'RES 3, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['resetBit', { bit: 3 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x67,
    repr: 'BIT 4, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['testBit', { bit: 4 }],
    ],
  },
  {
    opcode: 0x60,
    repr: 'BIT 4, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['testBit', { bit: 4 }],
    ],
  },
  {
    opcode: 0x61,
    repr: 'BIT 4, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['testBit', { bit: 4 }],
    ],
  },
  {
    opcode: 0x62,
    repr: 'BIT 4, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['testBit', { bit: 4 }],
    ],
  },
  {
    opcode: 0x63,
    repr: 'BIT 4, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['testBit', { bit: 4 }],
    ],
  },
  {
    opcode: 0x64,
    repr: 'BIT 4, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['testBit', { bit: 4 }],
    ],
  },
  {
    opcode: 0x65,
    repr: 'BIT 4, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['testBit', { bit: 4 }],
    ],
  },
  {
    opcode: 0x66,
    repr: 'BIT 4, (HL)',
    cycles: 12,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['testBit', { bit: 4 }],
    ],
  },
  {
    opcode: 0xE7,
    repr: 'SET 4, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['setBit', { bit: 4 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xE0,
    repr: 'SET 4, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['setBit', { bit: 4 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0xE1,
    repr: 'SET 4, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['setBit', { bit: 4 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0xE2,
    repr: 'SET 4, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['setBit', { bit: 4 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0xE3,
    repr: 'SET 4, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['setBit', { bit: 4 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0xE4,
    repr: 'SET 4, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['setBit', { bit: 4 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0xE5,
    repr: 'SET 4, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['setBit', { bit: 4 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0xE6,
    repr: 'SET 4, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['setBit', { bit: 4 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0xA7,
    repr: 'RES 4, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['resetBit', { bit: 4 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xA0,
    repr: 'RES 4, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['resetBit', { bit: 4 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0xA1,
    repr: 'RES 4, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['resetBit', { bit: 4 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0xA2,
    repr: 'RES 4, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['resetBit', { bit: 4 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0xA3,
    repr: 'RES 4, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['resetBit', { bit: 4 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0xA4,
    repr: 'RES 4, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['resetBit', { bit: 4 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0xA5,
    repr: 'RES 4, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['resetBit', { bit: 4 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0xA6,
    repr: 'RES 4, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['resetBit', { bit: 4 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x6F,
    repr: 'BIT 5, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['testBit', { bit: 5 }],
    ],
  },
  {
    opcode: 0x68,
    repr: 'BIT 5, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['testBit', { bit: 5 }],
    ],
  },
  {
    opcode: 0x69,
    repr: 'BIT 5, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['testBit', { bit: 5 }],
    ],
  },
  {
    opcode: 0x6A,
    repr: 'BIT 5, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['testBit', { bit: 5 }],
    ],
  },
  {
    opcode: 0x6B,
    repr: 'BIT 5, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['testBit', { bit: 5 }],
    ],
  },
  {
    opcode: 0x6C,
    repr: 'BIT 5, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['testBit', { bit: 5 }],
    ],
  },
  {
    opcode: 0x6D,
    repr: 'BIT 5, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['testBit', { bit: 5 }],
    ],
  },
  {
    opcode: 0x6E,
    repr: 'BIT 5, (HL)',
    cycles: 12,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['testBit', { bit: 5 }],
    ],
  },
  {
    opcode: 0xEF,
    repr: 'SET 5, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['setBit', { bit: 5 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xE8,
    repr: 'SET 5, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['setBit', { bit: 5 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0xE9,
    repr: 'SET 5, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['setBit', { bit: 5 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0xEA,
    repr: 'SET 5, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['setBit', { bit: 5 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0xEB,
    repr: 'SET 5, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['setBit', { bit: 5 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0xEC,
    repr: 'SET 5, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['setBit', { bit: 5 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0xED,
    repr: 'SET 5, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['setBit', { bit: 5 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0xEE,
    repr: 'SET 5, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['setBit', { bit: 5 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0xAF,
    repr: 'RES 5, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['resetBit', { bit: 5 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xA8,
    repr: 'RES 5, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['resetBit', { bit: 5 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0xA9,
    repr: 'RES 5, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['resetBit', { bit: 5 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0xAA,
    repr: 'RES 5, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['resetBit', { bit: 5 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0xAB,
    repr: 'RES 5, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['resetBit', { bit: 5 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0xAC,
    repr: 'RES 5, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['resetBit', { bit: 5 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0xAD,
    repr: 'RES 5, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['resetBit', { bit: 5 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0xAE,
    repr: 'RES 5, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['resetBit', { bit: 5 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x77,
    repr: 'BIT 6, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['testBit', { bit: 6 }],
    ],
  },
  {
    opcode: 0x70,
    repr: 'BIT 6, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['testBit', { bit: 6 }],
    ],
  },
  {
    opcode: 0x71,
    repr: 'BIT 6, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['testBit', { bit: 6 }],
    ],
  },
  {
    opcode: 0x72,
    repr: 'BIT 6, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['testBit', { bit: 6 }],
    ],
  },
  {
    opcode: 0x73,
    repr: 'BIT 6, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['testBit', { bit: 6 }],
    ],
  },
  {
    opcode: 0x74,
    repr: 'BIT 6, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['testBit', { bit: 6 }],
    ],
  },
  {
    opcode: 0x75,
    repr: 'BIT 6, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['testBit', { bit: 6 }],
    ],
  },
  {
    opcode: 0x76,
    repr: 'BIT 6, (HL)',
    cycles: 12,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['testBit', { bit: 6 }],
    ],
  },
  {
    opcode: 0xF7,
    repr: 'SET 6, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['setBit', { bit: 6 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xF0,
    repr: 'SET 6, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['setBit', { bit: 6 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0xF1,
    repr: 'SET 6, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['setBit', { bit: 6 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0xF2,
    repr: 'SET 6, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['setBit', { bit: 6 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0xF3,
    repr: 'SET 6, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['setBit', { bit: 6 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0xF4,
    repr: 'SET 6, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['setBit', { bit: 6 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0xF5,
    repr: 'SET 6, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['setBit', { bit: 6 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0xF6,
    repr: 'SET 6, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['setBit', { bit: 6 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0xB7,
    repr: 'RES 6, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['resetBit', { bit: 6 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xB0,
    repr: 'RES 6, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['resetBit', { bit: 6 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0xB1,
    repr: 'RES 6, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['resetBit', { bit: 6 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0xB2,
    repr: 'RES 6, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['resetBit', { bit: 6 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0xB3,
    repr: 'RES 6, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['resetBit', { bit: 6 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0xB4,
    repr: 'RES 6, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['resetBit', { bit: 6 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0xB5,
    repr: 'RES 6, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['resetBit', { bit: 6 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0xB6,
    repr: 'RES 6, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['resetBit', { bit: 6 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0x7F,
    repr: 'BIT 7, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['testBit', { bit: 7 }],
    ],
  },
  {
    opcode: 0x78,
    repr: 'BIT 7, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['testBit', { bit: 7 }],
    ],
  },
  {
    opcode: 0x79,
    repr: 'BIT 7, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['testBit', { bit: 7 }],
    ],
  },
  {
    opcode: 0x7A,
    repr: 'BIT 7, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['testBit', { bit: 7 }],
    ],
  },
  {
    opcode: 0x7B,
    repr: 'BIT 7, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['testBit', { bit: 7 }],
    ],
  },
  {
    opcode: 0x7C,
    repr: 'BIT 7, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['testBit', { bit: 7 }],
    ],
  },
  {
    opcode: 0x7D,
    repr: 'BIT 7, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['testBit', { bit: 7 }],
    ],
  },
  {
    opcode: 0x7E,
    repr: 'BIT 7, (HL)',
    cycles: 12,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['testBit', { bit: 7 }],
    ],
  },
  {
    opcode: 0xFF,
    repr: 'SET 7, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['setBit', { bit: 7 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xF8,
    repr: 'SET 7, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['setBit', { bit: 7 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0xF9,
    repr: 'SET 7, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['setBit', { bit: 7 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0xFA,
    repr: 'SET 7, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['setBit', { bit: 7 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0xFB,
    repr: 'SET 7, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['setBit', { bit: 7 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0xFC,
    repr: 'SET 7, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['setBit', { bit: 7 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0xFD,
    repr: 'SET 7, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['setBit', { bit: 7 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0xFE,
    repr: 'SET 7, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['setBit', { bit: 7 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
  {
    opcode: 0xBF,
    repr: 'RES 7, A',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'a' }],
      ['resetBit', { bit: 7 }],
      ['writeRegister', { register: 'a' }],
    ],
  },
  {
    opcode: 0xB8,
    repr: 'RES 7, B',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'b' }],
      ['resetBit', { bit: 7 }],
      ['writeRegister', { register: 'b' }],
    ],
  },
  {
    opcode: 0xB9,
    repr: 'RES 7, C',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'c' }],
      ['resetBit', { bit: 7 }],
      ['writeRegister', { register: 'c' }],
    ],
  },
  {
    opcode: 0xBA,
    repr: 'RES 7, D',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'd' }],
      ['resetBit', { bit: 7 }],
      ['writeRegister', { register: 'd' }],
    ],
  },
  {
    opcode: 0xBB,
    repr: 'RES 7, E',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'e' }],
      ['resetBit', { bit: 7 }],
      ['writeRegister', { register: 'e' }],
    ],
  },
  {
    opcode: 0xBC,
    repr: 'RES 7, H',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'h' }],
      ['resetBit', { bit: 7 }],
      ['writeRegister', { register: 'h' }],
    ],
  },
  {
    opcode: 0xBD,
    repr: 'RES 7, L',
    cycles: 8,
    chain: [
      ['readRegister', { register: 'l' }],
      ['resetBit', { bit: 7 }],
      ['writeRegister', { register: 'l' }],
    ],
  },
  {
    opcode: 0xBE,
    repr: 'RES 7, (HL)',
    cycles: 16,
    chain: [
      ['readRegister', { register: 'hl' }],
      ['readMemory'],
      ['resetBit', { bit: 7 }],
      ['writeToAddressAtRegister', { register: 'hl' }],
    ],
  },
];
