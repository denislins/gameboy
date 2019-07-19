import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class TimerDividerRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF04;
  }

  writeFromBus(value) {
    window.timer.timerCounter = 0;
    return this.write(0);
  }
}
