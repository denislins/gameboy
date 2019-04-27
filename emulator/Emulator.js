import Cpu from './cpu/Cpu.js';
import Gpu from './gpu/Gpu.js';
import Mmu from './mmu/Mmu.js';
import Display from './display/Display.js';
import Cartridge from './cartridge/Cartridge.js';

export default class Emulator {
  constructor(canvas) {
    this.mmu = new Mmu();
    this.cpu = new Cpu(this.mmu);
    this.gpu = new Gpu(this.mmu);
    this.screen = new Display(canvas);
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
      this.tick();
    }
  }

  tick() {
    this.cpu.tick();
    // this.gpu.tick(this.cpu.cycles);
  }
}
