import RegisterSet from '/emulator/cpu/registers/RegisterSet.js';
import ByteRegister from '/emulator/cpu/registers/ByteRegister.js';
import FlagsRegister from '/emulator/cpu/registers/FlagsRegister.js';
import WordRegister from '/emulator/cpu/registers/WordRegister.js';
import CompositeRegister from '/emulator/cpu/registers/CompositeRegister.js';

describe('RegisterSet', function() {
  beforeEach(function() {
    this.registerSet = new RegisterSet();
  });

  describe('registers', function() {
    describe('register A', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('a');
      });

      it('is of the right type', function() {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register B', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('b');
      });

      it('is of the right type', function() {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register C', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('c');
      });

      it('is of the right type', function() {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register D', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('d');
      });

      it('is of the right type', function() {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register E', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('e');
      });

      it('is of the right type', function() {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register F', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('f');
      });

      it('is of the right type', function() {
        expect(this.register instanceof FlagsRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register H', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('h');
      });

      it('is of the right type', function() {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register L', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('l');
      });

      it('is of the right type', function() {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register AF', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('af');
      });

      it('is of the right type', function() {
        expect(this.register instanceof CompositeRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0x8040);
        expect(this.register.read()).toEqual(0x8040);
      });

      it('changes the values of the individual registers correctly', function() {
        this.register.write(0x8040);

        expect(this.registerSet.read('a')).toEqual(0x80);
        expect(this.registerSet.read('f')).toEqual(0x40);
      });
    });

    describe('register BC', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('bc');
      });

      it('is of the right type', function() {
        expect(this.register instanceof CompositeRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0x8040);
        expect(this.register.read()).toEqual(0x8040);
      });

      it('changes the values of the individual registers correctly', function() {
        this.register.write(0x8040);

        expect(this.registerSet.read('b')).toEqual(0x80);
        expect(this.registerSet.read('c')).toEqual(0x40);
      });
    });

    describe('register DE', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('de');
      });

      it('is of the right type', function() {
        expect(this.register instanceof CompositeRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0x8040);
        expect(this.register.read()).toEqual(0x8040);
      });

      it('changes the values of the individual registers correctly', function() {
        this.register.write(0x8040);

        expect(this.registerSet.read('d')).toEqual(0x80);
        expect(this.registerSet.read('e')).toEqual(0x40);
      });
    });

    describe('register HL', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('hl');
      });

      it('is of the right type', function() {
        expect(this.register instanceof CompositeRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0x8040);
        expect(this.register.read()).toEqual(0x8040);
      });

      it('changes the values of the individual registers correctly', function() {
        this.register.write(0x8040);

        expect(this.registerSet.read('h')).toEqual(0x80);
        expect(this.registerSet.read('l')).toEqual(0x40);
      });
    });

    describe('register PC', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('pc');
      });

      it('is of the right type', function() {
        expect(this.register instanceof WordRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0x8040);
        expect(this.register.read()).toEqual(0x8040);
      });
    });

    describe('register SP', function() {
      beforeEach(function() {
        this.register = this.registerSet.get('sp');
      });

      it('is of the right type', function() {
        expect(this.register instanceof WordRegister).toEqual(true);
      });

      it('can be set and retrieved', function() {
        this.register.write(0x8040);
        expect(this.register.read()).toEqual(0x8040);
      });
    });
  });

  describe('reset()', function() {
    beforeEach(function() {
      this.pc = this.registerSet.get('pc');
      this.sp = this.registerSet.get('sp');

      spyOn(this.pc, 'reset');
      spyOn(this.sp, 'reset');

      this.registerSet.reset();
    });

    it('resets the correct registers', function() {
      expect(this.pc.reset).toHaveBeenCalled();
      expect(this.sp.reset).toHaveBeenCalled();
    });
  });
});
