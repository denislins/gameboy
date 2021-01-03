import Observer from '../../../common/Observer.js';
import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class BasicSquareChannelControllerRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF19;
  }

  writeFromBus(value) {
    Observer.trigger('apu.channels.basicSquare.written', { value });
    return this.write(value);
  }
}
