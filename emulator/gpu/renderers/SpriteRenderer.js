import AbstractRenderer from './AbstractRenderer.js';
import SpriteManager from '../sprites/SpriteManager.js';

export default class SpriteRenderer extends AbstractRenderer {
  constructor(mmu) {
    super(mmu);
    this.spriteManager = new SpriteManager(mmu);
  }

  findVisibleSpritesAtRow(row) {
    this.visibleSprites = this.spriteManager.findVisibleSpritesAtRow(row);
  }

  renderPixel(row, column) {
    const sprite = this.getVisibleSpriteAtColumn(column);

    if (sprite) {
      this.loadSpritePalette(sprite);

      const actualRow = this.calculateActualRow(sprite, row);
      const actualColumn = this.calculateActualColumn(sprite, column);

      return this.calculatePixelColor(sprite.tileNumber, actualRow, actualColumn);
    }
  }

  calculateActualRow(sprite, row) {
    let actualRow = row - sprite.getVerticalPosition();

    if (sprite.isFlippedVertically()) {
      actualRow -= this.spriteManager.getSpriteHeight() - 1;
      actualRow *= -1;
    }

    return actualRow;
  }

  calculateActualColumn(sprite, column) {
    let actualColumn = column - sprite.getHorizontalPosition();

    if (sprite.isFlippedHorizontally()) {
      actualColumn -= 7;
      actualColumn *= -1;
    }

    return actualColumn;
  }

  getVisibleSpriteAtColumn(column) {
    return this.visibleSprites.find((sprite) => {
      const xStart = sprite.getHorizontalPosition();
      const xFinish = xStart + 8;

      return column >= xStart && column < xFinish;
    });
  }

  loadSpritePalette(sprite) {
    const paletteNumber = sprite.getPaletteNumber();
    const register = `objectPalette${paletteNumber}`;

    this.palette = this.mmu.registers.read(register);
  }

  calculateInternalColor(baseAddress, pixel) {
    const color = super.calculateInternalColor(baseAddress, pixel);

    if (color > 0) {
      return color;
    }
  }

  get tableBaseAddress() {
    return 0xFE00;
  }

  get tilesBaseAddress() {
    return 0x8000;
  }
}
