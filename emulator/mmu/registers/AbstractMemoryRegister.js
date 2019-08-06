export default class AbstractMemoryRegister {
  constructor(mmu) {
    this.mmu = mmu;
    this.onInit();
  }

  onInit() {

  }

  read() {
    return this.mmu.forceRead(this.address);
  }

  write(value) {
    return this.mmu.forceWrite(this.address, value);
  }

  readFromBus() {
    return this.read();
  }

  writeFromBus(value) {
    return this.write(value);
  }
}
