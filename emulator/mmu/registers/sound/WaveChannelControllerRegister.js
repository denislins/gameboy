import Observer from '../../../common/Observer.js';
import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class WaveChannelControllerRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF1E;
  }

  writeFromBus(value) {
    Observer.trigger('apu.channels.wave.written', { value });
    return this.write(value);
  }
}
