import BaseInstructionSet from '/emulator/cpu/instructions/BaseInstructionSet.js';
import InstructionResolver from '/emulator/cpu/instructions/InstructionResolver.js';
import RegisterSet from '/emulator/cpu/registers/RegisterSet.js';

describe('BaseInstructionSet', function() {
  beforeEach(function() {
    this.instructionSet = new BaseInstructionSet();

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
    { opcode: 0x3E, register: 'a', repr: 'LD A, byte' },
    { opcode: 0x06, register: 'b', repr: 'LD B, byte' },
    { opcode: 0x0E, register: 'c', repr: 'LD C, byte' },
    { opcode: 0x16, register: 'd', repr: 'LD D, byte' },
    { opcode: 0x1E, register: 'e', repr: 'LD E, byte' },
    { opcode: 0x26, register: 'h', repr: 'LD H, byte' },
    { opcode: 0x2E, register: 'l', repr: 'LD L, byte' },
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('execution', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', function() {
          expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, function() {
          expect(this.registers.read(register)).toEqual(0xAB);
        });

        it('leaves PC at the correct value', function() {
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
  ].forEach(function(params) {
    const { opcode, from, to, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(4);
      });

      describe('execution', function() {
        beforeEach(function() {
          this.registers.write(from, 0x12);
          this.resolver.resolve(this.instruction);
        });

        it(`sets ${to.toUpperCase()} to the correct value`, function() {
          expect(this.registers.read(to)).toEqual(0x12);
        });

        it('leaves PC at the correct value', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('execution', function() {
        beforeEach(function() {
          this.registers.write('hl', 0x1234);
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', function() {
          expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, function() {
          expect(this.registers.read(register)).toEqual(0xAB);
        });

        it('leaves PC at the correct value', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('execution', function() {
        beforeEach(function() {
          this.registers.write(register, 0x12);
          this.registers.write('hl', 0x1234);

          this.resolver.resolve(this.instruction);
        });

        it('writes to memory correctly', function() {
          let value = 0x12;

          if (register === 'l') {
            value = 0x34;
          }

          expect(this.mmu.write).toHaveBeenCalledWith(0x1234, value);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  describe('0x36: LD (HL), byte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x36);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LD (HL), byte');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(12);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('writes to memory correctly', function() {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0xAB);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });
  });

  [
    { opcode: 0x0A, register: 'bc', repr: 'LD A, (BC)' },
    { opcode: 0x1A, register: 'de', repr: 'LD A, (DE)' },
    { opcode: 0x7E, register: 'hl', repr: 'LD A, (HL)' },
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('execution', function() {
        beforeEach(function() {
          this.registers.write(register, 0x1234);
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', function() {
          expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0xAB);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  [
    { opcode: 0x02, register: 'bc', repr: 'LD (BC), A' },
    { opcode: 0x12, register: 'de', repr: 'LD (DE), A' },
    { opcode: 0x77, register: 'hl', repr: 'LD (HL), A' },
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('execution', function() {
        beforeEach(function() {
          this.registers.write('a', 0x12);
          this.registers.write(register, 0x1234);

          this.resolver.resolve(this.instruction);
        });

        it('writes to memory correctly', function() {
          expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0x12);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  describe('0xFA: LD A, (word)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xFA);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LD A, (word)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0x1000]);
        expect(calls[1].args).toEqual([0x1001]);
        expect(calls[2].args).toEqual([0xCDAB]);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xEF);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  describe('0xEA: LD (word), A', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xEA);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LD (word), A');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.registers.write('a', 0x12);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0x1000]);
        expect(calls[1].args).toEqual([0x1001]);
      });

      it('writes to memory correctly', function() {
        expect(this.mmu.write).toHaveBeenCalledWith(0xCDAB, 0x12);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  describe('0xF2: LD A, (C)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xF2);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LD A, (C)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.registers.write('c', 0x12);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0xFF12);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0xE2: LD (C), A', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xE2);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LD (C), A');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.registers.write('a', 0x12);
        this.registers.write('c', 0x34);

        this.resolver.resolve(this.instruction);
      });

      it('writes to memory correctly', function() {
        expect(this.mmu.write).toHaveBeenCalledWith(0xFF34, 0x12);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0x3A: LD A, (HL-)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x3A);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LD A, (HL-)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('decrements HL correctly', function() {
        expect(this.registers.read('hl')).toEqual(0x1233);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0x32: LD (HL-), A', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x32);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LD (HL-), A');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.registers.write('a', 0x12);
        this.registers.write('hl', 0x3456);

        this.resolver.resolve(this.instruction);
      });

      it('writes to memory correctly', function() {
        expect(this.mmu.write).toHaveBeenCalledWith(0x3456, 0x12);
      });

      it('decrements HL correctly', function() {
        expect(this.registers.read('hl')).toEqual(0x3455);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0x2A: LD A, (HL+)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x2A);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LD A, (HL+)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('decrements HL correctly', function() {
        expect(this.registers.read('hl')).toEqual(0x1235);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0x22: LD (HL+), A', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x22);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LD (HL+), A');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.registers.write('a', 0x12);
        this.registers.write('hl', 0x3456);

        this.resolver.resolve(this.instruction);
      });

      it('writes to memory correctly', function() {
        expect(this.mmu.write).toHaveBeenCalledWith(0x3456, 0x12);
      });

      it('decrements HL correctly', function() {
        expect(this.registers.read('hl')).toEqual(0x3457);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0xE0: LDH (byte), A', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xE0);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LDH (byte), A');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(12);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.registers.write('a', 0x12);
        this.resolver.resolve(this.instruction);
      });

      it('writes to memory correctly', function() {
        expect(this.mmu.write).toHaveBeenCalledWith(0xFFAB, 0x12);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });
  });

  describe('0xF0: LDH A, (byte)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xF0);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LDH A, (byte)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(12);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0x1000]);
        expect(calls[1].args).toEqual([0xFFAB]);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xCD);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });
  });

  [
    { opcode: 0x01, register: 'bc', repr: 'LD BC, word' },
    { opcode: 0x11, register: 'de', repr: 'LD DE, word' },
    { opcode: 0x21, register: 'hl', repr: 'LD HL, word' },
    { opcode: 0x31, register: 'sp', repr: 'LD SP, word' },
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(12);
      });

      describe('execution', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', function() {
          const calls = this.mmu.read.calls.all();

          expect(calls[0].args).toEqual([0x1000]);
          expect(calls[1].args).toEqual([0x1001]);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, function() {
          expect(this.registers.read(register)).toEqual(0xCDAB);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1002);
        });
      });
    });
  });

  describe('0xF9: LD SP, HL', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xF9);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LD SP, HL');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('sets SP to the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0x1234);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0xF8: LD HL, SP + sbyte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xF8);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LD HL, SP + sbyte');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(12);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('sp', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets HL to the correct value', function() {
        expect(this.registers.read('hl')).toEqual(0x11DF);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result overflows', function() {
      beforeEach(function() {
        this.registers.write('sp', 0xFFFF);
        this.mmu.read.and.returnValue(0x10);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result overflows', function() {
      beforeEach(function() {
        this.registers.write('sp', 0xF00F);
        this.mmu.read.and.returnValue(0xF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the subtract flag is set', function() {
      beforeEach(function() {
        this.flags.set('n', true);
        this.resolver.resolve(this.instruction);
      });

      it('resets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(false);
      });
    });

    describe('when the zero flag is set', function() {
      beforeEach(function() {
        this.flags.set('z', true);
        this.resolver.resolve(this.instruction);
      });

      it('resets the subtract flag', function() {
        expect(this.flags.get('z')).toEqual(false);
      });
    });
  });

  describe('0x08: LD (word), SP', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x08);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('LD (word), SP');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(20);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.registers.write('sp', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0x1000]);
        expect(calls[1].args).toEqual([0x1001]);
      });

      it('writes to memory correctly', function() {
        const calls = this.mmu.write.calls.all();

        expect(calls[0].args).toEqual([0xCDAB, 0x34]);
        expect(calls[1].args).toEqual([0xCDAC, 0x12]);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  [
    { opcode: 0xF5, register: 'af', repr: 'PUSH AF' },
    { opcode: 0xC5, register: 'bc', repr: 'PUSH BC' },
    { opcode: 0xD5, register: 'de', repr: 'PUSH DE' },
    { opcode: 0xE5, register: 'hl', repr: 'PUSH HL' },
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(16);
      });

      describe('execution', function() {
        beforeEach(function() {
          this.registers.write('sp', 0xFFFE);
          this.registers.write(register, 0x1234);

          this.resolver.resolve(this.instruction);
        });

        it('writes to memory correctly', function() {
          const calls = this.mmu.write.calls.all();

          expect(calls[0].args).toEqual([0xFFFD, 0x12]);
          expect(calls[1].args).toEqual([0xFFFC, 0x34]);
        });

        it('sets SP to the correct value', function() {
          expect(this.registers.read('sp')).toEqual(0xFFFC);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  describe('0xF1: POP AF', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xF1);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('POP AF');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(12);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.registers.write('sp', 0xFFFC);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0xFFFC]);
        expect(calls[1].args).toEqual([0xFFFD]);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xCD);
      });

      it('does not set the lower nibble for the flag register', function() {
        expect(this.registers.read('f')).toEqual(0xA0);
      });

      it('sets SP to the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFE);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  [
    { opcode: 0xC1, register: 'bc', repr: 'POP BC' },
    { opcode: 0xD1, register: 'de', repr: 'POP DE' },
    { opcode: 0xE1, register: 'hl', repr: 'POP HL' },
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(12);
      });

      describe('execution', function() {
        beforeEach(function() {
          this.registers.write('sp', 0xFFFC);
          this.resolver.resolve(this.instruction);
        });

        it('reads from memory correctly', function() {
          const calls = this.mmu.read.calls.all();

          expect(calls[0].args).toEqual([0xFFFC]);
          expect(calls[1].args).toEqual([0xFFFD]);
        });

        it(`sets ${register.toUpperCase()} to the correct value`, function() {
          expect(this.registers.read(register)).toEqual(0xCDAB);
        });

        it('sets SP to the correct value', function() {
          expect(this.registers.read('sp')).toEqual(0xFFFE);
        });

        it('leaves PC at the correct value', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(4);
      });

      describe('default execution', function() {
        beforeEach(function() {
          this.flags.write(0xF0);
          this.registers.write(register, 0x12);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          let value = 0x12;

          if (register === 'a') {
            value = 0x24;
          }

          expect(this.registers.read('a')).toEqual(value);
        });

        it('resets all flags', function() {
          expect(this.flags.read()).toEqual(0);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result is zero', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', function() {
          expect(this.flags.get('z')).toEqual(true);
        });
      });

      describe('when the result overflows', function() {
        beforeEach(function() {
          this.registers.write('a', 0xF0);
          this.registers.write(register, 0xF0);

          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', function() {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the nibble result overflows', function() {
        beforeEach(function() {
          this.registers.write('a', 0xF);
          this.registers.write(register, 0xF);

          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', function() {
          expect(this.flags.get('c')).toEqual(false);
        });
      });

      describe('when the subtract flag is set', function() {
        beforeEach(function() {
          this.flags.set('n', true);
          this.resolver.resolve(this.instruction);
        });

        it('resets the subtract flag', function() {
          expect(this.flags.get('n')).toEqual(false);
        });
      });
    });
  });

  describe('0x86: ADD A, (HL)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x86);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('ADD A, (HL)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.registers.write('a', 0x55);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result overflows', function() {
      beforeEach(function() {
        this.registers.write('a', 0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result overflows', function() {
      beforeEach(function() {
        this.registers.write('a', 0xF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the subtract flag is set', function() {
      beforeEach(function() {
        this.flags.set('n', true);
        this.resolver.resolve(this.instruction);
      });

      it('resets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(false);
      });
    });
  });

  describe('0xC6: ADD A, byte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xC6);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('ADD A, byte');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.registers.write('a', 0x55);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result overflows', function() {
      beforeEach(function() {
        this.registers.write('a', 0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result overflows', function() {
      beforeEach(function() {
        this.registers.write('a', 0xF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the subtract flag is set', function() {
      beforeEach(function() {
        this.flags.set('n', true);
        this.resolver.resolve(this.instruction);
      });

      it('resets the subtract flag', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(4);
      });

      describe('when the carry flag is set', function() {
        beforeEach(function() {
          this.flags.write(0xF0);
          this.registers.write(register, 0x12);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          let value = 0x13;

          if (register === 'a') {
            value = 0x25;
          }

          expect(this.registers.read('a')).toEqual(value);
        });

        it('resets all flags', function() {
          expect(this.flags.read()).toEqual(0);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the carry flag is not set', function() {
        beforeEach(function() {
          this.registers.write(register, 0x12);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          let value = 0x12;

          if (register === 'a') {
            value = 0x24;
          }

          expect(this.registers.read('a')).toEqual(value);
        });

        it('does not set the carry flag', function() {
          expect(this.flags.get('c')).toEqual(false);
        });
      });

      describe('when the result is zero', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', function() {
          expect(this.flags.get('z')).toEqual(true);
        });
      });

      describe('when the result overflows', function() {
        beforeEach(function() {
          this.registers.write('a', 0xF0);
          this.registers.write(register, 0xF0);

          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', function() {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the nibble result overflows', function() {
        beforeEach(function() {
          this.registers.write('a', 0xF);
          this.registers.write(register, 0xF);

          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', function() {
          expect(this.flags.get('c')).toEqual(false);
        });
      });

      describe('when the subtract flag is set', function() {
        beforeEach(function() {
          this.flags.set('n', true);
          this.resolver.resolve(this.instruction);
        });

        it('resets the subtract flag', function() {
          expect(this.flags.get('n')).toEqual(false);
        });
      });
    });
  });

  describe('0x8E: ADC A, (HL)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x8E);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('ADC A, (HL)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xAC);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('does not set the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.registers.write('a', 0x55);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result overflows', function() {
      beforeEach(function() {
        this.registers.write('a', 0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result overflows', function() {
      beforeEach(function() {
        this.registers.write('a', 0xF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the subtract flag is set', function() {
      beforeEach(function() {
        this.flags.set('n', true);
        this.resolver.resolve(this.instruction);
      });

      it('resets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(false);
      });
    });
  });

  describe('0xCE: ADC A, byte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xCE);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('ADC A, byte');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xAC);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xAB);
      });

      it('does not set the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.registers.write('a', 0x55);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result overflows', function() {
      beforeEach(function() {
        this.registers.write('a', 0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result overflows', function() {
      beforeEach(function() {
        this.registers.write('a', 0xF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the subtract flag is set', function() {
      beforeEach(function() {
        this.flags.set('n', true);
        this.resolver.resolve(this.instruction);
      });

      it('resets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(false);
      });
    });
  });

  describe('0x97: SUB A, A', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x97);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('SUB A, A');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0x12);
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0);
      });

      it('sets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });

      it('resets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });

      it('resets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(4);
      });

      describe('default execution', function() {
        beforeEach(function() {
          this.flags.write(0xF0);

          this.registers.write('a', 0x24);
          this.registers.write(register, 0x12);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0x12);
        });

        it('sets the subtract flag', function() {
          expect(this.flags.get('n')).toEqual(true);
        });

        it('resets all other flags', function() {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('c')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result is zero', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', function() {
          expect(this.flags.get('z')).toEqual(true);
        });
      });

      describe('when the result is negative', function() {
        beforeEach(function() {
          this.registers.write('a', 0xC0);
          this.registers.write(register, 0xF0);

          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', function() {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the nibble result is negative', function() {
        beforeEach(function() {
          this.registers.write('a', 0xF0);
          this.registers.write(register, 0xC1);

          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', function() {
          expect(this.flags.get('c')).toEqual(false);
        });
      });
    });
  });

  describe('0x96: SUB A, (HL)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x96);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('SUB A, (HL)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);

        this.registers.write('a', 0xBB);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0x10);
      });

      it('sets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('resets all other flags', function() {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.registers.write('a', 0xAB);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result is negative', function() {
      beforeEach(function() {
        this.registers.write('a', 0x9B);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result is negative', function() {
      beforeEach(function() {
        this.registers.write('a', 0xFA);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  describe('0xD6: SUB A, byte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xD6);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('SUB A, byte');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0xAC);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0x01);
      });

      it('sets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('resets all other flags', function() {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.registers.write('a', 0xAB);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result is negative', function() {
      beforeEach(function() {
        this.registers.write('a', 0x9B);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result is negative', function() {
      beforeEach(function() {
        this.registers.write('a', 0xFA);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  describe('0x9F: SBC A, A', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x9F);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('SBC A, A');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0x12);
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0xFF);
      });

      it('sets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('sets the carry flag again', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the zero flag', function() {
        expect(this.flags.get('z')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0);
      });

      it('sets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });

      it('does not set the carry flag again', function() {
        expect(this.flags.get('c')).toEqual(false);
      });

      it('does not set the half-carry flag', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(4);
      });

      describe('when the carry flag is set', function() {
        beforeEach(function() {
          this.flags.write(0xF0);

          this.registers.write('a', 0x24);
          this.registers.write(register, 0x12);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0x11);
        });

        it('sets the subtract flag', function() {
          expect(this.flags.get('n')).toEqual(true);
        });

        it('resets all other flags', function() {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('c')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the carry flag is not set', function() {
        beforeEach(function() {
          this.registers.write('a', 0x24);
          this.registers.write(register, 0x12);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0x12);
        });

        it('does not set the carry flag', function() {
          expect(this.flags.get('c')).toEqual(false);
        });
      });

      describe('when the result is zero', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', function() {
          expect(this.flags.get('z')).toEqual(true);
        });
      });

      describe('when the result is negative', function() {
        beforeEach(function() {
          this.registers.write('a', 0xC0);
          this.registers.write(register, 0xF0);

          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', function() {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the nibble result is negative', function() {
        beforeEach(function() {
          this.registers.write('a', 0xF0);
          this.registers.write(register, 0xC1);

          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', function() {
          expect(this.flags.get('c')).toEqual(false);
        });
      });
    });
  });

  describe('0x9E: SBC A, (HL)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x9E);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('SBC A, (HL)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.write(0xF0);

        this.registers.write('a', 0xBC);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0x10);
      });

      it('sets the subtract flag again', function() {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('resets all other flags', function() {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.registers.write('a', 0xBB);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0x10);
      });

      it('resets the carry flag again', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.registers.write('a', 0xAB);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result is negative', function() {
      beforeEach(function() {
        this.registers.write('a', 0x9B);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result is negative', function() {
      beforeEach(function() {
        this.registers.write('a', 0xFA);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(4);
      });

      describe('default execution', function() {
        beforeEach(function() {
          this.flags.write(0xF0);

          this.registers.write('a', 0b01010101);
          this.registers.write(register, 0b00110011);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          let value = 0b00010001;

          if (register === 'a') {
            value = 0b00110011;
          }

          expect(this.registers.read('a')).toEqual(value);
        });

        it('sets the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('resets all other flags', function() {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('c')).toEqual(false);
          expect(this.flags.get('n')).toEqual(false);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result is zero', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', function() {
          expect(this.flags.get('z')).toEqual(true);
        });
      });
    });
  });

  describe('0xA6: AND A, (HL)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xA6);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('AND A, (HL)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);

        this.registers.write('a', 0b10101011);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0b10101011);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('resets all other flags', function() {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('n')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  describe('0xE6: AND A, byte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xE6);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('AND A, byte');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0b10101011);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0b10101011);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('resets all other flags', function() {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('n')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(4);
      });

      describe('default execution', function() {
        beforeEach(function() {
          this.flags.write(0xF0);

          this.registers.write('a', 0b01010101);
          this.registers.write(register, 0b00110011);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          let value = 0b01110111;

          if (register === 'a') {
            value = 0b00110011;
          }

          expect(this.registers.read('a')).toEqual(value);
        });

        it('resets all flags', function() {
          expect(this.flags.read()).toEqual(0);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result is zero', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', function() {
          expect(this.flags.get('z')).toEqual(true);
        });
      });
    });
  });

  describe('0xB6: OR A, (HL)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xB6);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('OR A, (HL)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);

        this.registers.write('a', 0b10101010);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0b10101011);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.mmu.read.and.returnValue(0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  describe('0xF6: OR A, byte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xF6);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('OR A, byte');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0b10101010);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0b10101011);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.mmu.read.and.returnValue(0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  describe('0xAF: XOR A, A', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xAF);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('XOR A, A');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0b01010101);
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });

      it('resets all other flags', function() {
        expect(this.flags.get('n')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(4);
      });

      describe('default execution', function() {
        beforeEach(function() {
          this.flags.write(0xF0);

          this.registers.write('a', 0b01010101);
          this.registers.write(register, 0b00110011);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0b01100110);
        });

        it('resets all flags', function() {
          expect(this.flags.read()).toEqual(0);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result is zero', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', function() {
          expect(this.flags.get('z')).toEqual(true);
        });
      });
    });
  });

  describe('0xAE: XOR A, (HL)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xAE);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('XOR A, (HL)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);

        this.registers.write('a', 0b10101010);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(1);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.mmu.read.and.returnValue(0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  describe('0xEE: XOR A, byte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xEE);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('XOR A, byte');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0b10101010);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(1);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.mmu.read.and.returnValue(0);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });
  });

  describe('0xBF: CP A, A', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xBF);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('CP A, A');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0x12);
        this.resolver.resolve(this.instruction);
      });

      it('does not change A\'s value', function() {
        expect(this.registers.read('a')).toEqual(0x12);
      });

      it('sets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });

      it('resets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });

      it('resets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(4);
      });

      describe('default execution', function() {
        beforeEach(function() {
          this.flags.write(0xF0);

          this.registers.write('a', 0x24);
          this.registers.write(register, 0x12);

          this.resolver.resolve(this.instruction);
        });

        it('does not change A\'s value', function() {
          expect(this.registers.read('a')).toEqual(0x24);
        });

        it('sets the subtract flag', function() {
          expect(this.flags.get('n')).toEqual(true);
        });

        it('resets all other flags', function() {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('c')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result is zero', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', function() {
          expect(this.flags.get('z')).toEqual(true);
        });
      });

      describe('when the result is negative', function() {
        beforeEach(function() {
          this.registers.write('a', 0xC0);
          this.registers.write(register, 0xF0);

          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', function() {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the nibble result is negative', function() {
        beforeEach(function() {
          this.registers.write('a', 0xF0);
          this.registers.write(register, 0xC1);

          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', function() {
          expect(this.flags.get('c')).toEqual(false);
        });
      });
    });
  });

  describe('0xBE: CP A, (HL)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xBE);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('CP A, (HL)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);

        this.registers.write('a', 0xBB);
        this.registers.write('hl', 0x1234);

        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('does not change A\'s value', function() {
        expect(this.registers.read('a')).toEqual(0xBB);
      });

      it('sets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('resets all other flags', function() {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.registers.write('a', 0xAB);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result is negative', function() {
      beforeEach(function() {
        this.registers.write('a', 0x9B);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result is negative', function() {
      beforeEach(function() {
        this.registers.write('a', 0xFA);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  describe('0xFE: CP A, byte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xFE);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('CP A, byte');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(8);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0xAC);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1000);
      });

      it('does not change A\'s value', function() {
        expect(this.registers.read('a')).toEqual(0xAC);
      });

      it('sets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('resets all other flags', function() {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('c')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.registers.write('a', 0xAB);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the result is negative', function() {
      beforeEach(function() {
        this.registers.write('a', 0x9B);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result is negative', function() {
      beforeEach(function() {
        this.registers.write('a', 0xFA);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(4);
      });

      describe('default execution', function() {
        beforeEach(function() {
          this.flags.write(0xF0);
          this.registers.write(register, 0x12);
          this.resolver.resolve(this.instruction);
        });

        it('increments the register value', function() {
          expect(this.registers.read(register)).toEqual(0x13);
        });

        it('does not change the carry flag value', function() {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('resets all other flags', function() {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('n')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result is zero', function() {
        beforeEach(function() {
          this.registers.write(register, 0xFF);
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', function() {
          expect(this.flags.get('z')).toEqual(true);
        });
      });

      describe('when the nibble result overflows', function() {
        beforeEach(function() {
          this.registers.write(register, 0xF);
          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', function() {
          expect(this.flags.get('c')).toEqual(false);
        });
      });
    });
  });

  describe('0x34: INC (HL)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x34);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('INC (HL)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(12);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', function() {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0xAC);
      });

      it('does not change the carry flag value', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('resets all other flags', function() {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('n')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.mmu.read.and.returnValue(0xFF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the nibble result overflows', function() {
      beforeEach(function() {
        this.mmu.read.and.returnValue(0xF);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(4);
      });

      describe('default execution', function() {
        beforeEach(function() {
          this.flags.write(0xF0);
          this.registers.write(register, 0x12);
          this.resolver.resolve(this.instruction);
        });

        it('increments the register value', function() {
          expect(this.registers.read(register)).toEqual(0x11);
        });

        it('sets the subtract flag again', function() {
          expect(this.flags.get('n')).toEqual(true);
        });

        it('does not change the carry flag value', function() {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('resets all other flags', function() {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result is zero', function() {
        beforeEach(function() {
          this.registers.write(register, 1);
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', function() {
          expect(this.flags.get('z')).toEqual(true);
        });
      });

      describe('when the nibble result is negative', function() {
        beforeEach(function() {
          this.registers.write(register, 0x10);
          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', function() {
          expect(this.flags.get('c')).toEqual(false);
        });
      });
    });
  });

  describe('0x35: DEC (HL)', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x35);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('DEC (HL)');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(12);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        expect(this.mmu.read).toHaveBeenCalledWith(0x1234);
      });

      it('writes to memory correctly', function() {
        expect(this.mmu.write).toHaveBeenCalledWith(0x1234, 0xAA);
      });

      it('sets the subtract flag again', function() {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('does not change the carry flag value', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('resets all other flags', function() {
        expect(this.flags.get('z')).toEqual(false);
        expect(this.flags.get('h')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.mmu.read.and.returnValue(1);
        this.resolver.resolve(this.instruction);
      });

      it('sets the zero flag', function() {
        expect(this.flags.get('z')).toEqual(true);
      });
    });

    describe('when the nibble result is negative', function() {
      beforeEach(function() {
        this.mmu.read.and.returnValue(0x10);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  [
    { opcode: 0x09, register: 'bc', repr: 'ADD HL, BC' },
    { opcode: 0x19, register: 'de', repr: 'ADD HL, DE' },
    { opcode: 0x29, register: 'hl', repr: 'ADD HL, HL' },
    { opcode: 0x39, register: 'sp', repr: 'ADD HL, SP' },
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('default execution', function() {
        beforeEach(function() {
          this.flags.write(0xF0);

          this.registers.write('hl', 0x1234);
          this.registers.write(register, 0x4321);

          this.resolver.resolve(this.instruction);
        });

        it('writes the correct value to HL', function() {
          let value = 0x5555;

          if (register === 'hl') {
            value = 0x8642;
          }

          expect(this.registers.read('hl')).toEqual(value);
        });

        it('does not change the zero flag value', function() {
          expect(this.flags.get('z')).toEqual(true);
        });

        it('resets all other flags', function() {
          expect(this.flags.get('n')).toEqual(false);
          expect(this.flags.get('c')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when the result overflows', function() {
        beforeEach(function() {
          this.registers.write('hl', 0x1234);
          this.registers.write(register, 0xF000);

          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', function() {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the nibble result overflows', function() {
        beforeEach(function() {
          this.registers.write('hl', 0xFFF);
          this.registers.write(register, 0xFFF);

          this.resolver.resolve(this.instruction);
        });

        it('sets the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(true);
        });

        it('does not set the carry flag', function() {
          expect(this.flags.get('c')).toEqual(false);
        });
      });
    });
  });

  describe('0xE8: ADD SP, sbyte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xE8);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('ADD SP, sbyte');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('sp', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('writes the correct value to SP', function() {
        expect(this.registers.read('sp')).toEqual(0x11DF);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });

    describe('when the result overflows', function() {
      beforeEach(function() {
        this.registers.write('sp', 0xFFF0);
        this.mmu.read.and.returnValue(0x7F);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not set the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });
    });

    describe('when the nibble result overflows', function() {
      beforeEach(function() {
        this.registers.write('sp', 0x000F);
        this.mmu.read.and.returnValue(0x0F);
        this.resolver.resolve(this.instruction);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not set the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });
    });
  });

  [
    { opcode: 0x03, register: 'bc', repr: 'INC BC' },
    { opcode: 0x13, register: 'de', repr: 'INC DE' },
    { opcode: 0x23, register: 'hl', repr: 'INC HL' },
    { opcode: 0x33, register: 'sp', repr: 'INC SP' },
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('execution', function() {
        beforeEach(function() {
          this.registers.write(register, 0x1234);
          this.resolver.resolve(this.instruction);
        });

        it('increments the register value', function() {
          expect(this.registers.read(register)).toEqual(0x1235);
        });

        it('leaves PC at the correct value', function() {
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
  ].forEach(function(params) {
    const { opcode, register, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(8);
      });

      describe('execution', function() {
        beforeEach(function() {
          this.registers.write(register, 0x1234);
          this.resolver.resolve(this.instruction);
        });

        it('increments the register value', function() {
          expect(this.registers.read(register)).toEqual(0x1233);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });
    });
  });

  describe('0x27: DAA', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x27);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('DAA');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('when the subtract flag is not set', function() {
      describe('default execution', function() {
        beforeEach(function() {
          this.registers.write('a', 0x12);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0x12);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when all flags are set', function() {
        beforeEach(function() {
          this.flags.write(0xF0);
          this.resolver.resolve(this.instruction);
        });

        it('does not change the subtract flag', function() {
          expect(this.flags.get('n')).toEqual(true);
        });

        it('does not change the carry flag', function() {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('resets all other flags', function() {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the half-carry flag is set', function() {
        beforeEach(function() {
          this.registers.write('a', 0x12);
          this.flags.set('h', true);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0x18);
        });
      });

      describe('when the carry flag is set', function() {
        beforeEach(function() {
          this.registers.write('a', 0x12);
          this.flags.set('c', true);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0x72);
        });
      });

      describe('when the lower nibble is greater than 0x9', function() {
        beforeEach(function() {
          this.registers.write('a', 0x9A);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0);
        });
      });

      describe('when the value is greater than 0x99', function() {
        beforeEach(function() {
          this.registers.write('a', 0xA9);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0x9);
        });
      });

      describe('when all conditions are met', function() {
        beforeEach(function() {
          this.registers.write('a', 0xAA);

          this.flags.set('c', true);
          this.flags.set('h', true);

          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0x10);
        });
      });

      describe('when the result is zero', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', function() {
          expect(this.flags.get('z')).toEqual(true);
        });
      });

      describe('when the result overflows', function() {
        beforeEach(function() {
          this.registers.write('a', 0xFF);
          this.resolver.resolve(this.instruction);
        });

        it('sets the carry flag', function() {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('does not set the half-carry flag', function() {
          expect(this.flags.get('h')).toEqual(false);
        });
      });
    });

    describe('when the subtract flag is set', function() {
      beforeEach(function() {
        this.flags.set('n', true);
      });

      describe('default execution', function() {
        beforeEach(function() {
          this.registers.write('a', 0x12);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0x12);
        });

        it('leaves PC at the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1000);
        });
      });

      describe('when all flags are set', function() {
        beforeEach(function() {
          this.flags.write(0xF0);
          this.resolver.resolve(this.instruction);
        });

        it('does not change the subtract flag', function() {
          expect(this.flags.get('n')).toEqual(true);
        });

        it('does not change the carry flag', function() {
          expect(this.flags.get('c')).toEqual(true);
        });

        it('resets all other flags', function() {
          expect(this.flags.get('z')).toEqual(false);
          expect(this.flags.get('h')).toEqual(false);
        });
      });

      describe('when the half-carry flag is set', function() {
        beforeEach(function() {
          this.registers.write('a', 0xAA);
          this.flags.set('h', true);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0xA4);
        });
      });

      describe('when the carry flag is set', function() {
        beforeEach(function() {
          this.registers.write('a', 0xAA);
          this.flags.set('c', true);
          this.resolver.resolve(this.instruction);
        });

        it('sets A to the correct value', function() {
          expect(this.registers.read('a')).toEqual(0x4A);
        });
      });

      describe('when the result is zero', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets the zero flag', function() {
          expect(this.flags.get('z')).toEqual(true);
        });
      });
    });
  });

  describe('0x2F: CPL', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x2F);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('CPL');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0b10101010);
        this.resolver.resolve(this.instruction);
      });

      it('sets A to the correct value', function() {
        expect(this.registers.read('a')).toEqual(0b01010101);
      });

      it('sets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(true);
      });

      it('sets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(true);
      });

      it('does not change the carry flag value', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('does not change the zero flag value', function() {
        expect(this.flags.get('z')).toEqual(true);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0x3F: CCF', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x3F);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('CCF');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('resets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(false);
      });

      it('resets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });

      it('resets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(false);
      });

      it('does not change the zero flag value', function() {
        expect(this.flags.get('z')).toEqual(true);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('resets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });

      it('resets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(false);
      });

      it('does not change the zero flag value', function() {
        expect(this.flags.get('z')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0x37: SCF', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x37);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('SCF');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.resolver.resolve(this.instruction);
      });

      it('does not change the carry flag value', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('resets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });

      it('resets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(false);
      });

      it('does not change the zero flag value', function() {
        expect(this.flags.get('z')).toEqual(true);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });

      it('resets the half-carry flag', function() {
        expect(this.flags.get('h')).toEqual(false);
      });

      it('resets the subtract flag', function() {
        expect(this.flags.get('n')).toEqual(false);
      });

      it('does not change the zero flag value', function() {
        expect(this.flags.get('z')).toEqual(false);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0x00: NOP', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x00);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('NOP');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('execution', function() {
      it('does nothing', function() {
        this.resolver.resolve(this.instruction);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0x76: HALT', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x76);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('HALT');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('execution', function() {
      // TODO
    });
  });

  describe('0x10: STOP', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x10);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('STOP');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('execution', function() {
      // TODO
    });
  });

  describe('0xF3: DI', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xF3);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('DI');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('execution', function() {
      // TODO
    });
  });

  describe('0xFB: EI', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xFB);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('EI');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('execution', function() {
      // TODO
    });
  });

  describe('0x07: RLCA', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x07);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('RLCA');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0b00001111);
        this.resolver.resolve(this.instruction);
      });

      it('writes the correct value to A', function() {
        expect(this.registers.read('a')).toEqual(0b0011110);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the bit 7 is set', function() {
      beforeEach(function() {
        this.registers.write('a', 0b10101010);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('does not set the zero flag', function() {
        expect(this.flags.get('z')).toEqual(false);
      });
    });
  });

  describe('0x17: RLA', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x17);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('RLA');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0b00110011);
        this.resolver.resolve(this.instruction);
      });

      it('writes the correct value to A', function() {
        expect(this.registers.read('a')).toEqual(0b01100111);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.registers.write('a', 0b00110011);
        this.resolver.resolve(this.instruction);
      });

      it('writes the correct value to A', function() {
        expect(this.registers.read('a')).toEqual(0b01100110);
      });
    });

    describe('when the bit 7 is set', function() {
      beforeEach(function() {
        this.registers.write('a', 0b10101010);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('does not set the zero flag', function() {
        expect(this.flags.get('z')).toEqual(false);
      });
    });
  });

  describe('0x0F: RRCA', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x0F);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('RRCA');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0b11110000);
        this.resolver.resolve(this.instruction);
      });

      it('writes the correct value to A', function() {
        expect(this.registers.read('a')).toEqual(0b01111000);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the bit 0 is set', function() {
      beforeEach(function() {
        this.registers.write('a', 0b01010101);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('does not set the zero flag', function() {
        expect(this.flags.get('z')).toEqual(false);
      });
    });
  });

  describe('0x1F: RRA', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x1F);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('RRA');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.flags.write(0xF0);
        this.registers.write('a', 0b11001100);
        this.resolver.resolve(this.instruction);
      });

      it('writes the correct value to A', function() {
        expect(this.registers.read('a')).toEqual(0b11100110);
      });

      it('resets all flags', function() {
        expect(this.flags.read()).toEqual(0);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.registers.write('a', 0b11001100);
        this.resolver.resolve(this.instruction);
      });

      it('writes the correct value to A', function() {
        expect(this.registers.read('a')).toEqual(0b01100110);
      });
    });

    describe('when the bit 0 is set', function() {
      beforeEach(function() {
        this.registers.write('a', 0b01010101);
        this.resolver.resolve(this.instruction);
      });

      it('sets the carry flag', function() {
        expect(this.flags.get('c')).toEqual(true);
      });
    });

    describe('when the result is zero', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('does not set the zero flag', function() {
        expect(this.flags.get('z')).toEqual(false);
      });
    });
  });

  describe('0xC3: JP word', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xC3);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('JP word');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });
  });

  describe('0xC2: JP NZ, word', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xC2);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('JP NZ, word');
    });

    describe('when the zero flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(16);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });

    describe('when the zero flag is set', function() {
      beforeEach(function() {
        this.flags.set('z', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(12);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  describe('0xCA: JP Z, word', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xCA);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('JP Z, word');
    });

    describe('when the zero flag is set', function() {
      beforeEach(function() {
        this.flags.set('z', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(16);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });

    describe('when the zero flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(12);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  describe('0xD2: JP NC, word', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xD2);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('JP NC, word');
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(16);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.set('c', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(12);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  describe('0xDA: JP C, word', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xDA);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('JP C, word');
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.set('c', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(16);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(12);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  describe('0xE9: JP HL', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xE9);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('JP HL');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(4);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.registers.write('hl', 0x1234);
        this.resolver.resolve(this.instruction);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1234);
      });
    });
  });

  describe('0x18: JR sbyte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x18);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('JR sbyte');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(12);
    });

    describe('when the byte is positive', function() {
      beforeEach(function() {
        this.mmu.read.and.returnValue(0x77);
        this.resolver.resolve(this.instruction);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1078);
      });
    });

    describe('when the byte is negative', function() {
      beforeEach(function() {
        this.resolver.resolve(this.instruction);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x0FAC);
      });
    });
  });

  describe('0x20: JR NZ, sbyte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x20);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('JR NZ, sbyte');
    });

    describe('when the zero flag is not set', function() {
      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(12);
      });

      describe('when the byte is positive', function() {
        beforeEach(function() {
          this.mmu.read.and.returnValue(0x77);
          this.resolver.resolve(this.instruction);
        });

        it('sets PC to the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1078);
        });
      });

      describe('when the byte is negative', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets PC to the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x0FAC);
        });
      });
    });

    describe('when the zero flag is set', function() {
      beforeEach(function() {
        this.flags.set('z', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(8);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });
  });

  describe('0x28: JR Z, sbyte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x28);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('JR Z, sbyte');
    });

    describe('when the zero flag is set', function() {
      beforeEach(function() {
        this.flags.set('z', true);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(12);
      });

      describe('when the byte is positive', function() {
        beforeEach(function() {
          this.mmu.read.and.returnValue(0x77);
          this.resolver.resolve(this.instruction);
        });

        it('sets PC to the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1078);
        });
      });

      describe('when the byte is negative', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets PC to the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x0FAC);
        });
      });
    });

    describe('when the zero flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(8);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });
  });

  describe('0x30: JR NC, sbyte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x30);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('JR NC, sbyte');
    });

    describe('when the carry flag is not set', function() {
      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(12);
      });

      describe('when the byte is positive', function() {
        beforeEach(function() {
          this.mmu.read.and.returnValue(0x77);
          this.resolver.resolve(this.instruction);
        });

        it('sets PC to the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1078);
        });
      });

      describe('when the byte is negative', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets PC to the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x0FAC);
        });
      });
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.set('c', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(8);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });
  });

  describe('0x38: JR C, sbyte', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0x38);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('JR C, sbyte');
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.set('c', true);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(12);
      });

      describe('when the byte is positive', function() {
        beforeEach(function() {
          this.mmu.read.and.returnValue(0x77);
          this.resolver.resolve(this.instruction);
        });

        it('sets PC to the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x1078);
        });
      });

      describe('when the byte is negative', function() {
        beforeEach(function() {
          this.resolver.resolve(this.instruction);
        });

        it('sets PC to the correct value', function() {
          expect(this.registers.read('pc')).toEqual(0x0FAC);
        });
      });
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(8);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1001);
      });
    });
  });

  describe('0xCD: CALL word', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xCD);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('CALL word');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(24);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.registers.write('sp', 0xFFFE);
        this.resolver.resolve(this.instruction);
      });

      it('pushes the next instruction address to the stack', function() {
        const calls = this.mmu.write.calls.all();

        expect(calls[0].args).toEqual([0xFFFD, 0x10]);
        expect(calls[1].args).toEqual([0xFFFC, 0x02]);
      });

      it('sets SP to the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFC);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });
  });

  describe('0xC4: CALL NZ, word', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xC4);
      this.registers.write('sp', 0xFFFE);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('CALL NZ, word');
    });

    describe('when the zero flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(24);
      });

      it('pushes the next instruction address to the stack', function() {
        const calls = this.mmu.write.calls.all();

        expect(calls[0].args).toEqual([0xFFFD, 0x10]);
        expect(calls[1].args).toEqual([0xFFFC, 0x02]);
      });

      it('sets SP to the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFC);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });

    describe('when the zero flag is set', function() {
      beforeEach(function() {
        this.flags.set('z', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(12);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFE);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  describe('0xCC: CALL Z, word', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xCC);
      this.registers.write('sp', 0xFFFE);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('CALL Z, word');
    });

    describe('when the zero flag is set', function() {
      beforeEach(function() {
        this.flags.set('z', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(24);
      });

      it('pushes the next instruction address to the stack', function() {
        const calls = this.mmu.write.calls.all();

        expect(calls[0].args).toEqual([0xFFFD, 0x10]);
        expect(calls[1].args).toEqual([0xFFFC, 0x02]);
      });

      it('sets SP to the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFC);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });

    describe('when the zero flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(12);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFE);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  describe('0xD4: CALL NC, word', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xD4);
      this.registers.write('sp', 0xFFFE);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('CALL NC, word');
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(24);
      });

      it('pushes the next instruction address to the stack', function() {
        const calls = this.mmu.write.calls.all();

        expect(calls[0].args).toEqual([0xFFFD, 0x10]);
        expect(calls[1].args).toEqual([0xFFFC, 0x02]);
      });

      it('sets SP to the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFC);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.set('c', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(12);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFE);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  describe('0xDC: CALL C, word', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xDC);
      this.registers.write('sp', 0xFFFE);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('CALL C, word');
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.set('c', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(24);
      });

      it('pushes the next instruction address to the stack', function() {
        const calls = this.mmu.write.calls.all();

        expect(calls[0].args).toEqual([0xFFFD, 0x10]);
        expect(calls[1].args).toEqual([0xFFFC, 0x02]);
      });

      it('sets SP to the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFC);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(12);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFE);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1002);
      });
    });
  });

  [
    { opcode: 0xC7, address: 0x00, repr: 'RST 00H'},
    { opcode: 0xCF, address: 0x08, repr: 'RST 08H'},
    { opcode: 0xD7, address: 0x10, repr: 'RST 10H'},
    { opcode: 0xDF, address: 0x18, repr: 'RST 18H'},
    { opcode: 0xE7, address: 0x20, repr: 'RST 20H'},
    { opcode: 0xEF, address: 0x28, repr: 'RST 28H'},
    { opcode: 0xF7, address: 0x30, repr: 'RST 30H'},
    { opcode: 0xFF, address: 0x38, repr: 'RST 38H'},
  ].forEach(function(params) {
    const { opcode, address, repr } = params;

    describe(`0x${opcode.toString(16)}: ${repr}`, function() {
      beforeEach(function() {
        this.instruction = this.instructionSet.find(opcode);
      });

      it('exposes the correct string representation', function() {
        expect(this.instruction.repr).toEqual(repr);
      });

      it('executes in the correct number of cycles', function() {
        const cycles = this.resolver.resolve(this.instruction);
        expect(cycles).toEqual(16);
      });

      describe('default execution', function() {
        beforeEach(function() {
          this.registers.write('sp', 0xFFFE);
          this.resolver.resolve(this.instruction);
        });

        it('pushes the next instruction address to the stack', function() {
          const calls = this.mmu.write.calls.all();

          expect(calls[0].args).toEqual([0xFFFD, 0x10]);
          expect(calls[1].args).toEqual([0xFFFC, 0x00]);
        });

        it('sets SP to the correct value', function() {
          expect(this.registers.read('sp')).toEqual(0xFFFC);
        });

        it('sets PC to the correct value', function() {
          expect(this.registers.read('pc')).toEqual(address);
        });
      });
    });
  });

  describe('0xC9: RET', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xC9);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('RET');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.registers.write('sp', 0xFFFC);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0xFFFC]);
        expect(calls[1].args).toEqual([0xFFFD]);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFE);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });
  });

  describe('0xC0: RET NZ', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xC0);
      this.registers.write('sp', 0xFFFC);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('RET NZ');
    });

    describe('when the zero flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(20);
      });

      it('reads from memory correctly', function() {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0xFFFC]);
        expect(calls[1].args).toEqual([0xFFFD]);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFE);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });

    describe('when the zero flag is set', function() {
      beforeEach(function() {
        this.flags.set('z', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(8);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFC);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0xC8: RET Z', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xC8);
      this.registers.write('sp', 0xFFFC);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('RET Z');
    });

    describe('when the zero flag is set', function() {
      beforeEach(function() {
        this.flags.set('z', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(20);
      });

      it('reads from memory correctly', function() {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0xFFFC]);
        expect(calls[1].args).toEqual([0xFFFD]);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFE);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });

    describe('when the zero flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(8);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFC);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0xD0: RET NC', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xD0);
      this.registers.write('sp', 0xFFFC);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('RET NC');
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(20);
      });

      it('reads from memory correctly', function() {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0xFFFC]);
        expect(calls[1].args).toEqual([0xFFFD]);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFE);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.set('c', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(8);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFC);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0xD8: RET C', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xD8);
      this.registers.write('sp', 0xFFFC);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('RET C');
    });

    describe('when the carry flag is set', function() {
      beforeEach(function() {
        this.flags.set('c', true);
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(20);
      });

      it('reads from memory correctly', function() {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0xFFFC]);
        expect(calls[1].args).toEqual([0xFFFD]);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFE);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });

    describe('when the carry flag is not set', function() {
      beforeEach(function() {
        this.cycles = this.resolver.resolve(this.instruction);
      });

      it('executes in the correct number of cycles', function() {
        expect(this.cycles).toEqual(8);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFC);
      });

      it('leaves PC at the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0x1000);
      });
    });
  });

  describe('0xD9: RETI', function() {
    beforeEach(function() {
      this.instruction = this.instructionSet.find(0xD9);
    });

    it('exposes the correct string representation', function() {
      expect(this.instruction.repr).toEqual('RETI');
    });

    it('executes in the correct number of cycles', function() {
      const cycles = this.resolver.resolve(this.instruction);
      expect(cycles).toEqual(16);
    });

    describe('default execution', function() {
      beforeEach(function() {
        this.registers.write('sp', 0xFFFC);
        this.resolver.resolve(this.instruction);
      });

      it('reads from memory correctly', function() {
        const calls = this.mmu.read.calls.all();

        expect(calls[0].args).toEqual([0xFFFC]);
        expect(calls[1].args).toEqual([0xFFFD]);
      });

      it('leaves SP at the correct value', function() {
        expect(this.registers.read('sp')).toEqual(0xFFFE);
      });

      it('sets PC to the correct value', function() {
        expect(this.registers.read('pc')).toEqual(0xCDAB);
      });
    });
  });
});
