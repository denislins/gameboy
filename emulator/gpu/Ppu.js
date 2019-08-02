import WindowRenderer from './renderers/WindowRenderer.js';
import BackgroundRenderer from './renderers/BackgroundRenderer.js';
import SpriteRenderer from './renderers/SpriteRenderer.js';

export default class Ppu {
  constructor(mmu) {
    this.mmu = mmu;
    this.windowRenderer = new WindowRenderer(mmu);
    this.backgroundRenderer = new BackgroundRenderer(mmu);
    this.spriteRenderer = new SpriteRenderer(mmu);
  }

  draw(row) {
    const pixels = [];

    for (let column = 0; column < 160; column++) {
      const pixel = this.renderPixel(row, column);
      pixels.push(pixel);
    }

    return pixels;
  }

  renderPixel(row, column) {
    if (this.windowRenderer.isWindowEnabledAt(row, column)) {
      return this.windowRenderer.renderPixel(row, column);
    }

    return this.backgroundRenderer.renderPixel(row, column);
  }
}
