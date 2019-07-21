import Observer from '../../../Observer.js';
import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class TimerControllerRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF07;
    this.frequencies = [1024, 16, 64, 256];
  }

  writeFromBus(value) {
    Observer.trigger('mmu.registers.timerController.written', {
      newValue: value,
      previousValue: this.read(),
    });

    return this.write(value & 7);
  }

  getClockFrequencyInCycles() {
    const index = this.read() & 3;
    return this.frequencies[index];
  }

  isTimerEnabled() {
    return this.read() & 4;
  }
}
