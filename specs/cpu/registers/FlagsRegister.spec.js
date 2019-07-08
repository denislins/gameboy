import FlagsRegister from '/emulator/cpu/registers/FlagsRegister.js';

describe('FlagsRegister', function() {
  beforeEach(function() {
    this.register = new FlagsRegister();
  });

  it('is initialized to zero', function() {
    expect(this.register.read()).toEqual(0);
  });

  it('can be set and retrieved', function() {
    this.register.write(0xF0);
    expect(this.register.read()).toEqual(0xF0);
  });

  it('only writes 8 bit values', function() {
    this.register.write(0x100);
    expect(this.register.read()).toEqual(0);
  });

  describe('zero flag', function() {
    describe('get()', function() {
      it('returns false when the flag is not set', function() {
        expect(this.register.get('z')).toEqual(false);
      });

      it('returns true when the flag is set', function() {
        this.register.set('z', true);
        expect(this.register.get('z')).toEqual(true);
      });
    });

    describe('set()', function() {
      it('sets only the correct bit', function() {
        this.register.set('z', true);
        expect(this.register.read()).toEqual(0b10000000);
      });

      it('resets only the correct bit', function() {
        this.register.write(0xFF);
        this.register.set('z', false);

        expect(this.register.read()).toEqual(0b01111111);
      });
    });
  });

  describe('subtract flag', function() {
    describe('get()', function() {
      it('returns false when the flag is not set', function() {
        expect(this.register.get('n')).toEqual(false);
      });

      it('returns true when the flag is set', function() {
        this.register.set('n', true);
        expect(this.register.get('n')).toEqual(true);
      });
    });

    describe('set()', function() {
      it('sets only the correct bit', function() {
        this.register.set('n', true);
        expect(this.register.read()).toEqual(0b01000000);
      });

      it('resets only the correct bit', function() {
        this.register.write(0xFF);
        this.register.set('n', false);

        expect(this.register.read()).toEqual(0b10111111);
      });
    });
  });

  describe('half-carry flag', function() {
    describe('get()', function() {
      it('returns false when the flag is not set', function() {
        expect(this.register.get('h')).toEqual(false);
      });

      it('returns true when the flag is set', function() {
        this.register.set('h', true);
        expect(this.register.get('h')).toEqual(true);
      });
    });

    describe('set()', function() {
      it('sets only the correct bit', function() {
        this.register.set('h', true);
        expect(this.register.read()).toEqual(0b00100000);
      });

      it('resets only the correct bit', function() {
        this.register.write(0xFF);
        this.register.set('h', false);

        expect(this.register.read()).toEqual(0b11011111);
      });
    });
  });

  describe('carry flag', function() {
    describe('get()', function() {
      it('returns false when the flag is not set', function() {
        expect(this.register.get('c')).toEqual(false);
      });

      it('returns true when the flag is set', function() {
        this.register.set('c', true);
        expect(this.register.get('c')).toEqual(true);
      });
    });

    describe('set()', function() {
      it('sets only the correct bit', function() {
        this.register.set('c', true);
        expect(this.register.read()).toEqual(0b00010000);
      });

      it('resets only the correct bit', function() {
        this.register.write(0xFF);
        this.register.set('c', false);

        expect(this.register.read()).toEqual(0b11101111);
      });
    });
  });
});
