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
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('LD HL, SP + sbyte');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(12);
    });

    describe('execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('sp', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('sets HL to the correct value', () => {
        expect(this.registers.read('hl')).toEqual(0x11DF);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result overflows', () => {
      beforeEach(() => {
        this.registers.write('sp', 0xFFFF);
        this.mmu.read.and.returnValue(0x10);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result overflows', () => {
      beforeEach(() => {
        this.registers.write('sp', 0xFFFF);
        this.mmu.read.and.returnValue(0xFF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the subtract flag is set', () => {
      beforeEach(() => {
        this.flags.set('n', true);
        this.resolver.resolve(this.instruction);
      });

      it('resets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(false);
      });
    });

    describe('when the zero flag is set', () => {
      beforeEach(() => {
        this.flags.set('z', true);
        this.resolver.resolve(this.instruction);
      });

      it('resets the subtract flag', () => {
        expect(this.flags.get('z')).toEqual(false);
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

  [
    { opcode: 0xF5, register: 'af', repr: 'PUSH AF' },
    { opcode: 0xC5, register: 'bc', repr: 'PUSH BC' },
    { opcode: 0xD5, register: 'de', repr: 'PUSH DE' },
    { opcode: 0xE5, register: 'hl', repr: 'PUSH HL' },
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
        expect(this.instruction.cycles).toEqual(16);
      });

      describe('execution', () => {
        beforeEach(() => {
          this.registers.write('sp', 0xFFFE);
          this.registers.write(register, 0x1234);

          this.resolver.resolve(this.instruction);
        });

        it('writes to memory correctly', () => {
          const calls = this.mmu.write.calls.all();

          expect(calls[0].args).toEqual([0xFFFD, 0x12]);
          expect(calls[1].args).toEqual([0xFFFC, 0x34]);
        });

        it('sets SP to the correct value', () => {
          expect(this.registers.read('sp')).toEqual(0xFFFC);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  [
    { opcode: 0xF1, register: 'af', repr: 'POP AF' },
    { opcode: 0xC1, register: 'bc', repr: 'POP BC' },
    { opcode: 0xD1, register: 'de', repr: 'POP DE' },
    { opcode: 0xE1, register: 'hl', repr: 'POP HL' },
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
          this.registers.write('sp', 0xFFFC);
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', () => {
          const calls = this.mmu.read.calls.all();

          expect(calls[0].args).toEqual([0xFFFC]);
          expect(calls[1].args).toEqual([0xFFFD]);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, () => {
          expect(this.registers.read(register)).toEqual(0xCDAB);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  [
    { opcode: 0x87, register: 'a', repr: 'ADD A, A' },
    { opcode: 0x80, register: 'b', repr: 'ADD A, B' },
    { opcode: 0x81, register: 'c', repr: 'ADD A, C' },
    { opcode: 0x82, register: 'd', repr: 'ADD A, D' },
    { opcode: 0x83, register: 'e', repr: 'ADD A, E' },
    { opcode: 0x84, register: 'h', repr: 'ADD A, H' },
    { opcode: 0x85, register: 'l', repr: 'ADD A, L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
        this.flags = this.registers.get('f');
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(4);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write(register, 0x12);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', () => {
          let value = 0x12;

          if (register === 'a') {
            value = 0x24;
          }

          expect(this.registers.read('a')).toEqual(value);
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

      describe('when the result overflows', () => {
        beforeEach(() => {
          this.registers.write('a', 0xF0);
          this.registers.write(register, 0xF0);

          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the nibble result overflows', () => {
        beforeEach(() => {
          this.registers.write('a', 0xF);
          this.registers.write(register, 0xF);

          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', () => {
          expect(this.flags.get('c')).toEqual(false);
        });
      });

      describe('when the subtract flag is set', () => {
        beforeEach(() => {
          this.flags.set('n', true);
          this.resolver.resolve(this.instruction);
        });

        it('resets the subtract flag', () => {
          expect(this.flags.get('n')).toEqual(false);
        });
      });
    });
  });

  describe('0x86: ADD A, (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x86);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('ADD A, (HL)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0xAB);
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
        this.registers.write('a', 0x55);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result overflows', () => {
      beforeEach(() => {
        this.registers.write('a', 0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result overflows', () => {
      beforeEach(() => {
        this.registers.write('a', 0xF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the subtract flag is set', () => {
      beforeEach(() => {
        this.flags.set('n', true);
        this.resolver.resolve(this.instruction);
      });

      it('resets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(false);
      });
    });
  });

  describe('0xC6: ADD A, byte', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xC6);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('ADD A, byte');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.registers.write('a', 0x55);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result overflows', () => {
      beforeEach(() => {
        this.registers.write('a', 0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result overflows', () => {
      beforeEach(() => {
        this.registers.write('a', 0xF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the subtract flag is set', () => {
      beforeEach(() => {
        this.flags.set('n', true);
        this.resolver.resolve(this.instruction);
      });

      it('resets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(false);
      });
    });
  });

  [
    { opcode: 0x8F, register: 'a', repr: 'ADC A, A' },
    { opcode: 0x88, register: 'b', repr: 'ADC A, B' },
    { opcode: 0x89, register: 'c', repr: 'ADC A, C' },
    { opcode: 0x8A, register: 'd', repr: 'ADC A, D' },
    { opcode: 0x8B, register: 'e', repr: 'ADC A, E' },
    { opcode: 0x8C, register: 'h', repr: 'ADC A, H' },
    { opcode: 0x8D, register: 'l', repr: 'ADC A, L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
        this.flags = this.registers.get('f');
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(4);
      });

      describe('when the carry flag is set', () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write(register, 0x12);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', () => {
          let value = 0x13;

          if (register === 'a') {
            value = 0x25;
          }

          expect(this.registers.read('a')).toEqual(value);
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
          this.registers.write(register, 0x12);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', () => {
          let value = 0x12;

          if (register === 'a') {
            value = 0x24;
          }

          expect(this.registers.read('a')).toEqual(value);
        });

        it('does not set the carry flag', () => {
          expect(this.flags.get('c')).toEqual(false);
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

      describe('when the result overflows', () => {
        beforeEach(() => {
          this.registers.write('a', 0xF0);
          this.registers.write(register, 0xF0);

          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the nibble result overflows', () => {
        beforeEach(() => {
          this.registers.write('a', 0xF);
          this.registers.write(register, 0xF);

          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', () => {
          expect(this.flags.get('c')).toEqual(false);
        });
      });

      describe('when the subtract flag is set', () => {
        beforeEach(() => {
          this.flags.set('n', true);
          this.resolver.resolve(this.instruction);
        });

        it('resets the subtract flag', () => {
          expect(this.flags.get('n')).toEqual(false);
        });
      });
    });
  });

  describe('0x8E: ADC A, (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x8E);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('ADC A, (HL)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('when the carry flag is set', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0xAC);
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
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.registers.write('a', 0x55);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result overflows', () => {
      beforeEach(() => {
        this.registers.write('a', 0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result overflows', () => {
      beforeEach(() => {
        this.registers.write('a', 0xF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the subtract flag is set', () => {
      beforeEach(() => {
        this.flags.set('n', true);
        this.resolver.resolve(this.instruction);
      });

      it('resets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(false);
      });
    });
  });

  describe('0xCE: ADC A, byte', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xCE);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('ADC A, byte');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('when the carry flag is set', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0xAC);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the carry flag is not set', () => {
      beforeEach(() => {
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.registers.write('a', 0x55);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result overflows', () => {
      beforeEach(() => {
        this.registers.write('a', 0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result overflows', () => {
      beforeEach(() => {
        this.registers.write('a', 0xF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the subtract flag is set', () => {
      beforeEach(() => {
        this.flags.set('n', true);
        this.resolver.resolve(this.instruction);
      });

      it('resets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(false);
      });
    });
  });

  describe('0x97: SUB A, A', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x97);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('SUB A, A');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(4);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('a', 0x12);
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0);
      });

      it('sets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });

      it('resets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });

      it('resets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  [
    { opcode: 0x90, register: 'b', repr: 'SUB A, B' },
    { opcode: 0x91, register: 'c', repr: 'SUB A, C' },
    { opcode: 0x92, register: 'd', repr: 'SUB A, D' },
    { opcode: 0x93, register: 'e', repr: 'SUB A, E' },
    { opcode: 0x94, register: 'h', repr: 'SUB A, H' },
    { opcode: 0x95, register: 'l', repr: 'SUB A, L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
        this.flags = this.registers.get('f');
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(4);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);

          this.registers.write('a', 0x24);
          this.registers.write(register, 0x12);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', () => {
          expect(this.registers.read('a')).toEqual(0x12);
        });

        it('sets the subtract flag', () => {
          expect(this.flags.get('n')).toEqual(true);
        });

        it('resets all other flags', () => {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('c')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
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

      describe('when the result is negative', () => {
        beforeEach(() => {
          this.registers.write('a', 0xC0);
          this.registers.write(register, 0xF0);

          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the nibble result is negative', () => {
        beforeEach(() => {
          this.registers.write('a', 0xF0);
          this.registers.write(register, 0xC1);

          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', () => {
          expect(this.flags.get('c')).toEqual(false);
        });
      });
    });
  });

  describe('0x96: SUB A, (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x96);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('SUB A, (HL)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);

        this.registers.write('a', 0xBB);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0x10);
      });

      it('sets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('resets all other flags', () => {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.registers.write('a', 0xAB);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result is negative', () => {
      beforeEach(() => {
        this.registers.write('a', 0x9B);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result is negative', () => {
      beforeEach(() => {
        this.registers.write('a', 0xFA);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  describe('0xD6: SUB A, byte', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xD6);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('SUB A, byte');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('a', 0xAC);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0x01);
      });

      it('sets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('resets all other flags', () => {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.registers.write('a', 0xAB);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result is negative', () => {
      beforeEach(() => {
        this.registers.write('a', 0x9B);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result is negative', () => {
      beforeEach(() => {
        this.registers.write('a', 0xFA);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  describe('0x9F: SBC A, A', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x9F);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('SBC A, A');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(4);
    });

    describe('when the carry flag is set', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('a', 0x12);
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0xFF);
      });

      it('sets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('sets the carry flag again', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the zero flag', () => {
        expect(this.flags.get('z')).toEqual(false);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the carry flag is not set', () => {
      beforeEach(() => {
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0);
      });

      it('sets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });

      it('does not set the carry flag again', () => {
        expect(this.flags.get('c')).toEqual(false);
      });

      it('does not set the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });
    });
  });

  [
    { opcode: 0x98, register: 'b', repr: 'SBC A, B' },
    { opcode: 0x99, register: 'c', repr: 'SBC A, C' },
    { opcode: 0x9A, register: 'd', repr: 'SBC A, D' },
    { opcode: 0x9B, register: 'e', repr: 'SBC A, E' },
    { opcode: 0x9C, register: 'h', repr: 'SBC A, H' },
    { opcode: 0x9D, register: 'l', repr: 'SBC A, L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
        this.flags = this.registers.get('f');
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(4);
      });

      describe('when the carry flag is set', () => {
        beforeEach(() => {
          this.flags.write(0xF0);

          this.registers.write('a', 0x24);
          this.registers.write(register, 0x12);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', () => {
          expect(this.registers.read('a')).toEqual(0x11);
        });

        it('sets the subtract flag', () => {
          expect(this.flags.get('n')).toEqual(true);
        });

        it('resets all other flags', () => {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('c')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the carry flag is not set', () => {
        beforeEach(() => {
          this.registers.write('a', 0x24);
          this.registers.write(register, 0x12);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', () => {
          expect(this.registers.read('a')).toEqual(0x12);
        });

        it('does not set the carry flag', () => {
          expect(this.flags.get('c')).toEqual(false);
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

      describe('when the result is negative', () => {
        beforeEach(() => {
          this.registers.write('a', 0xC0);
          this.registers.write(register, 0xF0);

          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the nibble result is negative', () => {
        beforeEach(() => {
          this.registers.write('a', 0xF0);
          this.registers.write(register, 0xC1);

          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', () => {
          expect(this.flags.get('c')).toEqual(false);
        });
      });
    });
  });

  describe('0x9E: SBC A, (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x9E);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('SBC A, (HL)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('when the carry flag is set', () => {
      beforeEach(() => {
        this.flags.write(0xF0);

        this.registers.write('a', 0xBC);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0x10);
      });

      it('sets the subtract flag again', () => {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('resets all other flags', () => {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the carry flag is not set', () => {
      beforeEach(() => {
        this.registers.write('a', 0xBB);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0x10);
      });

      it('resets the carry flag again', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.registers.write('a', 0xAB);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result is negative', () => {
      beforeEach(() => {
        this.registers.write('a', 0x9B);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result is negative', () => {
      beforeEach(() => {
        this.registers.write('a', 0xFA);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  [
    { opcode: 0xA7, register: 'a', repr: 'AND A, A' },
    { opcode: 0xA0, register: 'b', repr: 'AND A, B' },
    { opcode: 0xA1, register: 'c', repr: 'AND A, C' },
    { opcode: 0xA2, register: 'd', repr: 'AND A, D' },
    { opcode: 0xA3, register: 'e', repr: 'AND A, E' },
    { opcode: 0xA4, register: 'h', repr: 'AND A, H' },
    { opcode: 0xA5, register: 'l', repr: 'AND A, L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
        this.flags = this.registers.get('f');
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(4);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);

          this.registers.write('a', 0b01010101);
          this.registers.write(register, 0b00110011);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', () => {
          let value = 0b00010001;

          if (register === 'a') {
            value = 0b00110011;
          }

          expect(this.registers.read('a')).toEqual(value);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('resets all other flags', () => {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('c')).toEqual(false);
          expect(this.flags.get('n')).toEqual(false);
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

  describe('0xA6: AND A, (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xA6);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('AND A, (HL)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);

        this.registers.write('a', 0b10101011);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0b10101011);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('resets all other flags', () => {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('n')).toEqual(false);
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

  describe('0xE6: AND A, byte', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xE6);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('AND A, byte');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('a', 0b10101011);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0b10101011);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('resets all other flags', () => {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('n')).toEqual(false);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
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

  [
    { opcode: 0xB7, register: 'a', repr: 'OR A, A' },
    { opcode: 0xB0, register: 'b', repr: 'OR A, B' },
    { opcode: 0xB1, register: 'c', repr: 'OR A, C' },
    { opcode: 0xB2, register: 'd', repr: 'OR A, D' },
    { opcode: 0xB3, register: 'e', repr: 'OR A, E' },
    { opcode: 0xB4, register: 'h', repr: 'OR A, H' },
    { opcode: 0xB5, register: 'l', repr: 'OR A, L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
        this.flags = this.registers.get('f');
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(4);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);

          this.registers.write('a', 0b01010101);
          this.registers.write(register, 0b00110011);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', () => {
          let value = 0b01110111;

          if (register === 'a') {
            value = 0b00110011;
          }

          expect(this.registers.read('a')).toEqual(value);
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

  describe('0xB6: OR A, (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xB6);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('OR A, (HL)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);

        this.registers.write('a', 0b10101010);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0b10101011);
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

  describe('0xF6: OR A, byte', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xF6);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('OR A, byte');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('a', 0b10101010);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0b10101011);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
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

  describe('0xAF: XOR A, A', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xAF);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('XOR A, A');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(4);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('a', 0b01010101);
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(0);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });

      it('resets all other flags', () => {
        expect(this.flags.get('n')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  [
    { opcode: 0xA8, register: 'b', repr: 'XOR A, B' },
    { opcode: 0xA9, register: 'c', repr: 'XOR A, C' },
    { opcode: 0xAA, register: 'd', repr: 'XOR A, D' },
    { opcode: 0xAB, register: 'e', repr: 'XOR A, E' },
    { opcode: 0xAC, register: 'h', repr: 'XOR A, H' },
    { opcode: 0xAD, register: 'l', repr: 'XOR A, L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
        this.flags = this.registers.get('f');
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(4);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);

          this.registers.write('a', 0b01010101);
          this.registers.write(register, 0b00110011);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', () => {
          expect(this.registers.read('a')).toEqual(0b01100110);
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

  describe('0xAE: XOR A, (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xAE);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('XOR A, (HL)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);

        this.registers.write('a', 0b10101010);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(1);
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

  describe('0xEE: XOR A, byte', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xEE);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('XOR A, byte');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('a', 0b10101010);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets A to the correct value', () => {
        expect(this.registers.read('a')).toEqual(1);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
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

  describe('0xBF: CP A, A', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xBF);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('CP A, A');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(4);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('a', 0x12);
        this.resolver.resolve(this.instruction);
      });

      it('does not change A\'s value', () => {
        expect(this.registers.read('a')).toEqual(0x12);
      });

      it('sets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });

      it('resets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });

      it('resets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  [
    { opcode: 0xB8, register: 'b', repr: 'CP A, B' },
    { opcode: 0xB9, register: 'c', repr: 'CP A, C' },
    { opcode: 0xBA, register: 'd', repr: 'CP A, D' },
    { opcode: 0xBB, register: 'e', repr: 'CP A, E' },
    { opcode: 0xBC, register: 'h', repr: 'CP A, H' },
    { opcode: 0xBD, register: 'l', repr: 'CP A, L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
        this.flags = this.registers.get('f');
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(4);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);

          this.registers.write('a', 0x24);
          this.registers.write(register, 0x12);

          this.resolver.resolve(this.instruction);
        });

        it('does not change A\'s value', () => {
          expect(this.registers.read('a')).toEqual(0x24);
        });

        it('sets the subtract flag', () => {
          expect(this.flags.get('n')).toEqual(true);
        });

        it('resets all other flags', () => {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('c')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
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

      describe('when the result is negative', () => {
        beforeEach(() => {
          this.registers.write('a', 0xC0);
          this.registers.write(register, 0xF0);

          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the nibble result is negative', () => {
        beforeEach(() => {
          this.registers.write('a', 0xF0);
          this.registers.write(register, 0xC1);

          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', () => {
          expect(this.flags.get('c')).toEqual(false);
        });
      });
    });
  });

  describe('0xBE: CP A, (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xBE);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('CP A, (HL)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);

        this.registers.write('a', 0xBB);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('does not change A\'s value', () => {
        expect(this.registers.read('a')).toEqual(0xBB);
      });

      it('sets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('resets all other flags', () => {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.registers.write('a', 0xAB);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result is negative', () => {
      beforeEach(() => {
        this.registers.write('a', 0x9B);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result is negative', () => {
      beforeEach(() => {
        this.registers.write('a', 0xFA);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  describe('0xFE: CP A, byte', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xFE);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('CP A, byte');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(8);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('a', 0xAC);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('does not change A\'s value', () => {
        expect(this.registers.read('a')).toEqual(0xAC);
      });

      it('sets the subtract flag', () => {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('resets all other flags', () => {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.registers.write('a', 0xAB);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result is negative', () => {
      beforeEach(() => {
        this.registers.write('a', 0x9B);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result is negative', () => {
      beforeEach(() => {
        this.registers.write('a', 0xFA);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  [
    { opcode: 0x3C, register: 'a', repr: 'INC A' },
    { opcode: 0x04, register: 'b', repr: 'INC B' },
    { opcode: 0x0C, register: 'c', repr: 'INC C' },
    { opcode: 0x14, register: 'd', repr: 'INC D' },
    { opcode: 0x1C, register: 'e', repr: 'INC E' },
    { opcode: 0x24, register: 'h', repr: 'INC H' },
    { opcode: 0x2C, register: 'l', repr: 'INC L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
        this.flags = this.registers.get('f');
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(4);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write(register, 0x12);
          this.resolver.resolve(this.instruction);
        });

        it('increments the register value', () => {
          expect(this.registers.read(register)).toEqual(0x13);
        });

        it('does not change the carry flag value', () => {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('resets all other flags', () => {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('n')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result is zero', () => {
        beforeEach(() => {
          this.registers.write(register, 0xFF);
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', () => {
          expect(this.flags.get('z')).toEqual(true);
        });
      });

      describe('when the nibble result overflows', () => {
        beforeEach(() => {
          this.registers.write(register, 0xF);
          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', () => {
          expect(this.flags.get('c')).toEqual(false);
        });
      });
    });
  });

  describe('0x34: INC (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x34);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('INC (HL)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(12);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0xAC);
      });

      it('does not change the carry flag value', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('resets all other flags', () => {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('n')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0xFF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the nibble result overflows', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0xF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  [
    { opcode: 0x3D, register: 'a', repr: 'DEC A' },
    { opcode: 0x05, register: 'b', repr: 'DEC B' },
    { opcode: 0x0D, register: 'c', repr: 'DEC C' },
    { opcode: 0x15, register: 'd', repr: 'DEC D' },
    { opcode: 0x1D, register: 'e', repr: 'DEC E' },
    { opcode: 0x25, register: 'h', repr: 'DEC H' },
    { opcode: 0x2D, register: 'l', repr: 'DEC L' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
        this.flags = this.registers.get('f');
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(4);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);
          this.registers.write(register, 0x12);
          this.resolver.resolve(this.instruction);
        });

        it('increments the register value', () => {
          expect(this.registers.read(register)).toEqual(0x11);
        });

        it('sets the subtract flag again', () => {
          expect(this.flags.get('n')).toEqual(true);
        });

        it('does not change the carry flag value', () => {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('resets all other flags', () => {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result is zero', () => {
        beforeEach(() => {
          this.registers.write(register, 1);
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', () => {
          expect(this.flags.get('z')).toEqual(true);
        });
      });

      describe('when the nibble result is negative', () => {
        beforeEach(() => {
          this.registers.write(register, 0x10);
          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', () => {
          expect(this.flags.get('c')).toEqual(false);
        });
      });
    });
  });

  describe('0x35: DEC (HL)', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0x35);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('DEC (HL)');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(12);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', () => {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', () => {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0xAA);
      });

      it('sets the subtract flag again', () => {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('does not change the carry flag value', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('resets all other flags', () => {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(1);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', () => {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the nibble result is negative', () => {
      beforeEach(() => {
        this.mmu.read.and.returnValue(0x10);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  [
    { opcode: 0x09, register: 'bc', repr: 'ADD HL, BC' },
    { opcode: 0x19, register: 'de', repr: 'ADD HL, DE' },
    { opcode: 0x29, register: 'hl', repr: 'ADD HL, HL' },
    { opcode: 0x39, register: 'sp', repr: 'ADD HL, SP' },
  ].forEach((params) => {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, () => {
      beforeEach(() => {
        this.instruction = this.instructionSet.find(opcode);
        this.flags = this.registers.get('f');
      });

      it('exposes the correct string representation', () => {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('uses the correct number of cycles', () => {
        expect(this.instruction.cycles).toEqual(8);
      });

      describe('default execution', () => {
        beforeEach(() => {
          this.flags.write(0xF0);

          this.registers.write('hl', 0x1234);
          this.registers.write(register, 0x4321);

          this.resolver.resolve(this.instruction);
        });

        it('writes the correct value to HL', () => {
          let value = 0x5555;

          if (register === 'hl') {
            value = 0x8642;
          }

          expect(this.registers.read('hl')).toEqual(value);
        });

        it('does not change the zero flag value', () => {
          expect(this.flags.get('z')).toEqual(true);
        });

        it('resets all other flags', () => {
          expect(this.flags.get('n')).toEqual(false);
          expect(this.flags.get('c')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result overflows', () => {
        beforeEach(() => {
          this.registers.write('hl', 0x1234);
          this.registers.write(register, 0xF000);

          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', () => {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the nibble result overflows', () => {
        beforeEach(() => {
          this.registers.write('hl', 0xFFF);
          this.registers.write(register, 0xFFF);

          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', () => {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', () => {
          expect(this.flags.get('c')).toEqual(false);
        });
      });
    });
  });

  describe('0xE8: ADD SP, sbyte', () => {
    beforeEach(() => {
      this.instruction = this.instructionSet.find(0xE8);
      this.flags = this.registers.get('f');
    });

    it('exposes the correct string representation', () => {
      expect(this.instruction.repr).toEqual('ADD SP, sbyte');
    });

    it('uses the correct number of cycles', () => {
      expect(this.instruction.cycles).toEqual(16);
    });

    describe('default execution', () => {
      beforeEach(() => {
        this.flags.write(0xF0);
        this.registers.write('sp', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('writes the correct value to SP', () => {
        expect(this.registers.read('sp')).toEqual(0x11DF);
      });

      it('resets all flags', () => {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', () => {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result overflows', () => {
      beforeEach(() => {
        this.registers.write('sp', 0xFFF0);
        this.mmu.read.and.returnValue(0x7F);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', () => {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result overflows', () => {
      beforeEach(() => {
        this.registers.write('sp', 0x000F);
        this.mmu.read.and.returnValue(0x0F);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', () => {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', () => {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  [
    { opcode: 0x03, register: 'bc', repr: 'INC BC' },
    { opcode: 0x13, register: 'de', repr: 'INC DE' },
    { opcode: 0x23, register: 'hl', repr: 'INC HL' },
    { opcode: 0x33, register: 'sp', repr: 'INC SP' },
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

        it('increments the register value', () => {
          expect(this.registers.read(register)).toEqual(0x1235);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  [
    { opcode: 0x0B, register: 'bc', repr: 'DEC BC' },
    { opcode: 0x1B, register: 'de', repr: 'DEC DE' },
    { opcode: 0x2B, register: 'hl', repr: 'DEC HL' },
    { opcode: 0x3B, register: 'sp', repr: 'DEC SP' },
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

        it('increments the register value', () => {
          expect(this.registers.read(register)).toEqual(0x1233);
        });

        it('leaves PC at the correct value', () => {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });
});
