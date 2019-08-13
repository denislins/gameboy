import Observer from '../Observer.js';

export default class InterruptHandler {
  constructor(mmu, resolver) {
    this.mmu = mmu;
    this.resolver = resolver;

    this.masterEnabled = false;
    this.currentInterruptAddress = undefined;

    this.initTypes();
    this.initRegisters();
    this.initEventHandlers();
  }

  getServiceableInterrupts() {
    const requested = this.getRequestedInterrupts();

    if (requested === 0) {
      return [];
    }

    return Object.keys(this.types).filter((type) => {
      const attrs = this.types[type];
      return (requested & attrs.mask) > 0;
    });
  }

  getInterruptAddress(type) {
    if (!this.masterEnabled) {
      return undefined;
    }

    const value = this.requestRegister.read();
    const interrupt = this.types[type];

    this.requestRegister.write(value & ~interrupt.mask);
    this.masterEnabled = false;

    return interrupt.address;
  }

  getRequestedInterrupts() {
    const enabled = this.enabledRegister.read();
    const requested = this.requestRegister.read();

    return enabled & requested & 0x1F;
  }

  // private

  initTypes() {
    this.types = {
      vblank: { mask: 1, address: 0x40 },
      lcd: { mask: 2, address: 0x48 },
      timer: { mask: 4, address: 0x50 },
      serial: { mask: 8, address: 0x58 },
      joypad: { mask: 16, address: 0x60 },
    };
  }

  initRegisters() {
    this.enabledRegister = this.mmu.registers.get('interruptEnabled');
    this.requestRegister = this.mmu.registers.get('interruptRequest');
  }

  initEventHandlers() {
    Observer.on('interrupts.master', ({ flag }) => {
      this.masterEnabled = flag;
    });

    Observer.on('interrupts.request', ({ type }) => {
      this.request(type);
    });
  }

  request(type) {
    const value = this.requestRegister.read();
    const { mask } = this.types[type];

    this.requestRegister.write(value | mask);
  }
}
