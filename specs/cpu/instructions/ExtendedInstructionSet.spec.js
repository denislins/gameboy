import ExtendedInstructionSet from 'emulator/cpu/instructions/ExtendedInstructionSet';
import InstructionResolver from 'emulator/cpu/instructions/InstructionResolver';
import RegisterSet from 'emulator/cpu/registers/RegisterSet';

describe('ExtendedInstructionSet', () => {
  beforeEach(() => {
    this.instructionSet = new ExtendedInstructionSet();

    this.registers = new RegisterSet();
    this.registers.write('pc', 0x1000);

    this.flags = this.registers.get('f');

    this.mmu = {
      read: jasmine.createSpy('read').and.returnValues(0xAB, 0xCD, 0xEF),
      write: jasmine.createSpy('write'),
    };

    this.resolver = new InstructionResolver(this.registers, this.mmu);
  });

  [
    { opcode: 0x37, register: 'a', repr: 'SWAP A' },
    { opcode: 0x30, register: 'b', repr: 'SWAP B' },
    { opcode: 0x31, register: 'c', repr: 'SWAP C' },
    { opcode: 0x32, register: 'd', repr: 'SWAP D' },
    { opcode: 0x33, register: 'e', repr: 'SWAP E' },
    { opcode: 0x34, register: 'h', repr: 'SWAP H' },
    { opcode: 0x35, register: 'l', repr: 'SWAP L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.registers.write(register, 0xF0);
          this.flags.write(0xF0);
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0x0F);
        });

        it('resets all flags', () => {
          expect(this.flags.read()).toEqual(0);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result is zero', () => {
        beforeEach(() => {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', () => {
          expect(this.flags.get('z')).toEqual(true);
        });
      });
    });
  });

  describe('0x36: SWAP (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x36);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('SWAP (HL)');
    });

    it('executes in the correct number of cycles', () => {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.registers.write('hl', 0x1234);
        this.flags.write(0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0xBA);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  [
    { opcode: 0x07, register: 'a', repr: 'RLC A' },
    { opcode: 0x00, register: 'b', repr: 'RLC B' },
    { opcode: 0x01, register: 'c', repr: 'RLC C' },
    { opcode: 0x02, register: 'd', repr: 'RLC D' },
    { opcode: 0x03, register: 'e', repr: 'RLC E' },
    { opcode: 0x04, register: 'h', repr: 'RLC H' },
    { opcode: 0x05, register: 'l', repr: 'RLC L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write(register, 0b00001111);
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0b0011110);
        });

        it('resets all flags', () => {
          expect(this.flags.read()).toEqual(0);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the bit 7 is set', () => {
        beforeEach(() => {
          this.registers.write(register, 0b10101010);
          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });
      });

      describe('when the result is zero', () => {
        beforeEach(() => {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', () => {
          expect(this.flags.get('z')).toEqual(true);
        });
      });
    });
  });

  describe('0x06: RLC (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x06);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('RLC (HL)');
    });

    it('executes in the correct number of cycles', () => {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.mmu.read.and.returnValue(0b00001111);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0b0011110);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the bit 7 is set', () => {
      beforeEach(() => {
        this.registers.write('hl', 0x1234);
        this.mmu.read.and.returnValue(0b10101010);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  [
    { opcode: 0x17, register: 'a', repr: 'RL A' },
    { opcode: 0x10, register: 'b', repr: 'RL B' },
    { opcode: 0x11, register: 'c', repr: 'RL C' },
    { opcode: 0x12, register: 'd', repr: 'RL D' },
    { opcode: 0x13, register: 'e', repr: 'RL E' },
    { opcode: 0x14, register: 'h', repr: 'RL H' },
    { opcode: 0x15, register: 'l', repr: 'RL L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write(register, 0b00110011);
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0b01100111);
        });

        it('resets all flags', () => {
          expect(this.flags.read()).toEqual(0);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the carry flag is not set', () => {
        beforeEach(() => {
          this.registers.write(register, 0b00110011);
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0b01100110);
        });
      });

      describe('when the bit 7 is set', () => {
        beforeEach(() => {
          this.registers.write(register, 0b10101010);
          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });
      });

      describe('when the result is zero', () => {
        beforeEach(() => {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', () => {
          expect(this.flags.get('z')).toEqual(true);
        });
      });
    });
  });

  describe('0x16: RL (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x16);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('RL (HL)');
    });

    it('executes in the correct number of cycles', () => {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.mmu.read.and.returnValue(0b00110011);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0b01100111);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the carry flag is not set', () => {
      beforeEach(() => {
        this.registers.write('hl', 0x1234);
        this.mmu.read.and.returnValue(0b00110011);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0b01100110);
      });
    });

    describe('when the bit 7 is set', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0b10101010);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  [
    { opcode: 0x0F, register: 'a', repr: 'RRC A' },
    { opcode: 0x08, register: 'b', repr: 'RRC B' },
    { opcode: 0x09, register: 'c', repr: 'RRC C' },
    { opcode: 0x0A, register: 'd', repr: 'RRC D' },
    { opcode: 0x0B, register: 'e', repr: 'RRC E' },
    { opcode: 0x0C, register: 'h', repr: 'RRC H' },
    { opcode: 0x0D, register: 'l', repr: 'RRC L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write(register, 0b11110000);
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0b01111000);
        });

        it('resets all flags', () => {
          expect(this.flags.read()).toEqual(0);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the bit 0 is set', () => {
        beforeEach(() => {
          this.registers.write(register, 0b01010101);
          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });
      });

      describe('when the result is zero', () => {
        beforeEach(() => {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', () => {
          expect(this.flags.get('z')).toEqual(true);
        });
      });
    });
  });

  describe('0x0E: RRC (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x0E);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('RRC (HL)');
    });

    it('executes in the correct number of cycles', () => {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.mmu.read.and.returnValue(0b11110000);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0b01111000);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the bit 0 is set', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0b01010101);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  [
    { opcode: 0x1F, register: 'a', repr: 'RR A' },
    { opcode: 0x18, register: 'b', repr: 'RR B' },
    { opcode: 0x19, register: 'c', repr: 'RR C' },
    { opcode: 0x1A, register: 'd', repr: 'RR D' },
    { opcode: 0x1B, register: 'e', repr: 'RR E' },
    { opcode: 0x1C, register: 'h', repr: 'RR H' },
    { opcode: 0x1D, register: 'l', repr: 'RR L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write(register, 0b11001100);
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0b11100110);
        });

        it('resets all flags', () => {
          expect(this.flags.read()).toEqual(0);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the carry flag is not set', () => {
        beforeEach(() => {
          this.registers.write(register, 0b11001100);
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0b01100110);
        });
      });

      describe('when the bit 0 is set', () => {
        beforeEach(() => {
          this.registers.write(register, 0b01010101);
          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });
      });

      describe('when the result is zero', () => {
        beforeEach(() => {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', () => {
          expect(this.flags.get('z')).toEqual(true);
        });
      });
    });
  });

  describe('0x1E: RR (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x1E);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('RR (HL)');
    });

    it('executes in the correct number of cycles', () => {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.mmu.read.and.returnValue(0b11001100);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0b11100110);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the carry flag is not set', () => {
      beforeEach(() => {
        this.registers.write('hl', 0x1234);
        this.mmu.read.and.returnValue(0b11001100);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0b01100110);
      });
    });

    describe('when the bit 0 is set', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0b01010101);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  [
    {opcode: 0x27, register: 'a', repr: 'SLA A' },
    {opcode: 0x20, register: 'b', repr: 'SLA B' },
    {opcode: 0x21, register: 'c', repr: 'SLA C' },
    {opcode: 0x22, register: 'd', repr: 'SLA D' },
    {opcode: 0x23, register: 'e', repr: 'SLA E' },
    {opcode: 0x24, register: 'h', repr: 'SLA H' },
    {opcode: 0x25, register: 'l', repr: 'SLA L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write(register, 0b01010101);
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0b10101010);
        });

        it('resets all flags', () => {
          expect(this.flags.read()).toEqual(0);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the bit 7 is set', () => {
        beforeEach(() => {
          this.registers.write(register, 0b10101010);
          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });
      });

      describe('when the result is zero', () => {
        beforeEach(() => {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', () => {
          expect(this.flags.get('z')).toEqual(true);
        });
      });
    });
  });

  describe('0x26: SLA (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x26);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('SLA (HL)');
    });

    it('executes in the correct number of cycles', () => {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.mmu.read.and.returnValue(0b01010101);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0b10101010);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the bit 7 is set', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0b10101010);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  [
    { opcode: 0x2F, register: 'a', repr: 'SRA A' },
    { opcode: 0x28, register: 'b', repr: 'SRA B' },
    { opcode: 0x29, register: 'c', repr: 'SRA C' },
    { opcode: 0x2A, register: 'd', repr: 'SRA D' },
    { opcode: 0x2B, register: 'e', repr: 'SRA E' },
    { opcode: 0x2C, register: 'h', repr: 'SRA H' },
    { opcode: 0x2D, register: 'l', repr: 'SRA L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write(register, 0b10101010);
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0b11010101);
        });

        it('resets all flags', () => {
          expect(this.flags.read()).toEqual(0);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the bit 0 is set', () => {
        beforeEach(() => {
          this.registers.write(register, 0b01010101);
          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });
      });

      describe('when the result is zero', () => {
        beforeEach(() => {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', () => {
          expect(this.flags.get('z')).toEqual(true);
        });
      });
    });
  });

  describe('0x2E: SRA (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x2E);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('SRA (HL)');
    });

    it('executes in the correct number of cycles', () => {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.mmu.read.and.returnValue(0b10101010);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0b11010101);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the bit 0 is set', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0b01010101);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  [
    { opcode: 0x3F, register: 'a', repr: 'SRL A' },
    { opcode: 0x38, register: 'b', repr: 'SRL B' },
    { opcode: 0x39, register: 'c', repr: 'SRL C' },
    { opcode: 0x3A, register: 'd', repr: 'SRL D' },
    { opcode: 0x3B, register: 'e', repr: 'SRL E' },
    { opcode: 0x3C, register: 'h', repr: 'SRL H' },
    { opcode: 0x3D, register: 'l', repr: 'SRL L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write(register, 0b10101010);
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0b01010101);
        });

        it('resets all flags', () => {
          expect(this.flags.read()).toEqual(0);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the bit 0 is set', () => {
        beforeEach(() => {
          this.registers.write(register, 0b01010101);
          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });
      });

      describe('when the result is zero', () => {
        beforeEach(() => {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', () => {
          expect(this.flags.get('z')).toEqual(true);
        });
      });
    });
  });

  describe('0x3E: SRL (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x3E);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('SRL (HL)');
    });

    it('executes in the correct number of cycles', () => {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.mmu.read.and.returnValue(0b10101010);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0b01010101);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the bit 0 is set', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0b01010101);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  [
    { opcode: 0x47, register: 'a', bit: 0, repr: 'BIT 0, A' },
    { opcode: 0x40, register: 'b', bit: 0, repr: 'BIT 0, B' },
    { opcode: 0x41, register: 'c', bit: 0, repr: 'BIT 0, C' },
    { opcode: 0x42, register: 'd', bit: 0, repr: 'BIT 0, D' },
    { opcode: 0x43, register: 'e', bit: 0, repr: 'BIT 0, E' },
    { opcode: 0x44, register: 'h', bit: 0, repr: 'BIT 0, H' },
    { opcode: 0x45, register: 'l', bit: 0, repr: 'BIT 0, L' },
    { opcode: 0x4F, register: 'a', bit: 1, repr: 'BIT 1, A' },
    { opcode: 0x48, register: 'b', bit: 1, repr: 'BIT 1, B' },
    { opcode: 0x49, register: 'c', bit: 1, repr: 'BIT 1, C' },
    { opcode: 0x4A, register: 'd', bit: 1, repr: 'BIT 1, D' },
    { opcode: 0x4B, register: 'e', bit: 1, repr: 'BIT 1, E' },
    { opcode: 0x4C, register: 'h', bit: 1, repr: 'BIT 1, H' },
    { opcode: 0x4D, register: 'l', bit: 1, repr: 'BIT 1, L' },
    { opcode: 0x57, register: 'a', bit: 2, repr: 'BIT 2, A' },
    { opcode: 0x50, register: 'b', bit: 2, repr: 'BIT 2, B' },
    { opcode: 0x51, register: 'c', bit: 2, repr: 'BIT 2, C' },
    { opcode: 0x52, register: 'd', bit: 2, repr: 'BIT 2, D' },
    { opcode: 0x53, register: 'e', bit: 2, repr: 'BIT 2, E' },
    { opcode: 0x54, register: 'h', bit: 2, repr: 'BIT 2, H' },
    { opcode: 0x55, register: 'l', bit: 2, repr: 'BIT 2, L' },
    { opcode: 0x5F, register: 'a', bit: 3, repr: 'BIT 3, A' },
    { opcode: 0x58, register: 'b', bit: 3, repr: 'BIT 3, B' },
    { opcode: 0x59, register: 'c', bit: 3, repr: 'BIT 3, C' },
    { opcode: 0x5A, register: 'd', bit: 3, repr: 'BIT 3, D' },
    { opcode: 0x5B, register: 'e', bit: 3, repr: 'BIT 3, E' },
    { opcode: 0x5C, register: 'h', bit: 3, repr: 'BIT 3, H' },
    { opcode: 0x5D, register: 'l', bit: 3, repr: 'BIT 3, L' },
    { opcode: 0x67, register: 'a', bit: 4, repr: 'BIT 4, A' },
    { opcode: 0x60, register: 'b', bit: 4, repr: 'BIT 4, B' },
    { opcode: 0x61, register: 'c', bit: 4, repr: 'BIT 4, C' },
    { opcode: 0x62, register: 'd', bit: 4, repr: 'BIT 4, D' },
    { opcode: 0x63, register: 'e', bit: 4, repr: 'BIT 4, E' },
    { opcode: 0x64, register: 'h', bit: 4, repr: 'BIT 4, H' },
    { opcode: 0x65, register: 'l', bit: 4, repr: 'BIT 4, L' },
    { opcode: 0x6F, register: 'a', bit: 5, repr: 'BIT 5, A' },
    { opcode: 0x68, register: 'b', bit: 5, repr: 'BIT 5, B' },
    { opcode: 0x69, register: 'c', bit: 5, repr: 'BIT 5, C' },
    { opcode: 0x6A, register: 'd', bit: 5, repr: 'BIT 5, D' },
    { opcode: 0x6B, register: 'e', bit: 5, repr: 'BIT 5, E' },
    { opcode: 0x6C, register: 'h', bit: 5, repr: 'BIT 5, H' },
    { opcode: 0x6D, register: 'l', bit: 5, repr: 'BIT 5, L' },
    { opcode: 0x77, register: 'a', bit: 6, repr: 'BIT 6, A' },
    { opcode: 0x70, register: 'b', bit: 6, repr: 'BIT 6, B' },
    { opcode: 0x71, register: 'c', bit: 6, repr: 'BIT 6, C' },
    { opcode: 0x72, register: 'd', bit: 6, repr: 'BIT 6, D' },
    { opcode: 0x73, register: 'e', bit: 6, repr: 'BIT 6, E' },
    { opcode: 0x74, register: 'h', bit: 6, repr: 'BIT 6, H' },
    { opcode: 0x75, register: 'l', bit: 6, repr: 'BIT 6, L' },
    { opcode: 0x7F, register: 'a', bit: 7, repr: 'BIT 7, A' },
    { opcode: 0x78, register: 'b', bit: 7, repr: 'BIT 7, B' },
    { opcode: 0x79, register: 'c', bit: 7, repr: 'BIT 7, C' },
    { opcode: 0x7A, register: 'd', bit: 7, repr: 'BIT 7, D' },
    { opcode: 0x7B, register: 'e', bit: 7, repr: 'BIT 7, E' },
    { opcode: 0x7C, register: 'h', bit: 7, repr: 'BIT 7, H' },
    { opcode: 0x7D, register: 'l', bit: 7, repr: 'BIT 7, L' },
  ].forEach((params) => {
    const { opcode, register, bit, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe(`when the bit ${bit} is set`, () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write(register, 1 << bit);
          this.resolver.resolve(this.instruction);
        });

        it('clears the zero flag', () => {
          expect(this.flags.get('z')).toEqual(false);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('clears the subtract flag', () => {
          expect(this.flags.get('n')).toEqual(false);
        });

        it('does not change the carry flag value', () => {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe(`when the bit ${bit} is not set`, () => {
        beforeEach(() => {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', () => {
          expect(this.flags.get('z')).toEqual(true);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('clears the subtract flag', () => {
          expect(this.flags.get('n')).toEqual(false);
        });

        it('does not change the carry flag value', () => {
          expect(this.flags.get('c')).toEqual(false);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  [
    { opcode: 0x46, bit: 0, repr: 'BIT 0, (HL)' },
    { opcode: 0x4E, bit: 1, repr: 'BIT 1, (HL)' },
    { opcode: 0x56, bit: 2, repr: 'BIT 2, (HL)' },
    { opcode: 0x5E, bit: 3, repr: 'BIT 3, (HL)' },
    { opcode: 0x66, bit: 4, repr: 'BIT 4, (HL)' },
    { opcode: 0x6E, bit: 5, repr: 'BIT 5, (HL)' },
    { opcode: 0x76, bit: 6, repr: 'BIT 6, (HL)' },
    { opcode: 0x7E, bit: 7, repr: 'BIT 7, (HL)' },
  ].forEach((params) => {
    const { opcode, bit, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(16);
      });

      describe(`when the bit ${bit} is set`, () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write('hl', 0x1234);
          this.mmu.read.and.returnValue(1 << bit);
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', () => {
          expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
        });

        it('clears the zero flag', () => {
          expect(this.flags.get('z')).toEqual(false);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('clears the subtract flag', () => {
          expect(this.flags.get('n')).toEqual(false);
        });

        it('does not change the carry flag value', () => {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe(`when the bit ${bit} is not set`, () => {
        beforeEach(() => {
          this.registers.write('hl', 0x1234);
          this.mmu.read.and.returnValue(0);
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', () => {
          expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
        });

        it('sets the zero flag', () => {
          expect(this.flags.get('z')).toEqual(true);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('clears the subtract flag', () => {
          expect(this.flags.get('n')).toEqual(false);
        });

        it('does not change the carry flag value', () => {
          expect(this.flags.get('c')).toEqual(false);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  [
    { opcode: 0xC7, register: 'a', bit: 0, repr: 'SET 0, A' },
    { opcode: 0xC0, register: 'b', bit: 0, repr: 'SET 0, B' },
    { opcode: 0xC1, register: 'c', bit: 0, repr: 'SET 0, C' },
    { opcode: 0xC2, register: 'd', bit: 0, repr: 'SET 0, D' },
    { opcode: 0xC3, register: 'e', bit: 0, repr: 'SET 0, E' },
    { opcode: 0xC4, register: 'h', bit: 0, repr: 'SET 0, H' },
    { opcode: 0xC5, register: 'l', bit: 0, repr: 'SET 0, L' },
    { opcode: 0xCF, register: 'a', bit: 1, repr: 'SET 1, A' },
    { opcode: 0xC8, register: 'b', bit: 1, repr: 'SET 1, B' },
    { opcode: 0xC9, register: 'c', bit: 1, repr: 'SET 1, C' },
    { opcode: 0xCA, register: 'd', bit: 1, repr: 'SET 1, D' },
    { opcode: 0xCB, register: 'e', bit: 1, repr: 'SET 1, E' },
    { opcode: 0xCC, register: 'h', bit: 1, repr: 'SET 1, H' },
    { opcode: 0xCD, register: 'l', bit: 1, repr: 'SET 1, L' },
    { opcode: 0xD7, register: 'a', bit: 2, repr: 'SET 2, A' },
    { opcode: 0xD0, register: 'b', bit: 2, repr: 'SET 2, B' },
    { opcode: 0xD1, register: 'c', bit: 2, repr: 'SET 2, C' },
    { opcode: 0xD2, register: 'd', bit: 2, repr: 'SET 2, D' },
    { opcode: 0xD3, register: 'e', bit: 2, repr: 'SET 2, E' },
    { opcode: 0xD4, register: 'h', bit: 2, repr: 'SET 2, H' },
    { opcode: 0xD5, register: 'l', bit: 2, repr: 'SET 2, L' },
    { opcode: 0xDF, register: 'a', bit: 3, repr: 'SET 3, A' },
    { opcode: 0xD8, register: 'b', bit: 3, repr: 'SET 3, B' },
    { opcode: 0xD9, register: 'c', bit: 3, repr: 'SET 3, C' },
    { opcode: 0xDA, register: 'd', bit: 3, repr: 'SET 3, D' },
    { opcode: 0xDB, register: 'e', bit: 3, repr: 'SET 3, E' },
    { opcode: 0xDC, register: 'h', bit: 3, repr: 'SET 3, H' },
    { opcode: 0xDD, register: 'l', bit: 3, repr: 'SET 3, L' },
    { opcode: 0xE7, register: 'a', bit: 4, repr: 'SET 4, A' },
    { opcode: 0xE0, register: 'b', bit: 4, repr: 'SET 4, B' },
    { opcode: 0xE1, register: 'c', bit: 4, repr: 'SET 4, C' },
    { opcode: 0xE2, register: 'd', bit: 4, repr: 'SET 4, D' },
    { opcode: 0xE3, register: 'e', bit: 4, repr: 'SET 4, E' },
    { opcode: 0xE4, register: 'h', bit: 4, repr: 'SET 4, H' },
    { opcode: 0xE5, register: 'l', bit: 4, repr: 'SET 4, L' },
    { opcode: 0xEF, register: 'a', bit: 5, repr: 'SET 5, A' },
    { opcode: 0xE8, register: 'b', bit: 5, repr: 'SET 5, B' },
    { opcode: 0xE9, register: 'c', bit: 5, repr: 'SET 5, C' },
    { opcode: 0xEA, register: 'd', bit: 5, repr: 'SET 5, D' },
    { opcode: 0xEB, register: 'e', bit: 5, repr: 'SET 5, E' },
    { opcode: 0xEC, register: 'h', bit: 5, repr: 'SET 5, H' },
    { opcode: 0xED, register: 'l', bit: 5, repr: 'SET 5, L' },
    { opcode: 0xF7, register: 'a', bit: 6, repr: 'SET 6, A' },
    { opcode: 0xF0, register: 'b', bit: 6, repr: 'SET 6, B' },
    { opcode: 0xF1, register: 'c', bit: 6, repr: 'SET 6, C' },
    { opcode: 0xF2, register: 'd', bit: 6, repr: 'SET 6, D' },
    { opcode: 0xF3, register: 'e', bit: 6, repr: 'SET 6, E' },
    { opcode: 0xF4, register: 'h', bit: 6, repr: 'SET 6, H' },
    { opcode: 0xF5, register: 'l', bit: 6, repr: 'SET 6, L' },
    { opcode: 0xFF, register: 'a', bit: 7, repr: 'SET 7, A' },
    { opcode: 0xF8, register: 'b', bit: 7, repr: 'SET 7, B' },
    { opcode: 0xF9, register: 'c', bit: 7, repr: 'SET 7, C' },
    { opcode: 0xFA, register: 'd', bit: 7, repr: 'SET 7, D' },
    { opcode: 0xFB, register: 'e', bit: 7, repr: 'SET 7, E' },
    { opcode: 0xFC, register: 'h', bit: 7, repr: 'SET 7, H' },
    { opcode: 0xFD, register: 'l', bit: 7, repr: 'SET 7, L' },
  ].forEach((params) => {
    const { opcode, register, bit, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('execution', () => {
        beforeEach(() => {
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(1 << bit);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  [
    { opcode: 0xC6, bit: 0, repr: 'SET 0, (HL)' },
    { opcode: 0xCE, bit: 1, repr: 'SET 1, (HL)' },
    { opcode: 0xD6, bit: 2, repr: 'SET 2, (HL)' },
    { opcode: 0xDE, bit: 3, repr: 'SET 3, (HL)' },
    { opcode: 0xE6, bit: 4, repr: 'SET 4, (HL)' },
    { opcode: 0xEE, bit: 5, repr: 'SET 5, (HL)' },
    { opcode: 0xF6, bit: 6, repr: 'SET 6, (HL)' },
    { opcode: 0xFE, bit: 7, repr: 'SET 7, (HL)' },
  ].forEach((params) => {
    const { opcode, bit, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(16);
      });

      describe('execution', () => {
        beforeEach(() => {
          this.registers.write('hl', 0x1234);
          this.mmu.read.and.returnValue(0);
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', () => {
          expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
        });

        it('writes to memory correctly', () => {
          expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 1 << bit);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  [
    { opcode: 0x87, register: 'a', bit: 0, repr: 'RES 0, A' },
    { opcode: 0x80, register: 'b', bit: 0, repr: 'RES 0, B' },
    { opcode: 0x81, register: 'c', bit: 0, repr: 'RES 0, C' },
    { opcode: 0x82, register: 'd', bit: 0, repr: 'RES 0, D' },
    { opcode: 0x83, register: 'e', bit: 0, repr: 'RES 0, E' },
    { opcode: 0x84, register: 'h', bit: 0, repr: 'RES 0, H' },
    { opcode: 0x85, register: 'l', bit: 0, repr: 'RES 0, L' },
    { opcode: 0x8F, register: 'a', bit: 1, repr: 'RES 1, A' },
    { opcode: 0x88, register: 'b', bit: 1, repr: 'RES 1, B' },
    { opcode: 0x89, register: 'c', bit: 1, repr: 'RES 1, C' },
    { opcode: 0x8A, register: 'd', bit: 1, repr: 'RES 1, D' },
    { opcode: 0x8B, register: 'e', bit: 1, repr: 'RES 1, E' },
    { opcode: 0x8C, register: 'h', bit: 1, repr: 'RES 1, H' },
    { opcode: 0x8D, register: 'l', bit: 1, repr: 'RES 1, L' },
    { opcode: 0x97, register: 'a', bit: 2, repr: 'RES 2, A' },
    { opcode: 0x90, register: 'b', bit: 2, repr: 'RES 2, B' },
    { opcode: 0x91, register: 'c', bit: 2, repr: 'RES 2, C' },
    { opcode: 0x92, register: 'd', bit: 2, repr: 'RES 2, D' },
    { opcode: 0x93, register: 'e', bit: 2, repr: 'RES 2, E' },
    { opcode: 0x94, register: 'h', bit: 2, repr: 'RES 2, H' },
    { opcode: 0x95, register: 'l', bit: 2, repr: 'RES 2, L' },
    { opcode: 0x9F, register: 'a', bit: 3, repr: 'RES 3, A' },
    { opcode: 0x98, register: 'b', bit: 3, repr: 'RES 3, B' },
    { opcode: 0x99, register: 'c', bit: 3, repr: 'RES 3, C' },
    { opcode: 0x9A, register: 'd', bit: 3, repr: 'RES 3, D' },
    { opcode: 0x9B, register: 'e', bit: 3, repr: 'RES 3, E' },
    { opcode: 0x9C, register: 'h', bit: 3, repr: 'RES 3, H' },
    { opcode: 0x9D, register: 'l', bit: 3, repr: 'RES 3, L' },
    { opcode: 0xA7, register: 'a', bit: 4, repr: 'RES 4, A' },
    { opcode: 0xA0, register: 'b', bit: 4, repr: 'RES 4, B' },
    { opcode: 0xA1, register: 'c', bit: 4, repr: 'RES 4, C' },
    { opcode: 0xA2, register: 'd', bit: 4, repr: 'RES 4, D' },
    { opcode: 0xA3, register: 'e', bit: 4, repr: 'RES 4, E' },
    { opcode: 0xA4, register: 'h', bit: 4, repr: 'RES 4, H' },
    { opcode: 0xA5, register: 'l', bit: 4, repr: 'RES 4, L' },
    { opcode: 0xAF, register: 'a', bit: 5, repr: 'RES 5, A' },
    { opcode: 0xA8, register: 'b', bit: 5, repr: 'RES 5, B' },
    { opcode: 0xA9, register: 'c', bit: 5, repr: 'RES 5, C' },
    { opcode: 0xAA, register: 'd', bit: 5, repr: 'RES 5, D' },
    { opcode: 0xAB, register: 'e', bit: 5, repr: 'RES 5, E' },
    { opcode: 0xAC, register: 'h', bit: 5, repr: 'RES 5, H' },
    { opcode: 0xAD, register: 'l', bit: 5, repr: 'RES 5, L' },
    { opcode: 0xB7, register: 'a', bit: 6, repr: 'RES 6, A' },
    { opcode: 0xB0, register: 'b', bit: 6, repr: 'RES 6, B' },
    { opcode: 0xB1, register: 'c', bit: 6, repr: 'RES 6, C' },
    { opcode: 0xB2, register: 'd', bit: 6, repr: 'RES 6, D' },
    { opcode: 0xB3, register: 'e', bit: 6, repr: 'RES 6, E' },
    { opcode: 0xB4, register: 'h', bit: 6, repr: 'RES 6, H' },
    { opcode: 0xB5, register: 'l', bit: 6, repr: 'RES 6, L' },
    { opcode: 0xBF, register: 'a', bit: 7, repr: 'RES 7, A' },
    { opcode: 0xB8, register: 'b', bit: 7, repr: 'RES 7, B' },
    { opcode: 0xB9, register: 'c', bit: 7, repr: 'RES 7, C' },
    { opcode: 0xBA, register: 'd', bit: 7, repr: 'RES 7, D' },
    { opcode: 0xBB, register: 'e', bit: 7, repr: 'RES 7, E' },
    { opcode: 0xBC, register: 'h', bit: 7, repr: 'RES 7, H' },
    { opcode: 0xBD, register: 'l', bit: 7, repr: 'RES 7, L' },
  ].forEach((params) => {
    const { opcode, register, bit, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('execution', () => {
        beforeEach(() => {
          this.registers.write(register, 1 << bit)
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  [
    { opcode: 0x86, bit: 0, repr: 'RES 0, (HL)' },
    { opcode: 0x8E, bit: 1, repr: 'RES 1, (HL)' },
    { opcode: 0x96, bit: 2, repr: 'RES 2, (HL)' },
    { opcode: 0x9E, bit: 3, repr: 'RES 3, (HL)' },
    { opcode: 0xA6, bit: 4, repr: 'RES 4, (HL)' },
    { opcode: 0xAE, bit: 5, repr: 'RES 5, (HL)' },
    { opcode: 0xB6, bit: 6, repr: 'RES 6, (HL)' },
    { opcode: 0xBE, bit: 7, repr: 'RES 7, (HL)' },
  ].forEach((params) => {
    const { opcode, bit, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', () => {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(16);
      });

      describe('execution', () => {
        beforeEach(() => {
          this.registers.write('hl', 0x1234);
          this.mmu.read.and.returnValue(1 << bit);
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', () => {
          expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
        });

        it('writes to memory correctly', () => {
          expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });
});
