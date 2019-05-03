import CompositeRegister from 'emulator/cpu/registers/CompositeRegister';
import ByteRegister from 'emulator/cpu/registers/ByteRegister';

describe('CompositeRegister', () => {
  beforeEach(() => {
    this.registerA = new ByteRegister();
    this.registerB = new ByteRegister();

    this.register = new CompositeRegister(this.registerA, this.registerB);
  });

  it('can be set and retrieved', () => {
    this.register.write(0x8040);
    expect(this.register.read()).toEqual(0x8040);
  });

  it('changes the values of the individual registers correctly', () => {
    this.register.write(0x8040);

    expect(this.registerA.read()).toEqual(0x80);
    expect(this.registerB.read()).toEqual(0x40);
  });

  it('returns the values of the individual registers correctly', () => {
    this.registerA.write(0x80);
    this.registerB.write(0x40);

    expect(this.register.read()).toEqual(0x8040);
  });
});
