import Cpu from './cpu/Cpu.js';
import Gpu from './gpu/Gpu.js';
import Mmu from './mmu/Mmu.js';
import Apu from './apu/Apu.js';
import Timer from './timer/Timer.js';
import Joypad from './joypad/Joypad.js';
import Display from './display/Display.js';
import Cartridge from './cartridge/Cartridge.js';

export default class Emulator {
  constructor(canvas) {
    this.mmu = new Mmu();
    this.cpu = new Cpu(this.mmu);
    this.gpu = new Gpu(this.mmu);
    this.apu = new Apu(this.mmu);
    this.timer = new Timer(this.mmu);
    this.joypad = new Joypad(this.mmu);
    this.display = new Display(canvas);
  }

  load(path) {
    this.cartridge = new Cartridge(path);
  }

  async loadFromUrl(path) {
    this.cartridge = await Cartridge.fromUrl(path);
  }

  async boot() {
    await this.mmu.loadCartridge(this.cartridge);

    this.cpu.reset();
    this.apu.reset();
    this.joypad.install();

    this.fps = 0;
    this.fpsContainer = document.getElementById('fps');
    this.currentSecond = new Date().getSeconds();

    this.renderFrame();
  }

  renderFrame() {
    // number of machine clocks per frame: 154 lines * 114 clocks
    for (let i = 0; i < 17556; i++) {
      this.cpu.tick();
      this.gpu.tick();
      this.apu.tick();
      this.timer.tick();
    }

    window.requestAnimationFrame(() => this.refreshDisplay());

  }

  refreshDisplay() {
    this.apu.play();

    this.display.refresh();
    this.updateFps();

    setTimeout(() => this.renderFrame(), 0);
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
