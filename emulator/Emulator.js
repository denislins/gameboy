import Cpu from './cpu/Cpu.js';
import Gpu from './gpu/Gpu.js';
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
    this.fpsContainer = document.getElementById('fps');
    this.currentSecond = new Date().getSeconds();

    this.tick();
  }

  tick() {
    const limit = this.cpu.cycles + 70224;

    while (this.cpu.cycles <= limit) {
      const cycles = this.cpu.tick();

      this.timer.tick(cycles);
      this.gpu.tick(cycles);

      this.cpu.serviceInterrupts();
    }

    window.requestAnimationFrame(() => this.updateDisplay());
  }

  updateDisplay() {
    this.display.draw(this.gpu.pixels);

    this.gpu.reset();
    this.updateFps();

    setTimeout(() => this.tick(), 0);
  }

  updateFps() {
    const currentSecond = new Date().getSeconds();

    if (currentSecond === this.currentSecond) {
      this.fps++;
    } else {
      this.fpsContainer.innerText = this.fps;

      this.fps = 1;
      this.currentSecond = new Date().getSeconds();
    }
  }
}
