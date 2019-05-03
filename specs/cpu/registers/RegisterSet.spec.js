import RegisterSet from 'emulator/cpu/registers/RegisterSet';
import ByteRegister from 'emulator/cpu/registers/ByteRegister';
import WordRegister from 'emulator/cpu/registers/WordRegister';
import CompositeRegister from 'emulator/cpu/registers/CompositeRegister';

describe('RegisterSet', () => {
  beforeEach(() => {
    this.registerSet = new RegisterSet();
  });

  describe('registers', () => {
    describe('register A', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('a');
      });

      it('is of the right type', () => {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register B', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('b');
      });

      it('is of the right type', () => {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register C', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('c');
      });

      it('is of the right type', () => {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register D', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('d');
      });

      it('is of the right type', () => {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register E', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('e');
      });

      it('is of the right type', () => {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register F', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('f');
      });

      it('is of the right type', () => {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register H', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('h');
      });

      it('is of the right type', () => {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register L', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('l');
      });

      it('is of the right type', () => {
        expect(this.register instanceof ByteRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0xF0);
        expect(this.register.read()).toEqual(0xF0);
      });
    });

    describe('register AF', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('af');
      });

      it('is of the right type', () => {
        expect(this.register instanceof CompositeRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0x8040);
        expect(this.register.read()).toEqual(0x8040);
      });

      it('changes the values of the individual registers correctly', () => {
        this.register.write(0x8040);

        expect(this.registerSet.read('a')).toEqual(0x80);
        expect(this.registerSet.read('f')).toEqual(0x40);
      });
    });

    describe('register BC', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('bc');
      });

      it('is of the right type', () => {
        expect(this.register instanceof CompositeRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0x8040);
        expect(this.register.read()).toEqual(0x8040);
      });

      it('changes the values of the individual registers correctly', () => {
        this.register.write(0x8040);

        expect(this.registerSet.read('b')).toEqual(0x80);
        expect(this.registerSet.read('c')).toEqual(0x40);
      });
    });

    describe('register DE', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('de');
      });

      it('is of the right type', () => {
        expect(this.register instanceof CompositeRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0x8040);
        expect(this.register.read()).toEqual(0x8040);
      });

      it('changes the values of the individual registers correctly', () => {
        this.register.write(0x8040);

        expect(this.registerSet.read('d')).toEqual(0x80);
        expect(this.registerSet.read('e')).toEqual(0x40);
      });
    });

    describe('register HL', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('hl');
      });

      it('is of the right type', () => {
        expect(this.register instanceof CompositeRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0x8040);
        expect(this.register.read()).toEqual(0x8040);
      });

      it('changes the values of the individual registers correctly', () => {
        this.register.write(0x8040);

        expect(this.registerSet.read('h')).toEqual(0x80);
        expect(this.registerSet.read('l')).toEqual(0x40);
      });
    });

    describe('register PC', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('pc');
      });

      it('is of the right type', () => {
        expect(this.register instanceof WordRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0x8040);
        expect(this.register.read()).toEqual(0x8040);
      });
    });

    describe('register SP', () => {
      beforeEach(() => {
        this.register = this.registerSet.get('sp');
      });

      it('is of the right type', () => {
        expect(this.register instanceof WordRegister).toEqual(true);
      });

      it('can be set and retrieved', () => {
        this.register.write(0x8040);
        expect(this.register.read()).toEqual(0x8040);
      });
    });
  });

  describe('reset()', () => {
    beforeEach(() => {
      this.pc = this.registerSet.get('pc');
      this.sp = this.registerSet.get('sp');

      spyOn(this.pc, 'reset');
      spyOn(this.sp, 'reset');

      this.registerSet.reset();
    });

    it('resets the correct registers', () => {
      expect(this.pc.reset).toHaveBeenCalled();
      expect(this.sp.reset).toHaveBeenCalled();
    });
  });
});
