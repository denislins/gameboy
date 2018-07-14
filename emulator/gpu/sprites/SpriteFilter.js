import Sprite from './Sprite.js';

export default class SpriteFilter {
  constructor(mmu) {
    this.mmu = mmu;
  }

  getVisibleSprites(row) {
    const filtered = this.getSprites().filter(sprite => (
      sprite.isVisible() && row > sprite.y - 8 && row <= sprite.y - 16
    ));

    return filtered.slice(0, 10);
  }

  getSprites() {
    const sprites = [];

    for (let address = 0xFE00; address < 0xFE9F; address += 4) {
      const attributes = [
        this.mmu.read(address),
        this.mmu.read(address + 1),
        this.mmu.read(address + 2),
        this.mmu.read(address + 3),
      ];

      const sprite = new Sprite(...attributes);
      sprites.push(sprite);
    }

    return sprites;
  }
}
