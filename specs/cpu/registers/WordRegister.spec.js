import WordRegister from 'emulator/cpu/registers/WordRegister';

describe('WordRegister', () => {
  beforeEach(() => {
    this.register = new WordRegister(0x1234);
  });

  it('sets the default value correctly', () => {
    expect(this.register.read()).toEqual(0x1234);
  });

  it('can be set and retrieved', () => {
    this.register.write(0xF0F0);
    expect(this.register.read()).toEqual(0xF0F0);
  });

  it('only writes 16 bit values', () => {
    this.register.write(0x10000);
    expect(this.register.read()).toEqual(0);
  });

  describe('reset()', () => {
    beforeEach(() => {
      this.register.write(0xF0F0);
      this.register.reset();
    });

    it('resets the value to the default value', () => {
      expect(this.register.read()).toEqual(0x1234);
    });
  });
});
