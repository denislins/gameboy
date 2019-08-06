import AbstractMemoryRegister from '../AbstractMemoryRegister.js';

export default class JoypadRegister extends AbstractMemoryRegister {
  onInit() {
    this.address = 0xFF00;
    this.columns = [];
  }

  updateColumns(columns) {
    this.columns = columns;
  }

  writeFromBus(value) {
    return this.write(value & 0x30);
  }

  readFromBus() {
    const value = super.read();
    const nibble = this.getLowerNibble(value);

    return (value & 0xF0) | nibble;
  }

  getLowerNibble(value) {
    if (value & 0x10) {
      return this.columns[0];
    } else if (value & 0x20) {
      return this.columns[1];
    }

    return 0xF;
  }
}
