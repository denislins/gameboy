import Cpu from './cpu/Cpu.js';
import Gpu from './gpu/Gpu.js';
import Ppu from './gpu/Ppu.js';
import Mmu from './mmu/Mmu.js';
import Timer from './timer/Timer.js';
import Display from './display/Display.js';
import Cartridge from './cartridge/Cartridge.js';

export default class Emulator {
  constructor(canvas) {
    this.mmu = new Mmu();
    this.cpu = new Cpu(this.mmu);
    this.gpu = new Gpu(this.mmu);
    this.timer = new Timer(this.mmu);
    this.display = new Display(canvas);
  }

  load(path) {
    this.cartridge = new Cartridge(path);
  }

  async boot() {
    await this.mmu.loadCartridge(this.cartridge);

    this.cpu.reset();
    this.gpu.reset();

    this.fps = 0;
    this.currentSecond = new Date().getSeconds();

    this.counter = document.getElementById('fps');

    window.requestAnimationFrame(() => this.tick());
  }

  tick() {
    const limit = this.cpu.cycles + 70224;

    while (this.cpu.cycles <= limit) {
      const cycles = this.cpu.tick();

      this.timer.tick(cycles);
      this.gpu.tick(cycles);

      this.cpu.serviceInterrupts();
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
}
