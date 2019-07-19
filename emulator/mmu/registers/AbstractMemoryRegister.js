export default class AbstractMemoryRegister {
  constructor(mmu) {
    this.mmu = mmu;
    this.onInit();
  }

  onInit() {

  }

  read() {
    return this.mmu.read(this.address);
  }

  write(value) {
    return this.mmu.forceWrite(this.address, value);
  }

  writeFromBus(value) {
    return this.write(value);
  }
}
