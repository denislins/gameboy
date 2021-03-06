import AbstractRenderer from './AbstractRenderer.js';
import SpriteManager from '../sprites/SpriteManager.js';

export default class SpriteRenderer extends AbstractRenderer {
  constructor(mmu) {
    super(mmu);

    this.tableBaseAddress = 0xFE00;
    this.tilesBaseAddress = 0x8000;

    this.spriteManager = new SpriteManager(mmu);
    this.visibleSprites = [];
  }

  refreshState(row) {
    this.visibleSprites = this.spriteManager.findVisibleSpritesAtRow(row);
  }

  renderPixel(row, column) {
    return this.visibleSprites.find((sprite) => {
      if (this.isSpriteVisible(sprite, column)) {
        this.renderSprite(sprite, row, column);

        if (sprite.color !== undefined) {
          return sprite;
        }
      }

      return undefined;
    });
  }

  isSpriteVisible(sprite, column) {
    const xStart = sprite.getHorizontalPosition();
    const xFinish = xStart + 8;

    return column >= xStart && column < xFinish;
  }

  renderSprite(sprite, row, column) {
    this.loadSpritePalette(sprite);

    const spriteRow = this.calculateSpriteRow(sprite, row);
    const spriteColumn = this.calculateSpriteColumn(sprite, column);

    const { tileNumber } = sprite;
    const spriteHeight = this.spriteManager.getSpriteHeight();

    // eslint-disable-next-line no-param-reassign
    sprite.color = this.calculatePixelColor(tileNumber, spriteRow, spriteColumn, spriteHeight);
  }

  loadSpritePalette(sprite) {
    const paletteNumber = sprite.getPaletteNumber();
    const register = `objectPalette${paletteNumber}`;

    this.palette = this.mmu.registers.read(register);
  }

  calculateSpriteRow(sprite, row) {
    let actualRow = row - sprite.getVerticalPosition();

    if (sprite.isFlippedVertically()) {
      actualRow -= this.spriteManager.getSpriteHeight() - 1;
      actualRow *= -1;
    }

    return actualRow;
  }

  calculateSpriteColumn(sprite, column) {
    let actualColumn = column - sprite.getHorizontalPosition();

    if (sprite.isFlippedHorizontally()) {
      actualColumn -= 7;
      actualColumn *= -1;
    }

    return actualColumn;
  }

  calculateInternalColor(baseAddress, pixel) {
    const color = super.calculateInternalColor(baseAddress, pixel);

    // white is transparent for sprites
    if (color === 0) {
      return undefined;
    }

    return color;
  }
}
