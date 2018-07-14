export default class MemoryRegister {
  constructor(mmu, address, defaultValue) {
    this.mmu = mmu;
    this.address = address;
    this.defaultValue = defaultValue;
  }

  reset() {
    this.write(this.defaultValue);
  }

  read() {
    return this.mmu.read(this.address);
  }

  write(value) {
    return this.mmu.write(this.address, value);
  }
}
