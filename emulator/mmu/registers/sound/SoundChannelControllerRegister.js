import Observer from '../../../common/Observer.js';
import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class SoundChannelControllerRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF14;
  }

  writeFromBus(value) {
    Observer.trigger('apu.channels.controller.written', { value });
    return this.write(value);
  }
}
