import CompositeRegister from '/emulator/cpu/registers/CompositeRegister.js';
import ByteRegister from '/emulator/cpu/registers/ByteRegister.js';

describe('CompositeRegister', function() {
  beforeEach(function() {
    this.registerA = new ByteRegister();
    this.registerB = new ByteRegister();

    this.register = new CompositeRegister(this.registerA, this.registerB);
  });

  it('is initialized to zero', function() {
    expect(this.register.read()).toEqual(0);
  });

  it('can be set and retrieved', function() {
    this.register.write(0x8040);
    expect(this.register.read()).toEqual(0x8040);
  });

  it('changes the values of the individual registers correctly', function() {
    this.register.write(0x8040);

    expect(this.registerA.read()).toEqual(0x80);
    expect(this.registerB.read()).toEqual(0x40);
  });

  it('returns the values of the individual registers correctly', function() {
    this.registerA.write(0x80);
    this.registerB.write(0x40);

    expect(this.register.read()).toEqual(0x8040);
  });
});
