import InstructionSet from 'emulator/cpu/instructions/InstructionSet';
import InstructionResolver from 'emulator/cpu/instructions/InstructionResolver';
import RegisterSet from 'emulator/cpu/registers/RegisterSet';

describe('InstructionSet', () => {
  beforeEach(() => {
    this.instructionSet = new InstructionSet();

    this.registers = new RegisterSet();
    this.registers.write('pc', 0x1000);

    this.mmu = {
      read: jasmine.createSpy('read').and.returnValues(0xAB, 0xCD, 0xEF),
      write: jasmine.createSpy('write'),
    };

    this.resolver = new InstructionResolver(this.registers, this.mmu);
  });

  [
    { opcode: 0x3E, register: 'a', repr: 'LD A, byte' },
    { opcode: 0x06, register: 'b', repr: 'LD B, byte' },
    { opcode: 0x0E, register: 'c', repr: 'LD C, byte' },
    { opcode: 0x16, register: 'd', repr: 'LD D, byte' },
    { opcode: 0x1E, register: 'e', repr: 'LD E, byte' },
    { opcode: 0x26, register: 'h', repr: 'LD H, byte' },
    { opcode: 0x2E, register: 'l', repr: 'LD L, byte' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(8);
      });

      describe('execution', () => {
        beforeEach(() => {
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', () => {
          expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0xAB);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1001);
        });
      });
    });
  });

  [
    { opcode: 0x7F, from: 'a', to: 'a', repr: 'LD A, A' },
    { opcode: 0x78, from: 'b', to: 'a', repr: 'LD A, B' },
    { opcode: 0x79, from: 'c', to: 'a', repr: 'LD A, C' },
    { opcode: 0x7A, from: 'd', to: 'a', repr: 'LD A, D' },
    { opcode: 0x7B, from: 'e', to: 'a', repr: 'LD A, E' },
    { opcode: 0x7C, from: 'h', to: 'a', repr: 'LD A, H' },
    { opcode: 0x7D, from: 'l', to: 'a', repr: 'LD A, L' },
    { opcode: 0x47, from: 'a', to: 'b', repr: 'LD B, A' },
    { opcode: 0x40, from: 'b', to: 'b', repr: 'LD B, B' },
    { opcode: 0x41, from: 'c', to: 'b', repr: 'LD B, C' },
    { opcode: 0x42, from: 'd', to: 'b', repr: 'LD B, D' },
    { opcode: 0x43, from: 'e', to: 'b', repr: 'LD B, E' },
    { opcode: 0x44, from: 'h', to: 'b', repr: 'LD B, H' },
    { opcode: 0x45, from: 'l', to: 'b', repr: 'LD B, L' },
    { opcode: 0x4F, from: 'a', to: 'c', repr: 'LD C, A' },
    { opcode: 0x48, from: 'b', to: 'c', repr: 'LD C, B' },
    { opcode: 0x49, from: 'c', to: 'c', repr: 'LD C, C' },
    { opcode: 0x4A, from: 'd', to: 'c', repr: 'LD C, D' },
    { opcode: 0x4B, from: 'e', to: 'c', repr: 'LD C, E' },
    { opcode: 0x4C, from: 'h', to: 'c', repr: 'LD C, H' },
    { opcode: 0x4D, from: 'l', to: 'c', repr: 'LD C, L' },
    { opcode: 0x57, from: 'a', to: 'd', repr: 'LD D, A' },
    { opcode: 0x50, from: 'b', to: 'd', repr: 'LD D, B' },
    { opcode: 0x51, from: 'c', to: 'd', repr: 'LD D, C' },
    { opcode: 0x52, from: 'd', to: 'd', repr: 'LD D, D' },
    { opcode: 0x53, from: 'e', to: 'd', repr: 'LD D, E' },
    { opcode: 0x54, from: 'h', to: 'd', repr: 'LD D, H' },
    { opcode: 0x55, from: 'l', to: 'd', repr: 'LD D, L' },
    { opcode: 0x5F, from: 'a', to: 'e', repr: 'LD E, A' },
    { opcode: 0x58, from: 'b', to: 'e', repr: 'LD E, B' },
    { opcode: 0x59, from: 'c', to: 'e', repr: 'LD E, C' },
    { opcode: 0x5A, from: 'd', to: 'e', repr: 'LD E, D' },
    { opcode: 0x5B, from: 'e', to: 'e', repr: 'LD E, E' },
    { opcode: 0x5C, from: 'h', to: 'e', repr: 'LD E, H' },
    { opcode: 0x5D, from: 'l', to: 'e', repr: 'LD E, L' },
    { opcode: 0x67, from: 'a', to: 'h', repr: 'LD H, A' },
    { opcode: 0x60, from: 'b', to: 'h', repr: 'LD H, B' },
    { opcode: 0x61, from: 'c', to: 'h', repr: 'LD H, C' },
    { opcode: 0x62, from: 'd', to: 'h', repr: 'LD H, D' },
    { opcode: 0x63, from: 'e', to: 'h', repr: 'LD H, E' },
    { opcode: 0x64, from: 'h', to: 'h', repr: 'LD H, H' },
    { opcode: 0x65, from: 'l', to: 'h', repr: 'LD H, L' },
    { opcode: 0x6F, from: 'a', to: 'l', repr: 'LD L, A' },
    { opcode: 0x68, from: 'b', to: 'l', repr: 'LD L, B' },
    { opcode: 0x69, from: 'c', to: 'l', repr: 'LD L, C' },
    { opcode: 0x6A, from: 'd', to: 'l', repr: 'LD L, D' },
    { opcode: 0x6B, from: 'e', to: 'l', repr: 'LD L, E' },
    { opcode: 0x6C, from: 'h', to: 'l', repr: 'LD L, H' },
    { opcode: 0x6D, from: 'l', to: 'l', repr: 'LD L, L' },
  ].forEach((params) => {
    const { opcode, from, to, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(4);
      });

      describe('execution', () => {
        beforeEach(() => {
          this.registers.write(from, 0x12);
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${to.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(to)).toEqual(0x12);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  [
    { opcode: 0x7E, register: 'a', repr: 'LD A, (HL)' },
    { opcode: 0x46, register: 'b', repr: 'LD B, (HL)' },
    { opcode: 0x4E, register: 'c', repr: 'LD C, (HL)' },
    { opcode: 0x56, register: 'd', repr: 'LD D, (HL)' },
    { opcode: 0x5E, register: 'e', repr: 'LD E, (HL)' },
    { opcode: 0x66, register: 'h', repr: 'LD H, (HL)' },
    { opcode: 0x6E, register: 'l', repr: 'LD L, (HL)' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(8);
      });

      describe('execution', () => {
        beforeEach(() => {
          this.registers.write('hl', 0x1234);
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', () => {
          expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0xAB);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  [
    { opcode: 0x70, register: 'b', repr: 'LD (HL), B' },
    { opcode: 0x71, register: 'c', repr: 'LD (HL), C' },
    { opcode: 0x72, register: 'd', repr: 'LD (HL), D' },
    { opcode: 0x73, register: 'e', repr: 'LD (HL), E' },
    { opcode: 0x74, register: 'h', repr: 'LD (HL), H' },
    { opcode: 0x75, register: 'l', repr: 'LD (HL), L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(8);
      });

      describe('execution', () => {
        beforeEach(() => {
          this.registers.write(register, 0x12);
          this.registers.write('hl', 0x1234);

          this.resolver.resolve(this.instruction);
        });

        it('writes to memory correctly', () => {
          let value = 0x12;

          if (register === 'l') {
            value = 0x34;
          }

          expect(this.mmu.write).toHaveBeenCalledWith(0x1234, value);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  describe('0x36: LD (HL), byte', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x36);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD (HL), byte');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(12);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0xAB);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });
  });

  [
    { opcode: 0x0A, register: 'bc', repr: 'LD A, (BC)' },
    { opcode: 0x1A, register: 'de', repr: 'LD A, (DE)' },
    { opcode: 0x7E, register: 'hl', repr: 'LD A, (HL)' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(8);
      });

      describe('execution', () => {
        beforeEach(() => {
          this.registers.write(register, 0x1234);
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', () => {
          expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
        });

        it('sets A to the correct value', () => {
          expect(this.registers.read('a')).toEqual(0xAB);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  [
    { opcode: 0x02, register: 'bc', repr: 'LD (BC), A' },
    { opcode: 0x12, register: 'de', repr: 'LD (DE), A' },
    { opcode: 0x77, register: 'hl', repr: 'LD (HL), A' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(8);
      });

      describe('execution', () => {
        beforeEach(() => {
          this.registers.write('a', 0x12);
          this.registers.write(register, 0x1234);

          this.resolver.resolve(this.instruction);
        });

        it('writes to memory correctly', () => {
          expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0x12);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  describe('0xFA: LD A, (word)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xFA);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD A, (word)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(16);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0x1000]);
        expect(calls[1].args).toEqual([0x1001]);
        expect(calls[2].args).toEqual([0xCDAB]);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0xEF);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  describe('0xEA: LD (word), A', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xEA);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD (word), A');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(16);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.registers.write('a', 0x12);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0x1000]);
        expect(calls[1].args).toEqual([0x1001]);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0xCDAB, 0x12);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  describe('0xF2: LD A, (C)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xF2);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD A, (C)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.registers.write('c', 0x12);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0xFF12);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0xE2: LD (C), A', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xE2);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD (C), A');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.registers.write('a', 0x12);
        this.registers.write('c', 0x34);

        this.resolver.resolve(this.instruction);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0xFF34, 0x12);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0x3A: LD A, (HL-)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x3A);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD A, (HL-)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('decrements HL correctly', () => {
        expect(this.registers.read('hl')).toEqual(0x1233);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0x32: LD (HL-), A', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x32);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD (HL-), A');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.registers.write('a', 0x12);
        this.registers.write('hl', 0x3456);

        this.resolver.resolve(this.instruction);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x3456, 0x12);
      });

      it('decrements HL correctly', () => {
        expect(this.registers.read('hl')).toEqual(0x3455);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0x2A: LD A, (HL+)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x2A);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD A, (HL+)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('decrements HL correctly', () => {
        expect(this.registers.read('hl')).toEqual(0x1235);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0x22: LD (HL+), A', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x22);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD (HL+), A');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.registers.write('a', 0x12);
        this.registers.write('hl', 0x3456);

        this.resolver.resolve(this.instruction);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x3456, 0x12);
      });

      it('decrements HL correctly', () => {
        expect(this.registers.read('hl')).toEqual(0x3457);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0xE0: LDH (byte), A', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xE0);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LDH (byte), A');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(12);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.registers.write('a', 0x12);
        this.resolver.resolve(this.instruction);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0xFFAB, 0x12);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });
  });

  describe('0xF0: LDH A, (byte)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xF0);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LDH A, (byte)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(12);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0x1000]);
        expect(calls[1].args).toEqual([0xFFAB]);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0xCD);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });
  });

  [
    { opcode: 0x01, register: 'bc', repr: 'LD BC, word' },
    { opcode: 0x11, register: 'de', repr: 'LD DE, word' },
    { opcode: 0x21, register: 'hl', repr: 'LD HL, word' },
    { opcode: 0x31, register: 'sp', repr: 'LD SP, word' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(12);
      });

      describe('execution', () => {
        beforeEach(() => {
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', () => {
          const calls = this.mmu.read.calls.all();

          expect(calls[0].args).toEqual([0x1000]);
          expect(calls[1].args).toEqual([0x1001]);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0xCDAB);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1002);
        });
      });
    });
  });

  describe('0xF9: LD SP, HL', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xF9);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD SP, HL');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('sets SP to the correct value', () => {
        expect(this.registers.read('sp')).toEqual(0x1234);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0xF8: LD HL, SP + sbyte', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xF8);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD HL, SP + sbyte');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(12);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.registers.write('sp', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('sets HL to the correct value', () => {
        expect(this.registers.read('hl')).toEqual(0x11DF);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });
  });

  describe('0x08: LD (word), SP', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x08);
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD (word), SP');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(20);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.registers.write('sp', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0x1000]);
        expect(calls[1].args).toEqual([0x1001]);
      });

      it('writes to memory correctly', () => {
        const calls = this.mmu.write.calls.all();

        expect(calls[0].args).toEqual([0xCDAB, 0x34]);
        expect(calls[1].args).toEqual([0xCDAC, 0x12]);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });
});
