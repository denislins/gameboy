import Sprite from './Sprite.js';

export default class SpriteFilter {
  constructor(mmu) {
    this.mmu = mmu;
    this.loadSprites();
  }

  loadSprites() {
    this.sprites = [];

    for (let address = 0xFE00; address < 0xFE9F; address += 4) {
      const attributes = [
        this.mmu.read(address),
        this.mmu.read(address + 1),
        this.mmu.read(address + 2),
        this.mmu.read(address + 3),
      ];

      const sprite = new Sprite(...attributes);
      this.sprites.push(sprite);
    }
  }

  getVisibleSprites(row) {
    const filtered = this.sprites.filter(sprite => (
      sprite.isVisible() && row > sprite.y - 8 && row <= sprite.y - 16
    ));

    return filtered.slice(0, 10);
  }
}
