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
    return this.mmu.write(this.address, value);
  }
}
