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
});
