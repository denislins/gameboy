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
    this.mmu.forceWrite(this.address, value);
  }

  readFromBus() {
    return this.read();
  }

  writeFromBus(value) {
    this.write(value);
  }
}
