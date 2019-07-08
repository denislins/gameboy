import ByteRegister from '/emulator/cpu/registers/ByteRegister.js';

describe('ByteRegister', function() {
  beforeEach(function() {
    this.register = new ByteRegister();
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
});
