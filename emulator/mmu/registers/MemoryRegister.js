export default class MemoryRegister {
  constructor(mmu, address) {
    this.mmu = mmu;
    this.address = address;
  }

  read() {
    return this.mmu.read(this.address);
  }

  write(value) {
    return this.mmu.write(this.address, value);
  }
}
