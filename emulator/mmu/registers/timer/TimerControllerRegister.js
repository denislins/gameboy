import Observer from '../../../common/Observer.js';
import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class TimerControllerRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF07;
    this.frequencies = [1024, 16, 64, 256];
  }

  writeFromBus(value) {
    const previousValue = this.read();
    this.write(value & 7);

    Observer.trigger('mmu.registers.timerController.written', {
      newValue: value,
      previousValue,
    });
  }

  getClockFrequencyInCycles() {
    const index = this.read() & 3;
    return this.frequencies[index];
  }

  isTimerEnabled() {
    return this.read() & 4;
  }
}
