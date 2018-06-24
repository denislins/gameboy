import Cpu from './cpu/Cpu.js';
import Mmu from './mmu/Mmu.js';
import Display from './display/Display.js';
import Cartridge from './cartridge/Cartridge.js';

export default class Emulator {
  constructor(canvas) {
    this.mmu = new Mmu();
    this.cpu = new Cpu(this.mmu);
    this.screen = new Display(canvas);
  }

  load(path) {
    this.cartridge = new Cartridge(path);
  }

  async start() {
    await this.mmu.loadCartridge(this.cartridge);
    this.cpu.run();
  }
}
