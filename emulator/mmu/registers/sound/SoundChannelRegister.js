import Observer from '../../../common/Observer.js';
import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class SoundChannelRegister extends AbstractMemoryRegister {
  constructor(mmu, address, channel) {
    super(mmu);

    this.address = address;
    this.channel = channel;

    const registerNumber = (address - 1) % 5;
    this.identifier = `nrx${registerNumber}`;
  }

  writeFromBus(value) {
    this.write(value);

    const event = `apu.registers.${this.channel}.written`;
    Observer.trigger(event, { register: this.identifier, value });
  }
}
