import ByteRegister from 'emulator/cpu/registers/ByteRegister';

describe('ByteRegister', () => {
  beforeEach(() => {
    this.register = new ByteRegister();
  });

  it('can be set and retrieved', () => {
    this.register.write(0xF0);
    expect(this.register.read()).toEqual(0xF0);
  });

  it('only writes 8 bit values', () => {
    this.register.write(0x100);
    expect(this.register.read()).toEqual(0);
  });
});
