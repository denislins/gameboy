export default class InterruptHandler {
  constructor(mmu, resolver) {
    this.mmu = mmu;
    this.resolver = resolver;
    this.masterEnabled = false;

    this.types = {
      vblank: { mask: 1, address: 0x40 },
      lcd: { mask: 2, address: 0x48 },
      timer: { mask: 4, address: 0x50 },
      serial: { mask: 8, address: 0x58 },
      joypad: { mask: 16, address: 0x60 },
    };

    this.enabledRegister = this.mmu.registers.get('interruptEnabled');
    this.requestRegister = this.mmu.registers.get('interruptRequest');
  }

  setMasterEnabled(flag) {
    this.masterEnabled = flag;
  }

  service(callback) {
    const requested = this.getRequestedInterrupts();

    if (!this.masterEnabled || requested === 0) {
      return;
    }

    const types = Object.entries(this.types);

    for (let [type, attrs] of types) {
      if ((requested & attrs.mask) > 0) {
        console.log(`servicing interrupt: ${type}`)
        this.serviceType(attrs, callback);
      }
    }
  }

  getRequestedInterrupts() {
    const enabled = this.enabledRegister.read();
    const requested = this.requestRegister.read();

    return enabled & requested;
  }

  serviceType(interrupt, callback) {
    this.masterEnabled = false;

    const value = this.requestRegister.read();
    this.requestRegister.write(value & ~interrupt.mask);

    callback(interrupt.address);
  }
}
