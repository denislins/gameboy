import Observer from '../../../common/Observer.js';
import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class TimerDividerRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF04;
  }

  writeFromBus() {
    Observer.trigger('mmu.registers.timerDivider.written');
    return this.write(0);
  }
}
