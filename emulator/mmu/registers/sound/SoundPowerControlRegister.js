import Observer from '../../../common/Observer.js';
import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class SoundPowerControlRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF26;
  }

  writeFromBus(value) {
    const currentValue = this.read();

    Observer.trigger('apu.powerControl.written', { currentValue, newValue: value });

    if (value & 0x80) {
      this.write(currentValue | 0x80);
    } else {
      this.write(currentValue & 0x7F);
    }
  }
}
