import Cpu from './cpu/cpu.js';
import Mmu from './mmu/mmu.js';
import Display from './display/display.js';
import Cartridge from './cartridge/cartridge.js';

export default class Emulator {
  constructor(canvas) {
    this.mmu = new Mmu();
    this.cpu = new Cpu(this.mmu);
    this.screen = new Display(canvas);
  }

  load(path) {
    const cartridge = new Cartridge(path);
    // some async shit happening
    this.mmu.loadCartridge(cartridge);
  }

  start() {
    this.cpu.run();
  }
}
