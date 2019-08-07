import WindowRenderer from './renderers/WindowRenderer.js';
import BackgroundRenderer from './renderers/BackgroundRenderer.js';
import SpriteRenderer from './renderers/SpriteRenderer.js';

export default class Ppu {
  constructor(mmu) {
    this.mmu = mmu;
    this.controller = mmu.registers.get('lcdController');

    this.windowRenderer = new WindowRenderer(mmu);
    this.backgroundRenderer = new BackgroundRenderer(mmu);
    this.spriteRenderer = new SpriteRenderer(mmu);
  }

  draw(row) {
    this.isBackgroundEnabled = this.controller.isBackgroundEnabled();
    this.areSpritesEnabled = this.controller.areSpritesEnabled();

    if (this.areSpritesEnabled) {
      this.spriteRenderer.findVisibleSpritesAtRow(row);
    }

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
    const basePixel = this.renderBasePixel(row, column);
    const spritePixel = this.renderSpritePixel(row, column);

    if (spritePixel !== undefined) {
      return spritePixel;
    }

    return basePixel;
  }

  renderBasePixel(row, column) {
    if (this.windowRenderer.isWindowEnabledAt(row, column)) {
      return this.windowRenderer.renderPixel(row, column);
    } else if (!this.isBackgroundEnabled) {
      return 0;
    }

    return this.backgroundRenderer.renderPixel(row, column);
  }

  renderSpritePixel(row, column) {
    if (!this.areSpritesEnabled) {
      return undefined;
    }

    return this.spriteRenderer.renderPixel(row, column);
  }
}
