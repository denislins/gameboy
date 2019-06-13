import Cpu from './cpu/Cpu.js';
import Gpu from './gpu/Gpu.js';
import TestPpu from './gpu/TestPpu.js';
import Mmu from './mmu/Mmu.js';
import Display from './display/Display.js';
import Cartridge from './cartridge/Cartridge.js';

export default class Emulator {
  constructor(canvas) {
    this.mmu = new Mmu();
    this.cpu = new Cpu(this.mmu);
    this.gpu = new Gpu(this.mmu);
    this.display = new Display(canvas);
  }

  load(path) {
    this.cartridge = new Cartridge(path);
  }

  async boot() {
    await this.mmu.loadCartridge(this.cartridge);

    this.cpu.reset();
    this.mmu.reset();

    // cpu needs to run non-stop
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        this.cpu.tick();
        // this.gpu.tick(this.cpu.cycles);
      } catch (e) {
        if (e.message === 'finished bootrom') {
          break;
        } else {
          throw e;
        }
      }
    }

    console.log('finished bootrom');
  }

  async bootWithMemoryDump(path) {
    const cartridge = new Cartridge(path);
    await this.mmu.loadCartridge(cartridge);

    const testPpu = new TestPpu(this.mmu);
    const colors = testPpu.draw();

    this.display.draw(colors);
  }
}
