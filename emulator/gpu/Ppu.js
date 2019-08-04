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
    this.spriteRenderer.findVisibleSpritesAtRow(row);
    return this.renderRow(row);
  }

  renderRow(row) {
    const pixels = [];

    for (let column = 0; column < 160; column++) {
      const pixel = this.renderPixel(row, column);
      pixels.push(pixel);
    }

    return pixels;
  }

  renderPixel(row, column) {
    let basePixel;

    if (this.windowRenderer.isWindowEnabledAt(row, column)) {
      basePixel = this.windowRenderer.renderPixel(row, column);
    } else {
      basePixel = this.backgroundRenderer.renderPixel(row, column);
    }

    const spritePixel = this.spriteRenderer.renderPixel(row, column);

    if (spritePixel !== undefined) {
      return spritePixel;
    }

    return basePixel;
  }
}
