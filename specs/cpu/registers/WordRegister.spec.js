import WordRegister from 'emulator/cpu/registers/WordRegister';

describe('WordRegister', () => {
  beforeEach(() => {
    this.register = new WordRegister();
  });

  it('is initialized to zero', () => {
    expect(this.register.read()).toEqual(0);
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
      this.register.write(0x1234);
      this.register.reset();
    });

    it('resets the value to 0', () => {
      expect(this.register.read()).toEqual(0);
    });
  });
});
