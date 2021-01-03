import Observer from '../../../common/Observer.js';
import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class SweepSquareChannelControllerRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF14;
  }

  writeFromBus(value) {
    Observer.trigger('apu.channels.sweepSquare.written', { value });
    return this.write(value);
  }
}
