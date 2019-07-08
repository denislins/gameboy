import Cpu from './cpu/Cpu.js';
import Gpu from './gpu/Gpu.js';
import Ppu from './gpu/Ppu.js';
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
    this.cpu.reset();
    this.gpu.reset();

    await this.mmu.loadCartridge(this.cartridge);

    this.fps = 0;
    this.currentSecond = new Date().getSeconds();

    this.counter = document.getElementById('fps');

    window.requestAnimationFrame(() => this.tick());
  }

  tick() {
    const limit = this.cpu.cycles + 70224;

    while (this.cpu.cycles <= limit) {
      const cycles = this.cpu.tick();
      this.gpu.tick(cycles);
    }

    this.display.draw(this.gpu.pixels);

    this.gpu.reset();
    this.updateFps();

    window.requestAnimationFrame(() => this.tick());
  }

  updateFps() {
    const currentSecond = new Date().getSeconds();

    if (currentSecond === this.currentSecond) {
      this.fps++;
    } else {
      this.counter.innerText = this.fps;

      this.fps = 1;
      this.currentSecond = new Date().getSeconds();
    }
  }

  async bootWithMemoryDump(path) {
    const cartridge = new Cartridge(path);
    await this.mmu.loadCartridge(cartridge);

    const ppu = new Ppu(this.mmu);
    const pixels = [];

    for (let row = 0; row < 144; row++) {
      pixels.push(...ppu.draw(row));
    }

    this.display.draw(pixels);
  }
}
