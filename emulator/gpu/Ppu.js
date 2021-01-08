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

    this.refreshRenderers(row);

    return this.renderRow(row);
  }

  // private

  refreshRenderers(row) {
    if (this.areSpritesEnabled) {
      this.spriteRenderer.refreshState(row);
    }

    this.windowRenderer.refreshState(row);
    this.backgroundRenderer.refreshState(row);
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
    const sprite = this.getSpriteAtPixel(row, column);

    if (!sprite) {
      return basePixel;
    } else if (sprite.isUnderBackground() && basePixel > 0) {
      return basePixel;
    } else if (sprite.color === undefined) {
      return basePixel;
    }

    return sprite.color;
  }

  renderBasePixel(row, column) {
    if (this.windowRenderer.isWindowEnabledAt(row, column)) {
      return this.windowRenderer.renderPixel(row, column);
    } else if (!this.isBackgroundEnabled) {
      return 0;
    }

    return this.backgroundRenderer.renderPixel(row, column);
  }

  getSpriteAtPixel(row, column) {
    if (this.areSpritesEnabled) {
      return this.spriteRenderer.renderPixel(row, column);
    }
  }
}
