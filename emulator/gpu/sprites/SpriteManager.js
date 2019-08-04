import Sprite from './Sprite.js';

export default class SpriteManager {
  constructor(mmu) {
    this.mmu = mmu;
    this.controller = mmu.registers.get('lcdController');
  }

  findVisibleSpritesAtRow(row) {
    if (row === 0) {
      this.refreshSprites();
      this.refreshSpriteHeight();
    }

    const filtered = this.sprites.filter(sprite => {
      const yStart = sprite.getVerticalPosition();
      const yFinish = yStart + this.spriteHeight;

      return sprite.isVisible() && row >= yStart && row < yFinish;
    });

    return filtered.slice(0, 10);
  }

  getSpriteHeight() {
    return this.spriteHeight;
  }

  refreshSprites() {
    this.sprites = [];

    for (let i = 0; i < 40; i++) {
      const baseAddress = 0xFE00 + 4 * i;
      const sprite = this.buildSprite(baseAddress);

      this.sprites.push(sprite);
    }
  }

  buildSprite(baseAddress) {
    const yPosition = this.mmu.read(baseAddress);
    const xPosition = this.mmu.read(baseAddress + 1);
    const tileNumber = this.mmu.read(baseAddress + 2);
    const attributes = this.mmu.read(baseAddress + 3);

    return new Sprite(xPosition, yPosition, tileNumber, attributes);
  }

  refreshSpriteHeight() {
    this.spriteHeight = this.controller.getSpriteHeight();
  }
}
